/**
 * Email Notification Service
 * Handles sending notification emails to admin
 */

export async function sendAdminNotificationEmail({
  subject,
  htmlContent,
  adminEmail = 'contacto@capitalta.mx'
}) {
  try {
    const response = await fetch('/api/notifications/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: adminEmail,
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Email notification error:', error);
    throw error;
  }
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0
  }).format(value);
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Email templates
export const emailTemplates = {
  newSolicitud: ({ clienteNombre, clienteEmail, monto, plazo, tipo }) => {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">🆕 Nueva Solicitud de Crédito</h1>
            </div>

            <div style="padding: 20px;">
              <p>Se ha registrado una nueva solicitud de crédito que requiere tu revisión.</p>

              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Cliente:</strong> ${clienteNombre}</p>
                <p><strong>Email:</strong> ${clienteEmail}</p>
                <p><strong>Monto Solicitado:</strong> ${formatCurrency(monto)}</p>
                <p><strong>Plazo:</strong> ${plazo} meses</p>
                <p><strong>Tipo:</strong> ${tipo}</p>
              </div>

              <p style="margin-top: 20px;">
                <a href="https://capitalta.mx/admin/solicitudes" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Ver en Dashboard
                </a>
              </p>

              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                Capitalta © ${new Date().getFullYear()}. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  },

  documentoUpload: ({ clienteNombre, documentoTipo, solicitudId }) => {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">📄 Documento Cargado</h1>
            </div>

            <div style="padding: 20px;">
              <p>${clienteNombre} ha cargado un documento en su solicitud.</p>

              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Cliente:</strong> ${clienteNombre}</p>
                <p><strong>Tipo de Documento:</strong> ${documentoTipo}</p>
                <p><strong>Fecha:</strong> ${formatDate(new Date())}</p>
              </div>

              <p style="margin-top: 20px;">
                <a href="https://capitalta.mx/admin/solicitudes?id=${solicitudId}" style="background: #f5576c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Ver Solicitud
                </a>
              </p>

              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                Capitalta © ${new Date().getFullYear()}. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  },

  statusChanged: ({ solicitudId, clienteNombre, newStatus, notes }) => {
    const statusLabels = {
      'pendiente': '⏳ Pendiente',
      'en-revision': '🔍 En Revisión',
      'aprobada': '✅ Aprobada',
      'rechazada': '❌ Rechazada',
      'activo': '✅ Activo',
      'cerrado': '📊 Cerrado'
    };

    return `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">📝 Estado de Solicitud Actualizado</h1>
            </div>

            <div style="padding: 20px;">
              <p>Has actualizado el estado de una solicitud de crédito.</p>

              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Solicitud ID:</strong> ${solicitudId.slice(0, 8)}</p>
                <p><strong>Cliente:</strong> ${clienteNombre}</p>
                <p><strong>Nuevo Estado:</strong> ${statusLabels[newStatus] || newStatus}</p>
                ${notes ? `<p><strong>Notas:</strong> ${notes}</p>` : ''}
                <p><strong>Actualizado:</strong> ${formatDate(new Date())}</p>
              </div>

              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                Capitalta © ${new Date().getFullYear()}. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  },

  dailySummary: ({ pendientes, aprobadas, rechazadas, totalMonto }) => {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">📊 Resumen Diario</h1>
            </div>

            <div style="padding: 20px;">
              <p style="font-size: 14px;">Resumen de solicitudes del ${new Date().toLocaleDateString('es-MX')}</p>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0;">
                <div style="background: #fff3cd; padding: 15px; border-radius: 5px;">
                  <p style="margin: 0; font-size: 12px; color: #856404;">Pendientes</p>
                  <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #856404;">${pendientes}</p>
                </div>
                <div style="background: #d4edda; padding: 15px; border-radius: 5px;">
                  <p style="margin: 0; font-size: 12px; color: #155724;">Aprobadas</p>
                  <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #155724;">${aprobadas}</p>
                </div>
              </div>

              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Rechazadas:</strong> ${rechazadas}</p>
                <p><strong>Monto Total Solicitado:</strong> ${formatCurrency(totalMonto)}</p>
              </div>

              <p style="margin-top: 20px;">
                <a href="https://capitalta.mx/admin" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Ir al Dashboard
                </a>
              </p>

              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                Capitalta © ${new Date().getFullYear()}. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  },

  weeklySummary: ({ totalSolicitudes, aprobadas, tasaAprobacion, totalClientes }) => {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">📈 Resumen Semanal</h1>
            </div>

            <div style="padding: 20px;">
              <p style="font-size: 14px;">Resumen de la semana ${new Date().toLocaleDateString('es-MX')}</p>

              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Total de Solicitudes:</strong> ${totalSolicitudes}</p>
                <p><strong>Solicitudes Aprobadas:</strong> ${aprobadas}</p>
                <p><strong>Tasa de Aprobación:</strong> ${tasaAprobacion}%</p>
                <p><strong>Clientes Registrados:</strong> ${totalClientes}</p>
              </div>

              <p style="margin-top: 20px;">
                <a href="https://capitalta.mx/admin" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Ver Reportes Detallados
                </a>
              </p>

              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                Capitalta © ${new Date().getFullYear()}. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
};
