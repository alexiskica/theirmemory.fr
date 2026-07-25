import Link from 'next/link';
import Image from 'next/image';
import BookmarkButton from '@/components/home/BookmarkButton';
import type { PublicArticle } from '@/lib/articles';
import { categorySlugFromLabel } from '@/lib/site-config';

const CATEGORY_COLORS: Record<string, string> = {
  Actualités: '#4C3FE0',
  Culture: '#E91E63',
  Politique: '#FF6600',
  Militaire: '#59B644',
  'Résistance & Déportation': '#FF3B3B',
  Technologies: '#00CFC1',
  Biographies: '#9333AA',
};

function formatDate(dateString: string | null) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function ArticleCard({ article }: { article: PublicArticle }) {
  const image = article.thumbnail_url || article.cover_image_url;
  const color = CATEGORY_COLORS[article.category] ?? '#4C3FE0';
  const categorySlug = categorySlugFromLabel(article.category);
  const href = `/articles/${article.slug}`;

  return (
    <article className="group flex flex-col bg-[#111111] border border-white/10 rounded-[12px] overflow-hidden hover:border-white/20 transition-colors">
      <div className="relative">
        <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-[#1a1a1a]">
          {image ? (
            <Image
              src={image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#666] text-[14px]">Their memory</div>
          )}
        </Link>
        <div className="absolute top-[10px] right-[10px] z-10">
          <BookmarkButton
            contentType="article"
            contentId={article.slug}
            title={article.title}
            href={href}
            thumbnailUrl={image}
            overlay
            className="!w-[40px] !h-[40px]"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 p-[20px] gap-[12px]">
        <div className="flex items-center gap-[12px] flex-wrap">
          {categorySlug && (
            <Link
              href={`/articles?categorie=${categorySlug}`}
              className="text-[12px] font-bold uppercase tracking-wide px-[10px] py-[4px] rounded-[4px] text-white"
              style={{ backgroundColor: color }}
            >
              {article.category}
            </Link>
          )}
          {article.published_at && (
            <time dateTime={article.published_at} className="text-[#888] text-[13px]">
              {formatDate(article.published_at)}
            </time>
          )}
        </div>
        <Link href={href}>
          <h2 className="text-white text-[18px] font-bold leading-[1.35] group-hover:text-[#e5e5e5] transition-colors line-clamp-3">
            {article.title}
          </h2>
        </Link>
        {article.excerpt && (
          <p className="text-[#A3A3A3] text-[14px] leading-[1.6] line-clamp-3 flex-1">{article.excerpt}</p>
        )}
        {article.display_author && (
          <p className="text-[#666] text-[13px]">Par {article.display_author}</p>
        )}
      </div>
    </article>
  );
}
