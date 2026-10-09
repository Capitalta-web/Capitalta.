import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';
import { sendVerificationCode } from '@/utils/nodemailer';
import { sanitizeUserMetadata } from '@/utils/auth/roles';
import { isValidEmail, maskEmail, normalizeEmail, otpErrorMessage } from '@/utils/security/otp';
import { issueOtp } from '@/utils/security/otpStore';
import { createRateLimiter, getClientIp, rateLimitHeaders } from '@/utils/security/rateLimit';

// Límite best-effort por IP (ver nota en rateLimit.js). El límite fuerte por email está en la base.
const ipLimiter = createRateLimiter({ limit: 5, windowMs: 15 * 60 * 1000 });

/**
 * POST /api/auth/signup
 * 1. Crea el usuario (sin confirmar) con service role. El metadata se filtra: nunca incluye `role`.
 * 2. Genera un código de 6 dígitos (CSPRNG), lo guarda hasheado con expiración e intentos.
 * 3. Lo envía por email. El código NUNCA se loguea ni se devuelve en la respuesta.
 */
export async function POST(request) {
  const limit = ipLimiter.check(`signup:${getClientIp(request)}`);
  if (!limit.allowed) {
    return NextResponse.json({ error: otpErrorMessage('rate_limited') }, { status: 429, headers: rateLimitHeaders(limit) });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const email = normalizeEmail(body?.email);
    const password = typeof body?.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña son requeridos' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 });
    }

    const supabase = createSupabaseServerClient({ admin: true });
    if (!supabase) {
      console.error('[Auth Signup] Supabase (service role) no configurado');
      return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: sanitizeUserMetadata(body?.options?.data)
    });

    if (error || !data?.user) {
      console.error('[Auth Signup] No se pudo crear el usuario:', error?.message);
      return NextResponse.json({ error: 'No se pudo completar el registro. Si ya tienes cuenta, inicia sesión.' }, { status: 400 });
    }

    const otp = await issueOtp(supabase, { email, userId: data.user.id, purpose: 'signup' });
    if (!otp.ok) {
      const status = otp.reason === 'rate_limited' ? 429 : 500;
      return NextResponse.json({ error: otpErrorMessage(otp.reason) }, { status });
    }

    const emailResult = await sendVerificationCode(email, otp.code);
    if (!emailResult.success) {
      console.error('[Auth Signup] Falló el envío del código a', maskEmail(email));
      return NextResponse.json(
        { error: 'Usuario creado pero no se pudo enviar el código de verificación. Intenta nuevamente.', userCreated: true },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado. Verifica tu email para el código de 6 dígitos.',
      email
    });
  } catch (err) {
    console.error('[Auth Signup] Error inesperado:', err?.message || err);
    return NextResponse.json({ error: 'Ocurrió un error inesperado' }, { status: 500 });
  }
}
