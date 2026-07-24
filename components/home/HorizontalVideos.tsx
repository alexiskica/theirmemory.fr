"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { categoryHashtag } from '@/lib/category-styles';
import { videoToMediaPreview, type MediaPreviewItem } from '@/lib/media-preview';
import type { PublicVideo } from '@/lib/media-types';
import ChevronRight from '@/components/ChevronRight';
import SiteSection from '@/components/layout/SiteSection';
import SectionHeader from '@/components/layout/SectionHeader';
import MediaCarousel from './MediaCarousel';
import MediaPreviewModal from './MediaPreviewModal';

type HorizontalVideosProps = {
  videos: PublicVideo[];
};

export default function HorizontalVideos({ videos }: HorizontalVideosProps) {
  const [preview, setPreview] = useState<MediaPreviewItem | null>(null);

  if (videos.length === 0) return null;

  return (
    <>
      <SiteSection aria-labelledby="horizontal-videos-heading">
        <SectionHeader
          titleId="horizontal-videos-heading"
          title={
            <>
              En vidéos <span className="font-normal text-[#7F7F7F]">horizontales</span>
            </>
          }
          action={
            <Link
              href="/videos"
              className="inline-flex items-center gap-[8px] text-[#7F7F7F] text-[14px] font-semibold hover:text-white transition-colors whitespace-nowrap group"
            >
              Toutes les vidéos
              <ChevronRight className="w-[6px] h-[10px] transition-transform group-hover:translate-x-[2px]" />
            </Link>
          }
        />

        <MediaCarousel scrollStep={580} ariaLabelPrev="Vidéo précédente" ariaLabelNext="Vidéo suivante">
          {videos.map((video) => (
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

      <MediaPreviewModal item={preview} onClose={() => setPreview(null)} />
    </>
  );
}
