import { NextResponse } from 'next/server';
import { ensureAccountProfile } from '@/lib/account-profile';
import { AUTH_NEXT_COOKIE, safeAuthNextPath } from '@/lib/auth-oauth';
import {
  assertVolunteerWorkspaceLoginAllowed,
  linkVolunteerWorkspaceAccount,
  userSignedInWithGoogle,
} from '@/lib/volunteer-workspace';
import { createOrgServerClient } from '@/utils/supabase/org-server';

function readCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  for (const part of cookieHeader.split(';')) {
    const [rawKey, ...rest] = part.trim().split('=');
    if (rawKey === name) {
      try {
        return decodeURIComponent(rest.join('='));
      } catch {
        return rest.join('=');
      }
    }
  }

  return null;
}

function clearAuthNextCookie(response: NextResponse) {
  response.cookies.set(AUTH_NEXT_COOKIE, '', {
    path: '/',
    maxAge: 0,
  });
}

function resolvePostAuthPath(request: Request): string {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('next')) {
    return safeAuthNextPath(searchParams.get('next'));
  }

  return safeAuthNextPath(readCookie(request, AUTH_NEXT_COOKIE));
}

function appOrigin(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (configured) return configured;
  return new URL(request.url).origin;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = resolvePostAuthPath(request);
  const origin = appOrigin(request);

  if (code) {
    const supabase = await createOrgServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        if (userSignedInWithGoogle(user)) {
          const access = await assertVolunteerWorkspaceLoginAllowed(supabase, user);

          if (!access.ok) {
            await supabase.auth.signOut();
            const response = NextResponse.redirect(
              `${origin}/login?error=${encodeURIComponent(access.message)}`
            );
            clearAuthNextCookie(response);
            return response;
          }

          await ensureAccountProfile(supabase, user);
          await linkVolunteerWorkspaceAccount(supabase, user.id, access.member);
        } else {
          await ensureAccountProfile(supabase, user);
        }

        const response = NextResponse.redirect(`${origin}${next}`);
        clearAuthNextCookie(response);
        return response;
      }
    }
  }

  const response = NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent('Authentification échouée.')}`
  );
  clearAuthNextCookie(response);
  return response;
}
