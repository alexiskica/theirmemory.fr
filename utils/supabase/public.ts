import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/** Client Supabase sans cookies — pour SSG, sitemap, RSS et lectures publiques */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Supabase env vars are not configured');
  }
  return createSupabaseClient(url, key);
}
