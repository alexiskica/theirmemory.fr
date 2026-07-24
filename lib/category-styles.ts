export const CATEGORY_COLORS: Record<string, string> = {
  Actualités: '#4C3FE0',
  Culture: '#E91E63',
  Politique: '#FF6600',
  Militaire: '#59B644',
  'Résistance & Déportation': '#FF3B3B',
  Technologies: '#00CFC1',
  Biographies: '#9333AA',
};

const HASHTAG_LABELS: Record<string, string> = {
  Actualités: 'ACTUALITÉS',
  Culture: 'CULTURE',
  Politique: 'POLITIQUE',
  Militaire: 'MILITAIRE',
  'Résistance & Déportation': 'RÉSISTANCE',
  Technologies: 'TECHNOLOGIES',
  Biographies: 'BIOGRAPHIE',
};

export function categoryHashtag(category: string): string {
  const label = HASHTAG_LABELS[category] ?? category.toUpperCase();
  return `#${label}`;
}

export function categoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? '#7F7F7F';
}
