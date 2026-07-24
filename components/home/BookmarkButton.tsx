"use client";

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'tm-bookmarks';

function readBookmarks(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export default function BookmarkButton({
  slug,
  className = '',
}: {
  slug: string;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readBookmarks().has(slug));
  }, [slug]);

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const next = readBookmarks();
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      setSaved(next.has(slug));
    },
    [slug]
  );

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={saved ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      aria-pressed={saved}
      className={`inline-flex items-center justify-center w-[44px] h-[44px] rounded-[8px] border transition-all duration-300 cursor-pointer ${
        saved
          ? 'bg-[#FFCC00] border-[#FFCC00] text-black hover:bg-[#e6b800] hover:border-[#e6b800]'
          : 'bg-transparent border-white/30 text-white hover:border-white hover:bg-white/10'
      } ${className}`}
    >
      <svg
        className="w-[18px] h-[18px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}
