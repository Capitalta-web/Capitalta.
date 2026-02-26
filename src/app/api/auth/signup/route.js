import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';
import { sendVerificationCode } from '@/utils/nodemailer';

/**
 * Endpoint de signup
 * 1. Crea usuario en Supabase (email_confirm: false)
 * 2. Genera código de verificación de 6 dígitos
 * 3. Envía código por email con Nodemailer
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, options } = body;

    // Validación
    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña son requeridos' }, { status: 400 });
    }

    const supabase = createSupabaseServerClient();

    if (!supabase) {
      console.error('Supabase client could not be initialized on server.');
      return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
    }

    // 1. Crear usuario SIN confirmar email
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: options?.data,
      email_confirm: false // Usuario debe verificar email
    });

    if (error) {
      console.error('Supabase Auth Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 2. Generar código de verificación de 6 dígitos
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Enviar código por email
    const emailResult = await sendVerificationCode(email, verificationCode);

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      // Nota: Usuario fue creado pero no se envió email.
      // Podríamos borrarlo aquí o dejar que intente verificar después.
      return NextResponse.json(
        {
          error: 'Usuario creado pero no se pudo enviar el código de verificación. Intenta nuevamente.',
          userCreated: true
        },
        { status: 500 }
      );
    }

    console.log(`[Auth Signup] Usuario creado: ${email}, código enviado: ${verificationCode}`);

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado. Verifica tu email para el código de 6 dígitos.',
      user: data.user,
      email: email
    });
  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: 'Ocurrió un error inesperado' }, { status: 500 });
  }
}
