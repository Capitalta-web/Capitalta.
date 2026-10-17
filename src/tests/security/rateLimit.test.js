/**
 * @jest-environment node
 */
import { createRateLimiter, getClientIp, rateLimitHeaders } from '@/utils/security/rateLimit';

describe('rate limiter en memoria', () => {
  it('permite hasta el límite y luego bloquea dentro de la ventana', () => {
    const rl = createRateLimiter({ limit: 3, windowMs: 1000 });
    const t = 1000000;
    expect(rl.check('ip', t).allowed).toBe(true);
    expect(rl.check('ip', t).allowed).toBe(true);
    expect(rl.check('ip', t).allowed).toBe(true);
    const blocked = rl.check('ip', t + 10);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBe(990);
    expect(rateLimitHeaders(blocked)).toEqual({ 'Retry-After': '1' });
  });

  it('las claves son independientes y la ventana se reinicia', () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(rl.check('a', 0).allowed).toBe(true);
    expect(rl.check('b', 0).allowed).toBe(true);
    expect(rl.check('a', 500).allowed).toBe(false);
    expect(rl.check('a', 1000).allowed).toBe(true);
  });

  it('getClientIp usa x-forwarded-for', () => {
    const req = new Request('https://x.test', { headers: { 'x-forwarded-for': '1.2.3.4, 10.0.0.1' } });
    expect(getClientIp(req)).toBe('1.2.3.4');
    expect(getClientIp(new Request('https://x.test'))).toBe('unknown');
  });
});
