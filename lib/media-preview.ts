export type MediaPreviewItem = {
  id: string;
  title: string;
  kind: 'video' | 'podcast';
  orientation: 'horizontal' | 'vertical' | 'square';
  description: string;
  href: string;
  category?: string;
  subtitle?: string;
  duration?: string;
  gradient?: string;
  format?: string;
  series?: string;
  episodeNumber?: number;
  season?: number;
  year?: number;
  publishedAt?: string;
  hosts?: readonly string[];
  tags?: readonly string[];
  language?: string;
  thumbnailUrl?: string | null;
  youtubeUrl?: string | null;
};

export type MediaPreviewSource = {
  id: string;
  title: string;
  description: string;
  href: string;
  category?: string;
  subtitle?: string;
  duration?: string;
  gradient?: string;
  format?: string;
  series?: string;
  episodeNumber?: number;
  season?: number;
  year?: number;
  publishedAt?: string;
  hosts?: readonly string[];
  tags?: readonly string[];
  language?: string;
  thumbnailUrl?: string | null;
  youtubeUrl?: string | null;
};

export function toMediaPreview(
  item: MediaPreviewSource,
  kind: 'video' | 'podcast',
  orientation: 'horizontal' | 'vertical' | 'square'
): MediaPreviewItem {
  return { ...item, kind, orientation };
}

export function videoToMediaPreview(
  video: {
    id: string;
    title: string;
    description: string;
    href: string;
    category?: string;
    duration?: string;
    format?: string;
    year?: number | null;
    publishedAt?: string | null;
    hosts?: readonly string[];
    tags?: readonly string[];
    language?: string;
    thumbnailUrl?: string | null;
    youtubeUrl?: string | null;
  },
  orientation: 'horizontal' | 'vertical'
): MediaPreviewItem {
  return toMediaPreview(
    {
      id: video.id,
      title: video.title,
      description: video.description,
      href: video.href,
      category: video.category,
      duration: video.duration,
      format: video.format,
      year: video.year ?? undefined,
      publishedAt: video.publishedAt ?? undefined,
      hosts: video.hosts,
      tags: video.tags,
      language: video.language,
      thumbnailUrl: video.thumbnailUrl,
      youtubeUrl: video.youtubeUrl,
    },
    'video',
    orientation
  );
}

export function podcastToMediaPreview(podcast: {
  id: string;
  title: string;
  description: string;
  href: string;
  category?: string;
  subtitle?: string;
  duration?: string;
  gradient?: string;
  format?: string;
  series?: string;
  episodeNumber?: number | null;
  season?: number | null;
  year?: number | null;
  publishedAt?: string | null;
  hosts?: readonly string[];
  tags?: readonly string[];
  language?: string;
  thumbnailUrl?: string | null;
  youtubeUrl?: string | null;
}): MediaPreviewItem {
  return toMediaPreview(
    {
      id: podcast.id,
      title: podcast.title,
      description: podcast.description,
      href: podcast.href,
      category: podcast.category,
      subtitle: podcast.subtitle,
      duration: podcast.duration,
      gradient: podcast.gradient,
      format: podcast.format,
      series: podcast.series,
      episodeNumber: podcast.episodeNumber ?? undefined,
      season: podcast.season ?? undefined,
      year: podcast.year ?? undefined,
      publishedAt: podcast.publishedAt ?? undefined,
      hosts: podcast.hosts,
      tags: podcast.tags,
      language: podcast.language,
      thumbnailUrl: podcast.thumbnailUrl,
      youtubeUrl: podcast.youtubeUrl,
    },
    'podcast',
    'square'
  );
}

export function formatMediaDate(dateString?: string) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function orientationLabel(orientation: MediaPreviewItem['orientation']) {
  switch (orientation) {
    case 'vertical':
      return 'Vertical · 9:16';
    case 'square':
      return 'Carré · 1:1';
    default:
      return 'Horizontal · 16:9';
  }
}
