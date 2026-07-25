import type { SupabaseClient } from '@supabase/supabase-js';

export const A_LA_UNE_LIST_NAME = 'À la une';

export type NewsletterListPreference = {
  listId: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  subscribed: boolean;
};

type DiffusionListRow = {
  id: string;
  name: string;
  description: string | null;
  is_dynamic: boolean | null;
};

async function getListByName(
  supabase: SupabaseClient,
  name: string
): Promise<DiffusionListRow | null> {
  const { data, error } = await supabase
    .schema('diffusion')
    .from('lists')
    .select('id, name, description, is_dynamic')
    .ilike('name', name)
    .maybeSingle();

  if (error) {
    console.error('getListByName:', error);
    return null;
  }

  return (data as DiffusionListRow | null) ?? null;
}

async function getActiveSubscriberId(
  supabase: SupabaseClient,
  email: string
): Promise<string | null> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;

  const { data, error } = await supabase
    .schema('diffusion')
    .from('subscribers')
    .select('id, status')
    .eq('email', normalized)
    .maybeSingle();

  if (error) {
    console.error('getActiveSubscriberId:', error);
    return null;
  }

  if (!data?.id || data.status === 'unsubscribed') return null;
  return data.id as string;
}

export async function getNewsletterPreferences(
  supabase: SupabaseClient,
  email: string
): Promise<NewsletterListPreference[]> {
  /** Newsletters du site média only — pas Point asso ni les listes association. */
  const mediaLists = [await getListByName(supabase, A_LA_UNE_LIST_NAME)].filter(
    (list): list is DiffusionListRow => Boolean(list)
  );

  if (mediaLists.length === 0) return [];

  const subscriberId = await getActiveSubscriberId(supabase, email);
  const membershipIds = new Set<string>();

  if (subscriberId) {
    const { data: memberships, error } = await supabase
      .schema('diffusion')
      .from('subscriber_lists')
      .select('list_id')
      .eq('subscriber_id', subscriberId)
      .in(
        'list_id',
        mediaLists.map((list) => list.id)
      );

    if (error) {
      console.error('getNewsletterPreferences memberships:', error);
    } else {
      for (const row of memberships ?? []) {
        if (row.list_id) membershipIds.add(row.list_id as string);
      }
    }
  }

  return mediaLists.map((list) => ({
    listId: list.id,
    name: list.name,
    description:
      list.description?.trim() ||
      (list.name.toLowerCase() === A_LA_UNE_LIST_NAME.toLowerCase()
        ? 'Sélection des meilleurs articles, vidéos et podcasts Their memory.'
        : null),
    isSystem: Boolean(list.is_dynamic),
    subscribed: membershipIds.has(list.id),
  }));
}

async function ensureSubscriber(
  supabase: SupabaseClient,
  email: string,
  names?: { firstName?: string | null; lastName?: string | null }
): Promise<{ ok: true; subscriberId: string } | { ok: false; error: string }> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) {
    return { ok: false, error: 'Adresse e-mail manquante.' };
  }

  const { data: created, error: createError } = await supabase
    .schema('diffusion')
    .from('subscribers')
    .insert([
      {
        email: normalized,
        first_name: names?.firstName?.trim() || null,
        last_name: names?.lastName?.trim() || null,
        status: 'subscribed',
      },
    ])
    .select('id')
    .single();

  if (createError?.code === '23505') {
    const { data: existing, error: fetchError } = await supabase
      .schema('diffusion')
      .from('subscribers')
      .select('id')
      .eq('email', normalized)
      .single();

    if (fetchError || !existing?.id) {
      return { ok: false, error: 'Impossible de récupérer votre inscription newsletter.' };
    }

    await supabase
      .schema('diffusion')
      .from('subscribers')
      .update({ status: 'subscribed' })
      .eq('id', existing.id);

    return { ok: true, subscriberId: existing.id as string };
  }

  if (createError) {
    return { ok: false, error: createError.message };
  }

  if (!created?.id) {
    return { ok: false, error: 'Inscription newsletter impossible.' };
  }

  return { ok: true, subscriberId: created.id as string };
}

export async function subscribeToDiffusionList(
  supabase: SupabaseClient,
  listId: string,
  email: string,
  names?: { firstName?: string | null; lastName?: string | null }
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { data: list, error: listError } = await supabase
    .schema('diffusion')
    .from('lists')
    .select('id, is_dynamic')
    .eq('id', listId)
    .maybeSingle();

  if (listError) return { ok: false, error: listError.message };
  if (!list) return { ok: false, error: 'Liste introuvable.' };
  if (list.is_dynamic) {
    return { ok: false, error: 'Cette liste système ne peut pas être modifiée.' };
  }

  const ensured = await ensureSubscriber(supabase, email, names);
  if (!ensured.ok) return ensured;

  const { error: linkError } = await supabase
    .schema('diffusion')
    .from('subscriber_lists')
    .upsert(
      [{ subscriber_id: ensured.subscriberId, list_id: listId }],
      { onConflict: 'subscriber_id,list_id' }
    );

  if (linkError) return { ok: false, error: linkError.message };
  return { ok: true };
}

export async function unsubscribeFromDiffusionList(
  supabase: SupabaseClient,
  listId: string,
  email: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return { ok: true };

  const { data: list, error: listError } = await supabase
    .schema('diffusion')
    .from('lists')
    .select('id, is_dynamic')
    .eq('id', listId)
    .maybeSingle();

  if (listError) return { ok: false, error: listError.message };
  if (!list) return { ok: true };
  if (list.is_dynamic) {
    return { ok: false, error: 'Cette liste système ne peut pas être modifiée.' };
  }

  const { data: subscriber } = await supabase
    .schema('diffusion')
    .from('subscribers')
    .select('id')
    .eq('email', normalized)
    .maybeSingle();

  if (!subscriber?.id) return { ok: true };

  const { error: deleteError } = await supabase
    .schema('diffusion')
    .from('subscriber_lists')
    .delete()
    .eq('list_id', listId)
    .eq('subscriber_id', subscriber.id);

  if (deleteError) return { ok: false, error: deleteError.message };
  return { ok: true };
}

export async function saveNewsletterPreferences(
  supabase: SupabaseClient,
  email: string,
  current: NewsletterListPreference[],
  checkedListIds: Set<string>,
  names?: { firstName?: string | null; lastName?: string | null }
): Promise<{ ok: true } | { ok: false; error: string }> {
  for (const list of current) {
    if (list.isSystem) continue;

    const shouldBeSubscribed = checkedListIds.has(list.listId);

    if (shouldBeSubscribed && !list.subscribed) {
      const result = await subscribeToDiffusionList(supabase, list.listId, email, names);
      if (!result.ok) return result;
      continue;
    }

    if (!shouldBeSubscribed && list.subscribed) {
      const result = await unsubscribeFromDiffusionList(supabase, list.listId, email);
      if (!result.ok) return result;
    }
  }

  return { ok: true };
}
