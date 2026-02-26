import twilio from 'twilio';

/**
 * Utilidad para envío de SMS y mensajes de WhatsApp usando Twilio.
 * Requiere TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN y TWILIO_PHONE_NUMBER en .env.
 */

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

let client;
if (accountSid && authToken) {
  client = twilio(accountSid, authToken);
}

/**
 * Envía un mensaje SMS.
 * @param {Object} options - Opciones del mensaje.
 * @param {string} options.to - Destinatario (formato E.164, ej: +521234567890).
 * @param {string} options.body - Contenido del mensaje.
 */
export async function sendSMS({ to, body }) {
  if (!client || !fromPhone) {
    console.warn('[Twilio] Cliente o número de origen no configurado. El SMS no se enviará.');
    console.log('[Mock SMS] To:', to, '| Body:', body);
    return { success: false, error: 'Twilio no configurado' };
  }

  try {
    const message = await client.messages.create({
      body,
      from: fromPhone,
      to
    });
    console.log('[Twilio] SMS enviado exitosamente a:', to, '| SID:', message.sid);
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error('[Twilio] Error al enviar SMS:', error);
    return { success: false, error };
  }
}

/**
 * Envía un mensaje de WhatsApp (requiere aprobación previa de plantilla en Twilio).
 * @param {Object} options - Opciones del mensaje.
 * @param {string} options.to - Destinatario (ej: +521234567890).
 * @param {string} options.body - Contenido del mensaje.
 */
export async function sendWhatsApp({ to, body }) {
  if (!client) {
    console.warn('[Twilio] Cliente no configurado. El WhatsApp no se enviará.');
    return { success: false, error: 'Twilio no configurado' };
  }

  // El número de origen de WhatsApp en Twilio suele tener el prefijo 'whatsapp:'
  const fromWhatsApp = fromPhone.startsWith('whatsapp:') ? fromPhone : `whatsapp:${fromPhone}`;
  const toWhatsApp = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;

  try {
    const message = await client.messages.create({
      body,
      from: fromWhatsApp,
      to: toWhatsApp
    });
    console.log('[Twilio] WhatsApp enviado exitosamente a:', to, '| SID:', message.sid);
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error('[Twilio] Error al enviar WhatsApp:', error);
    return { success: false, error };
  }
}
