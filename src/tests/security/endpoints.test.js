/**
 * @jest-environment node
 */
import fs from 'fs';
import path from 'path';

jest.mock('@/utils/auth/serverAuth', () => ({ getServerAuth: jest.fn() }));
jest.mock('@/utils/nodemailer', () => ({
  sendVerificationCode: jest.fn().mockResolvedValue({ success: true }),
  sendAppointmentConfirmation: jest.fn()
}));
jest.mock('@/utils/sms', () => ({ sendSMS: jest.fn() }));

const { getServerAuth } = require('@/utils/auth/serverAuth');

const ENV_KEYS = [
  'XAI_API_KEY',
  'OPENAI_API_KEY',
  'LIVEKIT_API_KEY',
  'LIVEKIT_API_SECRET',
  'LIVEKIT_URL',
  'INTERNAL_API_TOKEN',
  'ADMIN_CITAS_TOKEN',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_SUPABASE_URL'
];
const saved = {};

beforeEach(() => {
  ENV_KEYS.forEach((k) => {
    saved[k] = process.env[k];
    delete process.env[k];
  });
  getServerAuth.mockReset();
});
afterEach(() => {
  ENV_KEYS.forEach((k) => {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  });
});

const anon = { user: null, role: null, configured: true };
const cliente = { user: { id: 'u-1', email: 'ana@example.com', user_metadata: { role: 'admin' } }, role: 'cliente', configured: true };

function jsonRequest(url, body, headers = {}) {
  return new Request(url, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
}

describe('endpoint de prueba de correo', () => {
  it('/api/test-nodemailer ya no existe', () => {
    expect(fs.existsSync(path.join(process.cwd(), 'src/app/api/test-nodemailer'))).toBe(false);
  });
});

describe('/api/chat', () => {
  it('sin sesión => 401', async () => {
    getServerAuth.mockResolvedValue(anon);
    process.env.XAI_API_KEY = 'k';
    const { POST } = require('@/app/api/chat/route');
    const res = await POST(jsonRequest('https://x.test/api/chat', { messages: [{ role: 'user', content: 'hola' }] }));
    expect(res.status).toBe(401);
  });

  it('con sesión pero sin API key de IA => 503 (sin modo mock)', async () => {
    getServerAuth.mockResolvedValue(cliente);
    const { POST } = require('@/app/api/chat/route');
    const res = await POST(jsonRequest('https://x.test/api/chat', { messages: [{ role: 'user', content: 'hola' }] }));
    expect(res.status).toBe(503);
  });
});

describe('/api/livekit/token', () => {
  it('sin sesión => 401', async () => {
    getServerAuth.mockResolvedValue(anon);
    process.env.LIVEKIT_API_KEY = 'k';
    process.env.LIVEKIT_API_SECRET = 's'.repeat(32);
    process.env.LIVEKIT_URL = 'wss://lk.test';
    const { GET } = require('@/app/api/livekit/token/route');
    const res = await GET(new Request('https://x.test/api/livekit/token?room=otra&username=admin'));
    expect(res.status).toBe(401);
  });

  it('sin credenciales de LiveKit => 503', async () => {
    getServerAuth.mockResolvedValue(cliente);
    const { GET } = require('@/app/api/livekit/token/route');
    const res = await GET(new Request('https://x.test/api/livekit/token'));
    expect(res.status).toBe(503);
  });

  it('con sesión: sala e identidad salen de la sesión, no del query string', async () => {
    getServerAuth.mockResolvedValue(cliente);
    process.env.LIVEKIT_API_KEY = 'k';
    process.env.LIVEKIT_API_SECRET = 's'.repeat(32);
    process.env.LIVEKIT_URL = 'wss://lk.test';
    const { GET } = require('@/app/api/livekit/token/route');
    const res = await GET(new Request('https://x.test/api/livekit/token?room=sala-ajena&username=admin'));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.room).toBe('capitalta-u-1');
    const payload = JSON.parse(Buffer.from(body.token.split('.')[1], 'base64url').toString());
    expect(payload.sub).toBe('u-1');
    expect(payload.video.room).toBe('capitalta-u-1');
  });
});

describe('/api/auth/confirm-email', () => {
  it('sin INTERNAL_API_TOKEN configurado => 401 aunque manden header (falla cerrado)', async () => {
    const { POST } = require('@/app/api/auth/confirm-email/route');
    const res = await POST(jsonRequest('https://x.test/api/auth/confirm-email', { email: 'a@b.co' }, { 'x-internal-token': 'undefined' }));
    expect(res.status).toBe(401);
  });

  it('ya no acepta ADMIN_CITAS_TOKEN como alternativa', async () => {
    process.env.ADMIN_CITAS_TOKEN = 'c'.repeat(32);
    const { POST } = require('@/app/api/auth/confirm-email/route');
    const res = await POST(
      jsonRequest('https://x.test/api/auth/confirm-email', { email: 'a@b.co' }, { 'x-internal-token': 'c'.repeat(32) })
    );
    expect(res.status).toBe(401);
  });

  it('token incorrecto => 401', async () => {
    process.env.INTERNAL_API_TOKEN = 't'.repeat(32);
    const { POST } = require('@/app/api/auth/confirm-email/route');
    const res = await POST(
      jsonRequest('https://x.test/api/auth/confirm-email', { email: 'a@b.co' }, { 'x-internal-token': 'x'.repeat(32) })
    );
    expect(res.status).toBe(401);
  });
});

describe('/api/auth/verify-otp', () => {
  it('rechaza códigos mal formados', async () => {
    const { POST } = require('@/app/api/auth/verify-otp/route');
    const res = await POST(
      jsonRequest('https://x.test/api/auth/verify-otp', { email: 'a@b.co', code: '12' }, { 'x-forwarded-for': '9.9.9.1' })
    );
    expect(res.status).toBe(400);
  });

  it('sin service role configurado => 503 (no "verifica" nada)', async () => {
    const { POST } = require('@/app/api/auth/verify-otp/route');
    const res = await POST(
      jsonRequest('https://x.test/api/auth/verify-otp', { email: 'a@b.co', code: '123456' }, { 'x-forwarded-for': '9.9.9.2' })
    );
    expect(res.status).toBe(503);
  });

  it('rate limit por IP => 429', async () => {
    const { POST } = require('@/app/api/auth/verify-otp/route');
    let last;
    for (let i = 0; i < 21; i += 1) {
      last = await POST(
        jsonRequest('https://x.test/api/auth/verify-otp', { email: 'a@b.co', code: '12' }, { 'x-forwarded-for': '9.9.9.3' })
      );
    }
    expect(last.status).toBe(429);
  });
});

describe('/api/auth/signup', () => {
  it('nunca devuelve el código y aplica rate limit por IP', async () => {
    const { POST } = require('@/app/api/auth/signup/route');
    const statuses = [];
    for (let i = 0; i < 6; i += 1) {
      const res = await POST(
        jsonRequest(
          'https://x.test/api/auth/signup',
          { email: 'a@b.co', password: 'x'.repeat(10), options: { data: { role: 'admin' } } },
          { 'x-forwarded-for': '9.9.9.4' }
        )
      );
      const body = await res.json();
      expect(body).not.toHaveProperty('devCode');
      statuses.push(res.status);
    }
    expect(statuses[0]).toBe(503); // sin service role configurado
    expect(statuses[5]).toBe(429);
  });
});
