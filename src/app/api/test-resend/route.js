import { NextResponse } from 'next/server';
import { sendVerificationCode } from '@/utils/resend';

/**
 * Endpoint para probar el envío de códigos con Resend.
 * GET /api/test-resend
 */
export async function GET() {
  try {
    const testEmail = 'abalderas.dev@growthbdm.com';
    const testCode = '123456';

    const result = await sendVerificationCode(testEmail, testCode);

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: `Código de prueba (${testCode}) enviado correctamente a ${testEmail} vía Resend.` 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.error,
        message: 'No se pudo enviar el código con Resend. Verifica tu RESEND_API_KEY en el archivo .env'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error en endpoint de prueba Resend:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
