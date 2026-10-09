import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';
import { requireApiUser } from '@/utils/auth/apiGuards';
import { linkLeadToUser } from '@/utils/leads/linkLead';
import { createRateLimiter, rateLimitHeaders } from '@/utils/security/rateLimit';

// Best-effort por usuario (ver nota en src/utils/security/rateLimit.js).
const linkLimiter = createRateLimiter({ limit: 10, windowMs: 60 * 1000 });

/**
 * POST /api/leads/link  Body: { lead_id?, draft? }
 * Vincula el lead capturado antes del registro con la cuenta de la sesión.
 * Solo se puede vincular un lead cuyo email coincida con el del usuario (si no, 404).
 */
export async function POST(request) {
  const auth = await requireApiUser();
  if (!auth.ok) return auth.response;

  const limit = linkLimiter.check(`leads-link:${auth.user.id}`);
  if (!limit.allowed) {
    return NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429, headers: rateLimitHeaders(limit) });
  }

  const admin = createSupabaseServerClient({ admin: true });
  if (!admin) {
    return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  try {
    const result = await linkLeadToUser(admin, {
      user: auth.user,
      leadId: body?.lead_id || null,
      draft: body?.draft,
      fallbackPath: new URL(request.url).pathname
    });
    return NextResponse.json(result.body, { status: result.status });
  } catch (err) {
    console.error('[leads/link]', err?.message || err);
    return NextResponse.json({ error: 'Ocurrió un error inesperado' }, { status: 500 });
  }
}
