import type { Metadata } from 'next';
import RechercheClient from './RechercheClient';
import { buildSearchIndex } from '@/lib/search-data';
import { SITE_URL } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Résultats de recherche',
  description: 'Recherchez parmi les articles, vidéos, podcasts et pages du site média Their memory.',
  alternates: { canonical: `${SITE_URL}/recherche` },
  robots: { index: false, follow: true },
};

export default async function RecherchePage() {
  const initialData = await buildSearchIndex();

  return <RechercheClient initialData={initialData} />;
}
