'use client';

const levels = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  critical: 50
};

function normalizeLevel(level) {
  if (!level) return 'info';
  const key = String(level).toLowerCase();
  return levels[key] ? key : 'info';
}

function currentThreshold() {
  const envLevel = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_LOG_LEVEL : undefined;
  return levels[normalizeLevel(envLevel)] ?? levels.info;
}

function safeJson(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return '"[unserializable]"';
  }
}

async function forwardToServer(payload) {
  try {
    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: safeJson(payload)
    });
  } catch {}
}

export function createLogger(source) {
  const src = source ? String(source) : undefined;
  const threshold = currentThreshold();

  const emit = async (level, message, meta) => {
    const lvl = normalizeLevel(level);
    if ((levels[lvl] ?? levels.info) < threshold) return;

    const payload = {
      ts: new Date().toISOString(),
      level: lvl,
      source: src,
      message: message ? String(message) : '',
      meta: meta ?? null,
      url: typeof window !== 'undefined' ? window.location.href : null
    };

    const line = `[${payload.ts}] ${payload.level.toUpperCase()}${payload.source ? ` [${payload.source}]` : ''} ${payload.message}`;

    if (payload.level === 'debug') console.debug(line, payload.meta);
    else if (payload.level === 'info') console.info(line, payload.meta);
    else if (payload.level === 'warn') console.warn(line, payload.meta);
    else console.error(line, payload.meta);

    const forwardLevel = normalizeLevel(process.env.NEXT_PUBLIC_LOG_FORWARD_LEVEL || 'error');
    if (typeof window !== 'undefined' && (levels[payload.level] ?? 0) >= (levels[forwardLevel] ?? levels.error)) {
      await forwardToServer(payload);
    }
  };

  return {
    debug: (message, meta) => emit('debug', message, meta),
    info: (message, meta) => emit('info', message, meta),
    warn: (message, meta) => emit('warn', message, meta),
    error: (message, meta) => emit('error', message, meta),
    critical: (message, meta) => emit('critical', message, meta)
  };
}

export const logger = createLogger();

