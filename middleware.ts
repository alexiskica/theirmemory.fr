import { type NextRequest } from 'next/server';
import { updateOrgSession } from '@/utils/supabase/org-middleware';

export async function middleware(request: NextRequest) {
  return updateOrgSession(request);
}

export const config = {
  matcher: [
    '/compte/:path*',
    '/login',
    '/inscription',
    '/mot-de-passe-oublie',
    '/auth/:path*',
  ],
};
