/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

const mockState = { user: null, profile: null };

jest.mock('@supabase/ssr', () => ({
  createServerClient: jest.fn(() => ({
    auth: { getUser: jest.fn(async () => ({ data: { user: mockState.user }, error: null })) },
    from: jest.fn(() => {
      const q = {
        select: () => q,
        eq: () => q,
        maybeSingle: async () => ({ data: mockState.profile, error: null })
      };
      return q;
    })
  }))
}));

const { updateSession } = require('@/utils/supabase/middleware');

function req(path) {
  return new NextRequest(new URL(path, 'https://capitalta.test'));
}

function location(res) {
  const loc = res.headers.get('location');
  return loc ? new URL(loc).pathname : null;
}

describe('proxy: protección de /dashboard y /admin', () => {
  const OLD = { ...process.env };
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://dummy.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'dummy';
    mockState.user = null;
    mockState.profile = null;
  });
  afterAll(() => {
    process.env = OLD;
  });

  it('sin sesión: /dashboard y /admin (incluido /admin/citas) redirigen a login', async () => {
    expect(location(await updateSession(req('/dashboard/cliente')))).toBe('/auth/login');
    expect(location(await updateSession(req('/admin')))).toBe('/auth/login');
    expect(location(await updateSession(req('/admin/citas')))).toBe('/auth/login');
    expect(location(await updateSession(req('/admin/solicitudes')))).toBe('/auth/login');
  });

  it('user_metadata.role=admin NO da acceso si profiles.role es cliente', async () => {
    mockState.user = { id: 'u', user_metadata: { role: 'admin' } };
    mockState.profile = { role: 'cliente' };
    expect(location(await updateSession(req('/dashboard/admin')))).toBe('/dashboard/cliente');
    expect(location(await updateSession(req('/admin/citas')))).toBe('/dashboard/cliente');
    expect(location(await updateSession(req('/admin/configuracion')))).toBe('/dashboard/cliente');
  });

  it('sin perfil (o rol desconocido) se trata como cliente', async () => {
    mockState.user = { id: 'u', user_metadata: { role: 'admin' } };
    mockState.profile = null;
    expect(location(await updateSession(req('/dashboard/admin')))).toBe('/dashboard/cliente');
    mockState.profile = { role: 'superadmin' };
    expect(location(await updateSession(req('/admin')))).toBe('/dashboard/cliente');
  });

  it('admin real (profiles.role) sí entra, y el cliente entra a su dashboard', async () => {
    mockState.user = { id: 'u' };
    mockState.profile = { role: 'admin' };
    expect(location(await updateSession(req('/dashboard/admin')))).toBeNull();
    expect(location(await updateSession(req('/admin/citas')))).toBeNull();
    mockState.profile = { role: 'cliente' };
    expect(location(await updateSession(req('/dashboard/cliente/solicitudes')))).toBeNull();
  });

  it('las páginas públicas no exigen sesión', async () => {
    expect(location(await updateSession(req('/')))).toBeNull();
    expect(location(await updateSession(req('/productos')))).toBeNull();
    expect(location(await updateSession(req('/administracion-publica')))).toBeNull();
  });

  it('sin configuración de Supabase, las rutas privadas fallan cerrado', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    expect(location(await updateSession(req('/admin/citas')))).toBe('/auth/login');
    expect(location(await updateSession(req('/')))).toBeNull();
  });
});
