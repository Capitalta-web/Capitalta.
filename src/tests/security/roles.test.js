/**
 * @jest-environment node
 */
import { dashboardForRole, getAccessRedirect, normalizeRole, requiredRolesForPath, resolveRole } from '@/utils/auth/roles';

describe('roles: solo profiles.role', () => {
  it('normaliza y rechaza roles desconocidos', () => {
    expect(normalizeRole(' Admin ')).toBe('admin');
    expect(normalizeRole('analista')).toBeNull();
    expect(normalizeRole(undefined)).toBeNull();
  });

  it('resolveRole ignora todo salvo profile.role y cae a cliente', () => {
    expect(resolveRole({ role: 'admin' })).toBe('admin');
    expect(resolveRole(null)).toBe('cliente');
    expect(resolveRole({ user_metadata: { role: 'admin' } })).toBe('cliente');
  });

  it('rutas de admin', () => {
    expect(requiredRolesForPath('/admin')).toEqual(['admin']);
    expect(requiredRolesForPath('/admin/citas')).toEqual(['admin']);
    expect(requiredRolesForPath('/dashboard/admin/usuarios')).toEqual(['admin']);
    expect(requiredRolesForPath('/administracion')).toBeNull();
    expect(requiredRolesForPath('/dashboard/cliente')).toBeNull();
  });

  it('getAccessRedirect', () => {
    expect(getAccessRedirect({ pathname: '/admin/citas', user: null })).toBe('/auth/login');
    expect(getAccessRedirect({ pathname: '/admin/citas', user: { id: 'u' }, role: 'cliente' })).toBe('/dashboard/cliente');
    expect(getAccessRedirect({ pathname: '/dashboard/cliente', user: { id: 'u' }, role: 'admin' })).toBe('/dashboard/admin');
    expect(getAccessRedirect({ pathname: '/contacto', user: null })).toBeNull();
  });

  it('dashboardForRole', () => {
    expect(dashboardForRole('admin')).toBe('/dashboard/admin');
    expect(dashboardForRole('lo-que-sea')).toBe('/dashboard/cliente');
  });
});
