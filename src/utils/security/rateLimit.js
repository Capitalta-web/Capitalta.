/**
 * Rate limiting simple en memoria (ventana fija), sin servicios externos.
 *
 * LIMITACIÓN: en Vercel cada instancia serverless tiene su propia memoria y se
 * recicla, así que este límite es "best effort" (frena abuso casual y ráfagas
 * contra una misma instancia). Si se necesita un límite global estricto, migrar a una tabla/función en
 * Supabase o a un KV (Upstash, Vercel KV).
 */

export function createRateLimiter({ limit, windowMs, maxKeys = 10000 }) {
  if (!Number.isFinite(limit) || limit <= 0) throw new Error('limit inválido');
  if (!Number.isFinite(windowMs) || windowMs <= 0) throw new Error('windowMs inválido');

  const buckets = new Map();

  function prune(now) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
    // Si aún hay demasiadas claves, descarta las más antiguas.
    while (buckets.size > maxKeys) {
      const oldest = buckets.keys().next().value;
      buckets.delete(oldest);
    }
  }

  function check(key, now = Date.now()) {
    const k = String(key || 'anon');
    let bucket = buckets.get(k);
    if (!bucket || bucket.resetAt <= now) {
      if (buckets.size >= maxKeys) prune(now);
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(k, bucket);
    }
    bucket.count += 1;
    const allowed = bucket.count <= limit;
    return {
      allowed,
      remaining: Math.max(0, limit - bucket.count),
      retryAfterMs: allowed ? 0 : bucket.resetAt - now
    };
  }

  function reset() {
    buckets.clear();
  }

  return { check, reset };
}

/** IP del cliente según los encabezados que pone Vercel / el proxy. */
export function getClientIp(request) {
  const headers = request?.headers;
  if (!headers || typeof headers.get !== 'function') return 'unknown';
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim() || 'unknown';
  return headers.get('x-real-ip') || 'unknown';
}

/** Cabeceras estándar para respuestas 429. */
export function rateLimitHeaders(result) {
  return { 'Retry-After': String(Math.max(1, Math.ceil((result?.retryAfterMs || 0) / 1000))) };
}
