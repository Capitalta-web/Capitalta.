/**
 * @jest-environment node
 */
import { evaluateApiAccess, isValidSharedToken } from '@/utils/auth/apiGuards';

jest.mock('@/utils/auth/serverAuth', () => ({ getServerAuth: jest.fn() }));

describe('evaluateApiAccess (falla cerrado)', () => {
  it('sin configuración => 503', () => {
    expect(evaluateApiAccess({ configured: false, user: { id: 'u' }, role: 'admin' })).toEqual({
      status: 503,
      error: 'Servicio no disponible'
    });
  });
  it('sin usuario => 401', () => {
    expect(evaluateApiAccess({ user: null })).toMatchObject({ status: 401 });
  });
  it('rol insuficiente => 403', () => {
    expect(evaluateApiAccess({ user: { id: 'u' }, role: 'cliente', roles: ['admin'] })).toMatchObject({ status: 403 });
    expect(evaluateApiAccess({ user: { id: 'u' }, role: null, roles: ['admin'] })).toMatchObject({ status: 403 });
  });
  it('permitido => null', () => {
    expect(evaluateApiAccess({ user: { id: 'u' }, role: 'admin', roles: ['admin'] })).toBeNull();
    expect(evaluateApiAccess({ user: { id: 'u' }, role: 'cliente' })).toBeNull();
  });
});

describe('isValidSharedToken', () => {
  const token = 'x'.repeat(32);
  it('rechaza si el token esperado no existe o es corto', () => {
    expect(isValidSharedToken(undefined, undefined)).toBe(false);
    expect(isValidSharedToken('', '')).toBe(false);
    expect(isValidSharedToken('abc', 'abc')).toBe(false);
  });
  it('compara exacto', () => {
    expect(isValidSharedToken(token, token)).toBe(true);
    expect(isValidSharedToken(`${token}y`, token)).toBe(false);
    expect(isValidSharedToken(null, token)).toBe(false);
  });
});
