import type { MetadataRoute } from 'next';
import { getAllPublishedArticleSlugs } from '@/lib/articles';
import { ARTICLE_CATEGORIES, SITE_URL } from '@/lib/site-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  let articles: Awaited<ReturnType<typeof getAllPublishedArticleSlugs>> = [];
  try {
    articles = await getAllPublishedArticleSlugs();
  } catch {
    articles = [];
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/articles`, lastModified: now, changeFrequency: 'hourly', priority: 0.95 },
    { url: `${SITE_URL}/magazine`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/videos`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/podcasts`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/plan-du-site`, lastModified: now, changeFrequency: 'weekly', priority: 0.4 },
    ...ARTICLE_CATEGORIES.map((cat) => ({
      url: `${SITE_URL}/articles?categorie=${cat.slug}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.85,
    })),
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: article.updated_at
      ? new Date(article.updated_at)
      : article.published_at
        ? new Date(article.published_at)
        : now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticPages, ...articlePages];
}
