/** Marges et espacements alignés sur theirmemory.org */

/** Fond de page — noir pur */
export const SITE_PAGE_BG = '#000000';

/** Bandeaux hero et footer */
export const SITE_BAND_BG = '#080808';

/** Surfaces surélevées — sections alternées dans le contenu */
export const SITE_SURFACE_BG = '#141414';

/** Conteneur principal — max 1200px, padding horizontal 24px */
export const SITE_CONTAINER = 'w-full max-w-[1200px] mx-auto px-[24px]';

/** Section de page (accueil, blocs de contenu) */
export const SITE_SECTION =
  'w-full pt-[80px] pb-[100px] max-[900px]:pt-[48px] max-[900px]:pb-[64px]';

/** En-tête de section (titre + lien) */
export const SITE_SECTION_HEADER =
  'flex items-end justify-between gap-[16px] mb-[48px] max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-[8px] max-[900px]:mb-[32px]';

/** Page intérieure — offset header fixe + padding bas */
export const SITE_PAGE_MAIN =
  'w-full min-h-screen pt-[184px] pb-[100px] max-[900px]:pt-[128px] max-[900px]:pb-[64px]';

/** Bandeau hero de page intérieure */
export const SITE_PAGE_HERO =
  'w-full pt-[184px] pb-[80px] max-[900px]:pt-[128px] max-[900px]:pb-[56px]';

/** Corps de page sous un hero */
export const SITE_PAGE_CONTENT =
  'w-full pt-[80px] pb-[100px] max-[900px]:pt-[48px] max-[900px]:pb-[64px]';

/** Contenu étroit (article, texte légal) */
export const SITE_PROSE = 'w-full max-w-[800px] mx-auto px-[24px]';

/** Titre de page intérieure (bandeau hero) */
export const SITE_PAGE_HERO_TITLE =
  'text-[48px] max-[900px]:text-[32px] font-bold leading-tight';

/** Titre de section (h2 homepage / listing) */
export const SITE_SECTION_TITLE =
  'text-[40px] max-[900px]:text-[32px] font-bold leading-tight';

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
