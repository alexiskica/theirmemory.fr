import type { Metadata } from 'next';
import VideosClient from './VideosClient';
import { getVideosPageData } from '@/lib/media';
import { buildCollectionPageJsonLd, buildPageMetadata } from '@/lib/seo';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 60;

const description =
  "Documentaires, interviews et formats courts sur l'histoire de la Seconde Guerre mondiale, la Résistance et la mémoire.";

export const metadata: Metadata = {
  ...buildPageMetadata({
    pageDescription: 'Vidéos et documentaires',
    description,
    path: '/videos',
  }),
};

export default async function VideosPage() {
  const { rails, horizontalVideos, verticalVideos } = await getVideosPageData();

  const jsonLd = buildCollectionPageJsonLd({
    name: 'Vidéos — Their memory',
    description,
    url: `${SITE_URL}/videos`,
  });

  return (
    <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VideosClient
        rails={rails}
        horizontalVideos={horizontalVideos}
        verticalVideos={verticalVideos}
      />
    </main>
  );
}
