import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { MAGAZINE_LAUNCHED } from '@/lib/magazine-config';
import MagazineCover from '@/components/magazine/MagazineCover';
import ChevronRight from '@/components/ChevronRight';
import PageHero from '@/components/layout/PageHero';
import SiteSection from '@/components/layout/SiteSection';
import {
  formatMagazineDate,
  getMagazineIssueBySlug,
  MAGAZINE_ISSUES,
} from '@/lib/magazine-data';
import { MAGAZINE_NAME, MAGAZINE_ORDER_URL, SITE_URL } from '@/lib/site-config';
import { buildPageMetadata, formatSiteTitle } from '@/lib/seo';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  if (!MAGAZINE_LAUNCHED) return [];
  return MAGAZINE_ISSUES.filter((issue) => !issue.isLatest).map((issue) => ({
    slug: issue.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const issue = getMagazineIssueBySlug(slug);

  if (!issue) {
    return {
      title: { absolute: formatSiteTitle('Numéro introuvable') },
    };
  }

  return buildPageMetadata({
    pageDescription: `${MAGAZINE_NAME} N°${issue.number} — ${issue.title}`,
    description: issue.description,
    path: `/magazine/${issue.slug}`,
  });
}

export default async function MagazineIssuePage({ params }: PageProps) {
  if (!MAGAZINE_LAUNCHED) redirect('/magazine');

  const { slug } = await params;
  const issue = getMagazineIssueBySlug(slug);

  if (!issue) notFound();

  if (issue.isLatest) {
    return (
      <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
        <PageHero
          title={`Numéro ${issue.number}`}
          breadcrumbs={[
            { label: 'Accueil', href: '/' },
            { label: 'Magazine', href: '/magazine' },
            { label: issue.season },
          ]}
        />
        <SiteSection>
          <p className="text-[#A3A3A3] text-[16px] leading-[1.7] mb-[24px] max-w-[560px]">
            Le dernier numéro est disponible à la commande. Les numéros précédents restent
            consultables gratuitement en ligne.
          </p>
          <Link
            href="/magazine"
            className="inline-flex items-center gap-[8px] text-white font-semibold hover:text-[#FFCC00] transition-colors"
          >
            Retour au magazine
            <ChevronRight className="w-[6px] h-[10px]" />
          </Link>
          <a
            href={issue.orderUrl ?? MAGAZINE_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center mt-[24px] h-[48px] px-[28px] bg-[#FFCC00] text-black font-semibold text-[15px] rounded-[8px] transition-all hover:bg-[#FFD633]"
          >
            Commander le numéro
          </a>
        </SiteSection>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
      <PageHero
        title={issue.title}
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Magazine', href: '/magazine' },
          { label: `N°${issue.number}` },
        ]}
      />

      <SiteSection>
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-[48px] max-[900px]:gap-[32px]">
          <MagazineCover issue={issue} className="w-full max-w-[320px] mx-auto lg:mx-0" />

          <div className="min-w-0">
            <p className="text-[#FFCC00] text-[13px] font-bold uppercase tracking-[0.1em] mb-[12px]">
              Numéro {issue.number} · {issue.season}
            </p>
            <p className="text-[#7F7F7F] text-[14px] font-bold uppercase tracking-[0.08em] mb-[10px]">
              Thématique · Seconde Guerre mondiale
            </p>
            <h2 className="text-white text-[28px] max-[900px]:text-[24px] font-bold leading-[1.2] mb-[12px]">
              {issue.ww2Theme}
            </h2>
            <p className="text-[#7F7F7F] text-[18px] font-semibold mb-[16px]">
              {issue.title} — {issue.subtitle}
            </p>
            <p className="text-[#A3A3A3] text-[16px] leading-[1.75] mb-[24px]">{issue.description}</p>

            <dl className="flex flex-wrap gap-x-[24px] gap-y-[8px] text-[14px] mb-[32px]">
              <div className="flex items-center gap-[8px]">
                <dt className="text-[#404040]">Parution</dt>
                <dd className="text-white font-semibold">{formatMagazineDate(issue.publishedAt)}</dd>
              </div>
              <div className="flex items-center gap-[8px]">
                <dt className="text-[#404040]">Format</dt>
                <dd className="text-white font-semibold">{issue.pageCount} pages</dd>
              </div>
              <div className="flex items-center gap-[8px]">
                <dt className="text-[#404040]">Accès</dt>
                <dd className="text-[#59B644] font-semibold">Gratuit</dd>
              </div>
            </dl>

            <div className="rounded-[12px] border border-white/10 bg-[#111] overflow-hidden">
              <div className="aspect-[4/3] max-[900px]:aspect-[3/4] relative bg-surface flex items-center justify-center">
                <div className="absolute inset-0 opacity-30" style={{ background: issue.coverGradient }} />
                <div className="relative z-10 text-center px-[24px]">
                  <svg
                    className="w-[48px] h-[48px] mx-auto mb-[16px] text-[#7F7F7F]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <p className="text-white text-[18px] font-bold mb-[8px]">Liseuse numérique</p>
                  <p className="text-[#7F7F7F] text-[14px] leading-[1.6] max-w-[360px] mx-auto">
                    La version interactive du numéro sera bientôt disponible via{' '}
                    <span className="text-white">magazine.theirmemory.fr</span>.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/magazine"
              className="inline-flex items-center gap-[8px] mt-[32px] text-[#7F7F7F] text-[14px] font-semibold hover:text-white transition-colors"
            >
              ← Tous les numéros
            </Link>
          </div>
        </div>
      </SiteSection>
    </main>
  );
}
