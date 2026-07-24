'use client';

import Link from 'next/link';
import { SITE_SECTION_TITLE } from '@/lib/site-layout';

const TEASER_THEMES = [
  'Témoignages',
  'Mémoire orale',
  'Résistance',
  'Débarquement',
  'Biographies',
  'Débats',
  'Analyses',
  'Commémorations',
  'Archives sonores',
  'Transmission',
];

const PREVIEW_GRADIENTS = [
  'linear-gradient(135deg, #2d1b4e 0%, #5b2d8e 50%, #1a0f2e 100%)',
  'linear-gradient(135deg, #1a3a2a 0%, #2d6b4a 50%, #0f1f18 100%)',
  'linear-gradient(135deg, #3d2b1a 0%, #8b5a2b 50%, #1f140a 100%)',
];

const PILLARS = [
  {
    title: 'Épisodes approfondis',
    body: 'Chaque podcast creuse un sujet — un événement, une figure, un débat mémoriel — en 20 à 45 minutes.',
  },
  {
    title: 'Voix & témoignages',
    body: 'Historiens, descendants, témoins : des voix directes pour compléter nos articles et nos vidéos.',
  },
  {
    title: 'À écouter partout',
    body: 'Sur theirmemory.fr et les plateformes d\'écoute : une nouvelle façon de suivre l\'actualité mémorielle.',
  },
];

function TeaserCover({ gradient, className = '' }: { gradient: string; className?: string }) {
  return (
    <div
      className={`relative aspect-square rounded-[12px] overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div className="absolute inset-0 opacity-90" style={{ background: gradient }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
      <div className="absolute inset-0 flex items-center justify-center text-white/50">
        <svg
          className="w-[40%] h-[40%] max-w-[64px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M4 10v4M8 8v8M12 6v12M16 9v6M20 11v2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

export default function PodcastsTeaserClient() {
  return (
    <>
      <section className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-black">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[#9333AA]/[0.12] blur-[120px] magazine-glow-a" />
          <div className="absolute top-[30%] -right-[15%] w-[55%] h-[55%] rounded-full bg-[#4C3FE0]/15 blur-[100px] magazine-glow-b" />
          <div className="absolute bottom-0 left-[20%] w-[60%] h-[40%] rounded-full bg-[#2a5c3a]/12 blur-[90px] magazine-glow-c" />
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

        <div className="absolute inset-0 pointer-events-none overflow-hidden max-[900px]:opacity-40" aria-hidden>
          <div className="absolute left-[6%] top-[24%] w-[180px] max-[1200px]:w-[150px] magazine-float-a opacity-80 -rotate-[10deg]">
            <TeaserCover gradient={PREVIEW_GRADIENTS[0]} />
          </div>
          <div className="absolute right-[8%] top-[20%] w-[200px] max-[1200px]:w-[160px] magazine-float-b opacity-70 rotate-[8deg]">
            <TeaserCover gradient={PREVIEW_GRADIENTS[1]} />
          </div>
          <div className="absolute left-[40%] bottom-[10%] w-[160px] max-[1200px]:w-[130px] max-[900px]:hidden magazine-float-c opacity-50 rotate-[4deg]">
            <TeaserCover gradient={PREVIEW_GRADIENTS[2]} />
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
            <span className="text-white font-semibold">Podcasts</span>
          </nav>

          <div className="flex flex-col items-center text-center mx-auto max-w-[800px] mt-auto mb-auto py-[40px] max-[900px]:py-[24px]">
            <p className="inline-flex items-center gap-[10px] px-[16px] py-[8px] rounded-full border border-[#9333AA]/40 bg-[#9333AA]/10 text-[#c084fc] text-[12px] font-bold uppercase tracking-[0.14em] mb-[28px] magazine-fade-up magazine-fade-up-delay-1">
              <span className="w-[6px] h-[6px] rounded-full bg-[#9333AA] magazine-pulse-dot" />
              Lancement prochain
            </p>

            <h1
              className={`${SITE_SECTION_TITLE} text-white mb-[20px] magazine-fade-up magazine-fade-up-delay-2`}
            >
              Podcasts
            </h1>

            <p className="text-[#A3A3A3] text-[20px] max-[900px]:text-[17px] leading-[1.65] max-w-[560px] mb-[12px] magazine-fade-up magazine-fade-up-delay-3">
              Bientôt, une voix Their memory pour{' '}
              <span className="text-white font-semibold">approfondir l&apos;histoire</span> au-delà de
              l&apos;écran.
            </p>
            <p className="text-[#7F7F7F] text-[16px] max-[900px]:text-[15px] leading-[1.7] max-w-[520px] mb-[40px] magazine-fade-up magazine-fade-up-delay-4">
              Témoignages, analyses et débats sur la mémoire, la Résistance et le conflit mondial —
              le premier épisode arrive très prochainement sur{' '}
              <span className="text-white font-semibold">theirmemory.fr</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-[12px] magazine-fade-up magazine-fade-up-delay-5">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center h-[48px] px-[28px] bg-[#9333AA] text-white font-semibold text-[15px] rounded-[8px] transition-all hover:bg-[#7c2d92]"
              >
                En attendant, lire nos articles
              </Link>
              <Link
                href="/videos"
                className="inline-flex items-center justify-center h-[48px] px-[28px] border border-white/20 text-white font-semibold text-[15px] rounded-[8px] transition-all hover:bg-white/10"
              >
                Découvrir nos vidéos
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 bg-band/80 backdrop-blur-sm py-[14px] overflow-hidden">
          <div className="magazine-marquee-track flex gap-[48px] whitespace-nowrap">
            {[...TEASER_THEMES, ...TEASER_THEMES].map((theme, i) => (
              <span
                key={`${theme}-${i}`}
                className="text-[#7F7F7F] text-[13px] font-bold uppercase tracking-[0.12em] flex items-center gap-[48px]"
              >
                {theme}
                <span className="text-[#9333AA]/60" aria-hidden>
                  ◆
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        id="podcasts-teaser-pillars"
        className="w-full pt-[80px] pb-[100px] max-[900px]:pt-[48px] max-[900px]:pb-[64px] bg-page border-t border-white/10"
      >
        <div className="w-full max-w-[1200px] mx-auto px-[24px]">
          <header className="mb-[48px] max-[900px]:mb-[32px] text-center">
            <p className="text-[#9333AA] text-[12px] font-bold uppercase tracking-[0.12em] mb-[12px]">
              Le format
            </p>
            <h2 className={`${SITE_SECTION_TITLE} text-white`}>L&apos;audio au service de la mémoire</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] max-[900px]:gap-[16px]">
            {PILLARS.map((pillar, index) => (
              <article
                key={pillar.title}
                className="group relative p-[28px] max-[900px]:p-[24px] rounded-[16px] border border-white/10 bg-band overflow-hidden transition-colors hover:border-white/20"
              >
                <span className="absolute top-[20px] right-[20px] text-[#9333AA]/20 text-[48px] font-bold leading-none select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-white text-[20px] font-bold mb-[12px] pr-[40px]">{pillar.title}</h3>
                <p className="text-[#A3A3A3] text-[15px] leading-[1.7]">{pillar.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-[64px] max-[900px]:mt-[48px] flex flex-col items-center text-center">
            <p className="text-[#7F7F7F] text-[14px] font-semibold uppercase tracking-[0.1em] mb-[16px]">
              Prochainement
            </p>
            <div className="flex flex-wrap justify-center gap-[10px] mb-[32px]">
              {['Séries thématiques', 'Épisodes autonomes', 'Invités experts', 'Archives commentées'].map(
                (label) => (
                  <span
                    key={label}
                    className="px-[16px] py-[8px] rounded-full border border-white/10 bg-white/[0.03] text-[#A3A3A3] text-[13px] font-semibold"
                  >
                    {label}
                  </span>
                )
              )}
            </div>
            <p className="text-[#404040] text-[14px] leading-[1.6] max-w-[480px]">
              Le catalogue s&apos;ouvrira dès la publication du premier épisode. En attendant, explorez
              nos articles et nos productions vidéo.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
