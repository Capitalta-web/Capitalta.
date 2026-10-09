import {
  DEFAULT_ROLE,
  dashboardPathForRole,
  getAccessRedirect,
  isRoleAllowedForPath,
  normalizeRole,
  requiredRolesForPath,
  resolveRole,
  sanitizeUserMetadata
} from '@/utils/auth/roles';

describe('resolveRole: el rol solo sale de profiles.role', () => {
  it('usa profiles.role cuando es válido', () => {
    expect(resolveRole({ role: 'admin' })).toBe('admin');
    expect(resolveRole({ role: 'analista' })).toBe('analista');
  });

  it('ignora user_metadata.role aunque diga admin', () => {
    const profileSinRol = { role: null, user_metadata: { role: 'admin' } };
    expect(resolveRole(profileSinRol)).toBe('cliente');
  });

  it('ignora el mapeo legado tipo_persona=administrador', () => {
    expect(resolveRole({ tipo_persona: 'administrador' })).toBe('cliente');
  });

  it('sin perfil o con un valor inventado cae en el rol con menos privilegios', () => {
    expect(resolveRole(null)).toBe(DEFAULT_ROLE);
    expect(resolveRole(undefined)).toBe(DEFAULT_ROLE);
    expect(resolveRole({ role: 'superadmin' })).toBe(DEFAULT_ROLE);
    expect(DEFAULT_ROLE).toBe('cliente');
  });

  it('normalizeRole solo acepta roles conocidos', () => {
    expect(normalizeRole(' Admin ')).toBe('admin');
    expect(normalizeRole('root')).toBeNull();
    expect(normalizeRole(42)).toBeNull();
  });
});

describe('control de acceso por ruta', () => {
  it('define los roles requeridos por área', () => {
    expect(requiredRolesForPath('/dashboard/admin/usuarios')).toEqual(['admin']);
    expect(requiredRolesForPath('/dashboard/analista')).toEqual(['analista', 'admin']);
    expect(requiredRolesForPath('/dashboard/notario')).toEqual(['notario', 'admin']);
    expect(requiredRolesForPath('/admin/leads')).toEqual(['admin']);
    expect(requiredRolesForPath('/dashboard/cliente')).toBeNull();
    // No confunde prefijos parecidos
    expect(requiredRolesForPath('/administracion')).toBeNull();
  });

  it('cliente no entra a admin, analista ni notario', () => {
    expect(isRoleAllowedForPath('cliente', '/dashboard/admin')).toBe(false);
    expect(isRoleAllowedForPath('cliente', '/dashboard/analista')).toBe(false);
    expect(isRoleAllowedForPath('cliente', '/dashboard/notario')).toBe(false);
    expect(isRoleAllowedForPath('cliente', '/admin/citas')).toBe(false);
  });

  it('getAccessRedirect falla cerrado', () => {
    expect(getAccessRedirect({ pathname: '/dashboard/admin', user: null, role: null })).toBe('/auth/login');
    expect(getAccessRedirect({ pathname: '/admin/leads', user: null, role: null })).toBe('/auth/login');
    expect(getAccessRedirect({ pathname: '/dashboard/admin', user: { id: 'u' }, role: 'cliente' })).toBe('/dashboard/cliente');
    expect(getAccessRedirect({ pathname: '/dashboard/notario', user: { id: 'u' }, role: 'analista' })).toBe('/dashboard/analista');
    expect(getAccessRedirect({ pathname: '/admin/citas', user: { id: 'u' }, role: 'notario' })).toBe('/dashboard/notario');
    expect(getAccessRedirect({ pathname: '/dashboard/notario', user: { id: 'u' }, role: 'notario' })).toBeNull();
    expect(getAccessRedirect({ pathname: '/dashboard/admin', user: { id: 'u' }, role: 'admin' })).toBeNull();
    expect(getAccessRedirect({ pathname: '/dashboard/cliente', user: { id: 'u' }, role: 'admin' })).toBe('/dashboard/admin');
    expect(getAccessRedirect({ pathname: '/', user: null, role: null })).toBeNull();
  });

  it('dashboardPathForRole', () => {
    expect(dashboardPathForRole('admin')).toBe('/dashboard/admin');
    expect(dashboardPathForRole('desconocido')).toBe('/dashboard/cliente');
  });
});

describe('sanitizeUserMetadata', () => {
  it('elimina role y claves no permitidas', () => {
    const out = sanitizeUserMetadata({ full_name: 'Ana', role: 'admin', is_admin: true, telefono: '55', nested: { role: 'admin' } });
    expect(out).toEqual({ full_name: 'Ana', telefono: '55' });
    expect(out).not.toHaveProperty('role');
  });

  it('tolera entradas inválidas', () => {
    expect(sanitizeUserMetadata(null)).toEqual({});
    expect(sanitizeUserMetadata(['role'])).toEqual({});
  });
});
