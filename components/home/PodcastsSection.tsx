"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { podcastToMediaPreview, type MediaPreviewItem } from '@/lib/media-preview';
import type { PublicPodcast } from '@/lib/media-types';
import ChevronRight from '@/components/ChevronRight';
import SiteSection from '@/components/layout/SiteSection';
import SectionHeader from '@/components/layout/SectionHeader';
import MediaCarousel from './MediaCarousel';
import MediaPreviewModal from './MediaPreviewModal';

type PodcastsSectionProps = {
  podcasts: PublicPodcast[];
};

export default function PodcastsSection({ podcasts }: PodcastsSectionProps) {
  const [preview, setPreview] = useState<MediaPreviewItem | null>(null);

  if (podcasts.length === 0) return null;

  return (
    <>
      <SiteSection aria-labelledby="podcasts-heading">
        <SectionHeader
          titleId="podcasts-heading"
          title="Podcasts"
          action={
            <Link
              href="/podcasts"
              className="inline-flex items-center gap-[8px] text-[#7F7F7F] text-[14px] font-semibold hover:text-white transition-colors whitespace-nowrap group"
            >
              Tous les podcasts
              <ChevronRight className="w-[6px] h-[10px] transition-transform group-hover:translate-x-[2px]" />
            </Link>
          }
        />

        <MediaCarousel scrollStep={220} ariaLabelPrev="Podcast précédent" ariaLabelNext="Podcast suivant">
          {podcasts.map((podcast) => (
            <button
              key={podcast.id}
              type="button"
              onClick={() => setPreview(podcastToMediaPreview(podcast))}
              className="group shrink-0 w-[200px] max-[900px]:w-[160px] text-left cursor-pointer"
            >
              <div className="mb-[14px] transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                <div className="relative aspect-square rounded-[12px] overflow-hidden bg-[#111] border border-white/5 group-hover:border-white/15">
                  {podcast.thumbnailUrl ? (
                    <Image
                      src={podcast.thumbnailUrl}
                      alt=""
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0 opacity-80"
                        style={{ background: podcast.gradient }}
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_60%)]" />
                    </>
                  )}
                </div>
              </div>
              <p className="text-white text-[15px] font-bold leading-snug line-clamp-2 group-hover:text-[#d4d4d4] transition-colors">
                {podcast.title}
              </p>
              {podcast.subtitle && (
                <p className="text-[#404040] text-[13px] mt-[4px] line-clamp-1">
                  {podcast.subtitle}
                  {podcast.duration ? ` · ${podcast.duration}` : ''}
                </p>
              )}
            </button>
          ))}
        </MediaCarousel>
      </SiteSection>

      <MediaPreviewModal item={preview} onClose={() => setPreview(null)} />
    </>
  );
}
