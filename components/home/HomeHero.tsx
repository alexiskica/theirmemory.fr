"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { PublicArticle } from '@/lib/articles';
import { SITE_CONTAINER, SITE_PAGE_BG } from '@/lib/site-layout';
import { categoryHashtag } from '@/lib/category-styles';
import BookmarkButton from './BookmarkButton';

const AUTOPLAY_MS = 7000;

function articleImage(article: PublicArticle) {
  return article.cover_image_url || article.thumbnail_url;
}

export default function HomeHero({ articles }: { articles: PublicArticle[] }) {
  const [index, setIndex] = useState(0);
  const count = articles.length;

  const goTo = useCallback(
    (next: number) => {
      if (count <= 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [count]);

  if (count === 0) {
    return (
      <section className="relative w-full h-screen bg-band flex items-end">
        <div className={`${SITE_CONTAINER} pb-[80px]`}>
          <p className="text-[#7F7F7F] text-[18px]">Aucun article à la une pour le moment.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent to-black pointer-events-none" />
      </section>
    );
  }

  const current = articles[index];

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Articles à la une"
    >
      {/* Image track */}
      <div className="absolute inset-0">
        <div
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {articles.map((article, i) => {
            const slideImage = articleImage(article);
            return (
              <div key={article.id} className="relative w-full h-full flex-shrink-0">
                {slideImage ? (
                  <Image
                    src={slideImage}
                    alt={article.title}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover object-center grayscale-[25%]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#111]" />
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Text overlay */}
      <div className={`relative z-20 w-full h-full ${SITE_CONTAINER} flex flex-col justify-end pb-[120px] max-[900px]:pb-[100px]`}>
        <div key={current.id} className="max-w-[720px] animate-[fadeUp_0.5s_ease-out]">
          <p className="text-[#7F7F7F] text-[13px] font-bold uppercase tracking-[0.12em] mb-[20px]">
            {categoryHashtag(current.category)}
          </p>
          <h1 className="text-white text-[52px] max-[900px]:text-[32px] font-bold leading-[1.08] mb-[20px] text-balance">
            {current.title}
          </h1>
          {current.excerpt && (
            <p className="text-[#A3A3A3] text-[18px] max-[900px]:text-[16px] leading-[1.65] mb-[32px] line-clamp-3 max-w-[580px]">
              {current.excerpt}
            </p>
          )}
          <div className="flex items-center gap-[12px] flex-wrap">
            <Link
              href={`/articles/${current.slug}`}
              className="inline-flex items-center gap-[12px] bg-white text-black px-[22px] py-[12px] rounded-[8px] font-semibold text-[15px] transition-all hover:bg-[#e8e8e8] hover:gap-[16px]"
            >
              Lire l&apos;article
              <svg className="w-[6px] h-[10px]" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 1l6 6-6 6" /></svg>
            </Link>
            <BookmarkButton
              contentType="article"
              contentId={current.slug}
              title={current.title}
              href={`/articles/${current.slug}`}
              thumbnailUrl={articleImage(current)}
            />
          </div>
        </div>
      </div>

      {/* Transition dégradée vers le reste de la page (sous le texte et les boutons) */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none h-[280px] max-[900px]:h-[200px]"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.85) 65%, ${SITE_PAGE_BG} 100%)`,
        }}
      />

      {count > 1 && (
        <div className="absolute bottom-[48px] left-1/2 -translate-x-1/2 flex items-center gap-[10px] z-30">
          {articles.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === index ? 'w-[28px] h-[6px] bg-white' : 'w-[6px] h-[6px] bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
