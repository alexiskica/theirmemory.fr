import Image from 'next/image';
import { categoryHashtag } from '@/lib/category-styles';
import type { PublicVideo } from '@/lib/media-types';

type VerticalVideoCardProps = {
  video: PublicVideo;
  onClick: () => void;
  className?: string;
};

export default function VerticalVideoCard({ video, onClick, className = '' }: VerticalVideoCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group block w-full text-left cursor-pointer ${className ?? ''}`}
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
  );
}
