import type { MetadataRoute } from 'next';
import { getAllPublishedArticleSlugs } from '@/lib/articles';
import { MAGAZINE_LAUNCHED } from '@/lib/magazine-config';
import { MAGAZINE_ISSUES } from '@/lib/magazine-data';
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
    { url: SITE_URL, lastModified: now, changeFrequency: 'hourly', priority: 1 },
    { url: `${SITE_URL}/articles`, lastModified: now, changeFrequency: 'hourly', priority: 0.95 },
    { url: `${SITE_URL}/magazine`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/videos`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${SITE_URL}/podcasts`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${SITE_URL}/plan-du-site`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    {
      url: `${SITE_URL}/politique-de-confidentialite`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    { url: `${SITE_URL}/cgu`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    ...ARTICLE_CATEGORIES.map((cat) => ({
      url: `${SITE_URL}/articles?categorie=${cat.slug}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.85,
    })),
  ];

  const magazinePages: MetadataRoute.Sitemap = MAGAZINE_LAUNCHED
    ? MAGAZINE_ISSUES.map((issue) => ({
        url: `${SITE_URL}/magazine/${issue.slug}`,
        lastModified: new Date(issue.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: issue.isLatest ? 0.75 : 0.55,
      }))
    : [];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => {
    const published = article.published_at ? new Date(article.published_at) : now;
    const ageDays = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);

    return {
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: article.updated_at
        ? new Date(article.updated_at)
        : published,
      changeFrequency: ageDays <= 7 ? ('daily' as const) : ('weekly' as const),
      priority: ageDays <= 2 ? 0.95 : ageDays <= 30 ? 0.9 : 0.7,
    };
  });

  return [...staticPages, ...magazinePages, ...articlePages];
}
