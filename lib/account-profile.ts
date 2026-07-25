import type { SupabaseClient } from '@supabase/supabase-js';

export type AccountProfile = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  gender: string | null;
};

export async function ensureAccountProfile(
  supabase: SupabaseClient,
  user: { id: string; email?: string | null }
): Promise<AccountProfile | null> {
  const email = user.email?.trim().toLowerCase() ?? '';
  if (!email) return null;

  const { data: existing } = await supabase
    .from('profiles')
    .select('id, email, first_name, last_name, avatar_url, gender')
    .eq('id', user.id)
    .maybeSingle();

  if (existing) {
    return existing as AccountProfile;
  }

  const { data: created, error } = await supabase
    .from('profiles')
    .insert({ id: user.id, email })
    .select('id, email, first_name, last_name, avatar_url, gender')
    .single();

  if (error) {
    const { data: fallback } = await supabase
      .from('profiles')
      .select('id, email, first_name, last_name, avatar_url, gender')
      .eq('id', user.id)
      .maybeSingle();

    return (fallback as AccountProfile | null) ?? null;
  }

  return created as AccountProfile;
}

export function profileDisplayName(profile: AccountProfile | null, email?: string | null) {
  const first = profile?.first_name?.trim();
  const last = profile?.last_name?.trim();
  if (first && last) return `${first} ${last}`;
  if (first) return first;
  return email?.trim() || profile?.email || 'Mon compte';
}

export function getAccountInitials(profile: AccountProfile | null, displayName: string): string {
  const first = profile?.first_name?.trim();
  const last = profile?.last_name?.trim();

  if (first || last) {
    if (first && last) {
      return `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase();
    }
    return (first ?? last ?? '').slice(0, 2).toUpperCase();
  }

  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'TM';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

export function safeNextPath(next: string | null | undefined, fallback = '/compte') {
  if (!next) return fallback;
  if (!next.startsWith('/') || next.startsWith('//')) return fallback;
  return next;
}
