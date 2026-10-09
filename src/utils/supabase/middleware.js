import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { getAccessRedirect, requiresSession, resolveRole } from '@/utils/auth/roles';

function redirectTo(request, pathname) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = '';
  return NextResponse.redirect(url);
}

/**
 * Refresca la sesión de Supabase y protege /dashboard/* y /admin/*.
 * Falla cerrado: si falta configuración, no hay sesión o el rol no alcanza,
 * se redirige (nunca se deja pasar). El rol se lee SOLO de public.profiles.role.
 */
export async function updateSession(request) {
  const pathname = request.nextUrl.pathname;
  const isProtected = requiresSession(pathname);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return isProtected ? redirectTo(request, '/auth/login') : NextResponse.next({ request });
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

  if (!isProtected) return supabaseResponse;

  let role = null;
  if (user) {
    try {
      const { data: profile, error } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
      role = resolveRole(error ? null : profile);
    } catch {
      role = resolveRole(null);
    }
  }

  const target = getAccessRedirect({ pathname, user, role });
  if (target) {
    const response = redirectTo(request, target);
    // Conserva las cookies de sesión refrescadas.
    supabaseResponse.cookies.getAll().forEach((cookie) => response.cookies.set(cookie));
    return response;
  }

  return supabaseResponse;
}
