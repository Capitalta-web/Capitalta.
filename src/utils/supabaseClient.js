import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createSupabaseBrowserClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export function createSupabaseServerClient() {
  // Intentar primero con Service Role Key (Admin access, bypass RLS)
  if (supabaseUrl && supabaseServiceRoleKey) {
    return createClient(supabaseUrl, supabaseServiceRoleKey);
  }

  // Fallback a Anon Key (respetando RLS policies)
  // Esto es útil si solo se han configurado las variables públicas
  if (supabaseUrl && supabaseAnonKey) {
    console.warn('Supabase Server Client usando Anon Key. Asegúrate de tener políticas RLS configuradas.');
    return createClient(supabaseUrl, supabaseAnonKey);
  }

  return null;
}
