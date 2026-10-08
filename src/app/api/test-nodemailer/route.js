import { NextResponse } from 'next/server';
import { getAdminContext } from '@/utils/buro/server-auth';
import { sendVerificationCode } from '@/utils/nodemailer';

/**
 * Endpoint para probar el envío de códigos con Nodemailer (Google).
 * GET /api/test-nodemailer
 */
export async function GET(request) {
  // Solo administradores
  const context = await getAdminContext();
  if (context.error) {
    return NextResponse.json({ error: context.error }, { status: context.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const testEmail = searchParams.get('email') || context.user.email;
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
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}
