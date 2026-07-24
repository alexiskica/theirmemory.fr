export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.theirmemory.fr';

export const INSTITUTIONAL_SITE_URL =
  process.env.NEXT_PUBLIC_INSTITUTIONAL_SITE_URL ?? 'https://www.theirmemory.org';

/** URL de commande du magazine papier (boutique ou formulaire) */
export const MAGAZINE_ORDER_URL =
  process.env.NEXT_PUBLIC_MAGAZINE_ORDER_URL ??
  `${INSTITUTIONAL_SITE_URL}/contact?subject=Commande%20magazine`;

export const SITE_NAME = 'Their memory';

/** Nom de la publication trimestrielle */
export const MAGAZINE_NAME = 'In memoriam';

export const ARTICLE_CATEGORIES = [
  { slug: 'actualites', label: 'Actualités' },
  { slug: 'culture', label: 'Culture' },
  { slug: 'politique', label: 'Politique' },
  { slug: 'militaire', label: 'Militaire' },
  { slug: 'resistance-deportation', label: 'Résistance & Déportation' },
  { slug: 'technologies', label: 'Technologies' },
  { slug: 'biographies', label: 'Biographies' },
] as const;

export type ArticleCategorySlug = (typeof ARTICLE_CATEGORIES)[number]['slug'];

const SLUG_TO_LABEL = Object.fromEntries(
  ARTICLE_CATEGORIES.map((c) => [c.slug, c.label])
) as Record<ArticleCategorySlug, string>;

const LABEL_TO_SLUG = Object.fromEntries(
  ARTICLE_CATEGORIES.map((c) => [c.label, c.slug])
) as Record<string, ArticleCategorySlug>;

export function categoryLabelFromSlug(slug: string): string | undefined {
  return SLUG_TO_LABEL[slug as ArticleCategorySlug];
}

export function categorySlugFromLabel(label: string): string | undefined {
  return LABEL_TO_SLUG[label];
}

export const MEDIA_NAV = [
  { href: '/articles', label: 'Articles', hasSubmenu: true },
  { href: '/magazine', label: 'Magazine', hasSubmenu: false },
  { href: '/videos', label: 'Vidéos', hasSubmenu: false },
  { href: '/podcasts', label: 'Podcasts', hasSubmenu: false },
] as const;

export const ORG_FOOTER_LINKS = [
  { href: `${INSTITUTIONAL_SITE_URL}/association/qui-sommes-nous`, label: 'Qui sommes-nous ?' },
  { href: `${INSTITUTIONAL_SITE_URL}/association/missions`, label: 'Nos missions' },
  { href: `${INSTITUTIONAL_SITE_URL}/association/actions`, label: 'Nos actions' },
  { href: `${INSTITUTIONAL_SITE_URL}/association/valeurs`, label: 'Nos valeurs' },
  { href: `${INSTITUTIONAL_SITE_URL}/association/chiffres-cles`, label: 'Nos chiffres clés' },
  { href: `${INSTITUTIONAL_SITE_URL}/association/histoire`, label: 'Notre histoire' },
  { href: `${INSTITUTIONAL_SITE_URL}/association/gouvernance`, label: 'Gouvernance' },
] as const;

export const SOCIAL_NETWORKS = [
  { name: 'Facebook', icon: '/footer/facebook.png', url: 'https://www.facebook.com/theirmemory.org' },
  { name: 'Instagram', icon: '/footer/instagram.png', url: 'https://www.instagram.com/theirmemory/' },
  { name: 'TikTok', icon: '/footer/tiktok.png', url: 'https://www.tiktok.com/@theirmemory.org' },
  { name: 'YouTube', icon: '/footer/youtube.png', url: 'https://www.youtube.com/@theirmemory' },
  { name: 'LinkedIn', icon: '/footer/linkedin.png', url: 'https://www.linkedin.com/company/85137727' },
] as const;
