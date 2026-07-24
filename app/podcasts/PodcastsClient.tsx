"use client";

import Link from 'next/link';
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ChevronRight from '@/components/ChevronRight';
import PageHero from '@/components/layout/PageHero';
import SectionHeader from '@/components/layout/SectionHeader';
import SiteSection from '@/components/layout/SiteSection';
import MediaPreviewModal from '@/components/home/MediaPreviewModal';
import PodcastCard from '@/components/media/PodcastCard';
import { podcastToMediaPreview, type MediaPreviewItem } from '@/lib/media-preview';
import type { PublicPodcast } from '@/lib/media-types';
import { ARTICLE_CATEGORIES, categoryLabelFromSlug } from '@/lib/site-config';

type CategorySection = {
  slug: string;
  label: string;
  podcasts: PublicPodcast[];
};

function groupPodcastsByCategory(podcasts: PublicPodcast[]): CategorySection[] {
  const byLabel = new Map<string, PublicPodcast[]>(
    ARTICLE_CATEGORIES.map((cat) => [cat.label, []])
  );

  for (const podcast of podcasts) {
    const bucket = byLabel.get(podcast.category);
    if (bucket) bucket.push(podcast);
  }

  return ARTICLE_CATEGORIES.map((cat) => ({
    slug: cat.slug,
    label: cat.label,
    podcasts: byLabel.get(cat.label) ?? [],
  })).filter((section) => section.podcasts.length > 0);
}

type PodcastsClientProps = {
  podcasts: PublicPodcast[];
};

function PodcastsContent({ podcasts }: PodcastsClientProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('categorie');
  const activeLabel = activeCategory ? categoryLabelFromSlug(activeCategory) : undefined;
  const [preview, setPreview] = useState<MediaPreviewItem | null>(null);

  const sections = useMemo(() => groupPodcastsByCategory(podcasts), [podcasts]);

  const visibleSections = useMemo(() => {
    if (!activeCategory) return sections;
    return sections.filter((section) => section.slug === activeCategory);
  }, [sections, activeCategory]);

  const pageTitle = activeLabel ?? 'Podcasts';

  return (
    <>
      <PageHero
        title={pageTitle}
        breadcrumbs={
          activeLabel
            ? [
                { label: 'Accueil', href: '/' },
                { label: 'Podcasts', href: '/podcasts' },
                { label: activeLabel },
              ]
            : [
                { label: 'Accueil', href: '/' },
                { label: 'Podcasts' },
              ]
        }
      />

      {visibleSections.length > 0 ? (
        visibleSections.map((section) => (
          <SiteSection
            key={section.slug}
            id={`podcasts-${section.slug}`}
            aria-labelledby={activeCategory ? undefined : `podcasts-${section.slug}-heading`}
          >
            {!activeCategory && (
              <SectionHeader
                titleId={`podcasts-${section.slug}-heading`}
                title={section.label}
                action={
                  <Link
                    href={`/podcasts?categorie=${section.slug}`}
                    className="inline-flex items-center gap-[8px] text-[#7F7F7F] text-[14px] font-semibold hover:text-white transition-colors whitespace-nowrap pb-[4px] group"
                  >
                    Voir la rubrique
                    <ChevronRight className="w-[6px] h-[10px] transition-transform group-hover:translate-x-[2px]" />
                  </Link>
                }
              />
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[32px] max-[900px]:gap-[24px]">
              {section.podcasts.map((podcast) => (
                <PodcastCard
                  key={podcast.id}
                  podcast={podcast}
                  onClick={() => setPreview(podcastToMediaPreview(podcast))}
                />
              ))}
            </div>
          </SiteSection>
        ))
      ) : (
        <SiteSection>
          <p className="text-[#A3A3A3] text-[16px]">
            {activeLabel
              ? `Aucun podcast dans la rubrique « ${activeLabel} » pour le moment.`
              : 'Aucun podcast publié pour le moment.'}
          </p>
          {activeLabel && (
            <Link
              href="/podcasts"
              className="inline-flex items-center gap-[8px] mt-[24px] text-white font-semibold hover:text-[#FFCC00] transition-colors"
            >
              Retour à tous les podcasts
              <ChevronRight className="w-[6px] h-[10px]" />
            </Link>
          )}
        </SiteSection>
      )}

      <MediaPreviewModal item={preview} onClose={() => setPreview(null)} />
    </>
  );
}

function PodcastsFallback() {
  return (
    <>
      <PageHero
        title="Podcasts"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Podcasts' },
        ]}
      />
      <SiteSection>
        <p className="text-[#404040] text-[16px]">Chargement...</p>
      </SiteSection>
    </>
  );
}

export default function PodcastsClient({ podcasts }: PodcastsClientProps) {
  return (
    <Suspense fallback={<PodcastsFallback />}>
      <PodcastsContent podcasts={podcasts} />
    </Suspense>
  );
}
