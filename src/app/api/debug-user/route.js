import { createSupabaseServerClient } from '@/utils/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const supabase = createSupabaseServerClient();

    if (!supabase) {
      return new Response(
        JSON.stringify({ error: 'Supabase client not initialized' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtener sesión
    const { data, error: sessionError } = await supabase.auth.getSession();
    const session = data?.session;
    const authUser = session?.user;

    if (sessionError || !authUser) {
      return new Response(
        JSON.stringify({
          error: 'No authenticated user',
          session_error: sessionError?.message,
          auth: null
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtener profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
    }

    return new Response(
      JSON.stringify({
        status: 'success',
        auth_user: {
          id: authUser.id,
          email: authUser.email,
          role: authUser.user_metadata?.role || 'not-set',
          app_metadata: authUser.app_metadata
        },
        db_profile: profile || { error: profileError?.message },
        combined: {
          id: authUser.id,
          email: authUser.email,
          full_name: profile?.full_name,
          role: profile?.role,
          role_from_auth: authUser.user_metadata?.role,
          role_from_app_metadata: authUser.app_metadata?.role
        },
        debug_info: {
          profile_exists: !!profile,
          has_session: !!session,
          timestamp: new Date().toISOString()
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Debug endpoint error:', err);
    return new Response(
      JSON.stringify({ error: err.message, stack: err.stack }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
