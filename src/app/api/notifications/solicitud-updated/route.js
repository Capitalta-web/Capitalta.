/**
 * Solicitud Status Updated Notification
 * Triggered when admin changes solicitud status
 */

import { emailTemplates } from '@/utils/notifications/emailService';

export async function POST(request) {
  try {
    const {
      solicitudId,
      clienteEmail,
      clienteNombre,
      newStatus,
      notes
    } = await request.json();

    if (!solicitudId || !clienteEmail || !newStatus) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get admin config
    const config = request.headers.get('X-Admin-Config');
    const parsedConfig = config ? JSON.parse(config) : {};
    const adminEmail = process.env.ADMIN_EMAIL || 'contacto@capitalta.mx';

    // Email templates for status changes
    const statusEmails = {
      'aprobada': {
        subject: '✅ ¡Tu solicitud ha sido APROBADA!',
        greeting: 'Buenas noticias'
      },
      'rechazada': {
        subject: '❌ Tu solicitud ha sido revisada',
        greeting: 'Información importante'
      },
      'en-revision': {
        subject: '🔍 Tu solicitud está en revisión',
        greeting: 'Actualización'
      },
      'activo': {
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
                  ${newStatus.toUpperCase()}
                </p>
              </div>

              ${notes ? `
                <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <p style="margin: 0; font-weight: bold; color: #856404;">Comentarios:</p>
                  <p style="margin: 5px 0 0 0; color: #856404;">${notes}</p>
                </div>
              ` : ''}

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

    // Send to client
    await fetch(new URL('/api/notifications/send-email', request.url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: clienteEmail,
        subject: emailConfig.subject,
        htmlContent: clientHtmlContent
      })
    });

    // Also send to admin
    const adminHtmlContent = emailTemplates.statusChanged({
      solicitudId,
      clienteNombre,
      newStatus,
      notes
    });

    await fetch(new URL('/api/notifications/send-email', request.url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: parsedConfig.email_notificaciones || adminEmail,
        subject: `Solicitud Actualizada - ${clienteNombre}`,
        htmlContent: adminHtmlContent
      })
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Notifications sent to client and admin'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error in solicitud-updated notification:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
