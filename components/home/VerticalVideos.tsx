'use client';

import Link from 'next/link';
import { useState } from 'react';
import { videoToMediaPreview, type MediaPreviewItem } from '@/lib/media-preview';
import type { PublicVideo } from '@/lib/media-types';
import ChevronRight from '@/components/ChevronRight';
import VerticalVideoCard from '@/components/media/VerticalVideoCard';
import SiteSection from '@/components/layout/SiteSection';
import SectionHeader from '@/components/layout/SectionHeader';
import MediaCarousel from './MediaCarousel';
import MediaPreviewModal from './MediaPreviewModal';

type VerticalVideosProps = {
  videos: PublicVideo[];
};

export default function VerticalVideos({ videos }: VerticalVideosProps) {
  const [preview, setPreview] = useState<MediaPreviewItem | null>(null);

  if (videos.length === 0) return null;

  return (
    <>
      <SiteSection aria-labelledby="vertical-videos-heading">
        <SectionHeader
          titleId="vertical-videos-heading"
          title={
            <>
              En vidéos <span className="font-normal text-[#7F7F7F]">verticales</span>
            </>
          }
          action={
            <Link
              href="/videos"
              className="inline-flex items-center gap-[8px] text-[#7F7F7F] text-[14px] font-semibold hover:text-white transition-colors whitespace-nowrap group"
            >
              Voir tout
              <ChevronRight className="w-[6px] h-[10px] transition-transform group-hover:translate-x-[2px]" />
            </Link>
          }
        />

        <MediaCarousel scrollStep={220} ariaLabelPrev="Vidéo précédente" ariaLabelNext="Vidéo suivante">
          {videos.map((video) => (
            <VerticalVideoCard
              key={video.id}
              video={video}
              onClick={() => setPreview(videoToMediaPreview(video, 'vertical'))}
              className="shrink-0 w-[200px] max-[900px]:w-[160px]"
            />
          ))}
        </MediaCarousel>
      </SiteSection>

      <MediaPreviewModal item={preview} onClose={() => setPreview(null)} />
    </>
  );
}
