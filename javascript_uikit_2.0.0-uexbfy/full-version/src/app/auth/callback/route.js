import { createSupabaseServerClient } from '@/utils/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = createSupabaseServerClient();
    if (!supabase) {
      return NextResponse.redirect(new URL('/auth/login?error=config', request.url));
    }

    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(new URL('/auth/login?error=callback', request.url));
    }
  }

  return NextResponse.redirect(new URL('/mi-cuenta/citas', request.url));
}
