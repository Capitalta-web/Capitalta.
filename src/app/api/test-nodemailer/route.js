import { NextResponse } from 'next/server';
import { sendVerificationCode } from '@/utils/nodemailer';

/**
 * Endpoint para probar el envío de códigos con Nodemailer (Google).
 * GET /api/test-nodemailer
 */
export async function GET() {
  try {
    const testEmail = 'abalderas10@gmail.com';
    const testCode = '999888';

    const result = await sendVerificationCode(testEmail, testCode);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Código de prueba (${testCode}) enviado correctamente a ${testEmail} vía Nodemailer (Google).`,
        id: result.id
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          message: 'No se pudo enviar el correo con Nodemailer. Verifica SMTP_USER y SMTP_PASS en el archivo .env'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error en endpoint de prueba Nodemailer:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}
