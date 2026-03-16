import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';

export default async function AuthCallbackPage({ searchParams }) {
  // En Next.js 15, searchParams es una Promise y debe ser awaited
  const params = await searchParams;
  const code = params?.code;
  const type = params?.type;
  const errorParam = params?.error;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    redirect('/auth/login?error=supabase_not_configured');
  }

  if (errorParam) {
    redirect(`/auth/login?error=${encodeURIComponent(String(errorParam))}`);
  }

  if (!code) {
    redirect('/auth/login');
  }

  // En Next.js 15, cookies() es asíncrono y debe ser awaited
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
    console.error('Error en callback de auth:', error.message);
    redirect('/auth/login?error=callback_failed');
  }

  if (type === 'recovery') {
    redirect('/auth/update-password');
  }

  redirect('/dashboard');
}
