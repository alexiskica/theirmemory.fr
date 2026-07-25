import { createBrowserClient } from '@supabase/ssr';
import { getOrgSupabaseConfig } from './org-config';

/**
 * Client navigateur vers le projet theirmemory.org
 * (auth, profiles, diffusion, media_bookmarks).
 */
export function createOrgClient() {
  const { url, key } = getOrgSupabaseConfig();
  return createBrowserClient(url, key);
}
