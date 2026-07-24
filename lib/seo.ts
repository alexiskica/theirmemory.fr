import { SITE_NAME, SITE_URL } from '@/lib/site-config';
import type { PublicArticle } from '@/lib/articles';

export function buildNewsArticleJsonLd(article: PublicArticle) {
  const image = article.cover_image_url || article.thumbnail_url;
  const url = `${SITE_URL}/articles/${article.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: article.title,
    description: article.excerpt,
    image: image ? [image] : undefined,
    datePublished: article.published_at,
    dateModified: article.published_at,
    author: [
      {
        '@type': 'Person',
        name: article.display_author || 'Their memory',
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/horizontal_noir.png`,
      },
    },
    articleSection: article.category,
    keywords: article.tags.join(', '),
    isAccessibleForFree: true,
    inLanguage: 'fr-FR',
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
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/horizontal_noir.png`,
    sameAs: [
      'https://www.facebook.com/theirmemory.org',
      'https://www.instagram.com/theirmemory/',
      'https://www.youtube.com/@theirmemory',
      'https://www.linkedin.com/company/85137727',
    ],
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
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

export function buildArticleMetadata(article: PublicArticle) {
  const image = article.cover_image_url || article.thumbnail_url;
  const url = `${SITE_URL}/articles/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      type: 'article' as const,
      publishedTime: article.published_at ?? undefined,
      authors: [article.display_author || SITE_NAME],
      section: article.category,
      tags: article.tags,
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: article.title }]
        : undefined,
      siteName: SITE_NAME,
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: article.title,
      description: article.excerpt,
      images: image ? [image] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}
