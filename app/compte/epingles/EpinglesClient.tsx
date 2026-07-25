'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { BookmarkContentType, MediaBookmark } from '@/lib/bookmarks';
import { removeBookmarkAction } from './actions';

const TYPE_OPTIONS: Array<{ value: BookmarkContentType; label: string }> = [
  { value: 'article', label: 'Article' },
  { value: 'video', label: 'Vidéo' },
  { value: 'podcast', label: 'Podcast' },
];

const TYPE_LABEL: Record<BookmarkContentType, string> = {
  article: 'Article',
  video: 'Vidéo',
  podcast: 'Podcast',
};

const normalize = (str: string) =>
  str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';

type EpinglesClientProps = {
  bookmarks: MediaBookmark[];
};

export default function EpinglesClient({ bookmarks }: EpinglesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<BookmarkContentType[]>([]);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [openMenu, setOpenMenu] = useState<'type' | 'sort' | null>(null);

  const typeRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        openMenu === 'type' &&
        typeRef.current &&
        !typeRef.current.contains(target)
      ) {
        setOpenMenu(null);
      }
      if (
        openMenu === 'sort' &&
        sortRef.current &&
        !sortRef.current.contains(target)
      ) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [openMenu]);

  const toggleType = (type: BookmarkContentType) => {
    setSelectedTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type]
    );
  };

  const filtered = useMemo(() => {
    const query = normalize(searchQuery.trim());

    const next = bookmarks.filter((bookmark) => {
      if (selectedTypes.length > 0 && !selectedTypes.includes(bookmark.content_type)) {
        return false;
      }
      if (!query) return true;
      return (
        normalize(bookmark.title).includes(query) ||
        normalize(TYPE_LABEL[bookmark.content_type]).includes(query)
      );
    });

    next.sort((a, b) => {
      const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
      const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
      return sortOrder === 'desc' ? bTime - aTime : aTime - bTime;
    });

    return next;
  }, [bookmarks, searchQuery, selectedTypes, sortOrder]);

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col gap-[16px]">
        <p className="text-[15px] text-[#7F7F7F]">
          Vos articles, vidéos et podcasts sauvegardés sur Their memory.
        </p>
        <div className="rounded-[10px] border border-white/10 bg-surface p-[24px]">
          <p className="text-[#A3A3A3] text-[14px] mb-[20px] leading-[1.6]">
            Aucun contenu épinglé pour le moment. Parcourez le site et utilisez l&apos;icône
            d&apos;épingle pour les retrouver ici.
          </p>
          <div className="flex flex-wrap gap-[12px]">
            <Link
              href="/articles"
              className="h-[40px] px-[16px] inline-flex items-center rounded-[8px] bg-white text-black font-semibold text-[13px] hover:bg-[#e8e8e8] transition-colors"
            >
              Voir les articles
            </Link>
            <Link
              href="/videos"
              className="h-[40px] px-[16px] inline-flex items-center rounded-[8px] border border-white/15 text-white font-semibold text-[13px] hover:bg-white/5 transition-colors"
            >
              Voir les vidéos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <p className="text-[15px] text-[#7F7F7F]">
        {filtered.length} contenu{filtered.length !== 1 ? 's' : ''} épinglé
        {filtered.length !== 1 ? 's' : ''}
        {(searchQuery || selectedTypes.length > 0) && filtered.length !== bookmarks.length
          ? ` sur ${bookmarks.length}`
          : ''}
        .
      </p>

      <div className="bg-surface p-[20px] max-[900px]:p-[16px] rounded-[12px] border border-white/10 flex flex-col gap-[16px] relative z-[50]">
        <div className="relative w-full">
          <svg
            className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#7F7F7F]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher dans vos épinglés…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[48px] bg-black border border-white/15 rounded-[8px] pl-[44px] pr-[16px] text-[15px] font-semibold text-white focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-[12px]">
          <div className="relative flex-1" ref={typeRef}>
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === 'type' ? null : 'type')}
              className="w-full flex items-center justify-between h-[48px] px-[16px] border border-white/15 bg-black hover:bg-white/5 rounded-[8px] text-[14px] font-semibold text-white"
            >
              Type de contenu {selectedTypes.length > 0 && `(${selectedTypes.length})`}
              <svg
                className={`w-[10px] h-[6px] transition-transform ${openMenu === 'type' ? 'rotate-180' : ''}`}
                viewBox="0 0 10 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>
            {openMenu === 'type' && (
              <div className="absolute top-[calc(100%+8px)] left-0 w-full md:w-[280px] bg-[#111] border border-white/15 shadow-xl rounded-[12px] p-[16px] z-[100]">
                {selectedTypes.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedTypes([])}
                    className="text-white text-[12px] font-semibold hover:underline mb-[12px] block text-right w-full"
                  >
                    Effacer
                  </button>
                )}
                <div className="flex flex-col gap-[12px]">
                  {TYPE_OPTIONS.map((option) => {
                    const checked = selectedTypes.includes(option.value);
                    return (
                      <label key={option.value} className="flex items-center gap-[12px] cursor-pointer group">
                        <div
                          className={`w-[20px] h-[20px] rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                            checked ? 'bg-white border-white' : 'border-white/25 group-hover:border-white'
                          }`}
                        >
                          {checked && (
                            <svg
                              className="w-[12px] h-[12px] text-black"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="3"
                              aria-hidden
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-[14px] transition-colors ${
                            checked
                              ? 'font-semibold text-white'
                              : 'text-[#A3A3A3] group-hover:text-white'
                          }`}
                        >
                          {option.label}
                        </span>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={checked}
                          onChange={() => toggleType(option.value)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className={`relative flex-1 ${openMenu === 'sort' ? 'z-[100]' : 'z-[10]'}`} ref={sortRef}>
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === 'sort' ? null : 'sort')}
              className="w-full flex items-center justify-between h-[48px] px-[16px] border border-white/15 bg-black hover:bg-white/5 rounded-[8px] text-[14px] font-semibold text-white"
            >
              Tri : {sortOrder === 'desc' ? 'Récents' : 'Anciens'}
              <svg
                className={`w-[10px] h-[6px] transition-transform ${openMenu === 'sort' ? 'rotate-180' : ''}`}
                viewBox="0 0 10 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>
            {openMenu === 'sort' && (
              <div className="absolute top-[calc(100%+8px)] right-0 max-[900px]:left-0 w-full md:w-[240px] bg-[#111] border border-white/15 shadow-xl rounded-[12px] p-[16px] flex flex-col z-[100]">
                <div className="flex flex-col gap-[12px]">
                  {(['desc', 'asc'] as const).map((order) => (
                    <button
                      key={order}
                      type="button"
                      onClick={() => {
                        setSortOrder(order);
                        setOpenMenu(null);
                      }}
                      className="flex items-center gap-[12px] cursor-pointer group text-left"
                    >
                      <div
                        className={`w-[20px] h-[20px] rounded-full border flex items-center justify-center transition-colors ${
                          sortOrder === order ? 'border-white' : 'border-white/25 group-hover:border-white'
                        }`}
                      >
                        {sortOrder === order && <div className="w-[10px] h-[10px] bg-white rounded-full" />}
                      </div>
                      <span
                        className={`text-[14px] transition-colors ${
                          sortOrder === order
                            ? 'font-semibold text-white'
                            : 'text-[#A3A3A3] group-hover:text-white'
                        }`}
                      >
                        {order === 'desc' ? 'Plus récents' : 'Plus anciens'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[10px] border border-dashed border-white/15 bg-surface p-[28px] text-center">
          <p className="text-[#A3A3A3] text-[14px] leading-[1.6]">
            Aucun épinglé ne correspond à votre recherche ou à vos filtres.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedTypes([]);
            }}
            className="mt-[16px] h-[40px] px-[16px] rounded-[8px] border border-white/15 text-white text-[13px] font-semibold hover:bg-white/5 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-[12px]">
          {filtered.map((bookmark) => (
            <li key={bookmark.id}>
              <div className="group flex items-center gap-[14px] p-[16px] rounded-[10px] bg-surface border border-white/10 hover:border-white/25 hover:shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-all">
                <Link
                  href={bookmark.href}
                  className="relative w-[72px] h-[54px] shrink-0 rounded-[8px] overflow-hidden bg-[#111] border border-white/5"
                >
                  {bookmark.thumbnail_url ? (
                    <Image
                      src={bookmark.thumbnail_url}
                      alt=""
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  ) : null}
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#7F7F7F] mb-[4px]">
                    {TYPE_LABEL[bookmark.content_type]}
                  </p>
                  <Link href={bookmark.href} className="block">
                    <p className="font-semibold text-[14px] text-white leading-snug line-clamp-2 group-hover:text-[#d4d4d4] transition-colors">
                      {bookmark.title}
                    </p>
                  </Link>
                </div>
                <form action={removeBookmarkAction}>
                  <input type="hidden" name="id" value={bookmark.id} />
                  <button
                    type="submit"
                    aria-label="Retirer des épinglés"
                    title="Retirer des épinglés"
                    className="w-[36px] h-[36px] rounded-[8px] border border-white/10 text-[#7F7F7F] flex items-center justify-center hover:text-[#FF3B3B] hover:border-[#FF3B3B]/30 hover:bg-[#FF3B3B]/10 transition-colors shrink-0"
                  >
                    <svg
                      className="w-[16px] h-[16px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
