import type { Metadata } from 'next';
import { INSTITUTIONAL_SITE_URL, SITE_NAME, SITE_URL, SOCIAL_NETWORKS } from '@/lib/site-config';
import type { PublicArticle } from '@/lib/articles';

/** Image Open Graph / Twitter par défaut (1200×630 recommandé) */
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/images/accueil.png`,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — médias, articles et mémoire`,
};

/** Logo carré pour schema.org / Google News (min. 112×112) */
export const PUBLISHER_LOGO_URL = `${SITE_URL}/images/avatar_noir.png`;

export const DEFAULT_SITE_DESCRIPTION =
  'Articles, magazine, vidéos et podcasts de Their memory : actualités, culture, histoire, Résistance et Déportation.';

export function articleAuthorName(article: PublicArticle): string {
  return article.display_author?.trim() || 'Rédaction Their memory';
}

export function articleModifiedAt(article: PublicArticle): string | null {
  return article.updated_at || article.published_at;
}

export function articleImageUrl(article: PublicArticle): string | null {
  return article.cover_image_url || article.thumbnail_url;
}

export function buildNewsArticleJsonLd(article: PublicArticle) {
  const image = articleImageUrl(article);
  const url = `${SITE_URL}/articles/${article.slug}`;
  const modified = articleModifiedAt(article);
  const authorName = articleAuthorName(article);

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${url}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: article.title.slice(0, 110),
    description: article.excerpt || undefined,
    image: image
      ? [
          {
            '@type': 'ImageObject',
            url: image,
            width: 1200,
            height: 630,
          },
        ]
      : undefined,
    datePublished: article.published_at,
    dateModified: modified,
    author: [
      {
        '@type': 'Person',
        name: authorName,
      },
    ],
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: PUBLISHER_LOGO_URL,
        width: 512,
        height: 512,
      },
      sameAs: SOCIAL_NETWORKS.map((s) => s.url),
    },
    articleSection: article.category,
    keywords: article.tags.length > 0 ? article.tags : undefined,
    wordCount: article.html_content
      ? article.html_content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length
      : undefined,
    timeRequired: article.read_time ? `PT${article.read_time}M` : undefined,
    isAccessibleForFree: true,
    inLanguage: 'fr-FR',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: 'Their memory — médias',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: PUBLISHER_LOGO_URL,
      width: 512,
      height: 512,
    },
    image: DEFAULT_OG_IMAGE.url,
    description: DEFAULT_SITE_DESCRIPTION,
    foundingDate: '2021',
    sameAs: [
      ...SOCIAL_NETWORKS.map((s) => s.url),
      INSTITUTIONAL_SITE_URL,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@theirmemory.org',
      availableLanguage: ['French'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '107 Rue Réaumur',
      addressLocality: 'Paris',
      postalCode: '75002',
      addressCountry: 'FR',
    },
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_SITE_DESCRIPTION,
    inLanguage: 'fr-FR',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/recherche?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildCollectionPageJsonLd(options: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: options.name,
    description: options.description,
    url: options.url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: 'fr-FR',
  };
}

export function formatSiteTitle(pageDescription: string): string {
  return `${SITE_NAME} — ${pageDescription}`;
}

export function formatArticleTitle(articleTitle: string): string {
  return `${articleTitle} | ${SITE_NAME}`;
}

/** Tronque une meta description pour les SERP Google (~155–160 caractères). */
export function truncateMetaDescription(text: string, maxLength = 158): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLength) return cleaned;
  const sliced = cleaned.slice(0, maxLength - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  return `${(lastSpace > 80 ? sliced.slice(0, lastSpace) : sliced).trimEnd()}…`;
}

/**
 * Métadonnées SERP standard :
 * titre = « Their memory — courte description de la page »
 * description = résumé un peu plus long pour le snippet Google
 */
export function buildPageMetadata(options: {
  /** Courte description affichée dans le titre Google (après le nom du site) */
  pageDescription: string;
  /** Description meta (snippet sous le titre) */
  description: string;
  path: string;
  type?: 'website' | 'article';
  images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
}): Metadata {
  const url = `${SITE_URL}${options.path === '/' ? '' : options.path}`;
  const images = options.images?.length ? options.images : [DEFAULT_OG_IMAGE];
  const title = formatSiteTitle(options.pageDescription);
  const description = truncateMetaDescription(options.description);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: options.type ?? 'website',
      locale: 'fr_FR',
      siteName: SITE_NAME,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((img) => img.url),
    },
  };
}

export function buildArticleMetadata(article: PublicArticle): Metadata {
  const image = articleImageUrl(article);
  const url = `${SITE_URL}/articles/${article.slug}`;
  const author = articleAuthorName(article);
  const modified = articleModifiedAt(article);
  const title = formatArticleTitle(article.title);
  const description = truncateMetaDescription(
    article.excerpt?.trim() ||
      `${article.category} — article publié par ${author} sur Their memory.`
  );

  const ogImages = image
    ? [{ url: image, width: 1200, height: 630, alt: article.title }]
    : [DEFAULT_OG_IMAGE];

  return {
    title: { absolute: title },
    description,
    authors: [{ name: author }],
    creator: author,
    publisher: SITE_NAME,
    category: article.category,
    keywords: [...article.tags, article.category, SITE_NAME].filter(Boolean),
    alternates: {
      canonical: url,
      types: {
        'application/rss+xml': `${SITE_URL}/feed.xml`,
      },
    },
    openGraph: {
      title: article.title,
      description,
      url,
      type: 'article',
      publishedTime: article.published_at ?? undefined,
      modifiedTime: modified ?? undefined,
      authors: [author],
      section: article.category,
      tags: article.tags,
      images: ogImages,
      siteName: SITE_NAME,
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: ogImages.map((img) => img.url),
    },
    other: {
      'article:published_time': article.published_at ?? '',
      'article:modified_time': modified ?? '',
      'article:section': article.category,
      ...(article.tags.length > 0
        ? { news_keywords: article.tags.slice(0, 10).join(', ') }
        : {}),
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

/** Échappe le texte pour insertion dans du XML */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function guessImageMimeType(url: string): string {
  const lower = url.toLowerCase();
  if (lower.includes('.png')) return 'image/png';
  if (lower.includes('.webp')) return 'image/webp';
  if (lower.includes('.gif')) return 'image/gif';
  if (lower.includes('.avif')) return 'image/avif';
  return 'image/jpeg';
}
