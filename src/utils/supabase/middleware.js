import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request
        });
        cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  if (user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const { data: profile } = await supabase.from('profiles').select('tipo_persona').eq('id', user.id).single();

    const role = profile?.tipo_persona || 'cliente';
    const path = request.nextUrl.pathname;

    if (path.startsWith('/dashboard/admin') && role !== 'administrador') {
      return NextResponse.redirect(new URL('/dashboard/cliente', request.url));
    }
    if (path.startsWith('/dashboard/analista') && role !== 'analista') {
      return NextResponse.redirect(new URL('/dashboard/cliente', request.url));
    }
    if (path.startsWith('/dashboard/cliente') && role === 'administrador') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
  }

  return supabaseResponse;
}
