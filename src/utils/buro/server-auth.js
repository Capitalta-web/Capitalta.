import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createSupabaseServerClient } from '@/utils/supabaseClient';

// Devuelve { user, admin } si el solicitante es admin; si no, { error, status }.
// 'admin' es un cliente Supabase con service_role (solo servidor).
export async function getAdminContext() {
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

  const admin = createSupabaseServerClient({ admin: true });
  const { data: profile } = await admin.from('profiles').select('role').eq('id', user.id).single();

  if (profile?.role !== 'admin') return { error: 'Requiere rol de administrador', status: 403 };

  return { user, admin };
}
