/**
 * Test Email Endpoint
 * Use this to verify email configuration is working
 */

export async function POST(request) {
  try {
    const { to } = await request.json();

    if (!to) {
      return new Response(
        JSON.stringify({ error: 'Missing email address in "to" field' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Call the send-email endpoint
    const response = await fetch(new URL('/api/notifications/send-email', request.url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: to,
        subject: '🧪 Test Email - Capitalta SMTP Configuration',
        htmlContent: `
          <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
                  <h1 style="margin: 0;">🧪 Email Test Successful!</h1>
                </div>

                <div style="padding: 20px;">
                  <p>¡Felicidades! 🎉</p>

                  <p>Tu configuración de Google Workspace SMTP está funcionando correctamente.</p>

                  <div style="background: #d4edda; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745;">
                    <p style="margin: 0; color: #155724;">
                      ✅ <strong>Email enviado desde:</strong> contacto@capitalta.mx<br>
                      ✅ <strong>SMTP Host:</strong> smtp.gmail.com:587<br>
                      ✅ <strong>Autenticación:</strong> App Password funcionando
                    </p>
                  </div>

                  <p style="margin-top: 20px; font-size: 14px; color: #666;">
                    Puedes proceder con la integración de notificaciones de solicitudes de crédito.
                  </p>

                  <p style="color: #999; font-size: 12px; margin-top: 20px;">
                    Capitalta © ${new Date().getFullYear()}. Todos los derechos reservados.
                  </p>
                </div>
              </div>
            </body>
          </html>
        `
      })
    });

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error in test-email:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
