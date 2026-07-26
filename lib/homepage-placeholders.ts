import type { PublicArticle } from '@/lib/articles';

/** Mettre à true pour forcer les données fictives en local. Désactivé par défaut (SEO / prod). */
export const USE_HOMEPAGE_PLACEHOLDERS =
  process.env.NEXT_PUBLIC_USE_HOMEPAGE_PLACEHOLDERS === 'true';

/** Images de démonstration — seeds fixes pour un rendu stable entre les builds */
function demoImage(seed: string, width = 1200, height = 750) {
  return `https://picsum.photos/seed/theirmemory-${seed}/${width}/${height}`;
}

const emptyMeta = {
  cover_image_caption: null as string | null,
  updated_at: null as string | null,
  secondary_categories: [] as string[],
  tags: [] as string[],
  attachments: [] as PublicArticle['attachments'],
  slider_images: [] as PublicArticle['slider_images'],
};

/** Jeu de données fictives pour configurer le design de l'accueil */
export const HOMEPAGE_ARTICLE_PLACEHOLDERS: PublicArticle[] = [
  {
    id: 'demo-01',
    title: 'Le débarquement de Normandie, 80 ans après',
    slug: 'debarquement-normandie-80-ans',
    display_author: 'Rédaction Their memory',
    thumbnail_url: demoImage('hero-1', 1600, 900),
    cover_image_url: demoImage('hero-1', 1600, 900),
    cover_image_credit: 'Archives — illustration',
    html_content: null,
    read_time: 8,
    published_at: '2025-05-28T09:00:00.000Z',
    excerpt:
      'Retour sur les opérations du 6 juin 1944 et sur la manière dont la mémoire du D-Day continue de structurer le récit européen.',
    category: 'Militaire',
    ...emptyMeta,
  },
  {
    id: 'demo-02',
    title: 'Résistance : ces réseaux qui ont préparé la Libération',
    slug: 'reseaux-resistance-liberation',
    display_author: 'Claire Fontaine',
    thumbnail_url: demoImage('hero-2', 1600, 900),
    cover_image_url: demoImage('hero-2', 1600, 900),
    cover_image_credit: null,
    html_content: null,
    read_time: 6,
    published_at: '2025-05-22T10:30:00.000Z',
    excerpt:
      'De Londres aux maquis, comment les réseaux clandestins ont articulé renseignement, sabotage et préparation politique.',
    category: 'Résistance & Déportation',
    ...emptyMeta,
  },
  {
    id: 'demo-03',
    title: 'Biographie : Lucie Aubrac, une voix de la Résistance',
    slug: 'biographie-lucie-aubrac',
    display_author: 'Their memory',
    thumbnail_url: demoImage('hero-3', 1600, 900),
    cover_image_url: demoImage('hero-3', 1600, 900),
    cover_image_credit: null,
    html_content: null,
    read_time: 10,
    published_at: '2025-05-15T08:00:00.000Z',
    excerpt:
      'Portrait d\'une combattante de la Résistance intérieure, entre action clandestine, engagement politique et transmission mémorielle.',
    category: 'Biographies',
    ...emptyMeta,
  },
  {
    id: 'demo-04',
    title: 'Actualité mémorielle : les commémorations de l\'été 2025',
    slug: 'commemorations-ete-2025',
    display_author: 'Rédaction Their memory',
    thumbnail_url: demoImage('hero-4', 1600, 900),
    cover_image_url: demoImage('hero-4', 1600, 900),
    cover_image_credit: null,
    html_content: null,
    read_time: 4,
    published_at: '2025-05-10T14:00:00.000Z',
    excerpt:
      'Agenda des cérémonies, expositions et rendez-vous culturels autour de la Seconde Guerre mondiale en France et en Europe.',
    category: 'Actualités',
    ...emptyMeta,
  },
  {
    id: 'demo-05',
    title: 'La poche de Falaise, tournant de la bataille de Normandie',
    slug: 'poche-de-falaise',
    display_author: 'Col. (r) Philippe Renard',
    thumbnail_url: demoImage('feat-1', 1200, 750),
    cover_image_url: demoImage('feat-1', 1200, 750),
    cover_image_credit: null,
    html_content: null,
    read_time: 12,
    published_at: '2025-05-08T09:00:00.000Z',
    excerpt:
      'Analyse des dernières semaines de la bataille de Normandie et de l\'encerclement des forces allemandes en août 1944.',
    category: 'Militaire',
    ...emptyMeta,
  },
  {
    id: 'demo-06',
    title: 'Culture : le cinéma face à la Shoah',
    slug: 'cinema-shoah-representation',
    display_author: 'Élodie Marchand',
    thumbnail_url: demoImage('feat-2', 1200, 750),
    cover_image_url: demoImage('feat-2', 1200, 750),
    cover_image_credit: null,
    html_content: null,
    read_time: 7,
    published_at: '2025-05-03T11:00:00.000Z',
    excerpt:
      'Du documentaire au fictionnel, comment le septième art a progressivement intégré la déportation dans le paysage culturel.',
    category: 'Culture',
    ...emptyMeta,
  },
  {
    id: 'demo-07',
    title: 'Politique : mémoire, lois et devoir de transmission',
    slug: 'politique-memoire-transmission',
    display_author: 'Their memory',
    thumbnail_url: demoImage('feat-3', 1200, 750),
    cover_image_url: demoImage('feat-3', 1200, 750),
    cover_image_credit: null,
    html_content: null,
    read_time: 9,
    published_at: '2025-04-28T16:00:00.000Z',
    excerpt:
      'Panorama des politiques mémorielles en France depuis 1945 et des débats contemporains sur l\'enseignement de l\'histoire.',
    category: 'Politique',
    ...emptyMeta,
  },
  {
    id: 'demo-08',
    title: 'Technologies : numériser les archives de guerre',
    slug: 'numerisation-archives-guerre',
    display_author: 'Their memory',
    thumbnail_url: demoImage('feat-4', 1200, 750),
    cover_image_url: demoImage('feat-4', 1200, 750),
    cover_image_credit: null,
    html_content: null,
    read_time: 5,
    published_at: '2025-04-20T10:00:00.000Z',
    excerpt:
      'IA, bases de données et conservation : les outils qui transforment l\'accès aux fonds d\'archives militaires et civiles.',
    category: 'Technologies',
    ...emptyMeta,
  },
  {
    id: 'demo-09',
    title: 'Témoignage : « J\'avais dix-sept ans en 1944 »',
    slug: 'temoignage-dix-sept-ans-1944',
    display_author: 'Entretien recueilli par Their memory',
    thumbnail_url: demoImage('latest-1', 1200, 750),
    cover_image_url: demoImage('latest-1', 1200, 750),
    cover_image_credit: null,
    html_content: null,
    read_time: 11,
    published_at: '2025-04-12T09:30:00.000Z',
    excerpt:
      'Récit d\'une habitante du Calvados sur l\'occupation, les bombardements et les premiers jours de la Libération.',
    category: 'Biographies',
    ...emptyMeta,
  },
  {
    id: 'demo-10',
    title: 'Le STO, une mémoire longtemps silencieuse',
    slug: 'sto-memoire-silencieuse',
    display_author: 'Their memory',
    thumbnail_url: demoImage('latest-2', 1200, 750),
    cover_image_url: demoImage('latest-2', 1200, 750),
    cover_image_credit: null,
    html_content: null,
    read_time: 8,
    published_at: '2025-04-05T08:00:00.000Z',
    excerpt:
      'Service du travail obligatoire, réquisitions et résistance : comprendre une page encore peu visible du conflit.',
    category: 'Résistance & Déportation',
    ...emptyMeta,
  },
  {
    id: 'demo-11',
    title: 'Cartographie : les fronts en Europe de l\'Est',
    slug: 'cartographie-fronts-est',
    display_author: 'Their memory',
    thumbnail_url: demoImage('latest-3', 1200, 750),
    cover_image_url: demoImage('latest-3', 1200, 750),
    cover_image_credit: null,
    html_content: null,
    read_time: 6,
    published_at: '2025-03-29T12:00:00.000Z',
    excerpt:
      'De Barbarossa à Berlin, visualiser l\'évolution des lignes de front et les enjeux stratégiques de l\'Armée rouge.',
    category: 'Militaire',
    ...emptyMeta,
  },
  {
    id: 'demo-12',
    title: 'Expo : la mode sous l\'Occupation',
    slug: 'expo-mode-occupation',
    display_author: 'Rédaction Culture',
    thumbnail_url: demoImage('latest-4', 1200, 750),
    cover_image_url: demoImage('latest-4', 1200, 750),
    cover_image_credit: null,
    html_content: null,
    read_time: 4,
    published_at: '2025-03-22T15:00:00.000Z',
    excerpt:
      'Cartes de rationnement, tissus de récupération et résistance du quotidien : une exposition à ne pas manquer.',
    category: 'Culture',
    ...emptyMeta,
  },
  {
    id: 'demo-13',
    title: 'Dossier : comprendre le MLN en 10 dates',
    slug: 'dossier-mln-dix-dates',
    display_author: 'Their memory',
    thumbnail_url: demoImage('latest-5', 1200, 750),
    cover_image_url: demoImage('latest-5', 1200, 750),
    cover_image_credit: null,
    html_content: null,
    read_time: 7,
    published_at: '2025-03-15T09:00:00.000Z',
    excerpt:
      'Chronologie commentée du Mouvement de Libération nationale, de sa genèse à son rôle dans la reconstruction politique.',
    category: 'Politique',
    ...emptyMeta,
  },
  {
    id: 'demo-14',
    title: 'Repères : les principaux camps de déportation',
    slug: 'repères-camps-deportation',
    display_author: 'Their memory',
    thumbnail_url: demoImage('latest-6', 1200, 750),
    cover_image_url: demoImage('latest-6', 1200, 750),
    cover_image_credit: null,
    html_content: null,
    read_time: 9,
    published_at: '2025-03-08T10:00:00.000Z',
    excerpt:
      'Fiche de référence sur les grands centres d\'internement et d\'extermination, leurs fonctions et leur postérité mémorielle.',
    category: 'Résistance & Déportation',
    ...emptyMeta,
  },
];

export function getHomepagePlaceholderData() {
  const all = HOMEPAGE_ARTICLE_PLACEHOLDERS;
  const latestFour = all.slice(0, 4);

  return {
    heroArticles: all.slice(0, 4),
    featuredReading: {
      main: latestFour[0] ?? null,
      side: latestFour.slice(1, 4),
    },
  };
}
