export type ArticleEditorMeta = {
  excerpt: string;
  category: string;
  secondary_categories: string[];
  tags: string[];
  attachments: Array<{ link: string; name: string; size: string; format: string }>;
  slider_images: Array<{ url: string; credit: string; caption?: string }>;
};

const EMPTY_META: ArticleEditorMeta = {
  excerpt: '',
  category: '',
  secondary_categories: [],
  tags: [],
  attachments: [],
  slider_images: [],
};

export function parseArticleMeta(raw: unknown): ArticleEditorMeta {
  if (!raw || typeof raw !== 'object') return { ...EMPTY_META };

  const parsed = raw as { meta?: Partial<ArticleEditorMeta> };
  if (!parsed.meta) return { ...EMPTY_META };

  return {
    ...EMPTY_META,
    ...parsed.meta,
    secondary_categories: Array.isArray(parsed.meta.secondary_categories)
      ? parsed.meta.secondary_categories
      : [],
    tags: Array.isArray(parsed.meta.tags) ? parsed.meta.tags : [],
    attachments: Array.isArray(parsed.meta.attachments) ? parsed.meta.attachments : [],
    slider_images: Array.isArray(parsed.meta.slider_images) ? parsed.meta.slider_images : [],
  };
}
