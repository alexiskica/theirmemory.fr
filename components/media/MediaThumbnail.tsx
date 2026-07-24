import Image from 'next/image';
import type { MediaAspectRatio } from '@/lib/media-types';

type MediaThumbnailProps = {
  aspectRatio: MediaAspectRatio;
  thumbnailUrl?: string | null;
  gradient?: string;
  title: string;
  className?: string;
};

const ASPECT_CLASS: Record<MediaAspectRatio, string> = {
  '16:9': 'aspect-video',
  '9:16': 'aspect-[9/16]',
  '1:1': 'aspect-square',
};

export default function MediaThumbnail({
  aspectRatio,
  thumbnailUrl,
  gradient,
  title,
  className = '',
}: MediaThumbnailProps) {
  const fallbackGradient =
    gradient ??
    (aspectRatio === '9:16'
      ? 'linear-gradient(to bottom, #222, #111, #000)'
      : aspectRatio === '1:1'
        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #0a0a0a 100%)'
        : 'linear-gradient(to bottom right, #1a1a1a, #0d0d0d, #000)');

  return (
    <div
      className={`relative overflow-hidden rounded-[inherit] ${ASPECT_CLASS[aspectRatio]} ${className}`}
    >
      {thumbnailUrl ? (
        <Image
          src={thumbnailUrl}
          alt=""
          fill
          sizes={
            aspectRatio === '16:9'
              ? '(max-width: 768px) 100vw, 50vw'
              : aspectRatio === '9:16'
                ? '200px'
                : '200px'
          }
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: fallbackGradient }} />
      )}
      <div
        className={`absolute inset-0 ${
          thumbnailUrl
            ? 'bg-gradient-to-t from-black/50 via-transparent to-transparent'
            : aspectRatio === '16:9'
              ? 'opacity-40 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_100%)]'
              : 'opacity-50 bg-[radial-gradient(ellipse_at_center,transparent_20%,black_100%)]'
        }`}
        aria-hidden
      />
      <span className="sr-only">{title}</span>
    </div>
  );
}
