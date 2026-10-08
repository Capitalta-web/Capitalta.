/**
 * New Solicitud Notification
 * Triggered when a client creates a new credit solicitud.
 * Solo acepta el id de la solicitud: los datos se leen de la base con service role y se verifica
 * que la solicitud pertenezca al usuario con sesión y sea reciente, para que no se pueda usar
 * para enviar correos arbitrarios.
 */

import { NextResponse } from 'next/server';

import { getUserContext } from '@/utils/buro/server-auth';
import { sendEmail } from '@/utils/nodemailer';
import { CONTACT_EMAIL, escapeHtml } from '@/utils/emailHtml';
import { emailTemplates } from '@/utils/notifications/emailService';

const MAX_AGE_MS = 15 * 60 * 1000;

export async function POST(request) {
  const context = await getUserContext();
  if (context.error) {
    return NextResponse.json({ error: context.error }, { status: context.status });
  }
  const { user, admin } = context;

  const body = await request.json().catch(() => ({}));
  const solicitudId = String(body?.solicitudId || '');
  if (!solicitudId) {
    return NextResponse.json({ error: 'Falta solicitudId' }, { status: 400 });
  }

  const { data: solicitud, error } = await admin
    .from('solicitudes')
    .select('id, cliente_id, monto_solicitado, plazo_meses, tipo, created_at')
    .eq('id', solicitudId)
    .maybeSingle();

  if (error || !solicitud || solicitud.cliente_id !== user.id) {
    return NextResponse.json({ error: 'Solicitud no encontrada' }, { status: 404 });
  }
  if (Date.now() - new Date(solicitud.created_at).getTime() > MAX_AGE_MS) {
    return NextResponse.json({ success: true, notified: false });
  }

  const { data: profile } = await admin.from('profiles').select('full_name, email, phone').eq('id', user.id).maybeSingle();
  const clienteNombre = profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.nombre || user.email;
  const clienteEmail = profile?.email || user.email;

  const html = emailTemplates.newSolicitud({
    clienteNombre: escapeHtml(clienteNombre),
    clienteEmail: escapeHtml(clienteEmail),
    monto: solicitud.monto_solicitado,
    plazo: escapeHtml(solicitud.plazo_meses),
    tipo: escapeHtml(solicitud.tipo)
  });

  const result = await sendEmail({
    to: process.env.ADMIN_EMAIL || CONTACT_EMAIL,
    replyTo: clienteEmail,
    subject: `Nueva solicitud de crédito - ${clienteNombre}`,
    html
  });

  if (!result?.success) {
    console.error('[notifications/new-solicitud] No se envió el aviso:', result?.error);
    return NextResponse.json({ success: false }, { status: 502 });
  }

  return NextResponse.json({ success: true, notified: true, solicitudId });
}
