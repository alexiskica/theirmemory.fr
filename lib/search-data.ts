import type { PublicArticle } from '@/lib/articles';
import { getPublishedArticles } from '@/lib/articles';
import { getPublishedPodcasts, getPublishedVideos } from '@/lib/media';
import { HOMEPAGE_ARTICLE_PLACEHOLDERS } from '@/lib/homepage-placeholders';
import {
  getArchiveMagazineIssues,
  getLatestMagazineIssue,
  magazineReaderPath,
} from '@/lib/magazine-data';
import {
  HORIZONTAL_VIDEO_PLACEHOLDERS,
  PODCAST_PLACEHOLDERS,
  VERTICAL_VIDEO_PLACEHOLDERS,
} from '@/lib/media-placeholders';
import { USE_HOMEPAGE_PLACEHOLDERS } from '@/lib/homepage-placeholders';
import { MAGAZINE_LAUNCHED } from '@/lib/magazine-config';
import { MAGAZINE_NAME } from '@/lib/site-config';

export type SearchContentType = 'Page' | 'Article' | 'Vidéo' | 'Podcast' | 'Magazine';

export type SearchResultItem = {
  id: string;
  type: SearchContentType;
  dateIso: string;
  title: string;
  excerpt: string;
  link: string;
  tags: string[];
};

export const SEARCH_CONTENT_TYPES: SearchContentType[] = [
  'Page',
  'Article',
  'Vidéo',
  'Podcast',
  'Magazine',
];

export const SEARCH_TYPE_COLORS: Record<SearchContentType, string> = {
  Page: '#4C3FE0',
  Article: '#E91E63',
  Vidéo: '#59B644',
  Podcast: '#9333AA',
  Magazine: '#FF6600',
};

const STATIC_PAGES: SearchResultItem[] = [
  {
    id: 'page-articles',
    type: 'Page',
    dateIso: '2021-01-01',
    title: 'Articles',
    excerpt:
      'Parcourez l\'ensemble des articles Their memory : actualités, analyses, biographies et dossiers sur la Seconde Guerre mondiale.',
    link: '/articles',
    tags: ['articles', 'actualités', 'lecture', 'publication'],
  },
  {
    id: 'page-videos',
    type: 'Page',
    dateIso: '2021-01-02',
    title: 'Vidéos',
    excerpt:
      'Documentaires, formats courts et interviews : explorez nos productions vidéo sur l\'histoire et la mémoire du conflit.',
    link: '/videos',
    tags: ['vidéos', 'documentaire', 'audiovisuel'],
  },
  {
    id: 'page-podcasts',
    type: 'Page',
    dateIso: '2021-01-03',
    title: 'Podcasts',
    excerpt:
      'Écoutez nos épisodes audio : débats, témoignages et analyses pour approfondir les grands enjeux mémoriels.',
    link: '/podcasts',
    tags: ['podcasts', 'audio', 'écoute'],
  },
  {
    id: 'page-magazine',
    type: 'Page',
    dateIso: '2021-01-04',
    title: 'Magazine',
    excerpt: MAGAZINE_LAUNCHED
      ? `Le magazine trimestriel ${MAGAZINE_NAME} : chaque numéro explore une thématique de la Seconde Guerre mondiale.`
      : `${MAGAZINE_NAME} arrive bientôt : magazine trimestriel consacré à la Seconde Guerre mondiale.`,
    link: '/magazine',
    tags: ['magazine', 'publication', 'trimestriel', 'seconde guerre mondiale'],
  },
];

function articleToSearchItem(article: PublicArticle): SearchResultItem {
  return {
    id: `art_${article.id}`,
    type: 'Article',
    dateIso: article.published_at || new Date().toISOString(),
    title: article.title,
    excerpt: article.excerpt,
    link: `/articles/${article.slug}`,
    tags: [...article.tags, article.category, ...article.secondary_categories].filter(Boolean),
  };
}

export function buildSearchIndexFromPlaceholders(): SearchResultItem[] {
  const data: SearchResultItem[] = [...STATIC_PAGES];

  HOMEPAGE_ARTICLE_PLACEHOLDERS.forEach((article) => {
    data.push(articleToSearchItem(article));
  });

  [...HORIZONTAL_VIDEO_PLACEHOLDERS, ...VERTICAL_VIDEO_PLACEHOLDERS].forEach((video) => {
    data.push({
      id: `vid_${video.id}`,
      type: 'Vidéo',
      dateIso: video.publishedAt,
      title: video.title,
      excerpt: video.description,
      link: video.href,
      tags: [...video.tags, video.category, video.format],
    });
  });

  PODCAST_PLACEHOLDERS.forEach((podcast) => {
    data.push({
      id: `pod_${podcast.id}`,
      type: 'Podcast',
      dateIso: podcast.publishedAt,
      title: `${podcast.title} — ${podcast.subtitle}`,
      excerpt: podcast.description,
      link: podcast.href,
      tags: [...podcast.tags, podcast.series, podcast.format],
    });
  });

  if (MAGAZINE_LAUNCHED) {
    const latestMag = getLatestMagazineIssue();
    data.push({
      id: latestMag.id,
      type: 'Magazine',
      dateIso: latestMag.publishedAt,
      title: `${latestMag.title} — N°${latestMag.number}`,
      excerpt: latestMag.description,
      link: '/magazine',
      tags: ['magazine', latestMag.season, `numéro ${latestMag.number}`, latestMag.ww2Theme, ...latestMag.themes],
    });

    getArchiveMagazineIssues().forEach((issue) => {
      data.push({
        id: issue.id,
        type: 'Magazine',
        dateIso: issue.publishedAt,
        title: `${issue.title} — N°${issue.number}`,
        excerpt: issue.description,
        link: magazineReaderPath(issue.slug),
        tags: ['magazine', issue.season, `numéro ${issue.number}`, issue.ww2Theme, ...issue.themes],
      });
    });
  }

  return data;
}

export async function buildSearchIndex(): Promise<SearchResultItem[]> {
  const fromDb = await buildSearchIndexFromDatabase();
  const hasDbArticles = fromDb.some((item) => item.type === 'Article');
  if (hasDbArticles) return fromDb;
  if (USE_HOMEPAGE_PLACEHOLDERS) return buildSearchIndexFromPlaceholders();
  return fromDb;
}

export async function buildSearchIndexFromDatabase(): Promise<SearchResultItem[]> {
  const [articles, videos, podcasts] = await Promise.all([
    getPublishedArticles({ limit: 200 }),
    getPublishedVideos(),
    getPublishedPodcasts(),
  ]);

  const videoItems: SearchResultItem[] = videos.map((video) => ({
    id: `vid_${video.id}`,
    type: 'Vidéo',
    dateIso: video.publishedAt ?? new Date().toISOString(),
    title: video.title,
    excerpt: video.description,
    link: video.href,
    tags: [...video.tags, video.category, video.format].filter(Boolean),
  }));

  const podcastItems: SearchResultItem[] = podcasts.map((podcast) => ({
    id: `pod_${podcast.id}`,
    type: 'Podcast',
    dateIso: podcast.publishedAt ?? new Date().toISOString(),
    title: podcast.subtitle ? `${podcast.title} — ${podcast.subtitle}` : podcast.title,
    excerpt: podcast.description,
    link: podcast.href,
    tags: [...podcast.tags, podcast.series, podcast.format].filter(Boolean),
  }));

  return [
    ...STATIC_PAGES,
    ...articles.map(articleToSearchItem),
    ...videoItems,
    ...podcastItems,
  ];
}
