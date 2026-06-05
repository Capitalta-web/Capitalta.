import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createSupabaseBrowserClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  // Usamos createBrowserClient de @supabase/ssr para manejar cookies automáticamente
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export function createSupabaseServerClient(options = {}) {
  const admin = Boolean(options?.admin);

  if (!supabaseUrl) return null;

  if (admin) {
    if (!supabaseServiceRoleKey) return null;
    return createClient(supabaseUrl, supabaseServiceRoleKey);
  }

  if (!supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}
