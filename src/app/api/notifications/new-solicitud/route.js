/**
 * New Solicitud Notification
 * Triggered when a client creates a new credit solicitud
 */

import { emailTemplates } from '@/utils/notifications/emailService';

export async function POST(request) {
  try {
    const {
      solicitudId,
      clienteNombre,
      clienteEmail,
      monto,
      plazo,
      tipo
    } = await request.json();

    if (!solicitudId || !clienteNombre || !monto) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get admin notification config from request
    const adminEmail = process.env.ADMIN_EMAIL || 'contacto@capitalta.mx';
    const config = request.headers.get('X-Admin-Config');
    const parsedConfig = config ? JSON.parse(config) : {};

    // Check if notifications are enabled
    if (!parsedConfig.notificaciones_nuevas_solicitudes !== false) {
      // Send email
      const htmlContent = emailTemplates.newSolicitud({
        clienteNombre,
        clienteEmail,
        monto,
        plazo,
        tipo
      });

      const emailResponse = await fetch(new URL('/api/notifications/send-email', request.url), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: parsedConfig.email_notificaciones || adminEmail,
          subject: `🆕 Nueva Solicitud de Crédito - ${clienteNombre}`,
          htmlContent: htmlContent
        })
      });

      if (!emailResponse.ok) {
        console.error('Failed to send notification email');
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Notification sent',
        solicitudId
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error in new-solicitud notification:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
