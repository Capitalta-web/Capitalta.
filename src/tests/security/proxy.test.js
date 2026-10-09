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

  it('sin sesión: /dashboard y /admin redirigen a login', async () => {
    expect(location(await updateSession(req('/dashboard/cliente')))).toBe('/auth/login');
    expect(location(await updateSession(req('/admin/leads')))).toBe('/auth/login');
    expect(location(await updateSession(req('/dashboard/notario')))).toBe('/auth/login');
  });

  it('user_metadata.role=admin NO da acceso si profiles.role es cliente', async () => {
    mockState.user = { id: 'u', user_metadata: { role: 'admin' } };
    mockState.profile = { role: 'cliente' };
    expect(location(await updateSession(req('/dashboard/admin')))).toBe('/dashboard/cliente');
    expect(location(await updateSession(req('/admin/citas')))).toBe('/dashboard/cliente');
    expect(location(await updateSession(req('/dashboard/notario')))).toBe('/dashboard/cliente');
  });

  it('sin perfil (o error) se trata como cliente', async () => {
    mockState.user = { id: 'u', user_metadata: { role: 'admin' } };
    mockState.profile = null;
    expect(location(await updateSession(req('/dashboard/analista')))).toBe('/dashboard/cliente');
  });

  it('admin real (profiles.role) sí entra', async () => {
    mockState.user = { id: 'u' };
    mockState.profile = { role: 'admin' };
    expect(location(await updateSession(req('/dashboard/admin')))).toBeNull();
    expect(location(await updateSession(req('/admin/leads')))).toBeNull();
  });

  it('notario entra a su panel', async () => {
    mockState.user = { id: 'u' };
    mockState.profile = { role: 'notario' };
    expect(location(await updateSession(req('/dashboard/notario')))).toBeNull();
  });

  it('rutas públicas no se bloquean', async () => {
    expect(location(await updateSession(req('/')))).toBeNull();
  });

  it('sin variables de Supabase: rutas protegidas fallan cerrado', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    expect(location(await updateSession(req('/dashboard/admin')))).toBe('/auth/login');
    expect(location(await updateSession(req('/')))).toBeNull();
  });
});
