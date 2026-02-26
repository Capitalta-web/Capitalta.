import nodemailer from 'nodemailer';

/**
 * Utilidad para envío de correos usando SMTP (Google Workspace).
 * Requiere SMTP_USER y SMTP_PASS (App Password) en .env.
 */

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * Envía un correo electrónico genérico.
 */
export async function sendEmail({ to, subject, html, text }) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn('[Nodemailer] SMTP no configurado en .env. El correo no se enviará.');
    console.log('[Mock Email] To:', to, '| Subject:', subject);
    return { success: false, error: 'SMTP no configurado' };
  }

  // Usamos el alias para el remitente si está configurado, si no el usuario principal
  const fromEmail = "capitalta@abdev.click";

  try {
    const info = await transporter.sendMail({
      from: `"Capitalta" <${fromEmail}>`,
      to,
      subject,
      text: text || '',
      html: html || `<p>${text}</p>`,
    });

    console.log('[Nodemailer Success]: Correo enviado id:', info.messageId);
    return { success: true, id: info.messageId };
  } catch (error) {
    console.error('[Nodemailer Error]:', error);
    return { success: false, error: error.message || error };
  }
}

/**
 * Envía un código de verificación de 6 dígitos.
 */
export async function sendVerificationCode(email, code) {
  const subject = `${code} es tu código de verificación de Capitalta`;
  
  const html = `
    <div style="font-family: sans-serif; max-width: 500px; margin: auto; padding: 30px; border: 1px solid #eee; border-radius: 12px; text-align: center;">
      <h2 style="color: #008080; margin-bottom: 20px;">Verifica tu identidad</h2>
      <p style="color: #555; font-size: 16px;">Utiliza el siguiente código para completar tu solicitud en Capitalta:</p>
      <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px; margin: 30px 0; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333;">
        ${code}
      </div>
      <p style="color: #888; font-size: 14px;">Este código expirará en 10 minutos. Si no solicitaste este código, puedes ignorar este correo.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="font-size: 12px; color: #aaa;">© ${new Date().getFullYear()} Capitalta. Todos los derechos reservados.</p>
    </div>
  `;

  return sendEmail({ to: email, subject, html });
}

/**
 * Envía una confirmación de cita.
 */
export async function sendAppointmentConfirmation(cita) {
  const { nombre_cliente, email, fecha, hora, codigo_cita, sucursal_id } = cita;
  const sucursalNombre = sucursal_id === 'reforma' ? 'Torre Cuarzo (Reforma)' : 'Polanco';
  
  const subject = `Confirmación de Cita - Capitalta (${codigo_cita})`;
  
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #008080; text-align: center;">¡Cita Confirmada!</h2>
      <p>Hola <strong>${nombre_cliente}</strong>,</p>
      <p>Tu cita en <strong>Capitalta</strong> ha sido agendada exitosamente. Aquí tienes los detalles:</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Fecha:</strong> ${fecha}</p>
        <p style="margin: 5px 0;"><strong>Hora:</strong> ${hora}</p>
        <p style="margin: 5px 0;"><strong>Sucursal:</strong> ${sucursalNombre}</p>
        <p style="margin: 5px 0;"><strong>Código de seguimiento:</strong> <span style="color: #008080; font-weight: bold;">${codigo_cita}</span></p>
      </div>
      <p><strong>Ubicación:</strong> Torre Cuarzo, Piso 33, Av. Paseo de la Reforma 26, Col. Juárez, CDMX.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #777; text-align: center;">Este es un correo automático, por favor no respondas a este mensaje.</p>
    </div>
  `;

  return sendEmail({ to: email, subject, html });
}
