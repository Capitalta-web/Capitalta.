import sgMail from '@sendgrid/mail';

/**
 * Utilidad para envío de correos usando SendGrid.
 * Requiere SENDGRID_API_KEY y SENDGRID_FROM_EMAIL en .env.
 */

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'contacto@capitalta.mx';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

/**
 * Envía un correo electrónico.
 * @param {Object} options - Opciones del correo.
 * @param {string} options.to - Destinatario.
 * @param {string} options.subject - Asunto.
 * @param {string} options.text - Contenido en texto plano.
 * @param {string} options.html - Contenido en HTML (opcional).
 */
export async function sendEmail({ to, subject, text, html }) {
  if (!SENDGRID_API_KEY) {
    console.warn('[SendGrid] API Key no configurada. El correo no se enviará.');
    console.log('[Mock Email] To:', to, '| Subject:', subject);
    return { success: false, error: 'API Key no configurada' };
  }

  const msg = {
    to,
    from: FROM_EMAIL,
    subject,
    text,
    html: html || text,
  };

  try {
    const response = await sgMail.send(msg);
    console.log('[SendGrid] Correo enviado exitosamente a:', to);
    return { success: true, response };
  } catch (error) {
    console.error('[SendGrid] Error al enviar correo:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    return { success: false, error };
  }
}

/**
 * Envía una confirmación de cita.
 * @param {Object} cita - Datos de la cita.
 */
export async function sendAppointmentConfirmation(cita) {
  const { nombre_cliente, email, fecha, hora, codigo_cita, sucursal_id } = cita;
  
  const sucursalNombre = sucursal_id === 'reforma' ? 'Torre Cuarzo (Reforma)' : 'Polanco';
  
  const subject = `Confirmación de Cita - Capitalta (${codigo_cita})`;
  
  const text = `Hola ${nombre_cliente},\n\nTu cita en Capitalta ha sido confirmada.\n\nDetalles:\n- Fecha: ${fecha}\n- Hora: ${hora}\n- Sucursal: ${sucursalNombre}\n- Código de cita: ${codigo_cita}\n\nTe esperamos en Torre Cuarzo, Piso 33, Av. Paseo de la Reforma 26.\n\nSaludos,\nEquipo Capitalta`;
  
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #008000; text-align: center;">¡Cita Confirmada!</h2>
      <p>Hola <strong>${nombre_cliente}</strong>,</p>
      <p>Tu cita en <strong>Capitalta</strong> ha sido agendada exitosamente. Aquí tienes los detalles:</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Fecha:</strong> ${fecha}</p>
        <p style="margin: 5px 0;"><strong>Hora:</strong> ${hora}</p>
        <p style="margin: 5px 0;"><strong>Sucursal:</strong> ${sucursalNombre}</p>
        <p style="margin: 5px 0;"><strong>Código de seguimiento:</strong> <span style="color: #008000; font-weight: bold;">${codigo_cita}</span></p>
      </div>
      <p><strong>Ubicación:</strong> Torre Cuarzo, Piso 33, Av. Paseo de la Reforma 26, Col. Juárez, CDMX.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #777; text-align: center;">Este es un correo automático, por favor no respondas a este mensaje.</p>
    </div>
  `;

  return sendEmail({ to: email, subject, text, html });
}
