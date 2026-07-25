import AccountQuickAccess from '@/components/account/AccountQuickAccess';
import { createOrgServerClient } from '@/utils/supabase/org-server';

export default async function ComptePage() {
  const supabase = await createOrgServerClient();
  const { count } = await supabase
    .from('media_bookmarks')
    .select('id', { count: 'exact', head: true });

  return <AccountQuickAccess bookmarkCount={count ?? 0} />;
}
