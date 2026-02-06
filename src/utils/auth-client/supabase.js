// @third-party
import { createClient } from '@supabase/supabase-js';

/***************************  AUTH CLIENT - SUPABASE  ***************************/

export function createSupabaseClient() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  } else {
    console.error('[Supabase] Missing environment variables. Client not configured.');
    return {};
  }
}
