'use client';

import Image from 'next/image';
import BookmarkButton from '@/components/home/BookmarkButton';
import { categoryHashtag } from '@/lib/category-styles';
import type { PublicVideo } from '@/lib/media-types';

type HorizontalVideoCardProps = {
  video: PublicVideo;
  onClick: () => void;
  className?: string;
};

export default function HorizontalVideoCard({ video, onClick, className = '' }: HorizontalVideoCardProps) {
  return (
    <div className={`group shrink-0 text-left ${className}`}>
      <div className="mb-[14px] transition-transform duration-300 ease-out group-hover:scale-[1.02]">
        <div className="relative aspect-video rounded-[12px] border border-white/5 group-hover:border-white/15 bg-[#111]">
          <button
            type="button"
            onClick={onClick}
            aria-label={`Voir ${video.title}`}
            className="absolute inset-0 z-0 cursor-pointer overflow-hidden rounded-[inherit]"
          >
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
          </button>
          <div className="absolute top-[10px] right-[10px] z-10">
            <BookmarkButton
              contentType="video"
              contentId={video.id}
              title={video.title}
              href={video.href}
              thumbnailUrl={video.thumbnailUrl}
              overlay
              className="!w-[40px] !h-[40px]"
            />
          </div>
        </div>
      </div>
      <button type="button" onClick={onClick} className="w-full text-left cursor-pointer">
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
    </div>
  );
}
