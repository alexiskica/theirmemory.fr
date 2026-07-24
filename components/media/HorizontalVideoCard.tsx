import Image from 'next/image';
import { categoryHashtag } from '@/lib/category-styles';
import type { PublicVideo } from '@/lib/media-types';

type HorizontalVideoCardProps = {
  video: PublicVideo;
  onClick: () => void;
  className?: string;
};

export default function HorizontalVideoCard({ video, onClick, className = '' }: HorizontalVideoCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full text-left cursor-pointer ${className}`}
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
  );
}
