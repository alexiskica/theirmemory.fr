'use server';

import { revalidatePath } from 'next/cache';
import { createOrgServerClient } from '@/utils/supabase/org-server';

export async function removeBookmarkAction(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const supabase = await createOrgServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('media_bookmarks').delete().eq('id', id).eq('user_id', user.id);
  revalidatePath('/compte/epingles');
  revalidatePath('/compte');
}
