export type MediaAspectRatio = '16:9' | '9:16' | '1:1';

export type PublicVideo = {
  id: string;
  title: string;
  slug: string | null;
  category: string;
  duration: string;
  format: string;
  year: number | null;
  publishedAt: string | null;
  hosts: readonly string[];
  tags: readonly string[];
  language: string;
  description: string;
  href: string;
  aspectRatio: MediaAspectRatio;
  thumbnailUrl: string | null;
  youtubeUrl: string | null;
};

export type PublicPodcast = {
  id: string;
  title: string;
  slug: string | null;
  category: string;
  subtitle: string;
  series: string;
  episodeNumber: number | null;
  season: number | null;
  duration: string;
  format: string;
  year: number | null;
  publishedAt: string | null;
  hosts: readonly string[];
  tags: readonly string[];
  language: string;
  description: string;
  href: string;
  aspectRatio: MediaAspectRatio;
  thumbnailUrl: string | null;
  youtubeUrl: string | null;
  gradient: string;
};

export type HomepageMediaData = {
  horizontalVideos: PublicVideo[];
  verticalVideos: PublicVideo[];
  podcasts: PublicPodcast[];
};

export type VideosPageData = {
  horizontalVideos: PublicVideo[];
  verticalVideos: PublicVideo[];
};
