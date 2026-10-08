import { createSupabaseServerClient } from '@/utils/supabaseClient';

export async function POST(request) {
  try {
    const supabase = createSupabaseServerClient();

    if (!supabase) {
      return new Response(
        JSON.stringify({ error: 'Supabase not initialized' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Signed out successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Sign out error:', err);
    return new Response(
      JSON.stringify({
        error: err?.message || 'Failed to sign out',
        code: err?.code || 'UNKNOWN_ERROR'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
