import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getOrgSupabaseConfig } from './org-config';

export async function createOrgServerClient() {
  const cookieStore = await cookies();
  const { url, key } = getOrgSupabaseConfig();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always set cookies
        }
      },
    },
  });
}
