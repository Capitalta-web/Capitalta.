/**
 * Solicitud Status Updated Notification
 * Triggered when admin changes solicitud status.
 * Solo administradores. El correo y nombre del cliente se leen de la base (no del navegador).
 */

import { NextResponse } from 'next/server';

import { getAdminContext } from '@/utils/buro/server-auth';
import { sendEmail } from '@/utils/nodemailer';
import { CONTACT_EMAIL, escapeHtml } from '@/utils/emailHtml';
import { emailTemplates } from '@/utils/notifications/emailService';

export async function POST(request) {
  const context = await getAdminContext();
  if (context.error) {
    return NextResponse.json({ error: context.error }, { status: context.status });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const solicitudId = String(body?.solicitudId || '');
    const newStatus = String(body?.newStatus || '').slice(0, 40);
    const notes = escapeHtml(String(body?.notes || '').slice(0, 2000)).replaceAll('\n', '<br/>');

    if (!solicitudId || !newStatus) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: solicitud } = await context.admin
      .from('solicitudes')
      .select('id, cliente_id, profiles:cliente_id ( full_name, email )')
      .eq('id', solicitudId)
      .maybeSingle();

    const clienteEmail = solicitud?.profiles?.email;
    if (!clienteEmail) {
      return NextResponse.json({ error: 'Solicitud o cliente no encontrado' }, { status: 404 });
    }
    const clienteNombre = escapeHtml(solicitud.profiles.full_name || clienteEmail);
    const adminEmail = process.env.ADMIN_EMAIL || CONTACT_EMAIL;

    // Email templates for status changes
    const statusEmails = {
      aprobada: {
        subject: '✅ ¡Tu solicitud ha sido APROBADA!',
        greeting: 'Buenas noticias'
      },
      rechazada: {
        subject: '❌ Tu solicitud ha sido revisada',
        greeting: 'Información importante'
      },
      'en-revision': {
        subject: '🔍 Tu solicitud está en revisión',
        greeting: 'Actualización'
      },
      activo: {
        subject: '✅ Tu crédito ha sido activado',
        greeting: 'Información importante'
      }
    };

    const emailConfig = statusEmails[newStatus] || { subject: 'Actualización de tu solicitud' };

    // Send email to client about status change
    const clientHtmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">${emailConfig.greeting}</h1>
            </div>

            <div style="padding: 20px;">
              <p>Hola ${clienteNombre},</p>

              <p>Tu solicitud de crédito ha sido actualizada. El nuevo estado es:</p>

              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
                <p style="margin: 0; font-size: 18px; font-weight: bold; color: #667eea;">
                  ${escapeHtml(newStatus.toUpperCase())}
                </p>
              </div>

              ${
                notes
                  ? `
                <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <p style="margin: 0; font-weight: bold; color: #856404;">Comentarios:</p>
                  <p style="margin: 5px 0 0 0; color: #856404;">${notes}</p>
                </div>
              `
                  : ''
              }

              <p style="margin-top: 20px;">
                <a href="https://capitalta.mx/dashboard/cliente" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Ver Detalles
                </a>
              </p>

              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                Si tienes preguntas, contáctanos en ${adminEmail}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const [toClient, toAdmin] = await Promise.all([
      sendEmail({ to: clienteEmail, subject: emailConfig.subject, html: clientHtmlContent }),
      sendEmail({
        to: adminEmail,
        subject: `Solicitud actualizada - ${solicitud.profiles.full_name || clienteEmail}`,
        html: emailTemplates.statusChanged({ solicitudId: escapeHtml(solicitudId), clienteNombre, newStatus: escapeHtml(newStatus), notes })
      })
    ]);
    if (!toClient?.success) console.error('[notifications/solicitud-updated] No se envió al cliente:', toClient?.error);
    if (!toAdmin?.success) console.error('[notifications/solicitud-updated] No se envió al admin:', toAdmin?.error);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Notifications sent to client and admin'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error in solicitud-updated notification:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
