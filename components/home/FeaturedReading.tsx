import Link from 'next/link';
import Image from 'next/image';
import type { PublicArticle } from '@/lib/articles';
import { categorySlugFromLabel } from '@/lib/site-config';
import { categoryHashtag } from '@/lib/category-styles';
import BookmarkButton from './BookmarkButton';
import SiteSection from '@/components/layout/SiteSection';
import SectionHeader from '@/components/layout/SectionHeader';
import ChevronRight from '@/components/ChevronRight';

function articleImage(article: PublicArticle) {
  return article.cover_image_url || article.thumbnail_url;
}

function ArticleActions({ slug }: { slug: string }) {
  return (
    <div className="flex items-center gap-[8px]">
      <Link
        href={`/articles/${slug}`}
        aria-label="Lire l'article"
        className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-[8px] border border-white/20 text-white hover:bg-white hover:text-black transition-all"
      >
        <svg className="w-[6px] h-[10px]" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 1l6 6-6 6" /></svg>
      </Link>
      <BookmarkButton slug={slug} className="!w-[40px] !h-[40px]" />
    </div>
  );
}

function SideArticle({ article }: { article: PublicArticle }) {
  const image = articleImage(article);
  const categorySlug = categorySlugFromLabel(article.category);

  return (
    <article className="group flex gap-[16px] items-start py-[20px] border-b border-white/10 last:border-b-0">
      <Link href={`/articles/${article.slug}`} className="relative w-[120px] h-[90px] shrink-0 rounded-[8px] overflow-hidden bg-[#111] max-[900px]:w-[100px] max-[900px]:h-[75px]">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="120px"
            className="object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-500"
          />
        ) : null}
      </Link>
      <div className="flex-1 min-w-0 flex flex-col gap-[8px]">
        <div className="flex items-start justify-between gap-[12px]">
          <div className="min-w-0">
            {categorySlug && (
              <Link
                href={`/articles?categorie=${categorySlug}`}
                className="text-[#7F7F7F] text-[11px] font-bold uppercase tracking-[0.1em] hover:text-white transition-colors"
              >
                {categoryHashtag(article.category)}
              </Link>
            )}
            <Link href={`/articles/${article.slug}`}>
              <h3 className="text-white text-[16px] font-bold leading-[1.35] mt-[6px] line-clamp-2 group-hover:text-[#d4d4d4] transition-colors">
                {article.title}
              </h3>
            </Link>
          </div>
          <ArticleActions slug={article.slug} />
        </div>
      </div>
    </article>
  );
}

export default function FeaturedReading({
  main,
  side,
}: {
  main: PublicArticle | null;
  side: PublicArticle[];
}) {
  if (!main && side.length === 0) return null;

  const mainImage = main ? articleImage(main) : null;
  const mainCategorySlug = main ? categorySlugFromLabel(main.category) : undefined;

  return (
    <SiteSection aria-labelledby="featured-reading-heading">
      <SectionHeader
        titleId="featured-reading-heading"
        title="À lire en ce moment"
        action={
          <Link
            href="/articles"
            className="inline-flex items-center gap-[8px] text-[#7F7F7F] text-[14px] font-semibold hover:text-white transition-colors whitespace-nowrap pb-[4px] group"
          >
            Tous les articles
            <ChevronRight className="w-[6px] h-[10px] transition-transform group-hover:translate-x-[2px]" />
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-[48px] max-[900px]:gap-[32px]">
          {main && (
            <article className="group flex flex-col">
              <Link
                href={`/articles/${main.slug}`}
                className="relative block w-full aspect-[16/10] rounded-[12px] overflow-hidden bg-[#111] mb-[24px]"
              >
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={main.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-cover grayscale-[20%] group-hover:scale-[1.02] transition-transform duration-700"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <div className="flex items-start justify-between gap-[16px]">
                <div className="min-w-0">
                  {mainCategorySlug && (
                    <Link
                      href={`/articles?categorie=${mainCategorySlug}`}
                      className="text-[#7F7F7F] text-[12px] font-bold uppercase tracking-[0.1em] hover:text-white transition-colors"
                    >
                      {categoryHashtag(main.category)}
                    </Link>
                  )}
                  <Link href={`/articles/${main.slug}`}>
                    <h3 className="text-white text-[26px] max-[900px]:text-[22px] font-bold leading-[1.25] mt-[10px] group-hover:text-[#d4d4d4] transition-colors">
                      {main.title}
                    </h3>
                  </Link>
                </div>
                <ArticleActions slug={main.slug} />
              </div>
            </article>
          )}

          <div className="flex flex-col">
            {side.map((article) => (
              <SideArticle key={article.id} article={article} />
            ))}
          </div>
        </div>
    </SiteSection>
  );
}
