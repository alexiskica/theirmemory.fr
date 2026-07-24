import { createPublicClient } from '@/utils/supabase/public';
import { parseArticleMeta } from '@/lib/article-meta';
import type { PublicArticle } from '@/lib/articles';
import { getPublishedArticles } from '@/lib/articles';
import { getHomepagePlaceholderData, USE_HOMEPAGE_PLACEHOLDERS } from '@/lib/homepage-placeholders';

const ARTICLE_SELECT =
  'id, title, slug, display_author, thumbnail_url, cover_image_url, cover_image_credit, html_content, module_content, read_time, published_at';

type RawArticle = {
  id: string;
  title: string;
  slug: string;
  display_author: string | null;
  thumbnail_url: string | null;
  cover_image_url: string | null;
  cover_image_credit: string | null;
  html_content: string | null;
  module_content: unknown;
  read_time: number | null;
  published_at: string | null;
  status?: string;
};

function mapRow(row: RawArticle): PublicArticle {
  const meta = parseArticleMeta(row.module_content);
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    display_author: row.display_author,
    thumbnail_url: row.thumbnail_url,
    cover_image_url: row.cover_image_url,
    cover_image_credit: row.cover_image_credit,
    cover_image_caption: null,
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

function isFeaturedActive(endsAt: string | null, now: Date): boolean {
  if (!endsAt) return true;
  const end = new Date(endsAt);
  return !Number.isNaN(end.getTime()) && end > now;
}

export async function getFeaturedArticles(): Promise<PublicArticle[]> {
  try {
    const supabase = createPublicClient();
    const now = new Date();
    const nowIso = now.toISOString();

    const { data: featuredRows, error } = await supabase
      .schema('redaction')
      .from('featured_articles')
      .select('article_id, position, ends_at')
      .order('position', { ascending: true });

    if (error || !featuredRows?.length) return [];

    const activeIds = featuredRows
      .filter((row) => isFeaturedActive(row.ends_at as string | null, now))
      .map((row) => row.article_id as string);

    if (!activeIds.length) return [];

    const { data: articles } = await supabase
      .schema('redaction')
      .from('articles')
      .select(ARTICLE_SELECT)
      .in('id', activeIds)
      .eq('status', 'published')
      .lte('published_at', nowIso);

    if (!articles?.length) return [];

    const byId = new Map(articles.map((a) => [a.id, mapRow(a as RawArticle)]));
    return activeIds
      .map((id) => byId.get(id))
      .filter((a): a is PublicArticle => Boolean(a));
  } catch {
    return [];
  }
}

export { USE_HOMEPAGE_PLACEHOLDERS } from '@/lib/homepage-placeholders';

export type HomepageData = {
  heroArticles: PublicArticle[];
  featuredReading: {
    main: PublicArticle | null;
    side: PublicArticle[];
  };
};

function buildHomepageArticleLayout(
  latest: PublicArticle[],
  featured: PublicArticle[]
): Pick<HomepageData, 'heroArticles' | 'featuredReading'> {
  const latestFour = latest.slice(0, 4);

  return {
    // Hero : uniquement la sélection « À la une » de l'app rédaction
    heroArticles: featured,
    // « À lire en ce moment » : 4 derniers publiés, indépendamment du hero
    featuredReading: {
      main: latestFour[0] ?? null,
      side: latestFour.slice(1, 4),
    },
  };
}

export async function getHomepageData(): Promise<HomepageData> {
  const [featured, latest] = await Promise.all([
    getFeaturedArticles(),
    getPublishedArticles({ limit: 4 }),
  ]);

  if (featured.length > 0 || latest.length > 0) {
    return buildHomepageArticleLayout(latest, featured);
  }

  if (USE_HOMEPAGE_PLACEHOLDERS) {
    return getHomepagePlaceholderData();
  }

  return {
    heroArticles: [],
    featuredReading: { main: null, side: [] },
  };
}

export {
  HORIZONTAL_VIDEO_PLACEHOLDERS,
  VERTICAL_VIDEO_PLACEHOLDERS,
  PODCAST_PLACEHOLDERS,
} from '@/lib/media-placeholders';
