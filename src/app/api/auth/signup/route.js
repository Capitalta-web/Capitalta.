import { NextResponse } from 'next/server';
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';
import { sendVerificationCode } from '@/utils/nodemailer';

/**
 * Endpoint de signup
 * 1. Crea usuario en Supabase usando signUp() (método público)
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

    // Usar cliente público (no necesita Service Role Key)
    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      console.error('Supabase client could not be initialized on server.');
      return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
    }

    // 1. Crear usuario usando signUp() - método público
    // Nota: signUp() automáticamente establece email_confirm: false (usuario no confirmado)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: options?.data || {}
      }
    });

    if (error) {
      console.error('Supabase Auth Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data.user) {
      console.error('User not created');
      return NextResponse.json({ error: 'No se pudo crear el usuario' }, { status: 400 });
    }

    // 2. Generar código de verificación de 6 dígitos
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    console.log(`[Auth Signup] Enviando código ${verificationCode} a ${email}`);

    // 3. Guardar código en tabla otp_codes (para validar después)
    const { error: otpError } = await supabase.from('otp_codes').insert({
      email,
      code: verificationCode
    });

    if (otpError) {
      console.error('Error saving OTP code:', otpError);
      // Continuamos, no bloqueamos si falla guardar (pero lo ideal es que funcione)
    }

    // 4. Enviar código por email
    const emailResult = await sendVerificationCode(email, verificationCode);

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      // Nota: Usuario fue creado pero no se envió email.
      return NextResponse.json(
        {
          error: 'Usuario creado pero no se pudo enviar el código de verificación. Intenta nuevamente.',
          userCreated: true,
          details: emailResult.error
        },
        { status: 500 }
      );
    }

    console.log(`[Auth Signup Success] Usuario creado: ${email}, código guardado y enviado exitosamente`);

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado. Verifica tu email para el código de 6 dígitos.',
      user: data.user,
      email: email
    });
  } catch (err) {
    console.error('API Route Error:', err.message || err);
    return NextResponse.json({
      error: 'Ocurrió un error inesperado',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }, { status: 500 });
  }
}
