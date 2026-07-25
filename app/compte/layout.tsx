import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AccountShell from '@/components/account/AccountShell';
import {
  ensureAccountProfile,
  profileDisplayName,
} from '@/lib/account-profile';
import { SITE_URL } from '@/lib/site-config';
import { createOrgServerClient } from '@/utils/supabase/org-server';

export const metadata: Metadata = {
  title: 'Mon espace compte',
  description:
    'Espace personnel Their memory : contenus épinglés et, bientôt, abonnement magazine.',
  alternates: { canonical: `${SITE_URL}/compte` },
  robots: { index: false, follow: true },
};

export default async function CompteLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createOrgServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/compte');
  }

  const profile = await ensureAccountProfile(supabase, user);
  const email = user.email ?? profile?.email ?? '';
  const displayName = profileDisplayName(profile, email);

  return (
    <AccountShell
      displayName={displayName}
      email={email}
      firstName={profile?.first_name ?? null}
      avatarUrl={profile?.avatar_url ?? null}
    >
      {children}
    </AccountShell>
  );
}
