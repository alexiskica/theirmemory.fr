type IconProps = { className?: string };

export function IconPlayCircle({ className, size = 72 }: IconProps & { size?: number }) {
  return (
    <span
      className={`relative inline-flex shrink-0 ${className ?? ''}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="absolute inset-0 rounded-full bg-black/35 backdrop-blur-md border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.45)]" />
      <span className="absolute inset-[5px] rounded-full bg-white shadow-[0_4px_20px_rgba(255,255,255,0.25)] flex items-center justify-center">
        <IconFilm className="w-[38%] h-[38%] text-black" />
      </span>
    </span>
  );
}

export function IconPodcastPlay({
  className,
  size = 52,
  light = false,
}: IconProps & { size?: number; light?: boolean }) {
  return (
    <span
      className={`relative inline-flex shrink-0 ${className ?? ''}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.45)]" />
      {light ? (
        <span className="absolute inset-[5px] rounded-full bg-white flex items-center justify-center">
          <IconHeadphones className="w-[48%] h-[48%] text-black" />
        </span>
      ) : (
        <span className="absolute inset-0 flex items-center justify-center">
          <IconHeadphones className="w-[48%] h-[48%] text-white" />
        </span>
      )}
    </span>
  );
}

export function IconHeadphones({ className }: IconProps) {
  return (
    <svg
      className={`block ${className ?? ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" strokeLinecap="round" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" fill="currentColor" stroke="none" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconWaveform({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="3" y="10" width="2.5" height="4" rx="1.25" opacity="0.5" />
      <rect x="7" y="7" width="2.5" height="10" rx="1.25" />
      <rect x="11" y="4" width="2.5" height="16" rx="1.25" />
      <rect x="15" y="7" width="2.5" height="10" rx="1.25" />
      <rect x="19" y="10" width="2.5" height="4" rx="1.25" opacity="0.5" />
    </svg>
  );
}

export function IconFilm({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 5v14M17 5v14M3 10h4M3 14h4M17 10h4M17 14h4" strokeLinecap="round" />
    </svg>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCalendar({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" strokeLinecap="round" />
    </svg>
  );
}

export function IconUser({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" strokeLinecap="round" />
    </svg>
  );
}

export function IconTag({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 12V6a2 2 0 0 1 2-2h6l8 8-8 8-8-8Z" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconGlobe({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" strokeLinecap="round" />
    </svg>
  );
}

export function IconLayers({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="m12 4 9 5-9 5-9-5 9-5Z" strokeLinejoin="round" />
      <path d="m3 14 9 5 9-5M3 10l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconInfo({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

export function IconAspectRatio({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M8 10v4M16 10v4" strokeLinecap="round" />
    </svg>
  );
}
