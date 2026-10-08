import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createSupabaseServerClient } from '@/utils/supabaseClient';

// Devuelve { user, admin } si hay sesión iniciada; si no, { error, status }.
// 'admin' es un cliente Supabase con service_role (solo servidor).
export async function getUserContext() {
  const cookieStore = await cookies();
  const supabaseAuth = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {}
    }
  });

  const {
    data: { user }
  } = await supabaseAuth.auth.getUser();

  if (!user) return { error: 'No autorizado', status: 401 };

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { error: 'Servidor sin configurar (service role)', status: 500 };
  }

  return { user, admin: createSupabaseServerClient({ admin: true }) };
}

// Igual que getUserContext, pero además exige rol de administrador.
export async function getAdminContext() {
  const context = await getUserContext();
  if (context.error) return context;

  const { data: profile } = await context.admin.from('profiles').select('role').eq('id', context.user.id).single();

  if (profile?.role !== 'admin') return { error: 'Requiere rol de administrador', status: 403 };

  return context;
}
