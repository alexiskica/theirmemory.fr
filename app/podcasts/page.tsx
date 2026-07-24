import type { Metadata } from 'next';
import PodcastsClient from './PodcastsClient';
import PodcastsTeaserClient from './PodcastsTeaserClient';
import { getPodcastsPageData } from '@/lib/media';
import { isPodcastsCatalogLive } from '@/lib/podcasts-config';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 60;

const teaserDescription =
  'Les podcasts Their memory arrivent bientôt : témoignages, analyses et débats sur la mémoire, la Résistance et l\'histoire contemporaine.';

const catalogDescription =
  'Podcasts Their memory : témoignages, analyses et débats sur la mémoire, la Résistance et l\'histoire contemporaine.';

export async function generateMetadata(): Promise<Metadata> {
  const catalogLive = await isPodcastsCatalogLive();

  return {
    title: 'Podcasts',
    description: catalogLive ? catalogDescription : teaserDescription,
    alternates: { canonical: `${SITE_URL}/podcasts` },
    openGraph: {
      title: 'Podcasts',
      description: catalogLive ? catalogDescription : teaserDescription,
      url: `${SITE_URL}/podcasts`,
      type: 'website',
    },
  };
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

  return (
    <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
      <PodcastsClient podcasts={podcasts} />
    </main>
  );
}
