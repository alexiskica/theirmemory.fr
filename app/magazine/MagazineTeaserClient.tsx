'use client';

import Link from 'next/link';
import MagazineCover from '@/components/magazine/MagazineCover';
import { MAGAZINE_ISSUES } from '@/lib/magazine-data';
import { MAGAZINE_NAME } from '@/lib/site-config';
import { SITE_SECTION_TITLE } from '@/lib/site-layout';

const TEASER_THEMES = [
  'Résistance',
  'Débarquement',
  'Holocauste',
  'Batailles du Pacifique',
  'Propagande',
  'Femmes en guerre',
  'L\'Occupation',
  'Libération',
  'Stratégie alliée',
  'Mémoire locale',
];

const PREVIEW_ISSUES = MAGAZINE_ISSUES.slice(0, 3);

const PILLARS = [
  {
    title: 'Une thématique par numéro',
    body: 'Chaque édition explore un angle précis de la Seconde Guerre mondiale — un sujet, une époque, un enjeu.',
  },
  {
    title: 'Enquêtes & portraits',
    body: 'Récits de terrain, biographies et dossiers pour comprendre les acteurs et les bascules du conflit.',
  },
  {
    title: 'Iconographie inédite',
    body: 'Archives, cartes et documents pour voir autrement les combats, les sociétés et les traces laissées.',
  },
];

export default function MagazineTeaserClient() {
  return (
    <>
      {/* Hero immersif */}
      <section className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-black">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[#FFCC00]/[0.07] blur-[120px] magazine-glow-a" />
          <div className="absolute top-[30%] -right-[15%] w-[55%] h-[55%] rounded-full bg-[#6b4a9e]/20 blur-[100px] magazine-glow-b" />
          <div className="absolute bottom-0 left-[20%] w-[60%] h-[40%] rounded-full bg-[#2a5c3a]/15 blur-[90px] magazine-glow-c" />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
        </div>

        {/* Couvertures flottantes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden max-[900px]:opacity-40" aria-hidden>
          <div className="absolute left-[4%] top-[22%] w-[200px] max-[1200px]:w-[160px] magazine-float-a opacity-80 -rotate-[12deg]">
            <MagazineCover issue={PREVIEW_ISSUES[0]} className="shadow-[0_32px_80px_rgba(0,0,0,0.6)]" />
          </div>
          <div className="absolute right-[6%] top-[18%] w-[220px] max-[1200px]:w-[180px] magazine-float-b opacity-70 rotate-[8deg]">
            <MagazineCover issue={PREVIEW_ISSUES[1]} className="shadow-[0_32px_80px_rgba(0,0,0,0.6)]" />
          </div>
          <div className="absolute left-[38%] bottom-[8%] w-[180px] max-[1200px]:w-[140px] max-[900px]:hidden magazine-float-c opacity-50 rotate-[4deg]">
            <MagazineCover issue={PREVIEW_ISSUES[2]} className="shadow-[0_32px_80px_rgba(0,0,0,0.6)]" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col flex-1 w-full max-w-[1200px] mx-auto px-[24px] pt-[184px] max-[900px]:pt-[128px] pb-[80px] max-[900px]:pb-[56px]">
          <nav
            aria-label="Fil d'Ariane"
            className="flex flex-wrap items-center gap-[8px] text-[#7F7F7F] text-[14px] mb-[48px] max-[900px]:mb-[32px] magazine-fade-up"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white font-semibold">Magazine</span>
          </nav>

          <div className="flex flex-col items-center text-center mx-auto max-w-[800px] mt-auto mb-auto py-[40px] max-[900px]:py-[24px]">
            <p className="inline-flex items-center gap-[10px] px-[16px] py-[8px] rounded-full border border-[#FFCC00]/30 bg-[#FFCC00]/10 text-[#FFCC00] text-[12px] font-bold uppercase tracking-[0.14em] mb-[28px] magazine-fade-up magazine-fade-up-delay-1">
              <span className="w-[6px] h-[6px] rounded-full bg-[#FFCC00] magazine-pulse-dot" />
              Lancement prochain
            </p>

            <h1
              className={`${SITE_SECTION_TITLE} text-white mb-[20px] magazine-fade-up magazine-fade-up-delay-2`}
            >
              {MAGAZINE_NAME}
            </h1>

            <p className="text-[#A3A3A3] text-[20px] max-[900px]:text-[17px] leading-[1.65] max-w-[560px] mb-[12px] magazine-fade-up magazine-fade-up-delay-3">
              Le magazine trimestriel entièrement consacré à la{' '}
              <span className="text-white font-semibold">Seconde Guerre mondiale</span>.
            </p>
            <p className="text-[#7F7F7F] text-[16px] max-[900px]:text-[15px] leading-[1.7] max-w-[520px] mb-[40px] magazine-fade-up magazine-fade-up-delay-4">
              Quatre numéros par an. Une thématique à chaque édition. Bientôt sur{' '}
              <span className="text-white font-semibold">theirmemory.fr</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-[12px] magazine-fade-up magazine-fade-up-delay-5">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center h-[48px] px-[28px] bg-[#FFCC00] text-black font-semibold text-[15px] rounded-[8px] transition-all hover:bg-[#FFD633]"
              >
                En attendant, lire nos articles
              </Link>
              <a
                href="#magazine-teaser-pillars"
                className="inline-flex items-center justify-center h-[48px] px-[28px] border border-white/20 text-white font-semibold text-[15px] rounded-[8px] transition-all hover:bg-white/10"
              >
                Découvrir le concept
              </a>
            </div>
          </div>
        </div>

        {/* Bandeau défilant */}
        <div className="relative z-10 border-t border-white/10 bg-band/80 backdrop-blur-sm py-[14px] overflow-hidden">
          <div className="magazine-marquee-track flex gap-[48px] whitespace-nowrap">
            {[...TEASER_THEMES, ...TEASER_THEMES].map((theme, i) => (
              <span
                key={`${theme}-${i}`}
                className="text-[#7F7F7F] text-[13px] font-bold uppercase tracking-[0.12em] flex items-center gap-[48px]"
              >
                {theme}
                <span className="text-[#FFCC00]/60" aria-hidden>
                  ◆
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Concept */}
      <section
        id="magazine-teaser-pillars"
        className="w-full pt-[80px] pb-[100px] max-[900px]:pt-[48px] max-[900px]:pb-[64px] bg-page border-t border-white/10"
      >
        <div className="w-full max-w-[1200px] mx-auto px-[24px]">
          <header className="mb-[48px] max-[900px]:mb-[32px] text-center">
            <p className="text-[#FFCC00] text-[12px] font-bold uppercase tracking-[0.12em] mb-[12px]">
              Le format
            </p>
            <h2 className={`${SITE_SECTION_TITLE} text-white`}>Un magazine, une histoire à la fois</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] max-[900px]:gap-[16px]">
            {PILLARS.map((pillar, index) => (
              <article
                key={pillar.title}
                className="group relative p-[28px] max-[900px]:p-[24px] rounded-[16px] border border-white/10 bg-band overflow-hidden transition-colors hover:border-white/20"
              >
                <span className="absolute top-[20px] right-[20px] text-[#FFCC00]/20 text-[48px] font-bold leading-none select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-white text-[20px] font-bold mb-[12px] pr-[40px]">{pillar.title}</h3>
                <p className="text-[#A3A3A3] text-[15px] leading-[1.7]">{pillar.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-[64px] max-[900px]:mt-[48px] flex flex-col items-center text-center">
            <p className="text-[#7F7F7F] text-[14px] font-semibold uppercase tracking-[0.1em] mb-[16px]">
              Publication trimestrielle
            </p>
            <div className="flex flex-wrap justify-center gap-[10px] mb-[32px]">
              {['Printemps', 'Été', 'Automne', 'Hiver'].map((season) => (
                <span
                  key={season}
                  className="px-[16px] py-[8px] rounded-full border border-white/10 bg-white/[0.03] text-[#A3A3A3] text-[13px] font-semibold"
                >
                  {season}
                </span>
              ))}
            </div>
            <p className="text-[#404040] text-[14px] leading-[1.6] max-w-[480px]">
              Version papier et consultation en ligne des numéros passés — le catalogue s&apos;ouvrira
              dès la parution du premier numéro.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
