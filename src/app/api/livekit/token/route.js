import { AccessToken } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';
import { requireApiUser } from '@/utils/auth/apiGuards';
import { createRateLimiter, rateLimitHeaders } from '@/utils/security/rateLimit';

// Best-effort por usuario (ver nota en src/utils/security/rateLimit.js).
const tokenLimiter = createRateLimiter({ limit: 10, windowMs: 60 * 1000 });

/**
 * GET /api/livekit/token
 * Emite un token de LiveKit SOLO para usuarios con sesión.
 * - La identidad es el id del usuario (no un nombre enviado por el cliente).
 * - La sala es privada del usuario: `capitalta-<userId>` (no se aceptan salas arbitrarias).
 * - Falla cerrado (503) si faltan las credenciales de LiveKit.
 */
export async function GET() {
  const auth = await requireApiUser();
  if (!auth.ok) return auth.response;

  const limit = tokenLimiter.check(`livekit:${auth.user.id}`);
  if (!limit.allowed) {
    return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429, headers: rateLimitHeaders(limit) });
  }

  if (!process.env.LIVEKIT_API_KEY || !process.env.LIVEKIT_API_SECRET || !process.env.LIVEKIT_URL) {
    return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });
  }

  const roomName = `capitalta-${auth.user.id}`;
  const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
    identity: auth.user.id,
    name: auth.user.user_metadata?.full_name || undefined,
    ttl: 15 * 60
  });

  at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });

  return NextResponse.json({
    token: await at.toJwt(),
    url: process.env.LIVEKIT_URL,
    room: roomName
  });
}
