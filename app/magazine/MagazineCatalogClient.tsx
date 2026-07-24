import Link from 'next/link';
import MagazineCover from '@/components/magazine/MagazineCover';
import PageHero from '@/components/layout/PageHero';
import SectionHeader from '@/components/layout/SectionHeader';
import SiteSection from '@/components/layout/SiteSection';
import { SITE_SECTION_TITLE } from '@/lib/site-layout';
import {
  formatMagazineDate,
  getArchiveMagazineIssues,
  getLatestMagazineIssue,
  magazineReaderPath,
  type MagazineIssue,
} from '@/lib/magazine-data';
import { MAGAZINE_NAME } from '@/lib/site-config';

function ArchiveIssueCard({ issue }: { issue: MagazineIssue }) {
  const href = magazineReaderPath(issue.slug);

  return (
    <article className="group flex flex-col">
      <Link
        href={href}
        className="block mb-[16px] rounded-[12px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        aria-label={`Consulter le numéro ${issue.number} — ${issue.ww2Theme}`}
      >
        <MagazineCover
          issue={issue}
          className="transition-transform duration-500 group-hover:scale-[1.02] group-hover:border-white/20 cursor-pointer"
        />
      </Link>
      <div className="flex flex-col flex-1 gap-[8px]">
        <p className="text-[#7F7F7F] text-[12px] font-bold uppercase tracking-[0.08em]">
          Numéro {issue.number} · {issue.season}
        </p>
        <h3 className="text-white text-[18px] font-bold leading-snug">{issue.ww2Theme}</h3>
        <p className="text-[#404040] text-[14px] leading-[1.6] line-clamp-2">{issue.title}</p>
      </div>
    </article>
  );
}

/** Catalogue complet — affiché quand NEXT_PUBLIC_MAGAZINE_LAUNCHED=true */
export default function MagazineCatalogClient() {
  const latest = getLatestMagazineIssue();
  const archives = getArchiveMagazineIssues();

  return (
    <>
      <PageHero
        title={MAGAZINE_NAME}
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Magazine' },
        ]}
        description={
          <>
            Le magazine <span className="text-white font-semibold">{MAGAZINE_NAME}</span> paraît{' '}
            <span className="text-white font-semibold">quatre fois par an</span>. Chaque numéro est
            entièrement consacré à une{' '}
            <span className="text-white font-semibold">thématique de la Seconde Guerre mondiale</span>{' '}
            : enquêtes, portraits et dossiers iconographiques pour approfondir un angle précis du
            conflit.
          </>
        }
      />

      <SiteSection aria-labelledby="magazine-latest-heading">
        <SectionHeader titleId="magazine-latest-heading" title="Dernier numéro" />

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-[48px] max-[900px]:gap-[32px] items-start">
          <MagazineCover issue={latest} priority className="w-full max-w-[380px] mx-auto lg:mx-0" />

          <div className="flex flex-col min-w-0">
            <p className="text-[#FFCC00] text-[13px] font-bold uppercase tracking-[0.1em] mb-[12px]">
              Numéro {latest.number} · {latest.season}
            </p>
            <p className="text-[#7F7F7F] text-[14px] font-bold uppercase tracking-[0.08em] mb-[10px]">
              Thématique
            </p>
            <h3 className="text-white text-[36px] max-[900px]:text-[28px] font-bold leading-[1.15] mb-[8px]">
              {latest.ww2Theme}
            </h3>
            <p className="text-[#7F7F7F] text-[18px] max-[900px]:text-[16px] font-semibold mb-[20px]">
              {latest.title} — {latest.subtitle}
            </p>
            <p className="text-[#A3A3A3] text-[16px] leading-[1.75] mb-[24px]">
              {latest.description}
            </p>

            <dl className="flex flex-wrap gap-x-[24px] gap-y-[8px] text-[14px] mb-[32px]">
              <div className="flex items-center gap-[8px]">
                <dt className="text-[#404040]">Parution</dt>
                <dd className="text-white font-semibold">{formatMagazineDate(latest.publishedAt)}</dd>
              </div>
              <div className="flex items-center gap-[8px]">
                <dt className="text-[#404040]">Format</dt>
                <dd className="text-white font-semibold">{latest.pageCount} pages</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-[8px] mb-[32px]">
              {latest.themes.map((theme) => (
                <span
                  key={theme}
                  className="px-[12px] py-[5px] rounded-full border border-white/10 bg-white/[0.03] text-[#7F7F7F] text-[12px] font-semibold"
                >
                  {theme}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-[12px]">
              <a
                href={latest.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-[48px] px-[28px] bg-[#FFCC00] text-black font-semibold text-[15px] rounded-[8px] transition-all hover:bg-[#FFD633]"
              >
                Commander le numéro
              </a>
              <p className="text-[#404040] text-[13px] sm:self-center leading-[1.5] max-w-[280px]">
                Version papier · livraison en France métropolitaine
              </p>
            </div>
          </div>
        </div>
      </SiteSection>

      {archives.length > 0 && (
        <SiteSection aria-labelledby="magazine-archives-heading">
          <header className="mb-[48px] max-[900px]:mb-[32px]">
            <h2 id="magazine-archives-heading" className={`${SITE_SECTION_TITLE} text-white`}>
              Numéros précédents
            </h2>
            <p className="mt-[16px] max-[900px]:mt-[12px] text-[#A3A3A3] text-[16px] leading-[1.7] max-w-[640px]">
              Retrouvez l&apos;ensemble des numéros parus en consultation libre et gratuite.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[32px] max-[900px]:gap-[24px]">
            {archives.map((issue) => (
              <ArchiveIssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </SiteSection>
      )}
    </>
  );
}
