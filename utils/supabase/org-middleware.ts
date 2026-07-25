import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getOrgSupabaseConfig } from './org-config';

export async function updateOrgSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const { url, key } = getOrgSupabaseConfig();

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAccountRoute = pathname.startsWith('/compte');
  const isAuthRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/inscription') ||
    pathname.startsWith('/mot-de-passe-oublie') ||
    pathname.startsWith('/auth');

  if (!user && isAccountRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('next', `${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && (pathname === '/login' || pathname === '/inscription')) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/compte';
    redirectUrl.search = '';
    return NextResponse.redirect(redirectUrl);
  }

  void isAuthRoute;
  return supabaseResponse;
}
