import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/utils/nodemailer';

/**
 * API Endpoint para enviar correo de bienvenida después del registro exitoso
 * POST /api/email/welcome
 * Body: { email, nombre }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, nombre } = body;

    // Validación
    if (!email || !nombre) {
      return NextResponse.json(
        { error: 'Email y nombre son requeridos' },
        { status: 400 }
      );
    }

    // Enviar correo de bienvenida
    const result = await sendWelcomeEmail(email, nombre);

    if (!result.success) {
      console.error('Error sending welcome email:', result.error);
      return NextResponse.json(
        { error: 'Error al enviar correo de bienvenida' },
        { status: 500 }
      );
    }

    console.log(`[Welcome Email] Correo de bienvenida enviado a: ${email}`);

    return NextResponse.json({
      success: true,
      message: 'Correo de bienvenida enviado exitosamente'
    });
  } catch (err) {
    console.error('API Route Error:', err.message || err);
    return NextResponse.json(
      {
        error: 'Ocurrió un error inesperado',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      },
      { status: 500 }
    );
  }
}
