import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/utils/supabaseClient';
import { sendEmail } from '@/utils/nodemailer';
import { CONTACT_EMAIL, row } from '@/utils/emailHtml';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// Solo se notifica sobre cuentas recién creadas, para que el endpoint no sirva para reenviar avisos viejos
const MAX_AGE_MS = 15 * 60 * 1000;

/**
 * Avisa a contacto@ que alguien se registró para solicitar crédito.
 * El navegador solo manda el id del usuario; los datos se leen de Supabase con la service role,
 * y se marca app_metadata.contacto_notificado_at para enviar un solo aviso por cuenta.
 */
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const userId = String(body?.user_id || '');
  if (!UUID_REGEX.test(userId)) {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  const admin = createSupabaseServerClient({ admin: true });
  if (!admin) {
    console.error('[api/notify/registro] Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
    return NextResponse.json({ error: 'No disponible' }, { status: 500 });
  }

  const { data, error } = await admin.auth.admin.getUserById(userId);
  const user = data?.user;
  if (error || !user) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  if (user.app_metadata?.contacto_notificado_at) {
    return NextResponse.json({ ok: true, notified: false });
  }
  if (Date.now() - new Date(user.created_at).getTime() > MAX_AGE_MS) {
    return NextResponse.json({ ok: true, notified: false });
  }

  const meta = user.user_metadata || {};
  const nombre = meta.nombre_completo || meta.nombre || meta.full_name || '';
  const telefono = meta.telefono || meta.phone || user.phone || '';
  const monto = Number(meta.monto_interes);
  const montoTexto =
    Number.isFinite(monto) && monto > 0
      ? monto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
      : '';
  const fecha = new Date(user.created_at).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 16px;">
      <h2 style="margin: 0 0 12px 0;">Nuevo registro para solicitar crédito</h2>
      <div style="padding: 12px; border: 1px solid #eee; border-radius: 8px;">
        ${row('Nombre', nombre)}
        ${row('Correo', user.email)}
        ${row('Teléfono', telefono)}
        ${row('Monto de interés', montoTexto)}
        ${row('Fecha', fecha)}
        ${row('Correo confirmado', user.email_confirmed_at ? 'Sí' : 'Pendiente')}
        ${row('ID de usuario', user.id)}
      </div>
    </div>
  `;

  const result = await sendEmail({
    to: CONTACT_EMAIL,
    replyTo: user.email,
    subject: `Nuevo registro para crédito: ${nombre || user.email}`,
    html
  });

  if (!result?.success) {
    console.error('[api/notify/registro] No se envió el aviso:', result?.error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
    app_metadata: { ...user.app_metadata, contacto_notificado_at: new Date().toISOString() }
  });
  if (updateError) console.error('[api/notify/registro] No se pudo marcar como notificado:', updateError.message);

  return NextResponse.json({ ok: true, notified: true });
}
