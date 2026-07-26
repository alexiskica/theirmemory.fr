import type { Metadata } from 'next';
import MagazineCatalogClient from './MagazineCatalogClient';
import MagazineTeaserClient from './MagazineTeaserClient';
import { MAGAZINE_LAUNCHED } from '@/lib/magazine-config';
import { getLatestMagazineIssue } from '@/lib/magazine-data';
import { buildPageMetadata } from '@/lib/seo';
import { MAGAZINE_NAME, SITE_URL } from '@/lib/site-config';

const teaserDescription = `${MAGAZINE_NAME} arrive bientôt : un magazine trimestriel entièrement consacré à la Seconde Guerre mondiale. Enquêtes, portraits et dossiers iconographiques.`;

const catalogDescription = `${MAGAZINE_NAME} : un numéro trimestriel, chaque édition explorant une thématique de la Seconde Guerre mondiale. Commandez le dernier numéro, consultez gratuitement les éditions précédentes.`;

export const metadata: Metadata = {
  ...buildPageMetadata({
    pageDescription: MAGAZINE_LAUNCHED
      ? `Magazine ${MAGAZINE_NAME}`
      : `Magazine ${MAGAZINE_NAME} — bientôt`,
    description: MAGAZINE_LAUNCHED ? catalogDescription : teaserDescription,
    path: '/magazine',
  }),
};

export default function MagazinePage() {
  if (!MAGAZINE_LAUNCHED) {
    return (
      <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
        <MagazineTeaserClient />
      </main>
    );
  }

  const latest = getLatestMagazineIssue();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PublicationIssue',
    name: latest.title,
    issueNumber: String(latest.number),
    datePublished: latest.publishedAt,
    description: latest.description,
    isPartOf: {
      '@type': 'Periodical',
      name: MAGAZINE_NAME,
      issn: undefined,
    },
  };

  return (
    <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MagazineCatalogClient />
    </main>
  );
}
