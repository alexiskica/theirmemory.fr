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

type FormatRail = {
  id: string;
  title: string;
  slug: string | null;
  videos: PublicVideo[];
};

function filterByCategory<T extends { category: string }>(items: T[], categoryLabel?: string) {
  if (!categoryLabel) return items;
  return items.filter((item) => item.category === categoryLabel);
}

function railsForAspect(
  rails: VideosPageRail[],
  aspect: '16:9' | '9:16',
  categoryLabel?: string
): FormatRail[] {
  return rails
    .map((rail) => ({
      id: rail.id,
      title: rail.title,
      slug: rail.slug,
      videos: filterByCategory(
        rail.videos.filter((video) =>
          aspect === '9:16' ? video.aspectRatio === '9:16' : video.aspectRatio !== '9:16'
        ),
        categoryLabel
      ),
    }))
    .filter((rail) => rail.videos.length > 0);
}

function VideosContent({ rails, horizontalVideos, verticalVideos }: VideosClientProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('categorie');
  const activeLabel = activeCategory ? categoryLabelFromSlug(activeCategory) : undefined;
  const [preview, setPreview] = useState<MediaPreviewItem | null>(null);

  const horizontalRails = useMemo(
    () => railsForAspect(rails, '16:9', activeLabel),
    [rails, activeLabel]
  );
  const verticalRails = useMemo(
    () => railsForAspect(rails, '9:16', activeLabel),
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
  const hasHorizontal = horizontalRails.length > 0 || filteredHorizontal.length > 0;
  const hasVertical = verticalRails.length > 0 || filteredVertical.length > 0;
  const hasResults = hasHorizontal || hasVertical;

  const openPreview = (video: PublicVideo, orientation: 'horizontal' | 'vertical') => {
    setPreview(videoToMediaPreview(video, orientation));
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
          {hasHorizontal && (
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

              {horizontalRails.length > 0 ? (
                <div className="flex flex-col gap-[40px] max-[900px]:gap-[28px]">
                  {horizontalRails.map((rail) => (
                    <div key={`h-${rail.id}`}>
                      <h3 className="text-white text-[22px] max-[900px]:text-[18px] font-semibold mb-[16px]">
                        {rail.title}
                      </h3>
                      <MediaCarousel
                        scrollStep={580}
                        ariaLabelPrev="Vidéo précédente"
                        ariaLabelNext="Vidéo suivante"
                      >
                        {rail.videos.map((video) => (
                          <HorizontalVideoCard
                            key={`${rail.id}-${video.id}`}
                            video={video}
                            onClick={() => openPreview(video, 'horizontal')}
                            className="shrink-0 w-[560px] max-[900px]:w-[calc(100vw-48px)]"
                          />
                        ))}
                      </MediaCarousel>
                    </div>
                  ))}
                </div>
              ) : (
                <MediaCarousel
                  scrollStep={580}
                  ariaLabelPrev="Vidéo précédente"
                  ariaLabelNext="Vidéo suivante"
                >
                  {filteredHorizontal.map((video) => (
                    <HorizontalVideoCard
                      key={video.id}
                      video={video}
                      onClick={() => openPreview(video, 'horizontal')}
                      className="shrink-0 w-[560px] max-[900px]:w-[calc(100vw-48px)]"
                    />
                  ))}
                </MediaCarousel>
              )}
            </SiteSection>
          )}

          {hasVertical && (
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

              {verticalRails.length > 0 ? (
                <div className="flex flex-col gap-[40px] max-[900px]:gap-[28px]">
                  {verticalRails.map((rail) => (
                    <div key={`v-${rail.id}`}>
                      <h3 className="text-white text-[22px] max-[900px]:text-[18px] font-semibold mb-[16px]">
                        {rail.title}
                      </h3>
                      <MediaCarousel
                        scrollStep={220}
                        ariaLabelPrev="Vidéo précédente"
                        ariaLabelNext="Vidéo suivante"
                      >
                        {rail.videos.map((video) => (
                          <VerticalVideoCard
                            key={`${rail.id}-${video.id}`}
                            video={video}
                            onClick={() => openPreview(video, 'vertical')}
                            className="shrink-0 w-[200px] max-[900px]:w-[160px]"
                          />
                        ))}
                      </MediaCarousel>
                    </div>
                  ))}
                </div>
              ) : (
                <MediaCarousel
                  scrollStep={220}
                  ariaLabelPrev="Vidéo précédente"
                  ariaLabelNext="Vidéo suivante"
                >
                  {filteredVertical.map((video) => (
                    <VerticalVideoCard
                      key={video.id}
                      video={video}
                      onClick={() => openPreview(video, 'vertical')}
                      className="shrink-0 w-[200px] max-[900px]:w-[160px]"
                    />
                  ))}
                </MediaCarousel>
              )}
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
