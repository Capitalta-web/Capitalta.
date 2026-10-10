import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { getAccessRedirect, requiresSession, resolveRole } from '@/utils/auth/roles';

/**
 * Refresca la sesión de Supabase y protege las rutas privadas.
 * - /dashboard y /admin exigen sesión.
 * - /admin y /dashboard/admin exigen profiles.role = 'admin' (nunca user_metadata).
 * Falla cerrado: sin configuración de Supabase, las rutas privadas mandan a /auth/login.
 */
export async function updateSession(request) {
  const pathname = request.nextUrl.pathname;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    if (requiresSession(pathname)) return redirectTo(request, '/auth/login');
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      }
    }
  });

  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data?.user || null;
  } catch {
    user = null;
  }

  if (!requiresSession(pathname)) return supabaseResponse;

  let role = null;
  if (user) {
    try {
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
      role = resolveRole(profile);
    } catch {
      role = resolveRole(null);
    }
  }

  const destination = getAccessRedirect({ pathname, user, role });
  if (destination && destination !== pathname) return redirectTo(request, destination, supabaseResponse);

  return supabaseResponse;
}

function redirectTo(request, pathname, sessionResponse) {
  const target = request.nextUrl.clone();
  target.pathname = pathname;
  target.search = '';
  const response = NextResponse.redirect(target);
  // Conserva las cookies de sesión refrescadas.
  sessionResponse?.cookies.getAll().forEach((cookie) => response.cookies.set(cookie));
  return response;
}
