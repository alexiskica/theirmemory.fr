'use client';

import Link from 'next/link';
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ChevronRight from '@/components/ChevronRight';
import MediaCarousel from '@/components/home/MediaCarousel';
import MediaPreviewModal from '@/components/home/MediaPreviewModal';
import HorizontalVideoCard from '@/components/media/HorizontalVideoCard';
import VerticalVideoCard from '@/components/media/VerticalVideoCard';
import PageHero from '@/components/layout/PageHero';
import SectionHeader from '@/components/layout/SectionHeader';
import SiteSection from '@/components/layout/SiteSection';
import { videoToMediaPreview, type MediaPreviewItem } from '@/lib/media-preview';
import type { PublicVideo, VideosPageRail } from '@/lib/media-types';
import { categoryLabelFromSlug } from '@/lib/site-config';

type VideosClientProps = {
  rails: VideosPageRail[];
  horizontalVideos: PublicVideo[];
  verticalVideos: PublicVideo[];
};

function filterByCategory<T extends { category: string }>(items: T[], categoryLabel?: string) {
  if (!categoryLabel) return items;
  return items.filter((item) => item.category === categoryLabel);
}

function VideosContent({ rails, horizontalVideos, verticalVideos }: VideosClientProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('categorie');
  const activeLabel = activeCategory ? categoryLabelFromSlug(activeCategory) : undefined;
  const [preview, setPreview] = useState<MediaPreviewItem | null>(null);

  const filteredRails = useMemo(
    () =>
      rails
        .map((rail) => ({
          ...rail,
          videos: filterByCategory(rail.videos, activeLabel),
        }))
        .filter((rail) => rail.videos.length > 0),
    [rails, activeLabel]
  );

  const filteredHorizontal = useMemo(
    () => filterByCategory(horizontalVideos, activeLabel),
    [horizontalVideos, activeLabel]
  );
  const filteredVertical = useMemo(
    () => filterByCategory(verticalVideos, activeLabel),
    [verticalVideos, activeLabel]
  );

  const pageTitle = activeLabel ?? 'Vidéos';
  const useCatalogFallback = filteredRails.length === 0;
  const hasResults =
    filteredRails.length > 0 ||
    (useCatalogFallback &&
      (filteredHorizontal.length > 0 || filteredVertical.length > 0));

  const openPreview = (video: PublicVideo) => {
    setPreview(
      videoToMediaPreview(
        video,
        video.aspectRatio === '9:16' ? 'vertical' : 'horizontal'
      )
    );
  };

  return (
    <>
      <PageHero
        title={pageTitle}
        breadcrumbs={
          activeLabel
            ? [
                { label: 'Accueil', href: '/' },
                { label: 'Vidéos', href: '/videos' },
                { label: activeLabel },
              ]
            : [
                { label: 'Accueil', href: '/' },
                { label: 'Vidéos' },
              ]
        }
      />

      {hasResults ? (
        <>
          {filteredRails.map((rail) => {
            const headingId = `rail-${rail.id}-heading`;
            const preferVertical = rail.aspectRatio === '9:16';
            const scrollStep = preferVertical ? 220 : 580;

            return (
              <SiteSection key={rail.id} id={`rail-${rail.slug || rail.id}`} aria-labelledby={headingId}>
                <SectionHeader titleId={headingId} title={rail.title} />

                <MediaCarousel
                  scrollStep={scrollStep}
                  ariaLabelPrev="Vidéo précédente"
                  ariaLabelNext="Vidéo suivante"
                >
                  {rail.videos.map((video) => {
                    const isVertical = preferVertical || video.aspectRatio === '9:16';
                    if (isVertical) {
                      return (
                        <VerticalVideoCard
                          key={`${rail.id}-${video.id}`}
                          video={video}
                          onClick={() => openPreview(video)}
                          className="shrink-0 w-[200px] max-[900px]:w-[160px]"
                        />
                      );
                    }
                    return (
                      <HorizontalVideoCard
                        key={`${rail.id}-${video.id}`}
                        video={video}
                        onClick={() => openPreview(video)}
                        className="shrink-0 w-[560px] max-[900px]:w-[calc(100vw-48px)]"
                      />
                    );
                  })}
                </MediaCarousel>
              </SiteSection>
            );
          })}

          {filteredHorizontal.length > 0 && useCatalogFallback && (
            <SiteSection
              id="videos-horizontales"
              aria-labelledby={activeLabel ? undefined : 'videos-horizontal-heading'}
            >
              {!activeLabel && (
                <SectionHeader
                  titleId="videos-horizontal-heading"
                  title={
                    <>
                      Vidéos <span className="font-normal text-[#7F7F7F]">horizontales</span>
                    </>
                  }
                />
              )}

              <MediaCarousel scrollStep={580} ariaLabelPrev="Vidéo précédente" ariaLabelNext="Vidéo suivante">
                {filteredHorizontal.map((video) => (
                  <HorizontalVideoCard
                    key={video.id}
                    video={video}
                    onClick={() => openPreview(video)}
                    className="shrink-0 w-[560px] max-[900px]:w-[calc(100vw-48px)]"
                  />
                ))}
              </MediaCarousel>
            </SiteSection>
          )}

          {filteredVertical.length > 0 && useCatalogFallback && (
            <SiteSection
              id="videos-verticales"
              aria-labelledby={activeLabel ? undefined : 'videos-vertical-heading'}
            >
              {!activeLabel && (
                <SectionHeader
                  titleId="videos-vertical-heading"
                  title={
                    <>
                      Vidéos <span className="font-normal text-[#7F7F7F]">verticales</span>
                    </>
                  }
                />
              )}

              <MediaCarousel scrollStep={220} ariaLabelPrev="Vidéo précédente" ariaLabelNext="Vidéo suivante">
                {filteredVertical.map((video) => (
                  <VerticalVideoCard
                    key={video.id}
                    video={video}
                    onClick={() => openPreview(video)}
                    className="shrink-0 w-[200px] max-[900px]:w-[160px]"
                  />
                ))}
              </MediaCarousel>
            </SiteSection>
          )}
        </>
      ) : (
        <SiteSection>
          <p className="text-[#A3A3A3] text-[16px]">
            {activeLabel
              ? `Aucune vidéo dans la rubrique « ${activeLabel} » pour le moment.`
              : 'Aucune vidéo publiée pour le moment.'}
          </p>
          {activeLabel && (
            <Link
              href="/videos"
              className="inline-flex items-center gap-[8px] mt-[24px] text-white font-semibold hover:text-[#FFCC00] transition-colors"
            >
              Retour à toutes les vidéos
              <ChevronRight className="w-[6px] h-[10px]" />
            </Link>
          )}
        </SiteSection>
      )}

      <MediaPreviewModal item={preview} onClose={() => setPreview(null)} />
    </>
  );
}

function VideosFallback() {
  return (
    <>
      <PageHero
        title="Vidéos"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Vidéos' },
        ]}
      />
      <SiteSection>
        <p className="text-[#404040] text-[16px]">Chargement...</p>
      </SiteSection>
    </>
  );
}

export default function VideosClient({
  rails,
  horizontalVideos,
  verticalVideos,
}: VideosClientProps) {
  return (
    <Suspense fallback={<VideosFallback />}>
      <VideosContent
        rails={rails}
        horizontalVideos={horizontalVideos}
        verticalVideos={verticalVideos}
      />
    </Suspense>
  );
}
