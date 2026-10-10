/**
 * Roles de la aplicación. La ÚNICA fuente de verdad es `public.profiles.role`
 * (protegido en la base por el trigger `prevent_role_change`).
 * Nunca se lee el rol de `user_metadata`: el propio usuario puede escribirlo.
 */
export const ROLES = Object.freeze({ ADMIN: 'admin', CLIENTE: 'cliente' });

const VALID_ROLES = new Set(Object.values(ROLES));

/** Normaliza un valor de rol; devuelve null si no es un rol conocido. */
export function normalizeRole(value) {
  const role = String(value || '')
    .trim()
    .toLowerCase();
  return VALID_ROLES.has(role) ? role : null;
}

/**
 * Rol efectivo a partir de la fila de `profiles` (o null si no existe).
 * Ante cualquier duda devuelve el rol con menos privilegios.
 */
export function resolveRole(profile) {
  return normalizeRole(profile?.role) || ROLES.CLIENTE;
}

/** Roles requeridos por ruta (null = la ruta no exige rol). */
export function requiredRolesForPath(pathname) {
  const path = String(pathname || '');
  if (path === '/admin' || path.startsWith('/admin/')) return [ROLES.ADMIN];
  if (path === '/dashboard/admin' || path.startsWith('/dashboard/admin/')) return [ROLES.ADMIN];
  return null;
}

/** Rutas que exigen sesión iniciada. */
export function requiresSession(pathname) {
  const path = String(pathname || '');
  return ['/dashboard', '/admin'].some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

/**
 * Decide la redirección (o null para continuar) para una ruta protegida.
 * Pura y sin efectos para poder probarla.
 */
export function getAccessRedirect({ pathname, user, role }) {
  if (!requiresSession(pathname)) return null;
  if (!user) return '/auth/login';

  const effectiveRole = normalizeRole(role) || ROLES.CLIENTE;
  const required = requiredRolesForPath(pathname);
  if (required && !required.includes(effectiveRole)) return '/dashboard/cliente';

  if (effectiveRole === ROLES.ADMIN && (pathname === '/dashboard/cliente' || String(pathname).startsWith('/dashboard/cliente/'))) {
    return '/dashboard/admin';
  }
  return null;
}

export function dashboardForRole(role) {
  return normalizeRole(role) === ROLES.ADMIN ? '/dashboard/admin' : '/dashboard/cliente';
}
