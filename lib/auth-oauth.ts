export function getAuthSiteUrl(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }

  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000';
}

/**
 * Callback OAuth sans query string.
 * Supabase ne matche les Redirect URLs qu'exactement (sauf wildcards).
 */
export function buildAuthCallbackUrl(_next = '/compte'): string {
  return `${getAuthSiteUrl()}/auth/callback`;
}

export const AUTH_NEXT_COOKIE = 'tm_fr_auth_next';

export function safeAuthNextPath(next: string | null | undefined): string {
  if (!next || !next.startsWith('/') || next.startsWith('//')) {
    return '/compte';
  }
  return next;
}
