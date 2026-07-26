import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';

const PRIVATE_PATHS = [
  '/compte',
  '/login',
  '/inscription',
  '/mot-de-passe-oublie',
  '/auth/',
  '/api/',
  '/recherche',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: 'Googlebot-News',
        allow: ['/', '/articles/', '/news-sitemap.xml', '/feed.xml', '/sitemap.xml'],
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/news-sitemap.xml`],
    host: SITE_URL.replace(/^https?:\/\//, '').replace(/\/$/, ''),
  };
}
