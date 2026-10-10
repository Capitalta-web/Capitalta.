import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { normalizeRole } from './roles';
import { getServerAuth } from './serverAuth';

/**
 * Decide (sin efectos) si una petición puede continuar.
 * @returns {null | { status: number, error: string }} null si se permite.
 */
export function evaluateApiAccess({ configured = true, user, role, roles } = {}) {
  if (!configured) return { status: 503, error: 'Servicio no disponible' };
  if (!user) return { status: 401, error: 'No autorizado' };
  if (Array.isArray(roles) && roles.length > 0) {
    const normalized = normalizeRole(role);
    if (!normalized || !roles.includes(normalized)) return { status: 403, error: 'Acceso denegado' };
  }
  return null;
}

/**
 * Exige sesión (y opcionalmente rol) en un route handler.
 * Uso: const auth = await requireApiUser({ roles: ['admin'] }); if (!auth.ok) return auth.response;
 */
export async function requireApiUser({ roles } = {}) {
  const { user, role, configured } = await getServerAuth();
  const denied = evaluateApiAccess({ configured, user, role, roles });
  if (denied) {
    return { ok: false, response: NextResponse.json({ error: denied.error }, { status: denied.status }) };
  }
  return { ok: true, user, role };
}

/** Comparación en tiempo constante de un token compartido. Falla cerrado si falta el esperado o es corto. */
export function isValidSharedToken(provided, expected) {
  if (typeof expected !== 'string' || expected.length < 16) return false;
  if (typeof provided !== 'string') return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
