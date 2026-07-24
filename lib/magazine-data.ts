import { MAGAZINE_ORDER_URL } from '@/lib/site-config';

export type MagazineIssue = {
  id: string;
  slug: string;
  number: number;
  season: string;
  /** Thématique centrale de la Seconde Guerre mondiale */
  ww2Theme: string;
  title: string;
  subtitle: string;
  description: string;
  publishedAt: string;
  pageCount: number;
  themes: readonly string[];
  coverGradient: string;
  coverImageUrl: string;
  /** Numéro en vente — pas de lecture libre en ligne */
  isLatest: boolean;
  orderUrl?: string;
};

/** Vignettes au ratio couverture A4 portrait (210 × 297 mm) */
function demoCover(seed: string) {
  return `https://picsum.photos/seed/theirmemory-mag-${seed}/595/842`;
}

export const MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    id: 'mag-8',
    slug: 'numero-8-ete-2026',
    number: 8,
    season: 'Été 2026',
    ww2Theme: 'La Libération de l\'Europe occidentale',
    title: 'De la Normandie au Reich',
    subtitle: 'Combats, politique et mémoire de la Libération',
    description:
      'Un numéro consacré aux opérations alliées de l\'été 1944, à la reconstruction des territoires libérés et aux récits qui structurent encore notre mémoire collective.',
    publishedAt: '2026-06-15',
    pageCount: 96,
    themes: ['Libération', 'Alliés', 'Mémoire locale'],
    coverGradient: 'linear-gradient(145deg, #1a1a2e 0%, #3d2b6e 45%, #0a0a0a 100%)',
    coverImageUrl: demoCover('8'),
    isLatest: true,
    orderUrl: MAGAZINE_ORDER_URL,
  },
  {
    id: 'mag-7',
    slug: 'numero-7-printemps-2026',
    number: 7,
    season: 'Printemps 2026',
    ww2Theme: 'Le Débarquement de Normandie',
    title: 'Overlord, 80 ans après',
    subtitle: 'Stratégie, plages et tournant de la guerre',
    description:
      'Retour sur la planification du 6 juin 1944, les opérations amphibies et l\'impact durable du Débarquement sur la mémoire normande et européenne.',
    publishedAt: '2026-03-15',
    pageCount: 92,
    themes: ['D-Day', 'Normandie', 'Opérations alliées'],
    coverGradient: 'linear-gradient(145deg, #1f2d1f 0%, #2a5c3a 45%, #0a0a0a 100%)',
    coverImageUrl: demoCover('7'),
    isLatest: false,
  },
  {
    id: 'mag-6',
    slug: 'numero-6-hiver-2025',
    number: 6,
    season: 'Hiver 2025',
    ww2Theme: 'La Résistance intérieure',
    title: 'Réseaux clandestins',
    subtitle: 'Maquis, renseignement et engagements',
    description:
      'De Londres aux zones rurales, exploration des réseaux de résistance, de leurs stratégies et des figures qui ont unifié la France combattante.',
    publishedAt: '2025-12-10',
    pageCount: 88,
    themes: ['Résistance', 'Maquis', 'Renseignement'],
    coverGradient: 'linear-gradient(145deg, #2d1f1f 0%, #5c2a2a 45%, #0a0a0a 100%)',
    coverImageUrl: demoCover('6'),
    isLatest: false,
  },
  {
    id: 'mag-5',
    slug: 'numero-5-automne-2025',
    number: 5,
    season: 'Automne 2025',
    ww2Theme: 'La Shoah et les camps d\'extermination',
    title: 'Politique de l\'extermination',
    subtitle: 'Déportation, camps et devoir de mémoire',
    description:
      'Analyse des mécanismes de la Shoah, des convois de déportation et des combats mémoriels qui traversent encore les sociétés européennes.',
    publishedAt: '2025-09-20',
    pageCount: 88,
    themes: ['Shoah', 'Déportation', 'Camps'],
    coverGradient: 'linear-gradient(145deg, #1f1f2d 0%, #3a3a5c 45%, #0a0a0a 100%)',
    coverImageUrl: demoCover('5'),
    isLatest: false,
  },
  {
    id: 'mag-4',
    slug: 'numero-4-ete-2025',
    number: 4,
    season: 'Été 2025',
    ww2Theme: 'La guerre du Pacifique',
    title: 'De Pearl Harbor à Hiroshima',
    subtitle: 'Théâtre asiatique et fin de la guerre',
    description:
      'Les opérations américaines et japonaises, les batailles décisives de l\'océan Pacifique et les enjeux de la capitulation du Japon.',
    publishedAt: '2025-06-18',
    pageCount: 84,
    themes: ['Pacifique', 'Japon', 'Batailles navales'],
    coverGradient: 'linear-gradient(145deg, #1f2d2d 0%, #2a5c5c 45%, #0a0a0a 100%)',
    coverImageUrl: demoCover('4'),
    isLatest: false,
  },
  {
    id: 'mag-3',
    slug: 'numero-3-printemps-2025',
    number: 3,
    season: 'Printemps 2025',
    ww2Theme: 'Le régime de Vichy',
    title: 'État français et Occupation',
    subtitle: 'Politique, collaboration et société',
    description:
      'Naissance du régime de Vichy, politiques antisémites, collaboration économique et résistances naissantes dans la France occupée.',
    publishedAt: '2025-03-12',
    pageCount: 84,
    themes: ['Vichy', 'Occupation', 'Politique'],
    coverGradient: 'linear-gradient(145deg, #2d241f 0%, #6b4a2a 45%, #0a0a0a 100%)',
    coverImageUrl: demoCover('3'),
    isLatest: false,
  },
  {
    id: 'mag-2',
    slug: 'numero-2-hiver-2024',
    number: 2,
    season: 'Hiver 2024',
    ww2Theme: 'Le front de l\'Est',
    title: 'Stalingrad et l\'effondrement du Reich',
    subtitle: 'Stratégie soviétique et guerre totale',
    description:
      'Les grandes batailles de l\'Est, la mobilisation soviétique et le tournant militaire qui précipita la chute du Troisième Reich.',
    publishedAt: '2024-12-08',
    pageCount: 80,
    themes: ['URSS', 'Stalingrad', 'Stratégie'],
    coverGradient: 'linear-gradient(145deg, #2d1f2d 0%, #4a2a5c 45%, #0a0a0a 100%)',
    coverImageUrl: demoCover('2'),
    isLatest: false,
  },
  {
    id: 'mag-1',
    slug: 'numero-1-automne-2024',
    number: 1,
    season: 'Automne 2024',
    ww2Theme: 'Les femmes dans la Seconde Guerre mondiale',
    title: 'Combattantes et actrices de l\'ombre',
    subtitle: 'Résistance, soins et engagement civique',
    description:
      'Portraits et analyses des parcours féminins dans la Résistance, l\'industrie de guerre, les services de santé et les réseaux clandestins.',
    publishedAt: '2024-09-22',
    pageCount: 80,
    themes: ['Femmes', 'Résistance', 'Biographies'],
    coverGradient: 'linear-gradient(145deg, #2d1f2d 0%, #5c2a5c 45%, #0a0a0a 100%)',
    coverImageUrl: demoCover('1'),
    isLatest: false,
  },
];

export function getLatestMagazineIssue(): MagazineIssue {
  return MAGAZINE_ISSUES.find((issue) => issue.isLatest) ?? MAGAZINE_ISSUES[0];
}

export function getArchiveMagazineIssues(): MagazineIssue[] {
  return MAGAZINE_ISSUES.filter((issue) => !issue.isLatest);
}

export function getMagazineIssueBySlug(slug: string): MagazineIssue | undefined {
  return MAGAZINE_ISSUES.find((issue) => issue.slug === slug);
}

export function formatMagazineDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function magazineReaderPath(slug: string) {
  return `/magazine/${slug}`;
}
