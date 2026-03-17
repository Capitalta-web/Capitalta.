import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const type = url.searchParams.get('type');
  const errorParam = url.searchParams.get('error');

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.redirect(new URL('/auth/login?error=supabase_not_configured', url.origin));
  }

  if (errorParam) {
    return NextResponse.redirect(new URL(`/auth/login?error=${encodeURIComponent(String(errorParam))}`, url.origin));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/auth/login', url.origin));
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
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

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL('/auth/login?error=callback_failed', url.origin));
  }

  if (type === 'recovery') {
    return NextResponse.redirect(new URL('/auth/update-password', url.origin));
  }

  return NextResponse.redirect(new URL('/dashboard', url.origin));
}

