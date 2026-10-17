/**
 * @jest-environment node
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '../../..');
const exists = (p) => fs.existsSync(path.join(root, p));

describe('endpoints rotos o abiertos eliminados', () => {
  it.each([
    'src/app/api/debug-user/route.js',
    'src/app/api/auth/register-full/route.js',
    'src/app/api/chat/route.js',
    'src/app/api/logs/route.js',
    'src/app/api/livekit/token/route.js',
    'src/app/api/test-nodemailer/route.js',
    'src/app/api/storage/ensure-bucket/route.js',
    'src/app/admin/leads/page.jsx',
    'src/app/test-supabase/page.jsx',
    'src/app/auth/registro/actions.js',
    'src/utils/storage.js'
  ])('%s ya no existe', (p) => {
    expect(exists(p)).toBe(false);
  });

  it('ningún código de la app usa tablas o buckets inexistentes', () => {
    const offenders = [];
    const walk = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name !== 'tests') walk(full);
        } else if (/\.(js|jsx|mjs)$/.test(entry.name)) {
          const src = fs.readFileSync(full, 'utf8');
          if (/solicitudes_credito|chat_conversaciones|temp_verification_codes|documentos-credito/.test(src)) offenders.push(full);
        }
      }
    };
    walk(path.join(root, 'src'));
    expect(offenders).toEqual([]);
  });

  it('SMTP valida el certificado TLS', () => {
    const src = fs.readFileSync(path.join(root, 'src/utils/nodemailer.js'), 'utf8');
    expect(src).not.toMatch(/rejectUnauthorized:\s*false/);
  });
});

describe('/api/auth/confirm-email falla cerrado', () => {
  const OLD = { ...process.env };
  afterEach(() => {
    process.env = { ...OLD };
    jest.resetModules();
  });

  const call = async (headers = {}) => {
    const { POST } = require('@/app/api/auth/confirm-email/route');
    return POST(
      new Request('https://x.test/api/auth/confirm-email', {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...headers },
        body: JSON.stringify({ email: 'a@b.com' })
      })
    );
  };

  it('sin INTERNAL_API_TOKEN configurado responde 401 aunque no se mande token', async () => {
    delete process.env.INTERNAL_API_TOKEN;
    process.env.ADMIN_CITAS_TOKEN = 'y'.repeat(32);
    expect((await call()).status).toBe(401);
    expect((await call({ 'x-internal-token': 'y'.repeat(32) })).status).toBe(401);
  });

  it('con token incorrecto responde 401', async () => {
    process.env.INTERNAL_API_TOKEN = 'z'.repeat(32);
    expect((await call({ 'x-internal-token': 'w'.repeat(32) })).status).toBe(401);
  });
});

describe('/api/admin/* y /api/leads/link exigen sesión', () => {
  it('leads/link sin sesión => 401', async () => {
    jest.doMock('@/utils/auth/serverAuth', () => ({
      getServerAuth: jest.fn(async () => ({ user: null, role: null, configured: true }))
    }));
    const { POST } = require('@/app/api/leads/link/route');
    const res = await POST(new Request('https://x.test/api/leads/link', { method: 'POST', body: '{}' }));
    expect(res.status).toBe(401);
  });
});
