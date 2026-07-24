import { getPublishedPodcasts } from '@/lib/media';

/** Catalogue podcasts actif dès qu'au moins un épisode est publié en base. */
export async function isPodcastsCatalogLive(): Promise<boolean> {
  const podcasts = await getPublishedPodcasts({ limit: 1 });
  return podcasts.length > 0;
}
