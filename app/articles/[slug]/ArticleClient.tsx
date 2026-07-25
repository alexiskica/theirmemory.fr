"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import ArticleContentStyles from '@/components/article/ArticleContentStyles';
import BookmarkButton from '@/components/home/BookmarkButton';
import SiteSection from '@/components/layout/SiteSection';
import SectionHeader from '@/components/layout/SectionHeader';
import type { PublicArticle } from '@/lib/articles';
import { categoryColor } from '@/lib/category-styles';
import { categorySlugFromLabel } from '@/lib/site-config';
import { SITE_PAGE_CONTENT, SITE_PROSE, cn } from '@/lib/site-layout';

function formatDate(dateString: string | null) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getFileIcon(format: string) {
  const base = 'w-[24px] h-[24px] shrink-0';
  switch (format?.toUpperCase()) {
    case 'PDF':
      return (
        <svg className={`${base} text-[#E2574C]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'DOCX':
    case 'DOC':
      return (
        <svg className={`${base} text-[#2B579A]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    case 'DRIVE':
      return (
        <svg className={`${base} text-[#59B644]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      );
    default:
      return (
        <svg className={`${base} text-[#7F7F7F]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
  }
}

function ShareButton({
  platform,
  onClick,
}: {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'copy';
  onClick: () => void;
}) {
  const icons = {
    facebook: (
      <svg className="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
    twitter: (
      <svg className="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    copy: (
      <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
  };

  return (
    <button
      type="button"
      onClick={onClick}
      title={platform === 'copy' ? 'Copier le lien' : undefined}
      aria-label={platform === 'copy' ? 'Copier le lien' : `Partager sur ${platform}`}
      className="w-[36px] h-[36px] rounded-full bg-white/10 hover:bg-white flex items-center justify-center text-white hover:text-black transition-all border border-white/20 cursor-pointer"
    >
      {icons[platform]}
    </button>
  );
}

export default function ArticleClient({
  article,
  relatedArticles,
}: {
  article: PublicArticle;
  relatedArticles: PublicArticle[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const cover = article.cover_image_url || article.thumbnail_url;
  const color = categoryColor(article.category);
  const categorySlug = categorySlugFromLabel(article.category);

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'copy') => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        break;
    }
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG' && target.closest('figure')) {
      setLightboxImage((target as HTMLImageElement).src);
    }
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -scrollRef.current.clientWidth : scrollRef.current.clientWidth,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <ArticleContentStyles />
      <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
        {/* Hero plein écran */}
        <section className="relative w-full min-h-[100dvh] flex flex-col pt-[184px] max-[900px]:pt-[128px] pb-[64px] md:pb-[80px]">
          <div className="absolute inset-0 w-full h-full z-0">
            {cover ? (
              <Image src={cover} alt="" fill priority sizes="100vw" className="object-cover" />
            ) : (
              <div className="w-full h-full bg-[#111]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20 pointer-events-none" />
          </div>

          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-[24px] flex flex-col flex-1">
            <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-[8px] text-white/80 text-[14px] mb-[32px]">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/articles" className="hover:text-white transition-colors">Articles</Link>
              {categorySlug && (
                <>
                  <span>/</span>
                  <Link href={`/articles?categorie=${categorySlug}`} className="hover:text-white transition-colors">
                    {article.category}
                  </Link>
                </>
              )}
            </nav>

            <div className="mt-auto flex flex-col">
              <div className="flex flex-wrap items-center gap-[8px] mb-[24px]">
                {categorySlug && (
                  <Link
                    href={`/articles?categorie=${categorySlug}`}
                    className="text-[12px] font-bold uppercase tracking-wider px-[14px] py-[6px] rounded-[6px] text-white shadow-sm"
                    style={{ backgroundColor: color }}
                  >
                    {article.category}
                  </Link>
                )}
                {article.secondary_categories.map((cat) => {
                  const slug = categorySlugFromLabel(cat);
                  if (!slug) return null;
                  return (
                    <Link
                      key={cat}
                      href={`/articles?categorie=${slug}`}
                      className="text-[12px] font-semibold px-[12px] py-[6px] rounded-[6px] text-[#A3A3A3] border border-white/15 hover:text-white hover:border-white/30 transition-colors"
                    >
                      {cat}
                    </Link>
                  );
                })}
              </div>

              <h1 className="text-[48px] max-[900px]:text-[32px] font-bold text-white leading-[1.2] mb-[32px] max-w-[1000px]">
                {article.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[24px] border-t border-white/20 pt-[24px]">
                <div className="flex flex-col sm:flex-row sm:items-center gap-[12px] sm:gap-[16px] text-white/90 text-[15px] font-semibold">
                  {article.display_author && (
                    <span className="flex items-center gap-[6px] text-white">
                      <span className="w-[32px] h-[32px] rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <svg className="w-[16px] h-[16px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      {article.display_author}
                    </span>
                  )}
                  {article.display_author && (article.published_at || article.read_time) && (
                    <span className="w-[4px] h-[4px] rounded-full bg-white/50 hidden sm:block" />
                  )}
                  <div className="flex items-center gap-[12px] sm:gap-[16px]">
                    {article.published_at && (
                      <time dateTime={article.published_at} className="flex items-center gap-[6px]">
                        <svg className="w-[16px] h-[16px] text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(article.published_at)}
                      </time>
                    )}
                    {article.published_at && article.read_time && (
                      <span className="w-[4px] h-[4px] rounded-full bg-white/50" />
                    )}
                    {article.read_time && (
                      <span className="flex items-center gap-[6px]">
                        <svg className="w-[16px] h-[16px] text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {article.read_time} min de lecture
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-[12px]">
                  <BookmarkButton
                    contentType="article"
                    contentId={article.slug}
                    title={article.title}
                    href={`/articles/${article.slug}`}
                    thumbnailUrl={cover}
                    className="!w-[36px] !h-[36px] !rounded-full"
                  />
                  {(['facebook', 'twitter', 'linkedin', 'copy'] as const).map((p) => (
                    <ShareButton key={p} platform={p} onClick={() => handleShare(p)} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {article.cover_image_caption && (
            <div className="absolute bottom-[16px] left-[24px] z-20 group/caption">
              <button
                type="button"
                aria-label="Afficher la description de la couverture"
                className="w-[36px] h-[36px] rounded-full bg-black/45 backdrop-blur-sm border border-white/20 text-white/80 flex items-center justify-center hover:bg-black/65 hover:text-white hover:border-white/35 transition-colors cursor-pointer"
              >
                <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5M12 8h.01" strokeLinecap="round" />
                </svg>
              </button>
              <div
                role="tooltip"
                className="pointer-events-none absolute bottom-[calc(100%+10px)] left-0 w-max max-w-[min(480px,calc(100vw-48px))] px-[14px] py-[10px] rounded-[8px] bg-black/80 backdrop-blur-sm border border-white/15 text-white/90 text-[13px] leading-[1.5] opacity-0 translate-y-[4px] group-hover/caption:opacity-100 group-hover/caption:translate-y-0 group-focus-within/caption:opacity-100 group-focus-within/caption:translate-y-0 transition-all duration-200"
              >
                {article.cover_image_caption}
              </div>
            </div>
          )}

          {article.cover_image_credit && (
            <div className="absolute bottom-[16px] right-[24px] text-white/50 text-[11px] font-light uppercase tracking-wider z-10 hidden sm:block text-right max-w-[calc(100%-48px)] line-clamp-2">
              {article.cover_image_credit}
            </div>
          )}
        </section>

        {/* Corps de l'article */}
        <section className={cn('w-full', SITE_PAGE_CONTENT)}>
          <div className={SITE_PROSE}>
            {article.excerpt && (
              <p className="text-[22px] max-[900px]:text-[18px] font-semibold text-white mb-[32px] leading-[1.6]">
                {article.excerpt}
              </p>
            )}

            {article.html_content && (
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.html_content }}
                onClick={handleContentClick}
              />
            )}

            {article.slider_images.length > 0 && (
              <div className="my-[48px] relative w-full">
                <div
                  ref={scrollRef}
                  className="flex gap-[16px] overflow-x-auto snap-x snap-mandatory pb-[16px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  {article.slider_images.map((img, idx) => (
                    <figure key={idx} className="w-full shrink-0 snap-start flex flex-col">
                      <button
                        type="button"
                        onClick={() => setLightboxImage(img.url)}
                        className="w-full aspect-[4/3] relative rounded-[12px] overflow-hidden border border-white/10 cursor-pointer group"
                      >
                        <Image
                          src={img.url}
                          alt={`Photo ${idx + 1}`}
                          fill
                          sizes="(max-width: 800px) 100vw, 800px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </button>
                      {(img.caption || img.credit) && (
                        <figcaption className="mt-[8px] w-full max-w-full flex flex-col items-end gap-[4px] text-right">
                          {img.caption && (
                            <span className="w-full text-right text-[13px] text-[#A3A3A3] leading-[1.45]">
                              {img.caption}
                            </span>
                          )}
                          {img.credit && (
                            <span className="w-full text-right text-[11px] text-[#7F7F7F] font-light uppercase tracking-wide leading-[1.4]">
                              {img.credit}
                            </span>
                          )}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-[8px]">
                  <p className="text-[13px] text-[#7F7F7F] italic px-[8px]">Faites glisser pour voir plus de photos</p>
                  <div className="flex gap-[12px] max-[900px]:hidden">
                    <button
                      type="button"
                      onClick={() => scrollSlider('left')}
                      aria-label="Photo précédente"
                      className="w-[36px] h-[36px] rounded-full border border-white/20 bg-[#111] flex items-center justify-center hover:bg-white group transition-all cursor-pointer"
                    >
                      <svg className="w-[8px] h-[14px] text-white group-hover:text-black transition-colors" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 13L1 7l6-6" /></svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollSlider('right')}
                      aria-label="Photo suivante"
                      className="w-[36px] h-[36px] rounded-full border border-white/20 bg-[#111] flex items-center justify-center hover:bg-white group transition-all cursor-pointer"
                    >
                      <svg className="w-[8px] h-[14px] text-white group-hover:text-black transition-colors" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 1l6 6-6 6" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {article.attachments.length > 0 && (
              <>
                <div className="w-full h-[1px] bg-white/10 my-[64px]" />
                <div className="mb-[64px] bg-[#111] rounded-[16px] border border-white/10 p-[40px] max-[900px]:p-[24px]">
                  <h3 className="text-[24px] font-bold text-white mb-[32px]">Ressources associées</h3>
                  <div className="flex flex-col gap-[16px] w-full">
                    {article.attachments.map((doc, idx) => (
                      <a
                        key={idx}
                        href={doc.link}
                        download={doc.format !== 'DRIVE' ? true : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center w-full p-[16px] border border-white/10 rounded-[12px] hover:bg-white/5 hover:border-white/25 transition-all group"
                      >
                        <div className="shrink-0 mr-[16px] p-[10px] bg-black rounded-[8px] border border-white/10 group-hover:scale-105 transition-transform">
                          {getFileIcon(doc.format)}
                        </div>
                        <div className="flex flex-col flex-1 min-w-0 pr-[16px]">
                          <span className="text-white font-bold text-[15px] truncate">{doc.name}</span>
                          <span className="text-[#7F7F7F] text-[13px] font-semibold">{doc.size}</span>
                        </div>
                        <div className="shrink-0 text-[#7F7F7F] group-hover:text-white transition-colors">
                          {doc.format === 'DRIVE' ? (
                            <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          ) : (
                            <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}

            {article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-[12px] mt-[48px] pt-[32px] border-t border-white/10">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/recherche?q=${encodeURIComponent(tag)}`}
                    className="bg-[#111] text-[#A3A3A3] hover:bg-white/10 hover:text-white transition-colors px-[16px] py-[8px] rounded-[6px] text-[13px] font-semibold border border-white/10"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {relatedArticles.length > 0 && (
          <SiteSection aria-labelledby="related-articles-heading" className="bg-surface border-t border-white/10">
            <SectionHeader titleId="related-articles-heading" title="À lire aussi" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] max-[900px]:gap-[24px]">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </SiteSection>
        )}
      </main>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-[24px] cursor-zoom-out"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute top-[24px] right-[24px] text-white hover:text-[#A3A3A3] transition-colors w-[48px] h-[48px] flex items-center justify-center bg-white/10 rounded-full cursor-pointer"
            onClick={() => setLightboxImage(null)}
            aria-label="Fermer"
          >
            <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightboxImage}
            alt=""
            className="max-w-full max-h-[90vh] object-contain rounded-[8px]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
