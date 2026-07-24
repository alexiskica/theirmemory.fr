import type { Metadata } from 'next';
import VideosClient from './VideosClient';
import { getVideosPageData } from '@/lib/media';
import { SITE_URL } from '@/lib/site-config';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Vidéos',
  description:
    'Documentaires, interviews et formats courts sur l\'histoire de la Seconde Guerre mondiale, la Résistance et la mémoire.',
  alternates: { canonical: `${SITE_URL}/videos` },
  openGraph: {
    title: 'Vidéos',
    url: `${SITE_URL}/videos`,
    type: 'website',
  },
};

export default async function VideosPage() {
  const { horizontalVideos, verticalVideos } = await getVideosPageData();

  return (
    <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
      <VideosClient horizontalVideos={horizontalVideos} verticalVideos={verticalVideos} />
    </main>
  );
}
