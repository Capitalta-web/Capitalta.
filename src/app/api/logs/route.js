import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';

const allowedLevels = new Set(['debug', 'info', 'warn', 'error', 'critical']);

function normalizeLevel(level) {
  const key = String(level || '').toLowerCase();
  return allowedLevels.has(key) ? key : 'info';
}

function truncate(value, max) {
  if (!value) return '';
  const str = String(value);
  return str.length > max ? str.slice(0, max) : str;
}

function toSafeMeta(meta) {
  if (!meta) return null;
  try {
    const json = JSON.stringify(meta);
    return JSON.parse(json);
  } catch {
    return { value: '[unserializable]' };
  }
}

async function saveToChat(payload) {
  const supabase = createSupabaseServerClient({ admin: true });
  if (!supabase) return;

  const sessionId = process.env.LOG_CHAT_SESSION_ID || 'system-logs';
  const maxMessages = Number(process.env.LOG_CHAT_MAX_MESSAGES || 200);
  const message = {
    role: 'assistant',
    content: `[${payload.ts}] ${payload.level.toUpperCase()}${payload.source ? ` [${payload.source}]` : ''} ${payload.message}`
  };

  const { data: existing } = await supabase.from('chat_conversaciones').select('id,mensajes').eq('session_id', sessionId).single();

  const nextHistory = Array.isArray(existing?.mensajes) ? [...existing.mensajes, message] : [message];
  const trimmedHistory = nextHistory.length > maxMessages ? nextHistory.slice(nextHistory.length - maxMessages) : nextHistory;
  const resumen = message.content.slice(0, 100);

  if (existing?.id) {
    await supabase
      .from('chat_conversaciones')
      .update({ mensajes: trimmedHistory, updated_at: new Date().toISOString(), resumen, estado: 'activa' })
      .eq('id', existing.id);
    return;
  }

  await supabase.from('chat_conversaciones').insert({
    session_id: sessionId,
    usuario_id: null,
    mensajes: trimmedHistory,
    resumen,
    estado: 'activa'
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = {
      ts: truncate(body?.ts, 64) || new Date().toISOString(),
      level: normalizeLevel(body?.level),
      source: truncate(body?.source, 80),
      message: truncate(body?.message, 1000),
      meta: toSafeMeta(body?.meta),
      url: truncate(body?.url, 500)
    };

    const line = `[${payload.ts}] ${payload.level.toUpperCase()}${payload.source ? ` [${payload.source}]` : ''} ${payload.message}`;
    if (payload.level === 'debug') console.debug(line, payload.meta);
    else if (payload.level === 'info') console.info(line, payload.meta);
    else if (payload.level === 'warn') console.warn(line, payload.meta);
    else console.error(line, payload.meta);

    const forward = String(process.env.LOG_TO_CHAT || '').toLowerCase() === 'true';
    if (forward && (payload.level === 'error' || payload.level === 'critical')) {
      await saveToChat(payload);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error in /api/logs:', err);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
