import Image from 'next/image';
import type { PublicPodcast } from '@/lib/media-types';

type PodcastCardProps = {
  podcast: PublicPodcast;
  onClick: () => void;
  className?: string;
};

export default function PodcastCard({ podcast, onClick, className = '' }: PodcastCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group block w-full text-left cursor-pointer ${className ?? ''}`}
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
              <div className="absolute inset-0 opacity-80" style={{ background: podcast.gradient }} />
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
  );
}
