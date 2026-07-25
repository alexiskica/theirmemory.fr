import { NextResponse } from 'next/server';
import { createOrgServerClient } from '@/utils/supabase/org-server';
import { ensureAccountProfile, safeNextPath } from '@/lib/account-profile';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = safeNextPath(searchParams.get('next'));

  if (code) {
    const supabase = await createOrgServerClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      await ensureAccountProfile(supabase, data.user);
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('Lien de connexion invalide ou expiré.')}`);
}
