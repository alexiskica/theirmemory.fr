"use client";

import Image from 'next/image';
import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { categoryHashtag } from '@/lib/category-styles';
import {
  formatMediaDate,
  orientationLabel,
  type MediaPreviewItem,
} from '@/lib/media-preview';
import {
  IconAspectRatio,
  IconCalendar,
  IconClock,
  IconClose,
  IconFilm,
  IconGlobe,
  IconHeadphones,
  IconLayers,
  IconPlayCircle,
  IconPodcastPlay,
  IconTag,
  IconUser,
  IconWaveform,
} from '@/components/icons/MediaIcons';

type MediaPreviewModalProps = {
  item: MediaPreviewItem | null;
  onClose: () => void;
};

function MetaBadge({ children, accent }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-[10px] py-[4px] rounded-[4px] text-[12px] font-bold tracking-wide ${
        accent ? 'bg-[#46d369]/15 text-[#46d369]' : 'bg-white/10 text-[#d4d4d4]'
      }`}
    >
      {children}
    </span>
  );
}

function MetaLine({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-[10px] min-w-0">
      <span className="text-[#7F7F7F] mt-[2px] shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[#404040] text-[11px] font-semibold uppercase tracking-[0.08em]">{label}</p>
        <p className="text-[#d4d4d4] text-[13px] leading-snug">{value}</p>
      </div>
    </div>
  );
}

export default function MediaPreviewModal({ item, onClose }: MediaPreviewModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!item) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, handleClose]);

  if (!item) return null;

  const isVideo = item.kind === 'video';
  const isPodcast = !isVideo;
  const watchUrl = item.youtubeUrl?.trim() || null;
  const publishedLabel = formatMediaDate(item.publishedAt);
  const episodeLabel =
    item.episodeNumber != null
      ? `S${item.season ?? 1} · Ép. ${item.episodeNumber}`
      : null;

  const heroAspect =
    item.orientation === 'vertical'
      ? 'aspect-[9/16] max-h-[52vh] w-auto mx-auto'
      : item.orientation === 'square'
        ? 'aspect-square max-h-[42vh] w-auto mx-auto'
        : 'aspect-video w-full';

  const detailRows: Array<{ icon: ReactNode; label: string; value: string }> = [];

  if (item.series) {
    detailRows.push({
      icon: <IconLayers className="w-[15px] h-[15px]" />,
      label: 'Série',
      value: item.series,
    });
  }
  if (episodeLabel) {
    detailRows.push({
      icon: <IconWaveform className="w-[15px] h-[15px]" />,
      label: 'Épisode',
      value: episodeLabel,
    });
  }
  if (item.format) {
    detailRows.push({
      icon: isVideo ? <IconFilm className="w-[15px] h-[15px]" /> : <IconHeadphones className="w-[15px] h-[15px]" />,
      label: 'Format',
      value: item.format,
    });
  }
  if (item.language) {
    detailRows.push({
      icon: <IconGlobe className="w-[15px] h-[15px]" />,
      label: 'Langue',
      value: item.language,
    });
  }
  if (publishedLabel) {
    detailRows.push({
      icon: <IconCalendar className="w-[15px] h-[15px]" />,
      label: 'Publié le',
      value: publishedLabel,
    });
  }
  if (item.hosts?.length) {
    detailRows.push({
      icon: <IconUser className="w-[15px] h-[15px]" />,
      label: isPodcast ? 'Animateurs' : 'Production',
      value: item.hosts.join(', '),
    });
  }
  if (isVideo) {
    detailRows.push({
      icon: <IconAspectRatio className="w-[15px] h-[15px]" />,
      label: 'Ratio',
      value: orientationLabel(item.orientation),
    });
  }

  const watchLabel = isVideo ? 'Lecture' : 'Écouter';
  const watchAriaLabel = isVideo ? 'Regarder la vidéo' : 'Écouter le podcast';

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-start justify-center overflow-y-auto p-[16px] pt-[48px] pb-[48px] max-[900px]:p-[12px] max-[900px]:pt-[24px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-preview-title"
    >
      <button
        type="button"
        aria-label="Fermer"
        className="fixed inset-0 bg-black/78 backdrop-blur-[8px] animate-[fadeIn_0.25s_ease-out]"
        onClick={handleClose}
      />

      <div
        ref={dialogRef}
        className="relative w-full max-w-[920px] bg-[#141414] rounded-[10px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.85)] animate-[modalIn_0.3s_cubic-bezier(0.16,1,0.3,1)] my-auto"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fermer la fenêtre"
          className="absolute top-[12px] right-[12px] z-30 w-[36px] h-[36px] rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-white flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer"
        >
          <IconClose className="w-[18px] h-[18px]" />
        </button>

        {/* Hero */}
        <div className="relative w-full bg-black">
          <div className={`relative overflow-hidden ${heroAspect}`}>
            {item.thumbnailUrl ? (
              <Image
                src={item.thumbnailUrl}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 920px"
                className="object-cover"
                priority
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    item.gradient ?? 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                }}
              />
            )}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(0,0,0,0.65)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/40" />

            {isPodcast && (
              <div className="absolute top-[16px] left-[16px] flex items-center gap-[8px] text-white/70">
                <IconWaveform className="w-[20px] h-[20px]" />
              </div>
            )}

            {item.duration && (
              <div className="absolute bottom-[14px] right-[14px] z-20 inline-flex items-center gap-[6px] px-[10px] py-[5px] rounded-[4px] bg-black/70 backdrop-blur-sm border border-white/10 text-white text-[12px] font-semibold">
                <IconClock className="w-[13px] h-[13px]" />
                {item.duration}
              </div>
            )}

            {watchUrl ? (
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                aria-label={watchAriaLabel}
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {isVideo ? (
                    <IconPlayCircle size={80} />
                  ) : (
                    <IconPodcastPlay size={80} light />
                  )}
                </span>
              </a>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-[24px] text-center">
                <div className="mb-[20px]">
                  {isVideo ? (
                    <IconPlayCircle size={80} className="opacity-50" />
                  ) : (
                    <IconPodcastPlay size={80} light className="opacity-50" />
                  )}
                </div>
                <p className="text-white text-[16px] font-semibold mb-[8px]">
                  {isVideo ? 'Lecture bientôt disponible' : 'Écoute bientôt disponible'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="p-[24px] max-[900px]:p-[20px]">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-[8px] mb-[14px]">
            <MetaBadge accent>{isVideo ? 'Vidéo' : 'Podcast'}</MetaBadge>
            {item.format && <MetaBadge>{item.format}</MetaBadge>}
            {item.year && <MetaBadge>{item.year}</MetaBadge>}
            {item.category && (
              <MetaBadge>{categoryHashtag(item.category)}</MetaBadge>
            )}
            {item.duration && (
              <span className="inline-flex items-center gap-[5px] text-[#7F7F7F] text-[13px] font-semibold">
                <IconClock className="w-[14px] h-[14px]" />
                {item.duration}
              </span>
            )}
          </div>

          <h2 id="media-preview-title" className="text-white text-[26px] max-[900px]:text-[22px] font-bold leading-tight mb-[6px]">
            {item.title}
          </h2>

          {item.subtitle && (
            <p className="text-[#a3a3a3] text-[15px] font-medium mb-[14px] leading-snug">{item.subtitle}</p>
          )}

          {/* Inline meta strip */}
          <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[6px] mb-[18px] text-[#7F7F7F] text-[13px]">
            {publishedLabel && (
              <span className="inline-flex items-center gap-[6px]">
                <IconCalendar className="w-[14px] h-[14px]" />
                {publishedLabel}
              </span>
            )}
            {item.hosts?.length ? (
              <span className="inline-flex items-center gap-[6px]">
                <IconUser className="w-[14px] h-[14px]" />
                {item.hosts.join(' · ')}
              </span>
            ) : null}
            {isVideo && (
              <span className="inline-flex items-center gap-[6px]">
                <IconAspectRatio className="w-[14px] h-[14px]" />
                {orientationLabel(item.orientation)}
              </span>
            )}
            {item.language && (
              <span className="inline-flex items-center gap-[6px]">
                <IconGlobe className="w-[14px] h-[14px]" />
                {item.language}
              </span>
            )}
          </div>

          {/* Actions */}
          {watchUrl && (
            <div className="flex flex-wrap items-center gap-[10px] mb-[20px]">
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[10px] bg-white text-black px-[22px] py-[10px] rounded-[4px] font-bold text-[14px] hover:bg-[#e6e6e6] transition-colors"
              >
                {isVideo ? (
                  <IconFilm className="w-[16px] h-[16px]" />
                ) : (
                  <IconHeadphones className="w-[16px] h-[16px]" />
                )}
                {watchLabel}
              </a>
            </div>
          )}

          <p className="text-[#c8c8c8] text-[14px] leading-[1.65] mb-[20px]">{item.description}</p>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-[8px] mb-[20px]">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-[5px] px-[10px] py-[5px] rounded-full bg-white/[0.06] border border-white/10 text-[#a3a3a3] text-[12px] font-medium"
                >
                  <IconTag className="w-[11px] h-[11px] opacity-60" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Detail grid */}
          {detailRows.length > 0 && (
            <div className="pt-[18px] border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
              {detailRows.map((row) => (
                <MetaLine key={row.label} icon={row.icon} label={row.label} value={row.value} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
