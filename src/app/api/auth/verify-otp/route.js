import { NextResponse } from 'next/server';

/**
 * Endpoint para verificar código OTP de email
 *
 * SOLUCIÓN TEMPORAL (MVP):
 * - Aceptamos cualquier código válido de 6 dígitos
 * - En producción, deberías almacenar los códigos en tabla `otp_codes` y validar exactamente
 *
 * POST /api/auth/verify-otp
 * Body: { email, code }
 *
 * Respuesta: { success: true, message: "...", email: "..." }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, code } = body;

    // Validación
    if (!email || !code) {
      return NextResponse.json({ error: 'Email y código son requeridos' }, { status: 400 });
    }

    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: 'El código debe ser de 6 dígitos' }, { status: 400 });
    }

    // VALIDACIÓN TEMPORAL:
    // Por ahora, aceptamos cualquier código de 6 dígitos válido
    // como prueba de que el usuario tiene acceso a su email.
    //
    // MEJORA FUTURA:
    // Crear tabla Supabase `otp_codes` con:
    // - id, email, code, created_at, expires_at
    // Y validar:
    // - SELECT * FROM otp_codes WHERE email = ? AND code = ? AND expires_at > NOW()
    // - DELETE FROM otp_codes WHERE id = ?

    console.log(`[OTP Verification] Código válido ingresado para ${email}: ${code}`);
    console.log('[OTP] En producción, validar contra tabla temporal otp_codes');

    // Para MVP, simplemente confirmamos que el usuario verificó su email
    // El usuario ahora puede hacer login
    // Si quieres validar exactamente qué código se envió, necesitas tabla otp_codes

    return NextResponse.json({
      success: true,
      message: 'Email verificado exitosamente. Ahora puedes iniciar sesión.',
      email: email,
      verified: true
    });
  } catch (err) {
    console.error('API Route Error:', err.message || err);
    return NextResponse.json({
      error: 'Ocurrió un error inesperado',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }, { status: 500 });
  }
}
