/** Placeholders vidéos & podcasts — fichier client-safe (sans Supabase) */

export type HorizontalVideoPlaceholder = {
  id: string;
  title: string;
  category: string;
  duration: string;
  format: string;
  year: number;
  publishedAt: string;
  hosts: readonly string[];
  tags: readonly string[];
  language: string;
  description: string;
  href: string;
};

export type VerticalVideoPlaceholder = {
  id: string;
  title: string;
  category: string;
  duration: string;
  format: string;
  year: number;
  publishedAt: string;
  tags: readonly string[];
  language: string;
  description: string;
  href: string;
};

export type PodcastPlaceholder = {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  series: string;
  episodeNumber: number;
  season: number;
  duration: string;
  format: string;
  year: number;
  publishedAt: string;
  hosts: readonly string[];
  tags: readonly string[];
  language: string;
  description: string;
  href: string;
  gradient: string;
};

export const HORIZONTAL_VIDEO_PLACEHOLDERS: HorizontalVideoPlaceholder[] = [
  {
    id: 'h1',
    title: 'Les combats de la poche de Falaise',
    category: 'Militaire',
    duration: '18 min',
    format: 'Documentaire',
    year: 2024,
    publishedAt: '2024-08-12',
    hosts: ['Their memory', 'Institut de la mémoire'],
    tags: ['Normandie', 'Libération', 'Seconde Guerre mondiale', 'Batailles'],
    language: 'Français',
    description:
      'Retour sur l\'encerclement allemand en Normandie à l\'été 1944 : stratégie, témoignages et images d\'archives pour comprendre l\'un des tournants de la Libération.',
    href: '/videos',
  },
  {
    id: 'h2',
    title: 'Entretien avec un témoin de la Libération',
    category: 'Biographies',
    duration: '24 min',
    format: 'Interview',
    year: 2024,
    publishedAt: '2024-06-03',
    hosts: ['Their memory'],
    tags: ['Témoignages', 'Libération', 'Mémoire orale'],
    language: 'Français',
    description:
      'Un ancien combattant revient sur les semaines décisives de 1944 et la mémoire transmise aux générations suivantes.',
    href: '/videos',
  },
  {
    id: 'h3',
    title: 'Le rôle du Conseil national de la Résistance',
    category: 'Politique',
    duration: '32 min',
    format: 'Documentaire',
    year: 2024,
    publishedAt: '2024-05-14',
    hosts: ['Their memory', 'Dr. Sophie Lemaire'],
    tags: ['CNR', 'Programme', 'Résistance'],
    language: 'Français',
    description:
      'Naissance, composition et héritage du CNR : comment les forces de la Résistance intérieure ont unifié leurs ambitions politiques en 1944.',
    href: '/videos',
  },
  {
    id: 'h4',
    title: 'Musique et résistance : chansons clandestines',
    category: 'Culture',
    duration: '21 min',
    format: 'Reportage',
    year: 2024,
    publishedAt: '2024-04-02',
    hosts: ['Their memory'],
    tags: ['Musique', 'Chansons', 'Occupation'],
    language: 'Français',
    description:
      'Des mélodies interdites aux hymnes de la Libération : la musique comme arme de mémoire et de mobilisation.',
    href: '/videos',
  },
  {
    id: 'h5',
    title: 'Convoi 77 : le dernier grand convoi de déportation',
    category: 'Résistance & Déportation',
    duration: '27 min',
    format: 'Documentaire',
    year: 2024,
    publishedAt: '2024-03-18',
    hosts: ['Their memory', 'Association Convoi 77'],
    tags: ['Déportation', 'Auschwitz', 'Paris'],
    language: 'Français',
    description:
      'Le 31 juillet 1944, plus de 1 300 personnes quittent Drancy pour Auschwitz. Retour sur le dernier convoi massif de la Shoah en France.',
    href: '/videos',
  },
  {
    id: 'h6',
    title: 'Radar et guerre électronique en 1944',
    category: 'Technologies',
    duration: '19 min',
    format: 'Explication',
    year: 2024,
    publishedAt: '2024-02-10',
    hosts: ['Their memory'],
    tags: ['Radar', 'Innovation', 'Alliés'],
    language: 'Français',
    description:
      'Comment les avancées technologiques ont transformé la détection aérienne et les opérations alliées à la fin de la guerre.',
    href: '/videos',
  },
];

export const VERTICAL_VIDEO_PLACEHOLDERS: VerticalVideoPlaceholder[] = [
  {
    id: 'v1',
    title: '60 secondes pour comprendre le MLN',
    category: 'Politique',
    duration: '1 min',
    format: 'Format court',
    year: 2024,
    publishedAt: '2024-09-01',
    tags: ['MLN', 'Résistance', 'Explication'],
    language: 'Français',
    description: 'Format court : les grandes lignes du Mouvement de Libération nationale en une minute.',
    href: '/videos',
  },
  {
    id: 'v2',
    title: 'Portrait : une résistante oubliée',
    category: 'Biographies',
    duration: '1 min 30',
    format: 'Portrait',
    year: 2024,
    publishedAt: '2024-07-18',
    tags: ['Résistance', 'Femmes', 'Portrait'],
    language: 'Français',
    description: 'Découverte du parcours d\'une combattante de la Résistance restée longtemps dans l\'ombre.',
    href: '/videos',
  },
  {
    id: 'v3',
    title: 'Le débarquement en 3 dates clés',
    category: 'Militaire',
    duration: '2 min',
    format: 'Format court',
    year: 2024,
    publishedAt: '2024-06-06',
    tags: ['D-Day', 'Débarquement', 'Chronologie'],
    language: 'Français',
    description: 'Trois moments fondateurs du 6 juin 1944 expliqués simplement.',
    href: '/videos',
  },
  {
    id: 'v4',
    title: 'Archive : discours du 18 juin',
    category: 'Actualités',
    duration: '3 min',
    format: 'Archive',
    year: 2024,
    publishedAt: '2024-06-18',
    tags: ['Appel du 18 juin', 'Archives', 'De Gaulle'],
    language: 'Français',
    description: 'Extrait commenté de l\'appel lancé depuis Londres en juin 1940.',
    href: '/videos',
  },
  {
    id: 'v5',
    title: 'Visite du Mémorial de Caen',
    category: 'Culture',
    duration: '2 min',
    format: 'Reportage',
    year: 2024,
    publishedAt: '2024-05-22',
    tags: ['Mémorial', 'Caen', 'Visite'],
    language: 'Français',
    description: 'Immersion au cœur des espaces de mémoire normands.',
    href: '/videos',
  },
  {
    id: 'v6',
    title: 'La rafle du Vel d\'Hiv en 2 minutes',
    category: 'Résistance & Déportation',
    duration: '2 min',
    format: 'Format court',
    year: 2024,
    publishedAt: '2024-05-15',
    tags: ['Vel d\'Hiv', 'Shoah', 'Occupation'],
    language: 'Français',
    description: 'Les faits essentiels de la rafle des 16 et 17 juillet 1942 à Paris.',
    href: '/videos',
  },
  {
    id: 'v7',
    title: 'Qui était Jean Moulin ?',
    category: 'Biographies',
    duration: '1 min 45',
    format: 'Portrait',
    year: 2024,
    publishedAt: '2024-05-01',
    tags: ['Jean Moulin', 'Résistance', 'Biographie'],
    language: 'Français',
    description: 'Parcours du préfet devenu figure centrale de l\'unification de la Résistance.',
    href: '/videos',
  },
  {
    id: 'v8',
    title: 'Les codes de la Résistance',
    category: 'Technologies',
    duration: '2 min 30',
    format: 'Format court',
    year: 2024,
    publishedAt: '2024-04-20',
    tags: ['Cryptographie', 'Résistance', 'Clandestinité'],
    language: 'Français',
    description: 'Comment les réseaux résistants utilisaient chiffrement, messages codés et signes discrets.',
    href: '/videos',
  },
];

export const PODCAST_PLACEHOLDERS: PodcastPlaceholder[] = [
  {
    id: 'p1',
    title: 'Mémoire et transmission',
    category: 'Culture',
    subtitle: 'Comment parler de la guerre aux jeunes générations',
    series: 'Their memory Podcast',
    episodeNumber: 1,
    season: 1,
    duration: '42 min',
    format: 'Débat',
    year: 2024,
    publishedAt: '2024-09-15',
    hosts: ['Their memory', 'Prof. Martin Durand'],
    tags: ['Transmission', 'Éducation', 'Mémoire'],
    language: 'Français',
    description:
      'Comment transmettre l\'histoire de la Seconde Guerre mondiale aux jeunes générations ? Débat avec des historiens et des enseignants sur les méthodes, les supports et les enjeux contemporains.',
    href: '/podcasts',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f0f 100%)',
  },
  {
    id: 'p2',
    title: 'Les maquisards racontent',
    category: 'Biographies',
    subtitle: 'Récits de vie et contextualisation historique',
    series: 'Their memory Podcast',
    episodeNumber: 2,
    season: 1,
    duration: '38 min',
    format: 'Témoignages',
    year: 2024,
    publishedAt: '2024-08-28',
    hosts: ['Their memory'],
    tags: ['Maquis', 'Résistance', 'Témoignages'],
    language: 'Français',
    description: 'Récits de vie recueillis auprès d\'anciens résistants et contextualisation historique des engagements clandestins en zone rurale.',
    href: '/podcasts',
    gradient: 'linear-gradient(135deg, #2d1f1f 0%, #1a1010 50%, #0a0a0a 100%)',
  },
  {
    id: 'p3',
    title: 'Déportation : témoignages',
    category: 'Résistance & Déportation',
    subtitle: 'Paroles de déportés et travail de mémoire',
    series: 'Their memory Podcast',
    episodeNumber: 3,
    season: 1,
    duration: '55 min',
    format: 'Documentaire audio',
    year: 2024,
    publishedAt: '2024-07-10',
    hosts: ['Their memory', 'Association Mémoire vivante'],
    tags: ['Déportation', 'Shoah', 'Camps'],
    language: 'Français',
    description: 'Paroles de déportés et travail de mémoire autour des camps et des convois. Un épisode pour comprendre les mécanismes de l\'extermination et les combats mémoriels d\'aujourd\'hui.',
    href: '/podcasts',
    gradient: 'linear-gradient(135deg, #1f2d1f 0%, #101810 50%, #0a0a0a 100%)',
  },
  {
    id: 'p4',
    title: 'Histoire militaire',
    category: 'Militaire',
    subtitle: 'Grands combats et opérations alliées',
    series: 'Their memory Podcast',
    episodeNumber: 4,
    season: 1,
    duration: '47 min',
    format: 'Analyse',
    year: 2024,
    publishedAt: '2024-06-20',
    hosts: ['Their memory', 'Col. (r) Philippe Renard'],
    tags: ['Stratégie', 'Opérations', 'Fronts'],
    language: 'Français',
    description: 'Grands combats, stratégie et opérations alliées analysés par des spécialistes. De l\'Afrique du Nord à la chute du Reich, un panorama des forces en présence.',
    href: '/podcasts',
    gradient: 'linear-gradient(135deg, #1f1f2d 0%, #12121a 50%, #0a0a0a 100%)',
  },
  {
    id: 'p5',
    title: 'Biographies de résistants',
    category: 'Biographies',
    subtitle: 'Figures majeures et méconnues',
    series: 'Their memory Podcast',
    episodeNumber: 5,
    season: 1,
    duration: '36 min',
    format: 'Portraits',
    year: 2024,
    publishedAt: '2024-05-08',
    hosts: ['Their memory'],
    tags: ['Biographies', 'Résistance intérieure', 'Portraits'],
    language: 'Français',
    description: 'Portraits croisés de figures majeures et méconnues de la Résistance intérieure. Des trajectoires individuelles au service d\'une histoire collective.',
    href: '/podcasts',
    gradient: 'linear-gradient(135deg, #2d2d1f 0%, #1a1a10 50%, #0a0a0a 100%)',
  },
  {
    id: 'p6',
    title: 'L\'actualité mémorielle en France',
    category: 'Actualités',
    subtitle: 'Commémorations, débats et politiques publiques',
    series: 'Their memory Podcast',
    episodeNumber: 6,
    season: 1,
    duration: '33 min',
    format: 'Débat',
    year: 2024,
    publishedAt: '2024-04-15',
    hosts: ['Their memory'],
    tags: ['Commémoration', 'Politique mémorielle', 'Société'],
    language: 'Français',
    description:
      'Panorama des enjeux mémoriels contemporains : cérémonies officielles, controverses historiques et rôle des médias.',
    href: '/podcasts',
    gradient: 'linear-gradient(135deg, #1f1f3d 0%, #141428 50%, #0a0a0a 100%)',
  },
  {
    id: 'p7',
    title: 'La Résistance intérieure face à Vichy',
    category: 'Politique',
    subtitle: 'Rivalités, alliances et choix politiques',
    series: 'Their memory Podcast',
    episodeNumber: 7,
    season: 1,
    duration: '44 min',
    format: 'Analyse',
    year: 2024,
    publishedAt: '2024-03-22',
    hosts: ['Their memory', 'Dr. Sophie Lemaire'],
    tags: ['Vichy', 'Résistance', 'État français'],
    language: 'Français',
    description:
      'Comment les réseaux clandestins ont affronté le régime de Vichy tout en préparant la France de l\'après-guerre.',
    href: '/podcasts',
    gradient: 'linear-gradient(135deg, #2d241f 0%, #1a1510 50%, #0a0a0a 100%)',
  },
  {
    id: 'p8',
    title: 'Cryptographie et réseaux clandestins',
    category: 'Technologies',
    subtitle: 'Sécuriser les communications sous l\'Occupation',
    series: 'Their memory Podcast',
    episodeNumber: 8,
    season: 1,
    duration: '29 min',
    format: 'Enquête',
    year: 2024,
    publishedAt: '2024-02-28',
    hosts: ['Their memory'],
    tags: ['Cryptographie', 'Radio', 'Résistance'],
    language: 'Français',
    description:
      'Du message codé à la radio clandestine : les techniques qui ont permis aux réseaux de résister à la surveillance allemande.',
    href: '/podcasts',
    gradient: 'linear-gradient(135deg, #1f2d2d 0%, #101a1a 50%, #0a0a0a 100%)',
  },
];
