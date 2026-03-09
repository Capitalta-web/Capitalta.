import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';
import { sendVerificationCode } from '@/utils/nodemailer';

/**
 * Endpoint de signup
 * 1. Crea usuario en Supabase usando admin.createUser (bypass email confirmation default)
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

    // Usar cliente con Service Role Key (Admin)
    const supabase = createSupabaseServerClient();

    if (!supabase) {
      console.error('Supabase server client could not be initialized.');
      return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
    }

    // 1. Crear usuario usando admin.createUser
    // Esto nos permite crear el usuario sin enviar el correo de confirmación de Supabase
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false, // Importante: Usuario no confirmado inicialmente
      user_metadata: options?.data || {}
    });

    if (error) {
      console.error('Supabase Admin Create User Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data.user) {
      console.error('User not created');
      return NextResponse.json({ error: 'No se pudo crear el usuario' }, { status: 400 });
    }

    // 2. Generar código de verificación de 6 dígitos
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    console.log(`[Auth Signup] Enviando código ${verificationCode} a ${email}`);

    // 3. Guardar código en tabla otp_codes (usando supabase server client para bypass RLS si es necesario)
    const { error: otpError } = await supabase.from('otp_codes').insert({
      email,
      code: verificationCode,
      // expires_at: new Date(Date.now() + 10 * 60000).toISOString() // Expiración en 10 min
    });

    if (otpError) {
      console.error('Error saving OTP code:', otpError);
      // Si falla guardar el código, no podemos verificar al usuario, así que es un error crítico
      return NextResponse.json({ error: 'Error interno al generar código de verificación' }, { status: 500 });
    }

    // 4. Enviar código por email
    const emailResult = await sendVerificationCode(email, verificationCode);

    // En desarrollo, permitimos continuar aunque falle el envío de correo
    if (!emailResult.success && process.env.NODE_ENV !== 'development') {
      console.error('Email sending failed:', emailResult.error);
      return NextResponse.json(
        {
          error: 'Usuario creado pero no se pudo enviar el código de verificación. Intenta nuevamente.',
          userCreated: true,
          details: emailResult.error
        },
        { status: 500 }
      );
    } else if (!emailResult.success && process.env.NODE_ENV === 'development') {
      console.warn('[DEV MODE] Email failed but continuing registration flow. OTP:', verificationCode);
    }

    console.log(`[Auth Signup Success] Usuario creado: ${email}, código guardado y enviado exitosamente (o simulado en dev)`);

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado. Verifica tu email para el código de 6 dígitos.',
      user: data.user,
      email: email,
      // En desarrollo, devolvemos el código para facilitar pruebas
      devCode: process.env.NODE_ENV === 'development' ? verificationCode : undefined
    });
  } catch (err) {
    console.error('API Route Error:', err.message || err);
    return NextResponse.json({
      error: 'Ocurrió un error inesperado',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }, { status: 500 });
  }
}
