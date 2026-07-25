import type { Metadata } from 'next';
import { createOrgServerClient } from '@/utils/supabase/org-server';
import type { MediaBookmark } from '@/lib/bookmarks';
import { SITE_URL } from '@/lib/site-config';
import EpinglesClient from './EpinglesClient';

export const metadata: Metadata = {
  title: 'Épinglés | Mon espace compte',
  alternates: { canonical: `${SITE_URL}/compte/epingles` },
  robots: { index: false, follow: true },
};

export default async function EpinglesPage() {
  const supabase = await createOrgServerClient();
  const { data } = await supabase
    .from('media_bookmarks')
    .select('id, content_type, content_id, title, href, thumbnail_url, created_at')
    .order('created_at', { ascending: false });

  const bookmarks = (data ?? []) as MediaBookmark[];

  return <EpinglesClient bookmarks={bookmarks} />;
}
