import type { MetadataRoute } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/site-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description:
      'Articles, magazine, vidéos et podcasts Their memory : histoire, mémoire, Résistance et actualités.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    lang: 'fr',
    icons: [
      {
        src: '/images/avatar_noir.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    categories: ['news', 'education', 'magazines'],
    id: SITE_URL,
  };
}
