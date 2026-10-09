/**
 * @jest-environment node
 */
import {
  OTP_MAX_ATTEMPTS,
  OTP_TTL_MS,
  evaluateOtpAttempt,
  generateOtpCode,
  hashOtpCode,
  maskEmail,
  otpExpiresAt
} from '@/utils/security/otp';

const NOW = Date.UTC(2026, 9, 9, 12, 0, 0);
const EMAIL = 'ana@example.com';

function record(overrides = {}) {
  return {
    id: 'r1',
    email: EMAIL,
    code: hashOtpCode(EMAIL, '123456', ''),
    attempts: 0,
    used: false,
    expires_at: new Date(NOW + 60000).toISOString(),
    ...overrides
  };
}

describe('OTP: generación y almacenamiento', () => {
  it('genera 6 dígitos', () => {
    for (let i = 0; i < 50; i += 1) expect(generateOtpCode()).toMatch(/^\d{6}$/);
  });

  it('el hash no contiene el código y depende del email', () => {
    const h = hashOtpCode(EMAIL, '123456', '');
    expect(h).toMatch(/^[a-f0-9]{64}$/);
    expect(h).not.toContain('123456');
    expect(hashOtpCode('otro@example.com', '123456', '')).not.toBe(h);
    expect(hashOtpCode(' ANA@example.com ', '123456', '')).toBe(h);
  });

  it('expira en 10 minutos', () => {
    expect(OTP_TTL_MS).toBe(10 * 60 * 1000);
    expect(new Date(otpExpiresAt(NOW)).getTime()).toBe(NOW + OTP_TTL_MS);
  });

  it('maskEmail no expone el email completo', () => {
    expect(maskEmail('ana.lopez@example.com')).toBe('an***@example.com');
  });
});

describe('OTP: evaluación de intentos', () => {
  it('acepta el código correcto vigente', () => {
    expect(evaluateOtpAttempt(record(), { email: EMAIL, code: '123456', now: NOW, pepper: '' })).toEqual({ ok: true });
  });

  it('rechaza código expirado', () => {
    const r = record({ expires_at: new Date(NOW - 1).toISOString() });
    expect(evaluateOtpAttempt(r, { email: EMAIL, code: '123456', now: NOW, pepper: '' })).toMatchObject({ ok: false, reason: 'expired' });
  });

  it('rechaza código ya usado o inexistente', () => {
    expect(evaluateOtpAttempt(record({ used: true }), { email: EMAIL, code: '123456', now: NOW, pepper: '' }).reason).toBe('used');
    expect(evaluateOtpAttempt(null, { email: EMAIL, code: '123456', now: NOW }).reason).toBe('not_found');
  });

  it('cuenta intentos fallidos e invalida al llegar al máximo', () => {
    const r1 = evaluateOtpAttempt(record({ attempts: 0 }), { email: EMAIL, code: '000000', now: NOW, pepper: '' });
    expect(r1).toEqual({ ok: false, reason: 'mismatch', attempts: 1, invalidate: false });

    const last = evaluateOtpAttempt(record({ attempts: OTP_MAX_ATTEMPTS - 1 }), { email: EMAIL, code: '000000', now: NOW, pepper: '' });
    expect(last).toEqual({ ok: false, reason: 'mismatch', attempts: OTP_MAX_ATTEMPTS, invalidate: true });
  });

  it('bloqueado: ni el código correcto pasa tras agotar intentos', () => {
    const r = record({ attempts: OTP_MAX_ATTEMPTS });
    expect(evaluateOtpAttempt(r, { email: EMAIL, code: '123456', now: NOW, pepper: '' })).toMatchObject({ ok: false, reason: 'locked' });
  });
});
