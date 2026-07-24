"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

type MediaCarouselProps = {
  children: ReactNode;
  /** Décalage de scroll (largeur carte + gap) */
  scrollStep?: number;
  ariaLabelPrev?: string;
  ariaLabelNext?: string;
};

function EdgeFade({ side, visible }: { side: 'left' | 'right'; visible: boolean }) {
  return (
    <div
      aria-hidden
      className={`absolute top-0 bottom-0 z-10 pointer-events-none transition-opacity duration-300 ${
        side === 'right'
          ? 'right-0 w-[128px] max-[900px]:w-[88px]'
          : 'left-0 w-[96px] max-[900px]:w-[64px]'
      } ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        background:
          side === 'right'
            ? 'linear-gradient(to left, #000 0%, rgba(0,0,0,0.92) 18%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.15) 82%, transparent 100%)'
            : 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.92) 18%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.15) 82%, transparent 100%)',
      }}
    />
  );
}

function NavButton({
  direction,
  onClick,
  ariaLabel,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`absolute ${direction === 'left' ? 'left-[8px] md:left-[4px]' : 'right-[8px] md:right-[4px]'} top-[38%] z-20 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-black/25 backdrop-blur-[4px] border border-white/10 text-white/80 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-black/50 hover:border-white/25 hover:text-white transition-all duration-300 cursor-pointer pointer-events-none group-hover/carousel:pointer-events-auto max-[900px]:hidden`}
    >
      <svg className="w-[8px] h-[14px]" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2.5">
        {direction === 'left' ? (
          <path d="M7 13L1 7l6-6" />
        ) : (
          <path d="M1 1l6 6-6 6" />
        )}
      </svg>
    </button>
  );
}

export default function MediaCarousel({
  children,
  scrollStep = 220,
  ariaLabelPrev = 'Précédent',
  ariaLabelNext = 'Suivant',
}: MediaCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);

  const updateFades = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const overflow = el.scrollWidth - el.clientWidth > 2;
    if (!overflow) {
      setFadeLeft(false);
      setFadeRight(false);
      return;
    }

    setFadeLeft(el.scrollLeft > 4);
    setFadeRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateFades();

    el.addEventListener('scroll', updateFades, { passive: true });
    window.addEventListener('resize', updateFades);

    const observer = new ResizeObserver(updateFades);
    observer.observe(el);

    return () => {
      el.removeEventListener('scroll', updateFades);
      window.removeEventListener('resize', updateFades);
      observer.disconnect();
    };
  }, [updateFades]);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -scrollStep : scrollStep,
      behavior: 'smooth',
    });
  };

  return (
    <div className="group/carousel relative overflow-hidden -mx-[24px] md:mx-0">
      <EdgeFade side="left" visible={fadeLeft} />
      <EdgeFade side="right" visible={fadeRight} />
      <NavButton direction="left" onClick={() => scroll('left')} ariaLabel={ariaLabelPrev} />
      <NavButton direction="right" onClick={() => scroll('right')} ariaLabel={ariaLabelNext} />

      <div
        ref={scrollRef}
        className="flex gap-[20px] overflow-x-auto scroll-smooth py-[6px] pl-[24px] pr-[24px] md:pl-0 md:pr-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {children}
      </div>
    </div>
  );
}
