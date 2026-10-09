/**
 * Acceso a los documentos del expediente (bucket PRIVADO `documentos-credito`).
 *
 * En `documentos.url_archivo` se guarda la RUTA del objeto dentro del bucket
 * (p. ej. "<solicitud_id>/ine_1700000000000_1234.pdf"). Para verlo se genera una
 * signed URL de corta duración; las políticas de Storage deciden quién puede firmarla.
 * Los registros antiguos con URL pública se siguen aceptando (se extrae la ruta).
 */

export const DOCUMENTOS_BUCKET = 'documentos-credito';
export const SIGNED_URL_TTL_SECONDS = 300;

const URL_MARKERS = [
  `/storage/v1/object/public/${DOCUMENTOS_BUCKET}/`,
  `/storage/v1/object/sign/${DOCUMENTOS_BUCKET}/`,
  `/storage/v1/object/authenticated/${DOCUMENTOS_BUCKET}/`
];

/** Convierte una URL (pública/firmada antigua) o una ruta en la ruta del objeto. */
export function extractStoragePath(urlOrPath) {
  if (typeof urlOrPath !== 'string') return null;
  let value = urlOrPath.trim();
  if (!value) return null;

  if (/^https?:\/\//i.test(value)) {
    const marker = URL_MARKERS.find((m) => value.includes(m));
    if (!marker) return null;
    value = value
      .slice(value.indexOf(marker) + marker.length)
      .split('?')[0]
      .split('#')[0];
    try {
      value = decodeURIComponent(value);
    } catch {
      return null;
    }
  }

  value = value.replace(/^\/+/, '');
  if (value.startsWith(`${DOCUMENTOS_BUCKET}/`)) value = value.slice(DOCUMENTOS_BUCKET.length + 1);
  if (!value || value.split('/').some((segment) => segment === '..')) return null;
  return value;
}

/** Ruta de almacenamiento para un archivo nuevo de una solicitud. */
export function buildDocumentoPath(solicitudId, tipoDocumento, fileName, now = Date.now()) {
  const rawExt = String(fileName || '').includes('.') ? String(fileName).split('.').pop() : 'bin';
  const ext =
    rawExt
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 8) || 'bin';
  const tipo = String(tipoDocumento || 'documento').replace(/[^a-zA-Z0-9_-]/g, '_');
  const rand = Math.floor(Math.random() * 10000);
  return `${solicitudId}/${tipo}_${now}_${rand}.${ext}`;
}

/** Genera una signed URL (requiere un cliente de Supabase con la sesión del usuario). */
export async function getSignedDocumentUrl(supabase, urlOrPath, expiresIn = SIGNED_URL_TTL_SECONDS) {
  const path = extractStoragePath(urlOrPath);
  if (!supabase || !path) return null;
  const { data, error } = await supabase.storage.from(DOCUMENTOS_BUCKET).createSignedUrl(path, expiresIn);
  if (error || !data?.signedUrl) return null;
  return data.signedUrl;
}

/**
 * Abre el documento en una pestaña nueva con una signed URL.
 * La pestaña se abre antes del await para que el navegador no la bloquee como popup.
 */
export async function openDocumento(supabase, urlOrPath) {
  const win = typeof window !== 'undefined' ? window.open('', '_blank') : null;
  const signedUrl = await getSignedDocumentUrl(supabase, urlOrPath);
  if (!signedUrl) {
    if (win) win.close();
    return false;
  }
  if (win) {
    win.opener = null;
    win.location.href = signedUrl;
  } else if (typeof window !== 'undefined') {
    window.location.assign(signedUrl);
  }
  return true;
}
