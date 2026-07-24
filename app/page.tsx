import type { Metadata } from 'next';
import HomeHero from '@/components/home/HomeHero';
import FeaturedReading from '@/components/home/FeaturedReading';
import HorizontalVideos from '@/components/home/HorizontalVideos';
import VerticalVideos from '@/components/home/VerticalVideos';
import PodcastsSection from '@/components/home/PodcastsSection';
import { getHomepageData } from '@/lib/homepage';
import { getHomepageMediaData } from '@/lib/media';
import { SITE_NAME, SITE_URL } from '@/lib/site-config';
import { buildWebSiteJsonLd } from '@/lib/seo';

export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description:
    'Articles, magazine, vidéos et podcasts Their memory : histoire, mémoire, Résistance, biographies et actualités.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: SITE_NAME,
    description:
      'Découvrez les contenus de Their memory : articles, vidéos et podcasts sur l\'histoire et la mémoire.',
    url: SITE_URL,
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE_NAME,
  },
};

export default async function HomePage() {
  const [{ heroArticles, featuredReading }, media] = await Promise.all([
    getHomepageData(),
    getHomepageMediaData(),
  ]);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'À la une — Their memory',
    itemListElement: heroArticles.slice(0, 5).map((article, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/articles/${article.slug}`,
      name: article.title,
    })),
  };

  return (
    <main className="w-full min-h-screen bg-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([buildWebSiteJsonLd(), itemListJsonLd]),
        }}
      />

      <HomeHero articles={heroArticles} />

      <div className="relative bg-page -mt-[1px]">
        <FeaturedReading main={featuredReading.main} side={featuredReading.side} />
        <HorizontalVideos videos={media.horizontalVideos} />
        <VerticalVideos videos={media.verticalVideos} />
        <PodcastsSection podcasts={media.podcasts} />
      </div>
    </main>
  );
}
