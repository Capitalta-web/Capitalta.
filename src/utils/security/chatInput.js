export const MAX_CHAT_HISTORY = 30;
export const MAX_CHAT_CONTENT_LENGTH = 4000;

/**
 * Normaliza el historial que manda el navegador al chat:
 * solo mensajes 'user'/'assistant' con texto (descarta 'system'/'tool' inyectados),
 * limita la cantidad de mensajes y su longitud.
 */
export function sanitizeChatMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-MAX_CHAT_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHAT_CONTENT_LENGTH) }));
}
