import { createPublicClient } from '@/utils/supabase/public';
import { USE_HOMEPAGE_PLACEHOLDERS } from '@/lib/homepage-placeholders';
import {
  HORIZONTAL_VIDEO_PLACEHOLDERS,
  VERTICAL_VIDEO_PLACEHOLDERS,
  type HorizontalVideoPlaceholder,
  type VerticalVideoPlaceholder,
} from '@/lib/media-placeholders';
import type {
  HomepageMediaData,
  MediaAspectRatio,
  PublicPodcast,
  PublicVideo,
  VideosPageData,
  VideosPageRail,
} from '@/lib/media-types';

const VIDEO_SELECT =
  'id, title, slug, status, aspect_ratio, category, duration_label, format, year, youtube_url, thumbnail_url, hosts, tags, language, description, published_at';

const PODCAST_SELECT =
  'id, title, slug, status, aspect_ratio, category, subtitle, series, episode_number, season, duration_label, format, year, youtube_url, thumbnail_url, gradient, hosts, tags, language, description, published_at';

type RawVideo = {
  id: string;
  title: string;
  slug: string | null;
  aspect_ratio: MediaAspectRatio;
  category: string | null;
  duration_label: string | null;
  format: string | null;
  year: number | null;
  youtube_url: string | null;
  thumbnail_url: string | null;
  hosts: string[] | null;
  tags: string[] | null;
  language: string | null;
  description: string | null;
  published_at: string | null;
};

type RawPodcast = RawVideo & {
  subtitle: string | null;
  series: string | null;
  episode_number: number | null;
  season: number | null;
  gradient: string | null;
};

function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function mapAspectRatio(value: string | null | undefined): MediaAspectRatio {
  if (value === '9:16' || value === '1:1') return value;
  return '16:9';
}

function mediaHref(kind: 'video' | 'podcast', slug: string | null) {
  const base = kind === 'video' ? '/videos' : '/podcasts';
  return slug ? `${base}?slug=${encodeURIComponent(slug)}` : base;
}

function mapVideo(row: RawVideo): PublicVideo {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category ?? '',
    duration: row.duration_label ?? '',
    format: row.format ?? '',
    year: row.year,
    publishedAt: row.published_at,
    hosts: row.hosts ?? [],
    tags: row.tags ?? [],
    language: row.language ?? 'Français',
    description: row.description ?? '',
    href: mediaHref('video', row.slug),
    aspectRatio: mapAspectRatio(row.aspect_ratio),
    thumbnailUrl: row.thumbnail_url,
    youtubeUrl: row.youtube_url,
  };
}

function mapPodcast(row: RawPodcast): PublicPodcast {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category ?? '',
    subtitle: row.subtitle ?? '',
    series: row.series ?? '',
    episodeNumber: row.episode_number,
    season: row.season,
    duration: row.duration_label ?? '',
    format: row.format ?? '',
    year: row.year,
    publishedAt: row.published_at,
    hosts: row.hosts ?? [],
    tags: row.tags ?? [],
    language: row.language ?? 'Français',
    description: row.description ?? '',
    href: mediaHref('podcast', row.slug),
    aspectRatio: mapAspectRatio(row.aspect_ratio),
    thumbnailUrl: row.thumbnail_url,
    youtubeUrl: row.youtube_url,
    gradient:
      row.gradient ??
      'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #0a0a0a 100%)',
  };
}

export async function getPublishedVideos(options?: {
  aspectRatio?: MediaAspectRatio;
  limit?: number;
}): Promise<PublicVideo[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = createPublicClient();
    const now = new Date().toISOString();

    let query = supabase
      .schema('studio')
      .from('videos')
      .select(VIDEO_SELECT)
      .eq('status', 'published')
      .lte('published_at', now)
      .order('published_at', { ascending: false });

    if (options?.aspectRatio) {
      query = query.eq('aspect_ratio', options.aspectRatio);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[media] getPublishedVideos:', error.message, error);
      }
      return [];
    }
    if (!data) return [];

    return (data as RawVideo[]).map(mapVideo);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[media] getPublishedVideos:', error);
    }
    return [];
  }
}

export async function getPublishedPodcasts(options?: { limit?: number }): Promise<PublicPodcast[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = createPublicClient();
    const now = new Date().toISOString();

    let query = supabase
      .schema('studio')
      .from('podcasts')
      .select(PODCAST_SELECT)
      .eq('status', 'published')
      .lte('published_at', now)
      .order('published_at', { ascending: false });

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error || !data) return [];

    return (data as RawPodcast[]).map(mapPodcast);
  } catch {
    return [];
  }
}

function mapHorizontalPlaceholder(video: HorizontalVideoPlaceholder): PublicVideo {
  return {
    id: video.id,
    title: video.title,
    slug: null,
    category: video.category,
    duration: video.duration,
    format: video.format,
    year: video.year,
    publishedAt: video.publishedAt,
    hosts: video.hosts,
    tags: video.tags,
    language: video.language,
    description: video.description,
    href: video.href,
    aspectRatio: '16:9',
    thumbnailUrl: null,
    youtubeUrl: null,
  };
}

function mapVerticalPlaceholder(video: VerticalVideoPlaceholder): PublicVideo {
  return {
    id: video.id,
    title: video.title,
    slug: null,
    category: video.category,
    duration: video.duration,
    format: video.format,
    year: video.year,
    publishedAt: video.publishedAt,
    hosts: [],
    tags: video.tags,
    language: video.language,
    description: video.description,
    href: video.href,
    aspectRatio: '9:16',
    thumbnailUrl: null,
    youtubeUrl: null,
  };
}

export async function getVideosPageData(): Promise<VideosPageData> {
  const [horizontalFromDb, verticalFromDb, rails] = await Promise.all([
    getPublishedVideos({ aspectRatio: '16:9' }),
    getPublishedVideos({ aspectRatio: '9:16' }),
    getFeaturedVideoRails(),
  ]);

  return {
    rails,
    horizontalVideos:
      horizontalFromDb.length > 0
        ? horizontalFromDb
        : USE_HOMEPAGE_PLACEHOLDERS
          ? HORIZONTAL_VIDEO_PLACEHOLDERS.map(mapHorizontalPlaceholder)
          : [],
    verticalVideos:
      verticalFromDb.length > 0
        ? verticalFromDb
        : USE_HOMEPAGE_PLACEHOLDERS
          ? VERTICAL_VIDEO_PLACEHOLDERS.map(mapVerticalPlaceholder)
          : [],
  };
}

type RawFeaturedPlaylist = {
  id: string;
  title: string;
  slug: string | null;
  aspect_ratio: MediaAspectRatio;
  videos_page_position: number;
  playlist_videos:
    | Array<{
        position: number;
        videos: RawVideo | null;
      }>
    | null;
};

export async function getFeaturedVideoRails(): Promise<VideosPageRail[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = createPublicClient();
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .schema('studio')
      .from('playlists')
      .select(
        `
        id,
        title,
        slug,
        aspect_ratio,
        videos_page_position,
        playlist_videos (
          position,
          videos (
            ${VIDEO_SELECT}
          )
        )
      `
      )
      .eq('status', 'published')
      .eq('show_on_videos_page', true)
      .order('videos_page_position', { ascending: true });

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[media] getFeaturedVideoRails:', error.message, error);
      }
      return [];
    }
    if (!data?.length) return [];

    return (data as RawFeaturedPlaylist[])
      .map((playlist) => {
        const links = [...(playlist.playlist_videos ?? [])].sort(
          (a, b) => (a.position ?? 0) - (b.position ?? 0)
        );

        const videos = links
          .map((link) => link.videos)
          .filter((video): video is RawVideo => {
            if (!video) return false;
            if (!video.published_at) return false;
            return video.published_at <= now;
          })
          .map(mapVideo);

        return {
          id: playlist.id,
          title: playlist.title,
          slug: playlist.slug,
          aspectRatio: mapAspectRatio(playlist.aspect_ratio),
          videos,
        };
      })
      .filter((rail) => rail.videos.length > 0);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[media] getFeaturedVideoRails:', error);
    }
    return [];
  }
}

export async function getPodcastsPageData(): Promise<PublicPodcast[]> {
  return getPublishedPodcasts();
}

export async function getHomepageMediaData(): Promise<HomepageMediaData> {
  const [horizontalFromDb, verticalFromDb, podcastsFromDb] = await Promise.all([
    getPublishedVideos({ aspectRatio: '16:9', limit: 8 }),
    getPublishedVideos({ aspectRatio: '9:16', limit: 12 }),
    getPublishedPodcasts({ limit: 12 }),
  ]);

  return {
    horizontalVideos:
      horizontalFromDb.length > 0
        ? horizontalFromDb
        : USE_HOMEPAGE_PLACEHOLDERS
          ? HORIZONTAL_VIDEO_PLACEHOLDERS.slice(0, 2).map(mapHorizontalPlaceholder)
          : [],
    verticalVideos:
      verticalFromDb.length > 0
        ? verticalFromDb
        : USE_HOMEPAGE_PLACEHOLDERS
          ? VERTICAL_VIDEO_PLACEHOLDERS.map(mapVerticalPlaceholder)
          : [],
    podcasts: podcastsFromDb,
  };
}

export { extractYoutubeId, youtubeEmbedUrl } from '@/lib/youtube';
