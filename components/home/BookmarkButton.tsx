'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  bookmarkKey,
  clearLocalBookmarks,
  readLocalBookmarks,
  writeLocalBookmarks,
  type BookmarkContentType,
  type LocalBookmark,
} from '@/lib/bookmarks';
import { createOrgClient } from '@/utils/supabase/org-client';

type BookmarkButtonProps = {
  contentType: BookmarkContentType;
  contentId: string;
  title: string;
  href: string;
  thumbnailUrl?: string | null;
  className?: string;
  /** Fond semi-transparent pour rester lisible sur une vignette (uniquement si non épinglé). */
  overlay?: boolean;
};

export default function BookmarkButton({
  contentType,
  contentId,
  title,
  href,
  thumbnailUrl = null,
  className = '',
  overlay = false,
}: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const supabase = createOrgClient();

    const syncState = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (cancelled) return;

      if (!user) {
        setUserId(null);
        const local = readLocalBookmarks();
        setSaved(local.some((b) => b.contentType === contentType && b.contentId === contentId));
        setReady(true);
        return;
      }

      setUserId(user.id);
      const { data } = await supabase
        .from('media_bookmarks')
        .select('id')
        .eq('content_type', contentType)
        .eq('content_id', contentId)
        .maybeSingle();

      if (cancelled) return;
      setSaved(Boolean(data));
      setReady(true);
    };

    void syncState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void syncState();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [contentType, contentId]);

  const toggle = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!ready) return;

      const item: LocalBookmark = {
        contentType,
        contentId,
        title,
        href,
        thumbnailUrl,
      };

      if (!userId) {
        const local = readLocalBookmarks();
        const exists = local.some((b) => b.contentType === contentType && b.contentId === contentId);
        const next = exists
          ? local.filter((b) => !(b.contentType === contentType && b.contentId === contentId))
          : [...local, item];
        writeLocalBookmarks(next);
        setSaved(!exists);
        return;
      }

      const supabase = createOrgClient();
      if (saved) {
        const { error } = await supabase
          .from('media_bookmarks')
          .delete()
          .eq('content_type', contentType)
          .eq('content_id', contentId);
        if (!error) setSaved(false);
        return;
      }

      const { error } = await supabase.from('media_bookmarks').upsert(
        {
          user_id: userId,
          content_type: contentType,
          content_id: contentId,
          title,
          href,
          thumbnail_url: thumbnailUrl,
        },
        { onConflict: 'user_id,content_type,content_id' }
      );
      if (!error) setSaved(true);
    },
    [ready, userId, saved, contentType, contentId, title, href, thumbnailUrl]
  );

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={!ready}
      aria-label={saved ? 'Retirer des épinglés' : 'Épingler'}
      aria-pressed={saved}
      className={`inline-flex items-center justify-center w-[44px] h-[44px] rounded-[8px] border transition-all duration-300 cursor-pointer disabled:opacity-50 ${
        saved
          ? '!bg-[#FFCC00] !border-[#FFCC00] text-black hover:!bg-[#e6b800] hover:!border-[#e6b800]'
          : overlay
            ? 'bg-black/45 backdrop-blur-sm border-white/30 text-white hover:border-white hover:bg-black/60'
            : 'bg-transparent border-white/30 text-white hover:border-white hover:bg-white/10'
      } ${className}`}
      data-bookmark-key={bookmarkKey(contentType, contentId)}
    >
      <svg
        className="w-[18px] h-[18px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}

/** Fusionne les épingles locales vers le compte après connexion. */
export function SyncLocalBookmarksOnLogin() {
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const supabase = createOrgClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || cancelled) return;

      const local = readLocalBookmarks();
      if (local.length === 0) return;

      const rows = local.map((item) => ({
        user_id: user.id,
        content_type: item.contentType,
        content_id: item.contentId,
        title: item.title,
        href: item.href,
        thumbnail_url: item.thumbnailUrl,
      }));

      const { error } = await supabase
        .from('media_bookmarks')
        .upsert(rows, { onConflict: 'user_id,content_type,content_id' });

      if (!error && !cancelled) {
        clearLocalBookmarks();
      }
    };

    void run();

    const {
      data: { subscription },
    } = createOrgClient().auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') void run();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  return null;
}
