import { createBrowserClient } from '@supabase/ssr';

/**
 * Client navigateur vers le projet theirmemory.org (diffusion / newsletters).
 * Les listes « Point asso », « À la une », etc. vivent dans ce projet.
 */
export function createOrgClient() {
  const url =
    process.env.NEXT_PUBLIC_ORG_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_ORG_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Org Supabase is not configured');
  }

  return createBrowserClient(url, key);
}
