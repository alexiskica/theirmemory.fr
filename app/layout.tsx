import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { SyncLocalBookmarksOnLogin } from '@/components/home/BookmarkButton';
import { SITE_NAME, SITE_URL } from '@/lib/site-config';
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from '@/lib/seo';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Articles, magazine, vidéos et podcasts de Their memory : actualités, culture, histoire, Résistance et Déportation.',
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description:
      'Consultez les contenus produits par Their memory : articles, magazine, vidéos et podcasts.',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { other: { 'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [buildOrganizationJsonLd(), buildWebSiteJsonLd()];

  return (
    <html lang="fr">
      <head>
        <link rel="alternate" type="application/rss+xml" title={`${SITE_NAME} — Flux RSS`} href={`${SITE_URL}/feed.xml`} />
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
