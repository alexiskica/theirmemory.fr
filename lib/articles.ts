import { createPublicClient } from '@/utils/supabase/public';
import { parseArticleMeta } from '@/lib/article-meta';
import { categoryLabelFromSlug, categorySlugFromLabel } from '@/lib/site-config';

export type PublicArticle = {
  id: string;
  title: string;
  slug: string;
  display_author: string | null;
  thumbnail_url: string | null;
  cover_image_url: string | null;
  cover_image_credit: string | null;
  cover_image_caption: string | null;
  html_content: string | null;
  read_time: number | null;
  published_at: string | null;
  excerpt: string;
  category: string;
  secondary_categories: string[];
  tags: string[];
  attachments: Array<{ link: string; name: string; size: string; format: string }>;
  slider_images: Array<{ url: string; credit: string; caption?: string }>;
};

type RawArticle = {
  id: string;
  title: string;
  slug: string;
  display_author: string | null;
  thumbnail_url: string | null;
  cover_image_url: string | null;
  cover_image_credit: string | null;
  cover_image_caption: string | null;
  html_content: string | null;
  module_content: unknown;
  read_time: number | null;
  published_at: string | null;
};

function mapArticle(row: RawArticle): PublicArticle {
  const meta = parseArticleMeta(row.module_content);
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    display_author: row.display_author,
    thumbnail_url: row.thumbnail_url,
    cover_image_url: row.cover_image_url,
    cover_image_credit: row.cover_image_credit,
    cover_image_caption: row.cover_image_caption,
    html_content: row.html_content,
    read_time: row.read_time != null ? Number(row.read_time) : null,
    published_at: row.published_at,
    excerpt: meta.excerpt,
    category: meta.category,
    secondary_categories: meta.secondary_categories,
    tags: meta.tags,
    attachments: meta.attachments,
    slider_images: meta.slider_images,
  };
}

const ARTICLE_SELECT =
  'id, title, slug, display_author, thumbnail_url, cover_image_url, cover_image_credit, cover_image_caption, html_content, module_content, read_time, published_at';

export async function getPublishedArticles(options?: {
  categorySlug?: string;
  limit?: number;
  offset?: number;
}): Promise<PublicArticle[]> {
  try {
    const supabase = createPublicClient();
  const now = new Date().toISOString();

  let query = supabase
    .schema('redaction')
    .from('articles')
    .select(ARTICLE_SELECT)
    .eq('status', 'published')
    .lte('published_at', now)
    .order('published_at', { ascending: false });

  if (options?.limit) query = query.limit(options.limit);
  if (options?.offset) query = query.range(options.offset, options.offset + (options.limit ?? 20) - 1);

  const { data, error } = await query;
  if (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[articles] getPublishedArticles:', error.message, error);
    }
    return [];
  }
  if (!data) return [];

  let articles = data.map(mapArticle);

  if (options?.categorySlug) {
    const label = categoryLabelFromSlug(options.categorySlug);
    if (label) {
      articles = articles.filter(
        (a) => a.category === label || a.secondary_categories.includes(label)
      );
    }
  }

  return articles;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[articles] getPublishedArticles:', error);
    }
    return [];
  }
}

export async function getPublishedArticleBySlug(slug: string): Promise<PublicArticle | null> {
  try {
    const supabase = createPublicClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .schema('redaction')
    .from('articles')
    .select(ARTICLE_SELECT)
    .eq('slug', slug)
    .eq('status', 'published')
    .lte('published_at', now)
    .maybeSingle();

  if (error || !data) return null;
  return mapArticle(data);
  } catch {
    return null;
  }
}

export async function getRelatedArticles(article: PublicArticle, limit = 3): Promise<PublicArticle[]> {
  const articles = await getPublishedArticles({ limit: 20 });
  return articles
    .filter(
      (a) =>
        a.id !== article.id &&
        (a.category === article.category ||
          a.secondary_categories.some((c) => c === article.category || article.secondary_categories.includes(c)))
    )
    .slice(0, limit);
}

export async function getAllPublishedArticleSlugs(): Promise<
  Array<{ slug: string; published_at: string | null; updated_at?: string | null }>
> {
  try {
    const supabase = createPublicClient();
  const now = new Date().toISOString();

  const { data } = await supabase
    .schema('redaction')
    .from('articles')
    .select('slug, published_at, updated_at')
    .eq('status', 'published')
    .lte('published_at', now)
    .order('published_at', { ascending: false });

  return data ?? [];
  } catch {
    return [];
  }
}

export async function searchPublishedArticles(query: string): Promise<PublicArticle[]> {
  const articles = await getPublishedArticles({ limit: 100 });
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getArticleCategorySlug(article: PublicArticle): string | undefined {
  return categorySlugFromLabel(article.category);
}
