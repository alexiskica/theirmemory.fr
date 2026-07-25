import type { Metadata } from 'next';
import { createOrgServerClient } from '@/utils/supabase/org-server';
import { ensureAccountProfile } from '@/lib/account-profile';
import { getNewsletterPreferences } from '@/lib/newsletter-preferences';
import { SITE_URL } from '@/lib/site-config';
import CommunicationPreferencesForm from './CommunicationPreferencesForm';

export const metadata: Metadata = {
  title: 'Préférences de communication | Mon espace compte',
  alternates: { canonical: `${SITE_URL}/compte/parametres/communications` },
  robots: { index: false, follow: true },
};

export default async function CommunicationsPreferencesPage() {
  const supabase = await createOrgServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;

  const profile = await ensureAccountProfile(supabase, user);
  const preferences = await getNewsletterPreferences(
    supabase,
    profile?.email || user.email
  );

  return <CommunicationPreferencesForm initialPreferences={preferences} />;
}
