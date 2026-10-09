/**
 * @jest-environment node
 */
import { OTP_MAX_ATTEMPTS, OTP_MAX_SENDS_PER_HOUR, hashOtpCode } from '@/utils/security/otp';
import { issueOtp, verifyOtp } from '@/utils/security/otpStore';
import { createFakeSupabase } from '../helpers/fakeSupabase';

const EMAIL = 'ana@example.com';

describe('otpStore', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    process.env = { ...OLD_ENV, OTP_PEPPER: '' };
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('issueOtp guarda el código hasheado, con expiración y sin el código en claro', async () => {
    const db = createFakeSupabase({ otp_codes: [] });
    const res = await issueOtp(db, { email: 'ANA@example.com', userId: 'u1', purpose: 'signup' });
    expect(res.ok).toBe(true);
    expect(res.code).toMatch(/^\d{6}$/);

    const [row] = db.tables.otp_codes;
    expect(row.email).toBe(EMAIL);
    expect(row.code).toBe(hashOtpCode(EMAIL, res.code, ''));
    expect(row.code).not.toBe(res.code);
    expect(row.attempts).toBe(0);
    expect(new Date(row.expires_at).getTime()).toBeGreaterThan(Date.now());
  });

  it('issueOtp invalida códigos anteriores del mismo email', async () => {
    const db = createFakeSupabase({ otp_codes: [] });
    await issueOtp(db, { email: EMAIL, purpose: 'signup' });
    await issueOtp(db, { email: EMAIL, purpose: 'signup' });
    const vigentes = db.tables.otp_codes.filter((r) => !r.used);
    expect(vigentes).toHaveLength(1);
  });

  it('issueOtp aplica límite de envíos por hora', async () => {
    const db = createFakeSupabase({ otp_codes: [] });
    for (let i = 0; i < OTP_MAX_SENDS_PER_HOUR; i += 1) {
      expect((await issueOtp(db, { email: EMAIL, purpose: 'signup' })).ok).toBe(true);
    }
    expect(await issueOtp(db, { email: EMAIL, purpose: 'signup' })).toEqual({ ok: false, reason: 'rate_limited' });
  });

  it('verifyOtp acepta el código correcto una sola vez', async () => {
    const db = createFakeSupabase({ otp_codes: [] });
    const { code } = await issueOtp(db, { email: EMAIL, userId: 'u1', purpose: 'signup' });
    const ok = await verifyOtp(db, { email: EMAIL, code, purpose: 'signup' });
    expect(ok.ok).toBe(true);
    expect(ok.record.user_id).toBe('u1');
    expect((await verifyOtp(db, { email: EMAIL, code, purpose: 'signup' })).ok).toBe(false);
  });

  it('verifyOtp bloquea tras el máximo de intentos (fuerza bruta)', async () => {
    const db = createFakeSupabase({ otp_codes: [] });
    const { code } = await issueOtp(db, { email: EMAIL, purpose: 'signup' });
    const wrong = code === '000000' ? '111111' : '000000';

    for (let i = 0; i < OTP_MAX_ATTEMPTS; i += 1) {
      const r = await verifyOtp(db, { email: EMAIL, code: wrong, purpose: 'signup' });
      expect(r.ok).toBe(false);
    }
    // Aunque ahora mande el correcto, el código ya quedó invalidado.
    const after = await verifyOtp(db, { email: EMAIL, code, purpose: 'signup' });
    expect(after.ok).toBe(false);
    expect(db.tables.otp_codes[0].used).toBe(true);
    expect(db.tables.otp_codes[0].attempts).toBe(OTP_MAX_ATTEMPTS);
  });

  it('los códigos de un propósito no sirven para otro', async () => {
    const db = createFakeSupabase({ otp_codes: [] });
    const { code } = await issueOtp(db, { email: EMAIL, purpose: 'chat' });
    expect((await verifyOtp(db, { email: EMAIL, code, purpose: 'signup' })).ok).toBe(false);
  });
});
