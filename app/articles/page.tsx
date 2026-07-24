import type { Metadata } from 'next';
import { getPublishedArticles } from '@/lib/articles';
import {
  HOMEPAGE_ARTICLE_PLACEHOLDERS,
  USE_HOMEPAGE_PLACEHOLDERS,
} from '@/lib/homepage-placeholders';
import { SITE_URL } from '@/lib/site-config';
import ArticlesClient from './ArticlesClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Actualités, culture, politique, militaire, Résistance & Déportation, technologies et biographies publiés par Their memory.',
  alternates: { canonical: `${SITE_URL}/articles` },
  openGraph: {
    title: 'Articles',
    url: `${SITE_URL}/articles`,
    type: 'website',
  },
};

export default async function ArticlesPage() {
  const articlesFromDb = await getPublishedArticles({ limit: 100 });
  const articles =
    articlesFromDb.length > 0
      ? articlesFromDb
      : USE_HOMEPAGE_PLACEHOLDERS
        ? HOMEPAGE_ARTICLE_PLACEHOLDERS
        : [];

  return (
    <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
      <ArticlesClient articles={articles} />
    </main>
  );
}
