import type { Metadata } from 'next';
import { getPublishedArticles } from '@/lib/articles';
import {
  HOMEPAGE_ARTICLE_PLACEHOLDERS,
  USE_HOMEPAGE_PLACEHOLDERS,
} from '@/lib/homepage-placeholders';
import { buildCollectionPageJsonLd, buildPageMetadata } from '@/lib/seo';
import { SITE_URL } from '@/lib/site-config';
import ArticlesClient from './ArticlesClient';

export const revalidate = 60;

const description =
  'Actualités, culture, politique, militaire, Résistance & Déportation, technologies et biographies publiés par Their memory.';

export const metadata: Metadata = {
  ...buildPageMetadata({
    pageDescription: 'Articles d’histoire et de mémoire',
    description,
    path: '/articles',
  }),
};

export default async function ArticlesPage() {
  const articlesFromDb = await getPublishedArticles({ limit: 100 });
  const articles =
    articlesFromDb.length > 0
      ? articlesFromDb
      : USE_HOMEPAGE_PLACEHOLDERS
        ? HOMEPAGE_ARTICLE_PLACEHOLDERS
        : [];

  const jsonLd = buildCollectionPageJsonLd({
    name: 'Articles — Their memory',
    description,
    url: `${SITE_URL}/articles`,
  });

  return (
    <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticlesClient articles={articles} />
    </main>
  );
}
