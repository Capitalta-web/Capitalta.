import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { createSupabaseServerClient } from '@/utils/supabaseClient';
import { resolveRole } from './roles';

/**
 * Lee el rol desde `public.profiles.role` (fuente única de verdad).
 * Usa el cliente de service role si está disponible; si no, el del propio usuario (RLS).
 * Ante cualquier error devuelve el rol con menos privilegios ('cliente').
 */
export async function fetchProfileRole(userId, userClient = null) {
  if (!userId) return resolveRole(null);
  const client = createSupabaseServerClient({ admin: true }) || userClient;
  if (!client) return resolveRole(null);
  try {
    const { data, error } = await client.from('profiles').select('role').eq('id', userId).maybeSingle();
    if (error) return resolveRole(null);
    return resolveRole(data);
  } catch {
    return resolveRole(null);
  }
}

/**
 * Sesión del usuario en componentes de servidor y route handlers.
 * Falla cerrado: si falta configuración o la sesión no es válida, `user` es null.
 */
export async function getServerAuth() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return { user: null, role: null, configured: false, supabase: null };

  const cookieStore = await cookies();
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // En Server Components no se pueden escribir cookies; el proxy refresca la sesión.
        }
      }
    }
  });

  try {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser();
    if (error || !user) return { user: null, role: null, configured: true, supabase };
    const role = await fetchProfileRole(user.id, supabase);
    return { user, role, configured: true, supabase };
  } catch {
    return { user: null, role: null, configured: true, supabase };
  }
}

/**
 * Guarda para páginas de servidor (p. ej. /admin/*). Falla cerrado:
 * sin sesión => /auth/login; con sesión pero sin rol permitido => 404.
 * El proxy ya bloquea estas rutas; esto es una segunda capa (defensa en profundidad).
 */
export async function requirePageRole(roles) {
  const { user, role } = await getServerAuth();
  if (!user) redirect('/auth/login');
  if (!Array.isArray(roles) || !roles.includes(role)) notFound();
  return { user, role };
}
