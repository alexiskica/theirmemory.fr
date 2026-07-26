import type { Metadata } from 'next';
import PodcastsClient from './PodcastsClient';
import PodcastsTeaserClient from './PodcastsTeaserClient';
import { getPodcastsPageData } from '@/lib/media';
import { isPodcastsCatalogLive } from '@/lib/podcasts-config';
import { buildCollectionPageJsonLd, buildPageMetadata } from '@/lib/seo';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 60;

const teaserDescription =
  "Les podcasts Their memory arrivent bientôt : témoignages, analyses et débats sur la mémoire, la Résistance et l'histoire contemporaine.";

const catalogDescription =
  'Podcasts Their memory : témoignages, analyses et débats sur la mémoire, la Résistance et l\'histoire contemporaine.';

export async function generateMetadata(): Promise<Metadata> {
  const catalogLive = await isPodcastsCatalogLive();
  const description = catalogLive ? catalogDescription : teaserDescription;

  return buildPageMetadata({
    pageDescription: catalogLive ? 'Podcasts et témoignages' : 'Podcasts — bientôt disponibles',
    description,
    path: '/podcasts',
  });
}

export default async function PodcastsPage() {
  const catalogLive = await isPodcastsCatalogLive();

  if (!catalogLive) {
    return (
      <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
        <PodcastsTeaserClient />
      </main>
    );
  }

  const podcasts = await getPodcastsPageData();
  const jsonLd = buildCollectionPageJsonLd({
    name: 'Podcasts — Their memory',
    description: catalogDescription,
    url: `${SITE_URL}/podcasts`,
  });

  return (
    <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PodcastsClient podcasts={podcasts} />
    </main>
  );
}
