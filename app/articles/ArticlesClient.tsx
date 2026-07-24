"use client";

import Link from 'next/link';
import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import ChevronRight from '@/components/ChevronRight';
import PageHero from '@/components/layout/PageHero';
import SectionHeader from '@/components/layout/SectionHeader';
import SiteSection from '@/components/layout/SiteSection';
import { ARTICLE_CATEGORIES } from '@/lib/site-config';
import type { PublicArticle } from '@/lib/articles';

type CategorySection = {
  slug: string;
  label: string;
  articles: PublicArticle[];
};

function groupArticlesByCategory(articles: PublicArticle[]): CategorySection[] {
  const byLabel = new Map<string, PublicArticle[]>(
    ARTICLE_CATEGORIES.map((cat) => [cat.label, []])
  );

  for (const article of articles) {
    const bucket = byLabel.get(article.category);
    if (bucket) bucket.push(article);
  }

  return ARTICLE_CATEGORIES.map((cat) => ({
    slug: cat.slug,
    label: cat.label,
    articles: byLabel.get(cat.label) ?? [],
  })).filter((section) => section.articles.length > 0);
}

function ArticlesContent({ articles }: { articles: PublicArticle[] }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('categorie');
  const activeLabel = ARTICLE_CATEGORIES.find((c) => c.slug === activeCategory)?.label;

  const sections = useMemo(() => groupArticlesByCategory(articles), [articles]);

  const visibleSections = useMemo(() => {
    if (!activeCategory) return sections;
    return sections.filter((section) => section.slug === activeCategory);
  }, [sections, activeCategory]);

  const pageTitle = activeLabel ?? 'Articles';

  return (
    <>
      <PageHero
        title={pageTitle}
        breadcrumbs={
          activeLabel
            ? [
                { label: 'Accueil', href: '/' },
                { label: 'Articles', href: '/articles' },
                { label: activeLabel },
              ]
            : [
                { label: 'Accueil', href: '/' },
                { label: 'Articles' },
              ]
        }
      />

      {visibleSections.length > 0 ? (
        visibleSections.map((section) => (
          <SiteSection
            key={section.slug}
            id={`rubrique-${section.slug}`}
            aria-labelledby={activeCategory ? undefined : `articles-${section.slug}-heading`}
          >
            {!activeCategory && (
              <SectionHeader
                titleId={`articles-${section.slug}-heading`}
                title={section.label}
                action={
                  <Link
                    href={`/articles?categorie=${section.slug}`}
                    className="inline-flex items-center gap-[8px] text-[#7F7F7F] text-[14px] font-semibold hover:text-white transition-colors whitespace-nowrap pb-[4px] group"
                  >
                    Voir la rubrique
                    <ChevronRight className="w-[6px] h-[10px] transition-transform group-hover:translate-x-[2px]" />
                  </Link>
                }
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] max-[900px]:gap-[24px]">
              {section.articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </SiteSection>
        ))
      ) : (
        <SiteSection>
          <p className="text-[#A3A3A3] text-[16px]">
            {activeLabel
              ? `Aucun article dans la rubrique « ${activeLabel} » pour le moment.`
              : 'Aucun article publié pour le moment.'}
          </p>
          {activeLabel && (
            <Link
              href="/articles"
              className="inline-flex items-center gap-[8px] mt-[24px] text-white font-semibold hover:text-[#FFCC00] transition-colors"
            >
              Retour à toutes les rubriques
              <ChevronRight className="w-[6px] h-[10px]" />
            </Link>
          )}
        </SiteSection>
      )}
    </>
  );
}

function ArticlesFallback() {
  return (
    <>
      <PageHero
        title="Articles"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Articles' },
        ]}
      />
      <SiteSection>
        <p className="text-[#404040] text-[16px]">Chargement...</p>
      </SiteSection>
    </>
  );
}

export default function ArticlesClient({ articles }: { articles: PublicArticle[] }) {
  return (
    <Suspense fallback={<ArticlesFallback />}>
      <ArticlesContent articles={articles} />
    </Suspense>
  );
}
