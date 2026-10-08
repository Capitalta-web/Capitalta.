/**
 * Pide al servidor avisar a contacto@capitalta.mx de un registro nuevo para crédito.
 * No se espera la respuesta y nunca lanza error: el registro del usuario no debe depender del aviso.
 * `keepalive` permite que la petición termine aunque la página redirija enseguida.
 */
export function notifyRegistroCredito(userId) {
  if (!userId || typeof window === 'undefined') return;
  try {
    fetch('/api/notify/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId }),
      keepalive: true
    }).catch(() => {});
  } catch {}
}
