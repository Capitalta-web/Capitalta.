import { createHash, randomInt, timingSafeEqual } from 'crypto';

/**
 * Lógica pura de los códigos de verificación (OTP) de 6 dígitos.
 * - Se generan con un CSPRNG (crypto.randomInt), no con Math.random.
 * - Se guardan hasheados (SHA-256 con el email y un "pepper" opcional), nunca en claro.
 * - Expiran a los 10 minutos.
 * - Se invalidan tras 5 intentos fallidos.
 * - Nunca se escriben en logs ni se devuelven en respuestas HTTP.
 */

export const OTP_LENGTH = 6;
export const OTP_TTL_MS = 10 * 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;
export const OTP_MAX_SENDS_PER_HOUR = 5;

export function normalizeEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

export function isValidEmail(email) {
  const value = normalizeEmail(email);
  return value.length > 3 && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isWellFormedCode(code) {
  return typeof code === 'string' && /^\d{6}$/.test(code.trim());
}

export function generateOtpCode() {
  return randomInt(0, 10 ** OTP_LENGTH)
    .toString()
    .padStart(OTP_LENGTH, '0');
}

export function hashOtpCode(email, code, pepper = process.env.OTP_PEPPER || '') {
  return createHash('sha256')
    .update(`${normalizeEmail(email)}:${String(code).trim()}:${pepper}`)
    .digest('hex');
}

export function otpExpiresAt(now = Date.now()) {
  return new Date(now + OTP_TTL_MS).toISOString();
}

function safeEqualHex(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a, 'hex'), Buffer.from(b, 'hex'));
  } catch {
    return false;
  }
}

/**
 * Evalúa un intento de verificación contra el registro más reciente.
 * No toca la base de datos: devuelve qué hacer.
 *
 * @returns {{ ok: true } | { ok: false, reason: 'not_found'|'used'|'expired'|'locked'|'mismatch', attempts?: number, invalidate?: boolean }}
 */
export function evaluateOtpAttempt(record, { email, code, now = Date.now(), pepper } = {}) {
  if (!record) return { ok: false, reason: 'not_found' };
  if (record.used) return { ok: false, reason: 'used' };

  const expiresAt = record.expires_at ? new Date(record.expires_at).getTime() : NaN;
  if (!Number.isFinite(expiresAt) || expiresAt <= now) return { ok: false, reason: 'expired', invalidate: true };

  const attempts = Number(record.attempts) || 0;
  if (attempts >= OTP_MAX_ATTEMPTS) return { ok: false, reason: 'locked', attempts, invalidate: true };

  if (!isWellFormedCode(code)) {
    const next = attempts + 1;
    return { ok: false, reason: 'mismatch', attempts: next, invalidate: next >= OTP_MAX_ATTEMPTS };
  }

  const expected = hashOtpCode(email, code, pepper);
  if (safeEqualHex(expected, record.code)) return { ok: true };

  const next = attempts + 1;
  return { ok: false, reason: 'mismatch', attempts: next, invalidate: next >= OTP_MAX_ATTEMPTS };
}

/** Mensaje genérico para el usuario (no revela si el email existe ni cuántos intentos quedan exactamente). */
export function otpErrorMessage(reason) {
  switch (reason) {
    case 'locked':
      return 'Demasiados intentos fallidos. Solicita un nuevo código.';
    case 'rate_limited':
      return 'Has solicitado demasiados códigos. Intenta de nuevo más tarde.';
    default:
      return 'Código inválido o expirado. Solicita un nuevo código.';
  }
}

/** Para logs: ofusca el email (nunca se loguea el código). */
export function maskEmail(email) {
  const value = normalizeEmail(email);
  const [user, domain] = value.split('@');
  if (!user || !domain) return '***';
  return `${user.slice(0, 2)}***@${domain}`;
}
