'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ensureAccountProfile } from '@/lib/account-profile';
import {
  getNewsletterPreferences,
  saveNewsletterPreferences,
} from '@/lib/newsletter-preferences';
import { createOrgServerClient } from '@/utils/supabase/org-server';

export async function signOutAction() {
  const supabase = await createOrgServerClient();
  await supabase.auth.signOut();
  redirect('/');
}

export async function updateNewsletterPreferencesAction(formData: FormData) {
  const supabase = await createOrgServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { error: 'Session expirée. Reconnectez-vous.' };
  }

  const profile = await ensureAccountProfile(supabase, user);
  const email = profile?.email || user.email;
  const current = await getNewsletterPreferences(supabase, email);

  const checkedListIds = new Set<string>();
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('diffusion_list_') && value === 'on') {
      checkedListIds.add(key.slice('diffusion_list_'.length));
    }
  }

  const result = await saveNewsletterPreferences(supabase, email, current, checkedListIds, {
    firstName: profile?.first_name,
    lastName: profile?.last_name,
  });

  if (!result.ok) {
    return { error: result.error };
  }

  revalidatePath('/compte/parametres/communications');
  revalidatePath('/compte/parametres');
  revalidatePath('/compte');
  return { success: true, message: 'Préférences de communication enregistrées.' };
}
