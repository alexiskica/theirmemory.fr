"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ChevronRight from '@/components/ChevronRight';
import MediaCarousel from '@/components/home/MediaCarousel';
import MediaPreviewModal from '@/components/home/MediaPreviewModal';
import PageHero from '@/components/layout/PageHero';
import SectionHeader from '@/components/layout/SectionHeader';
import SiteSection from '@/components/layout/SiteSection';
import { categoryHashtag } from '@/lib/category-styles';
import { videoToMediaPreview, type MediaPreviewItem } from '@/lib/media-preview';
import type { PublicVideo } from '@/lib/media-types';
import { categoryLabelFromSlug } from '@/lib/site-config';

type VideosClientProps = {
  horizontalVideos: PublicVideo[];
  verticalVideos: PublicVideo[];
};

function filterByCategory<T extends { category: string }>(items: T[], categoryLabel?: string) {
  if (!categoryLabel) return items;
  return items.filter((item) => item.category === categoryLabel);
}

function VideosContent({ horizontalVideos, verticalVideos }: VideosClientProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('categorie');
  const activeLabel = activeCategory ? categoryLabelFromSlug(activeCategory) : undefined;
  const [preview, setPreview] = useState<MediaPreviewItem | null>(null);

  const filteredHorizontal = useMemo(
    () => filterByCategory(horizontalVideos, activeLabel),
    [horizontalVideos, activeLabel]
  );
  const filteredVertical = useMemo(
    () => filterByCategory(verticalVideos, activeLabel),
    [verticalVideos, activeLabel]
  );

  const pageTitle = activeLabel ?? 'Vidéos';
  const hasResults = filteredHorizontal.length > 0 || filteredVertical.length > 0;

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
          {filteredHorizontal.length > 0 && (
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
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => setPreview(videoToMediaPreview(video, 'horizontal'))}
                    className="group shrink-0 w-[560px] max-[900px]:w-[calc(100vw-48px)] text-left cursor-pointer"
                  >
                    <div className="mb-[14px] transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                      <div className="relative aspect-video rounded-[12px] border border-white/5 group-hover:border-white/15 bg-[#111]">
                        <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                          {video.thumbnailUrl ? (
                            <Image
                              src={video.thumbnailUrl}
                              alt=""
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-black" />
                          )}
                          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_100%)]" />
                        </div>
                      </div>
                    </div>
                    <p className="text-white text-[15px] font-bold leading-snug line-clamp-2 group-hover:text-[#d4d4d4] transition-colors">
                      {video.title}
                    </p>
                    {(video.category || video.duration) && (
                      <p className="text-[#404040] text-[13px] mt-[4px] line-clamp-1">
                        {[video.category ? categoryHashtag(video.category) : null, video.duration]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    )}
                  </button>
                ))}
              </MediaCarousel>
            </SiteSection>
          )}

          {filteredVertical.length > 0 && (
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
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => setPreview(videoToMediaPreview(video, 'vertical'))}
                    className="group shrink-0 w-[200px] max-[900px]:w-[160px] text-left cursor-pointer"
                  >
                    <div className="mb-[14px] transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                      <div className="relative aspect-[9/16] rounded-[12px] border border-white/5 group-hover:border-white/15 bg-[#111]">
                        <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                          {video.thumbnailUrl ? (
                            <Image
                              src={video.thumbnailUrl}
                              alt=""
                              fill
                              sizes="200px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-b from-[#222] via-[#111] to-black" />
                          )}
                          <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_center,transparent_20%,black_100%)]" />
                        </div>
                      </div>
                    </div>
                    <p className="text-white text-[15px] font-bold leading-snug line-clamp-2 group-hover:text-[#d4d4d4] transition-colors">
                      {video.title}
                    </p>
                    {(video.category || video.duration) && (
                      <p className="text-[#404040] text-[13px] mt-[4px] line-clamp-1">
                        {[video.category ? categoryHashtag(video.category) : null, video.duration]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    )}
                  </button>
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

export default function VideosClient({ horizontalVideos, verticalVideos }: VideosClientProps) {
  return (
    <Suspense fallback={<VideosFallback />}>
      <VideosContent horizontalVideos={horizontalVideos} verticalVideos={verticalVideos} />
    </Suspense>
  );
}
