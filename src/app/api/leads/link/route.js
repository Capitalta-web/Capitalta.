import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createSupabaseServerClient } from '@/utils/supabaseClient';

export async function POST(request) {
  const url = new URL(request.url);
  const cookieStore = await cookies();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ error: 'Supabase no está configurado' }, { status: 500 });
  }

  const supabaseAuth = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      }
    }
  });

  const {
    data: { user }
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const admin = createSupabaseServerClient({ admin: true });
  if (!admin) {
    return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY no configurada' }, { status: 500 });
  }

  const body = await request.json().catch(() => ({}));
  const leadId = body?.lead_id ? String(body.lead_id) : null;
  const draft = body?.draft && typeof body.draft === 'object' ? body.draft : {};

  const normalizeNombre = (value) => {
    const v = String(value || '').trim();
    return v || 'Interesado';
  };

  const toNotas = (existingNotas, patch) => {
    let base = {};
    try {
      base = existingNotas ? JSON.parse(existingNotas) : {};
    } catch {
      base = {};
    }
    return JSON.stringify({ ...base, ...patch });
  };

  if (leadId) {
    const { data: existing, error: existingError } = await admin.from('leads').select('id, notas').eq('id', leadId).single();
    if (existingError || !existing) {
      return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 });
    }

    const notas = toNotas(existing.notas, {
      linked_user_id: user.id,
      linked_at: new Date().toISOString(),
      source_path: draft?.source_path || url.pathname,
      ...draft
    });

    const { data: updated, error: updateError } = await admin
      .from('leads')
      .update({ notas, estado: 'en_proceso' })
      .eq('id', leadId)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ lead: updated }, { status: 200 });
  }

  const email = user.email;
  if (!email) {
    return NextResponse.json({ error: 'Usuario sin email' }, { status: 400 });
  }

  const notas = JSON.stringify({
    linked_user_id: user.id,
    linked_at: new Date().toISOString(),
    source_path: draft?.source_path || url.pathname,
    ...draft
  });

  const { data: created, error: createError } = await admin
    .from('leads')
    .insert({
      email,
      nombre: normalizeNombre(user.user_metadata?.full_name || user.user_metadata?.nombre_completo),
      apellido: '',
      telefono: user.phone || null,
      origen: draft?.origen || 'auth',
      estado: 'en_proceso',
      notas
    })
    .select()
    .single();

  if (createError) {
    return NextResponse.json({ error: createError.message }, { status: 500 });
  }

  return NextResponse.json({ lead: created }, { status: 201 });
}

