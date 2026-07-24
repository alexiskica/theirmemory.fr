import { notFound } from 'next/navigation';
import {
  getAllPublishedArticleSlugs,
  getPublishedArticleBySlug,
  getRelatedArticles,
} from '@/lib/articles';
import {
  getArticlePlaceholderBySlug,
  getArticlePlaceholderSlugs,
  getRelatedArticlePlaceholders,
} from '@/lib/article-placeholders';
import { USE_HOMEPAGE_PLACEHOLDERS } from '@/lib/homepage-placeholders';
import {
  buildArticleMetadata,
  buildBreadcrumbJsonLd,
  buildNewsArticleJsonLd,
} from '@/lib/seo';
import { SITE_URL } from '@/lib/site-config';
import { categorySlugFromLabel } from '@/lib/site-config';
import ArticleClient from './ArticleClient';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const dbSlugs = await getAllPublishedArticleSlugs();
    if (dbSlugs.length > 0) {
      return dbSlugs.map((s) => ({ slug: s.slug }));
    }
  } catch {
    // ignore — fallback placeholders below
  }

  if (USE_HOMEPAGE_PLACEHOLDERS) {
    return getArticlePlaceholderSlugs().map((slug) => ({ slug }));
  }

  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article =
    (await getPublishedArticleBySlug(slug)) ??
    (USE_HOMEPAGE_PLACEHOLDERS ? getArticlePlaceholderBySlug(slug) : null);
  if (!article) return { title: 'Article introuvable' };
  return buildArticleMetadata(article);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const articleFromDb = await getPublishedArticleBySlug(slug);
  const article =
    articleFromDb ??
    (USE_HOMEPAGE_PLACEHOLDERS ? getArticlePlaceholderBySlug(slug) : null);

  if (!article) notFound();

  const relatedArticles = articleFromDb
    ? await getRelatedArticles(article, 3)
    : getRelatedArticlePlaceholders(article, 3);

  const categorySlug = categorySlugFromLabel(article.category);

  const breadcrumbItems = [
    { name: 'Accueil', url: SITE_URL },
    { name: 'Articles', url: `${SITE_URL}/articles` },
  ];
  if (categorySlug) {
    breadcrumbItems.push({
      name: article.category,
      url: `${SITE_URL}/articles?categorie=${categorySlug}`,
    });
  }
  breadcrumbItems.push({
    name: article.title,
    url: `${SITE_URL}/articles/${article.slug}`,
  });

  const jsonLd = [buildNewsArticleJsonLd(article), buildBreadcrumbJsonLd(breadcrumbItems)];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleClient article={article} relatedArticles={relatedArticles} />
    </>
  );
}
