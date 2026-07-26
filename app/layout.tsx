import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { SyncLocalBookmarksOnLogin } from '@/components/home/BookmarkButton';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_SITE_DESCRIPTION,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from '@/lib/seo';
import { SITE_NAME, SITE_URL } from '@/lib/site-config';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Articles, magazine, vidéos et podcasts`,
    template: `${SITE_NAME} — %s`,
  },
  description: DEFAULT_SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'news',
  keywords: [
    'Their memory',
    'Seconde Guerre mondiale',
    'Résistance',
    'Déportation',
    'histoire',
    'mémoire',
    'magazine',
    'podcasts',
    'vidéos',
    'actualités',
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': [
        { url: `${SITE_URL}/feed.xml`, title: `${SITE_NAME} — Articles` },
      ],
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Articles, magazine, vidéos et podcasts`,
    description: DEFAULT_SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Articles, magazine, vidéos et podcasts`,
    description: DEFAULT_SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/images/avatar_noir.png' }],
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [buildOrganizationJsonLd(), buildWebSiteJsonLd()];

  return (
    <html lang="fr">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE_NAME} — Flux RSS`}
          href={`${SITE_URL}/feed.xml`}
        />
        <link rel="sitemap" type="application/xml" href={`${SITE_URL}/sitemap.xml`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${openSans.variable} bg-page text-white font-['Open_Sans',sans-serif] antialiased`}>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <Suspense fallback={null}>
            <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_ID} />
          </Suspense>
        )}
        <Header />
        <SyncLocalBookmarksOnLogin />
        {children}
        <CookieConsent />
        <Footer />
      </body>
    </html>
  );
}
