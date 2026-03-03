import nodemailer from 'nodemailer';

/**
 * Utilidad para envío de correos usando SMTP (Google Workspace).
 * Requiere SMTP_USER y SMTP_PASS (App Password) en .env.
 */

/**
 * Envía un correo electrónico genérico.
 */
export async function sendEmail({ to, subject, html, text }) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.error('[Nodemailer Config Error]: Faltan variables SMTP_USER o SMTP_PASS en el entorno.');
    return { success: false, error: 'Configuración SMTP incompleta' };
  }

  // Re-inicializar transporter para asegurar que tome las variables de entorno actuales
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Usamos el correo que sí tenemos controlado en Google Workspace
  const fromEmail = "contacto@capitalta.mx";

  try {
    console.log(`[Nodemailer Attempt]: Enviando a ${to} desde ${fromEmail} (via ${user})...`);
    const info = await transporter.sendMail({
      from: `"Capitalta" <${fromEmail}>`,
      to,
      replyTo: fromEmail,
      subject,
      text: text || '',
      html: html || `<p>${text}</p>`
    });

    console.log('[Nodemailer Success]: Correo enviado con ID:', info.messageId);
    return { success: true, id: info.messageId };
  } catch (error) {
    console.error('[Nodemailer Error Detail]:', error);
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

/**
 * Envía un correo de bienvenida después del registro exitoso.
 */
export async function sendWelcomeEmail(email, nombre) {
  const subject = '¡Bienvenido a Capitalta! Tu cuenta está lista';

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 0;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #008080 0%, #006666 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">¡Bienvenido a Capitalta!</h1>
        <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">Tu solicitud ha sido recibida</p>
      </div>

      <!-- Main Content -->
      <div style="background-color: #ffffff; padding: 40px 30px; border: 1px solid #eee; border-top: none;">
        <p style="color: #333; font-size: 16px; margin: 0 0 20px 0;">Hola <strong>${nombre}</strong>,</p>

        <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
          Tu registro en Capitalta se ha completado exitosamente. Estamos emocionados de acompañarte en tu búsqueda de financiamiento.
        </p>

        <!-- What's Next Section -->
        <div style="background-color: #f0f9f9; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #008080;">
          <h3 style="color: #008080; margin: 0 0 15px 0; font-size: 18px;">¿Qué sigue ahora?</h3>
          <ol style="color: #555; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li><strong>Revisa tu solicitud:</strong> Accede a tu panel de control para verificar los detalles de tu solicitud de crédito.</li>
            <li><strong>Agenda tu cita:</strong> Un asesor de Capitalta se pondrá en contacto contigo para agendar una cita presencial.</li>
            <li><strong>Proporciona documentación:</strong> Durante la cita, presentarás la documentación necesaria según tu tipo de cliente.</li>
            <li><strong>Análisis y aprobación:</strong> Nuestro equipo analizará tu solicitud y te informará del resultado en breve.</li>
          </ol>
        </div>

        <!-- Access Panel Section -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://www.capitalta.mx/dashboard" style="display: inline-block; background-color: #008080; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">
            Acceder a mi Panel de Control
          </a>
        </div>

        <!-- Info Section -->
        <div style="background-color: #fafafa; padding: 20px; border-radius: 6px; margin: 30px 0;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            <strong>¿Necesitas ayuda?</strong> Si tienes preguntas sobre tu solicitud o el proceso, no dudes en contactarnos:
          </p>
          <ul style="color: #666; font-size: 14px; margin: 10px 0 0 20px; padding-left: 0;">
            <li>📧 <strong>Email:</strong> contacto@capitalta.mx</li>
            <li>📞 <strong>Teléfono:</strong> +52 (55) 1234-5678</li>
            <li>⏰ <strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</li>
          </ul>
        </div>

        <!-- Important Notes -->
        <div style="margin: 30px 0; padding: 15px; border: 1px solid #ffc107; border-radius: 6px; background-color: #fffbf0;">
          <p style="color: #856404; font-size: 14px; margin: 0; font-weight: 600;">⚠️ Importante:</p>
          <ul style="color: #856404; font-size: 13px; margin: 8px 0 0 20px; padding-left: 0;">
            <li>Nunca compartiremos tu información con terceros sin tu consentimiento.</li>
            <li>Asegúrate de no compartir tu contraseña con nadie.</li>
            <li>Si recibiste este correo por error, por favor contacta a soporte.</li>
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #eee; border-top: none;">
        <p style="color: #999; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Capitalta. Todos los derechos reservados.<br/>
          <span style="color: #bbb;">Este es un correo automático, por favor no respondas a este mensaje.</span>
        </p>
      </div>
    </div>
  `;

  return sendEmail({ to: email, subject, html });
}
