import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';
import { isValidSharedToken } from '@/utils/auth/apiGuards';
import { isValidEmail, maskEmail, normalizeEmail } from '@/utils/security/otp';

/**
 * Endpoint INTERNO para confirmar el email de un usuario (service role).
 * POST /api/auth/confirm-email  Header: x-internal-token  Body: { email }
 *
 * Falla cerrado: si INTERNAL_API_TOKEN no está configurado (o mide < 16 caracteres)
 * o el header no coincide, responde 401 sin tocar nada. Ya NO acepta ADMIN_CITAS_TOKEN.
 */
export async function POST(request) {
  if (!isValidSharedToken(request.headers.get('x-internal-token'), process.env.INTERNAL_API_TOKEN)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const email = normalizeEmail(body?.email);
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Email es requerido' }, { status: 400 });
    }

    const supabase = createSupabaseServerClient({ admin: true });
    if (!supabase) {
      return NextResponse.json({ error: 'Servicio no disponible' }, { status: 503 });
    }

    const { data: profile } = await supabase.from('profiles').select('id').eq('email', email).maybeSingle();
    let userId = profile?.id || null;

    if (!userId) {
      const { data, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (listError) {
        return NextResponse.json({ error: 'Error al buscar usuario' }, { status: 500 });
      }
      userId = (data?.users || []).find((u) => normalizeEmail(u.email) === email)?.id || null;
    }

    if (!userId) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, { email_confirm: true });
    if (updateError) {
      return NextResponse.json({ error: 'Error al confirmar email' }, { status: 500 });
    }

    console.info('[Confirm Email] Email confirmado para', maskEmail(email));
    return NextResponse.json({ success: true, message: 'Email confirmado exitosamente' });
  } catch (err) {
    console.error('[Confirm Email] Error inesperado:', err?.message || err);
    return NextResponse.json({ error: 'Ocurrió un error inesperado' }, { status: 500 });
  }
}
