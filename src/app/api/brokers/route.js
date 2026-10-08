import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/utils/supabaseClient';
import { sendEmail } from '@/utils/nodemailer';
import { CONTACT_EMAIL, escapeHtml, row } from '@/utils/emailHtml';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (value, max = 200) => (value === undefined || value === null ? '' : String(value).trim().slice(0, max));

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }

  // Honeypot anti-spam: el formulario real lo envía vacío
  if (clean(body.website)) {
    return NextResponse.json({ broker: null }, { status: 201 });
  }

  const digits = clean(body.telefono, 30).replace(/\D/g, '');
  const broker = {
    nombre: clean(body.nombre, 80),
    apellido: clean(body.apellido, 80),
    email: clean(body.email, 254).toLowerCase(),
    telefono: digits.length === 10 ? `+52${digits}` : digits.length === 12 && digits.startsWith('52') ? `+${digits}` : '',
    ciudad: clean(body.ciudad, 80),
    experiencia: clean(body.experiencia, 40),
    perfil: clean(body.perfil, 60) || null,
    mensaje: clean(body.mensaje, 1000) || null,
    acepta_privacidad: body.acepta_privacidad === true,
    origen: 'web',
    source_path: clean(body.source_path, 120) || '/quiero-ser-broker',
    updated_at: new Date().toISOString()
  };

  const missing = [];
  if (!broker.nombre) missing.push('nombre');
  if (!broker.apellido) missing.push('apellidos');
  if (!broker.email) missing.push('correo');
  if (!broker.telefono) missing.push('teléfono de 10 dígitos');
  if (!broker.ciudad) missing.push('ciudad');
  if (!broker.experiencia) missing.push('experiencia');
  if (missing.length) {
    return NextResponse.json({ error: `Faltan datos obligatorios: ${missing.join(', ')}` }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(broker.email)) {
    return NextResponse.json({ error: 'Formato de correo inválido' }, { status: 400 });
  }
  if (!broker.acepta_privacidad) {
    return NextResponse.json({ error: 'Debes aceptar el aviso de privacidad' }, { status: 400 });
  }

  const supabase = createSupabaseServerClient({ admin: true });
  if (!supabase) {
    console.error('[api/brokers] Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
    return NextResponse.json({ error: 'El registro no está disponible en este momento. Intenta más tarde.' }, { status: 500 });
  }

  // Si el mismo correo se registra otra vez, se actualizan sus datos en lugar de duplicarlo
  // (se conservan created_at y status).
  const { data, error } = await supabase.from('brokers').upsert(broker, { onConflict: 'email' }).select('id').single();

  if (error) {
    console.error('[api/brokers] Error al guardar:', { code: error.code, message: error.message });
    return NextResponse.json({ error: 'No pudimos guardar tu registro. Intenta de nuevo en unos minutos.' }, { status: 500 });
  }

  const fullName = `${broker.nombre} ${broker.apellido}`;

  const internalHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 16px;">
      <h2 style="margin: 0 0 12px 0;">Nuevo registro al Programa de Brókers</h2>
      <div style="padding: 12px; border: 1px solid #eee; border-radius: 8px;">
        ${row('Nombre', fullName)}
        ${row('Correo', broker.email)}
        ${row('Teléfono / WhatsApp', broker.telefono)}
        ${row('Ciudad', broker.ciudad)}
        ${row('Experiencia', broker.experiencia)}
        ${row('Perfil', broker.perfil)}
        ${row('Mensaje', broker.mensaje)}
        ${row('ID', data?.id)}
      </div>
    </div>
  `;

  const confirmationHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 16px;">
      <h2 style="margin: 0 0 12px 0;">Registro recibido</h2>
      <p>Hola ${escapeHtml(broker.nombre)}, recibimos tu registro al Programa de Brókers de Capitalta.</p>
      <p>Un asesor te contactará para continuar con tu onboarding y compartirte inventario, proceso y comisiones.</p>
      <div style="margin-top:16px;padding:12px;border:1px solid #eee;border-radius:8px;">
        ${row('Nombre', fullName)}
        ${row('Correo', broker.email)}
        ${row('Teléfono', broker.telefono)}
      </div>
      <p style="margin-top:16px;">Si tienes dudas, escríbenos a ${CONTACT_EMAIL}.</p>
    </div>
  `;

  const [internal, confirmation] = await Promise.all([
    sendEmail({ to: CONTACT_EMAIL, replyTo: broker.email, subject: `Nuevo bróker: ${fullName}`, html: internalHtml }),
    sendEmail({ to: broker.email, subject: 'Gracias por tu interés en el Programa de Brókers de Capitalta', html: confirmationHtml })
  ]);
  if (!internal?.success) console.error('[api/brokers] No se envió el aviso interno:', internal?.error);
  if (!confirmation?.success) console.error('[api/brokers] No se envió la confirmación al bróker:', confirmation?.error);

  return NextResponse.json({ broker: { id: data?.id } }, { status: 201 });
}
