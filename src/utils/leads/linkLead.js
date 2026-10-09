import { normalizeEmail } from '@/utils/security/otp';

/**
 * Vinculación de un lead (capturado antes del registro) con la cuenta del usuario.
 * Regla de seguridad: solo se puede vincular un lead cuyo email coincida con el
 * email del usuario de la sesión. Si no coincide, se responde igual que si no
 * existiera (no se revela si el lead existe ni de quién es).
 */

const MAX_DRAFT_KEYS = 30;
const RESERVED_KEYS = new Set(['linked_user_id', 'linked_at', 'source_path']);

/** Deja solo valores primitivos cortos del borrador y nunca campos reservados. */
export function sanitizeDraft(draft) {
  if (!draft || typeof draft !== 'object' || Array.isArray(draft)) return {};
  const out = {};
  for (const [key, value] of Object.entries(draft).slice(0, MAX_DRAFT_KEYS)) {
    if (RESERVED_KEYS.has(key) || !/^[a-zA-Z0-9_]{1,40}$/.test(key)) continue;
    if (value === null || ['number', 'boolean'].includes(typeof value)) out[key] = value;
    else if (typeof value === 'string') out[key] = value.slice(0, 500);
  }
  return out;
}

export function canLinkLead(lead, user) {
  const leadEmail = normalizeEmail(lead?.email);
  const userEmail = normalizeEmail(user?.email);
  return Boolean(leadEmail) && Boolean(userEmail) && leadEmail === userEmail;
}

function mergeNotas(existingNotas, patch) {
  let base = {};
  try {
    base = existingNotas ? JSON.parse(existingNotas) : {};
  } catch {
    base = {};
  }
  if (!base || typeof base !== 'object' || Array.isArray(base)) base = {};
  return JSON.stringify({ ...base, ...patch });
}

function sanitizeSourcePath(value, fallback) {
  return typeof value === 'string' && value.startsWith('/') ? value.slice(0, 200) : fallback;
}

/**
 * @param admin cliente de Supabase con service role
 * @returns {Promise<{ status: number, body: object }>}
 */
export async function linkLeadToUser(admin, { user, leadId, draft, fallbackPath = '/api/leads/link', now = Date.now() }) {
  const email = normalizeEmail(user?.email);
  if (!user?.id || !email) return { status: 400, body: { error: 'Usuario sin email' } };

  const cleanDraft = sanitizeDraft(draft);
  const serverFields = {
    linked_user_id: user.id,
    linked_at: new Date(now).toISOString(),
    source_path: sanitizeSourcePath(draft?.source_path, fallbackPath)
  };

  if (leadId) {
    const { data: existing, error } = await admin.from('leads').select('id, email, notas').eq('id', String(leadId)).maybeSingle();
    if (error || !existing || !canLinkLead(existing, user)) {
      return { status: 404, body: { error: 'Lead no encontrado' } };
    }

    const notas = mergeNotas(existing.notas, { ...cleanDraft, ...serverFields });
    const { data: updated, error: updateError } = await admin
      .from('leads')
      .update({ notas, estado: 'en_proceso' })
      .eq('id', existing.id)
      .select()
      .maybeSingle();
    if (updateError || !updated) return { status: 500, body: { error: 'No se pudo vincular el lead' } };
    return { status: 200, body: { lead: updated } };
  }

  const nombre = String(user.user_metadata?.full_name || user.user_metadata?.nombre_completo || '').trim() || 'Interesado';
  const { data: created, error: createError } = await admin
    .from('leads')
    .insert({
      email,
      nombre: nombre.slice(0, 200),
      apellido: '',
      telefono: user.phone || null,
      origen: typeof cleanDraft.origen === 'string' ? cleanDraft.origen.slice(0, 50) : 'auth',
      estado: 'en_proceso',
      notas: JSON.stringify({ ...cleanDraft, ...serverFields })
    })
    .select()
    .maybeSingle();
  if (createError || !created) return { status: 500, body: { error: 'No se pudo crear el lead' } };
  return { status: 201, body: { lead: created } };
}
