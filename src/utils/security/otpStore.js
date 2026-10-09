import { OTP_MAX_SENDS_PER_HOUR, evaluateOtpAttempt, generateOtpCode, hashOtpCode, normalizeEmail, otpExpiresAt } from './otp';

/**
 * Persistencia de códigos OTP en `public.otp_codes` (requiere la migración
 * supabase/migrations/20261009000200_otp_seguro.sql: columnas `attempts` y `purpose`).
 * Debe usarse SIEMPRE con el cliente de service role (RLS solo permite service_role).
 */

const TABLE = 'otp_codes';

/**
 * Genera y guarda un código nuevo. Invalida los códigos previos del mismo email/propósito
 * y aplica un límite persistente de envíos por hora.
 * @returns {Promise<{ ok: true, code: string } | { ok: false, reason: 'rate_limited'|'db_error' }>}
 */
export async function issueOtp(supabase, { email, userId = null, purpose = 'signup', now = Date.now() }) {
  const normalized = normalizeEmail(email);
  const since = new Date(now - 60 * 60 * 1000).toISOString();

  const { count, error: countError } = await supabase
    .from(TABLE)
    .select('id', { count: 'exact', head: true })
    .eq('email', normalized)
    .eq('purpose', purpose)
    .gte('created_at', since);

  if (countError) return { ok: false, reason: 'db_error' };
  if ((count || 0) >= OTP_MAX_SENDS_PER_HOUR) return { ok: false, reason: 'rate_limited' };

  const nowIso = new Date(now).toISOString();
  const { error: invalidateError } = await supabase
    .from(TABLE)
    .update({ used: true, used_at: nowIso })
    .eq('email', normalized)
    .eq('purpose', purpose)
    .eq('used', false);
  if (invalidateError) return { ok: false, reason: 'db_error' };

  const code = generateOtpCode();
  const { error: insertError } = await supabase.from(TABLE).insert({
    email: normalized,
    user_id: userId,
    purpose,
    code: hashOtpCode(normalized, code),
    attempts: 0,
    used: false,
    expires_at: otpExpiresAt(now)
  });
  if (insertError) return { ok: false, reason: 'db_error' };

  return { ok: true, code };
}

/**
 * Verifica un código contra el último OTP vigente del email/propósito.
 * Cuenta intentos fallidos y bloquea el código al llegar al máximo.
 * @returns {Promise<{ ok: true, record: object } | { ok: false, reason: string }>}
 */
export async function verifyOtp(supabase, { email, code, purpose = 'signup', now = Date.now() }) {
  const normalized = normalizeEmail(email);

  const { data: record, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('email', normalized)
    .eq('purpose', purpose)
    .eq('used', false)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return { ok: false, reason: 'db_error' };

  const result = evaluateOtpAttempt(record, { email: normalized, code, now });
  const nowIso = new Date(now).toISOString();

  if (result.ok) {
    // Marcado condicional (used = false) para que un mismo código no se use dos veces en paralelo.
    const { data: consumed, error: consumeError } = await supabase
      .from(TABLE)
      .update({ used: true, used_at: nowIso })
      .eq('id', record.id)
      .eq('used', false)
      .select('id');
    if (consumeError) return { ok: false, reason: 'db_error' };
    if (Array.isArray(consumed) && consumed.length === 0) return { ok: false, reason: 'used' };
    return { ok: true, record };
  }

  if (record && (result.attempts !== undefined || result.invalidate)) {
    const patch = {};
    if (result.attempts !== undefined) patch.attempts = result.attempts;
    if (result.invalidate) {
      patch.used = true;
      patch.used_at = nowIso;
    }
    await supabase.from(TABLE).update(patch).eq('id', record.id);
  }

  return { ok: false, reason: result.reason };
}
