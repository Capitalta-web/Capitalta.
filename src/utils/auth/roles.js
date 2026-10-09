/**
 * Modelo de roles de Capitalta.
 *
 * REGLA DE SEGURIDAD: el rol de un usuario SOLO se obtiene de la columna
 * `public.profiles.role` (que el usuario no puede modificar gracias a la
 * migración 20261009000100_roles_seguros.sql). Nunca se deriva de
 * `user_metadata` / `raw_user_meta_data` (los controla el propio usuario con
 * `supabase.auth.signUp({ options: { data } })` o `auth.updateUser`), ni de
 * `tipo_persona` u otras columnas editables.
 *
 * Este módulo es puro (sin dependencias) para poder usarlo en el proxy,
 * en componentes de servidor/cliente y en los tests.
 */

export const ROLES = Object.freeze({
  CLIENTE: 'cliente',
  ANALISTA: 'analista',
  ADMIN: 'admin',
  NOTARIO: 'notario'
});

export const VALID_ROLES = Object.freeze(Object.values(ROLES));

export const DEFAULT_ROLE = ROLES.CLIENTE;

export const STAFF_ROLES = Object.freeze([ROLES.ANALISTA, ROLES.ADMIN]);

/**
 * Áreas protegidas por rol. El orden importa: se usa el primer prefijo que coincide.
 * El admin tiene acceso a todas las áreas internas.
 */
const PROTECTED_AREAS = Object.freeze([
  { prefix: '/dashboard/admin', roles: [ROLES.ADMIN] },
  { prefix: '/dashboard/analista', roles: [ROLES.ANALISTA, ROLES.ADMIN] },
  { prefix: '/dashboard/notario', roles: [ROLES.NOTARIO, ROLES.ADMIN] },
  { prefix: '/admin', roles: [ROLES.ADMIN] }
]);

/** Rutas que exigen sesión iniciada (cualquier rol). */
const SESSION_PREFIXES = Object.freeze(['/dashboard', '/admin']);

function matchesPrefix(pathname, prefix) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/** Devuelve el rol si es uno de los roles válidos; si no, `null`. */
export function normalizeRole(value) {
  if (typeof value !== 'string') return null;
  const role = value.trim().toLowerCase();
  return VALID_ROLES.includes(role) ? role : null;
}

/**
 * Resuelve el rol efectivo a partir de la fila de `profiles`.
 * Cualquier otro origen (user_metadata, tipo_persona...) se ignora a propósito.
 * Si no hay perfil o el valor no es válido, se usa el rol con MENOS privilegios.
 */
export function resolveRole(profile) {
  return normalizeRole(profile?.role) || DEFAULT_ROLE;
}

export function isStaffRole(role) {
  return STAFF_ROLES.includes(normalizeRole(role));
}

export function dashboardPathForRole(role) {
  switch (normalizeRole(role)) {
    case ROLES.ADMIN:
      return '/dashboard/admin';
    case ROLES.ANALISTA:
      return '/dashboard/analista';
    case ROLES.NOTARIO:
      return '/dashboard/notario';
    default:
      return '/dashboard/cliente';
  }
}

export function requiresSession(pathname = '') {
  return SESSION_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix));
}

/** Roles permitidos para una ruta, o `null` si la ruta no está restringida por rol. */
export function requiredRolesForPath(pathname = '') {
  const area = PROTECTED_AREAS.find(({ prefix }) => matchesPrefix(pathname, prefix));
  return area ? [...area.roles] : null;
}

export function isRoleAllowedForPath(role, pathname) {
  const required = requiredRolesForPath(pathname);
  if (!required) return true;
  const normalized = normalizeRole(role);
  return Boolean(normalized) && required.includes(normalized);
}

/**
 * Decide qué hacer con una petición a una ruta protegida.
 * Devuelve `null` si se permite, o la ruta a la que hay que redirigir.
 * Falla cerrado: sin usuario => login; rol no permitido => su propio dashboard.
 */
export function getAccessRedirect({ pathname, user, role }) {
  if (!requiresSession(pathname)) return null;
  if (!user) return '/auth/login';

  if (!isRoleAllowedForPath(role, pathname)) {
    const target = dashboardPathForRole(role);
    // Evita bucles si por algún motivo su dashboard tampoco está permitido.
    return target === pathname ? '/auth/login' : target;
  }

  // El admin no usa el dashboard de cliente.
  if (matchesPrefix(pathname, '/dashboard/cliente') && normalizeRole(role) === ROLES.ADMIN) {
    return '/dashboard/admin';
  }

  return null;
}

/** Claves de metadata que un usuario puede proponer al registrarse. Nada de roles. */
const ALLOWED_METADATA_KEYS = Object.freeze([
  'full_name',
  'nombre_completo',
  'nombre',
  'apellido',
  'telefono',
  'avatar_url',
  'tipo_persona',
  'rfc',
  'razon_social',
  'monto_interes'
]);

/**
 * Filtra el `user_metadata` recibido del cliente: solo deja claves conocidas
 * con valores primitivos. Elimina `role` y cualquier otra clave no prevista.
 */
export function sanitizeUserMetadata(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {};
  const out = {};
  for (const key of ALLOWED_METADATA_KEYS) {
    const value = input[key];
    if (value === undefined || value === null) continue;
    if (['string', 'number', 'boolean'].includes(typeof value)) {
      out[key] = typeof value === 'string' ? value.slice(0, 500) : value;
    }
  }
  return out;
}
