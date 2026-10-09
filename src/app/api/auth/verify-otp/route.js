import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';
import { isValidEmail, isWellFormedCode, normalizeEmail, otpErrorMessage } from '@/utils/security/otp';
import { verifyOtp } from '@/utils/security/otpStore';
import { createRateLimiter, getClientIp, rateLimitHeaders } from '@/utils/security/rateLimit';

// Best-effort por IP; el bloqueo fuerte (5 intentos por código) vive en la base (otp_codes.attempts).
const ipLimiter = createRateLimiter({ limit: 20, windowMs: 15 * 60 * 1000 });

/**
 * POST /api/auth/verify-otp  Body: { email, code }
 * Verifica el último código vigente del email, con expiración y límite de intentos,
 * y confirma el email del usuario asociado.
 */
export async function POST(request) {
  const limit = ipLimiter.check(`verify:${getClientIp(request)}`);
  if (!limit.allowed) {
    return NextResponse.json({ error: 'Demasiados intentos. Intenta más tarde.' }, { status: 429, headers: rateLimitHeaders(limit) });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const email = normalizeEmail(body?.email);
    const code = typeof body?.code === 'string' ? body.code.trim() : '';

    if (!email || !code) {
      return NextResponse.json({ error: 'Email y código son requeridos' }, { status: 400 });
    }
    if (!isValidEmail(email) || !isWellFormedCode(code)) {
      return NextResponse.json({ error: 'El código debe ser de 6 dígitos' }, { status: 400 });
    }

    const supabase = createSupabaseServerClient({ admin: true });
    if (!supabase) {
      return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });
    }

    const result = await verifyOtp(supabase, { email, code, purpose: 'signup' });
    if (!result.ok) {
      const status = result.reason === 'db_error' ? 500 : result.reason === 'locked' ? 429 : 400;
      return NextResponse.json({ error: otpErrorMessage(result.reason) }, { status });
    }

    const userId = result.record?.user_id;
    if (!userId) {
      return NextResponse.json({ error: otpErrorMessage('not_found') }, { status: 400 });
    }

    const { error: confirmError } = await supabase.auth.admin.updateUserById(userId, { email_confirm: true });
    if (confirmError) {
      console.error('[Verify OTP] No se pudo confirmar el email:', confirmError.message);
      return NextResponse.json({ error: 'No se pudo confirmar el email' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Email verificado exitosamente. Ahora puedes iniciar sesión.',
      email,
      verified: true
    });
  } catch (err) {
    console.error('[Verify OTP] Error inesperado:', err?.message || err);
    return NextResponse.json({ error: 'Ocurrió un error inesperado' }, { status: 500 });
  }
}
