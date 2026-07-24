/**
 * Magazine pas encore publié par défaut.
 * Mettre NEXT_PUBLIC_MAGAZINE_LAUNCHED=true pour afficher le catalogue complet.
 */
export const MAGAZINE_LAUNCHED =
  process.env.NEXT_PUBLIC_MAGAZINE_LAUNCHED === 'true';
