import { NextResponse } from 'next/server';
import { sendAppointmentConfirmation } from '@/utils/email';

/**
 * Endpoint para probar el envío de correos con SendGrid.
 * GET /api/test-email
 */
export async function GET() {
  try {
    const testCita = {
      nombre_cliente: 'Prueba Capitalta',
      email: 'abalderas.dev@growthbdm.com',
      fecha: '2026-03-01',
      hora: '10:00 AM',
      codigo_cita: 'TEST-123',
      sucursal_id: 'reforma'
    };

    const result = await sendAppointmentConfirmation(testCita);

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Correo de prueba enviado correctamente a abalderas.dev@growthbdm.com' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.error,
        message: 'No se pudo enviar el correo. Verifica tu SENDGRID_API_KEY en el archivo .env'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error en endpoint de prueba:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
