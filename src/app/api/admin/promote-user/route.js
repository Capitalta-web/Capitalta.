import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getAdminContext } from '@/utils/buro/server-auth';

const VALID_ROLES = ['cliente', 'admin'];

// POST { userId, newRole, password }
// Cambia el rol de un usuario. Requiere re-confirmar la contraseña del admin.
export async function POST(request) {
  try {
    const ctx = await getAdminContext();
    if (ctx.error) return NextResponse.json({ error: ctx.error }, { status: ctx.status });

    const body = await request.json();
    const userId = body?.userId;
    const newRole = body?.newRole;
    const password = body?.password;

    if (!userId || !VALID_ROLES.includes(newRole)) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json({ error: 'Debes confirmar tu contraseña' }, { status: 400 });
    }

    // Re-verificar la contraseña del admin que ejecuta la acción
    const verifier = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      auth: { persistSession: false }
    });
    const { error: pwErr } = await verifier.auth.signInWithPassword({ email: ctx.user.email, password });
    if (pwErr) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // No permitir que el admin se quite el rol a sí mismo (evita quedarse sin admins por error)
    if (userId === ctx.user.id && newRole !== 'admin') {
      return NextResponse.json({ error: 'No puedes quitarte el rol de admin a ti mismo' }, { status: 400 });
    }

    const { error: updErr } = await ctx.admin
      .from('profiles')
      .update({ role: newRole, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (updErr) throw updErr;

    return NextResponse.json({ ok: true, role: newRole });
  } catch (err) {
    return NextResponse.json({ error: err?.message || 'Error' }, { status: 500 });
  }
}
