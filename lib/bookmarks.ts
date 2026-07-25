export type BookmarkContentType = 'article' | 'video' | 'podcast';

export type MediaBookmark = {
  id?: string;
  content_type: BookmarkContentType;
  content_id: string;
  title: string;
  href: string;
  thumbnail_url: string | null;
  created_at?: string;
};

export type LocalBookmark = {
  contentType: BookmarkContentType;
  contentId: string;
  title: string;
  href: string;
  thumbnailUrl: string | null;
};

export const LOCAL_BOOKMARKS_KEY = 'tm-bookmarks';

export function bookmarkKey(type: BookmarkContentType, id: string) {
  return `${type}:${id}`;
}

export function readLocalBookmarks(): LocalBookmark[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_BOOKMARKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;

    // Legacy format: string[] of article slugs
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
      return (parsed as string[]).map((slug) => ({
        contentType: 'article' as const,
        contentId: slug,
        title: slug,
        href: `/articles/${slug}`,
        thumbnailUrl: null,
      }));
    }

    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => {
        if (!item || typeof item !== 'object') return null;
        const row = item as Record<string, unknown>;
        const contentType = row.contentType;
        const contentId = row.contentId;
        if (
          (contentType !== 'article' && contentType !== 'video' && contentType !== 'podcast') ||
          typeof contentId !== 'string'
        ) {
          return null;
        }
        return {
          contentType,
          contentId,
          title: typeof row.title === 'string' ? row.title : contentId,
          href: typeof row.href === 'string' ? row.href : '/',
          thumbnailUrl: typeof row.thumbnailUrl === 'string' ? row.thumbnailUrl : null,
        } satisfies LocalBookmark;
      })
      .filter((item): item is LocalBookmark => Boolean(item));
  } catch {
    return [];
  }
}

export function writeLocalBookmarks(items: LocalBookmark[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_BOOKMARKS_KEY, JSON.stringify(items));
}

export function clearLocalBookmarks() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LOCAL_BOOKMARKS_KEY);
}
