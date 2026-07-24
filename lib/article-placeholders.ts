import type { PublicArticle } from '@/lib/articles';
import { HOMEPAGE_ARTICLE_PLACEHOLDERS } from '@/lib/homepage-placeholders';

function demoImage(seed: string, width = 1200, height = 750) {
  return `https://picsum.photos/seed/theirmemory-${seed}/${width}/${height}`;
}

const DEMO_HTML = `
<h2>Des opérations qui ont changé le cours de la guerre</h2>
<div>
  <p>Le 6 juin 1944, plus de 150&nbsp;000 soldats alliés débarquent sur les côtes de Normandie. Cette opération, longuement préparée, constitue la plus grande opération amphibie de l'histoire et ouvre la voie à la libération de l'Europe occidentale.</p>
  <p>Pour comprendre l'enjeu du Débarquement, il faut replacer l'événement dans la stratégie alliée&nbsp;: fixer d'importants moyens allemands en France, rétablir un second front et accélérer l'effondrement du Reich.</p>
</div>
<h3>Utah, Omaha, Gold, Juno et Sword</h3>
<div>
  <p>Cinq plages sont visées par l'opération Overlord. Chacune concentre des difficultés spécifiques&nbsp;: fortifications, marées, configuration du littoral et intensité des combats. Omaha Beach reste la plus meurtrière pour les forces américaines.</p>
</div>
<blockquote>
  <p>«&nbsp;Nous ne pouvions pas nous contenter de survivre à cette journée. Il fallait la gagner.&nbsp;»</p>
  <footer>
    <img src="${demoImage('avatar-quote', 112, 112)}" alt="" loading="lazy" decoding="async" />
    <div>
      <strong>Général Dwight D. Eisenhower</strong>
      <span>Commandant suprême des forces alliées en Europe</span>
    </div>
  </footer>
</blockquote>
<figure>
  <div>
    <img src="${demoImage('article-inline-1', 1200, 900)}" alt="Soldats alliés sur les plages normandes" loading="lazy" decoding="async" />
  </div>
  <figcaption>
    <span>Des troupes américaines progressent sous le feu ennemi sur le secteur d'Omaha Beach.</span>
    <span>© National Archives USA</span>
  </figcaption>
</figure>
<div>
  <p>Au-delà du choc militaire, le Débarquement produit un effet politique immédiat&nbsp;: il redonne espoir aux populations européennes, renforce la légitimité des pouvoirs alliés et accélère la coordination entre résistance intérieure et forces régulières.</p>
</div>
<div class="w-full flex justify-center my-[48px]">
  <div style="width: 100%; max-width: 800px; margin: 0 auto;">
    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px;">
      <iframe src="https://www.youtube.com/embed/ks9VbrbZn_w" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" title="Documentaire sur le Débarquement"></iframe>
    </div>
  </div>
</div>
<h2>Transmission et mémoire aujourd'hui</h2>
<div>
  <p>Quatre-vingts ans plus tard, les commémorations ne se limitent plus à une date anniversaire. Elles interrogent la manière dont les sociétés européennes transmettent un événement fondateur à des générations qui n'ont pas connu la guerre.</p>
  <p>Leur memory participe à cet effort en croisant recherche historique, récits de terrain et formats numériques accessibles au plus grand nombre.</p>
</div>
`.trim();

export const DEMO_ARTICLE_FULL: PublicArticle = {
  id: 'demo-01',
  title: 'Le débarquement de Normandie, 80 ans après',
  slug: 'debarquement-normandie-80-ans',
  display_author: 'Rédaction Their memory',
  thumbnail_url: demoImage('hero-1', 1600, 900),
  cover_image_url: demoImage('hero-1', 1600, 900),
  cover_image_credit: '© National Archives USA — reconstitution visuelle',
  cover_image_caption: 'Des troupes alliées progressent sur les plages normandes.',
  html_content: DEMO_HTML,
  read_time: 8,
  published_at: '2025-05-28T09:00:00.000Z',
  excerpt:
    'Retour sur les opérations du 6 juin 1944 et sur la manière dont la mémoire du D-Day continue de structurer le récit européen.',
  category: 'Militaire',
  secondary_categories: ['Actualités', 'Politique'],
  tags: ['Débarquement', 'Normandie', 'Seconde Guerre mondiale', 'Mémoire', 'Commémoration'],
  attachments: [
    {
      link: '#',
      name: 'Dossier pédagogique — Normandie 1944',
      size: '2,4 Mo',
      format: 'PDF',
    },
    {
      link: '#',
      name: 'Cartographie interactive des plages du Débarquement',
      size: 'Lien externe',
      format: 'DRIVE',
    },
    {
      link: '#',
      name: 'Frise chronologique du 6 juin 1944',
      size: '840 Ko',
      format: 'DOCX',
    },
  ],
  slider_images: [
    { url: demoImage('slider-1', 1200, 900), credit: '© Imperial War Museums' },
    { url: demoImage('slider-2', 1200, 900), credit: '© US Army Signal Corps' },
    { url: demoImage('slider-3', 1200, 900), credit: '© Archives départementales du Calvados' },
  ],
};

const PLACEHOLDER_BY_SLUG: Record<string, PublicArticle> = {
  [DEMO_ARTICLE_FULL.slug]: DEMO_ARTICLE_FULL,
};

export function getArticlePlaceholderBySlug(slug: string): PublicArticle | null {
  return PLACEHOLDER_BY_SLUG[slug] ?? null;
}

export function getArticlePlaceholderSlugs(): string[] {
  return Object.keys(PLACEHOLDER_BY_SLUG);
}

export function getRelatedArticlePlaceholders(article: PublicArticle, limit = 3): PublicArticle[] {
  return HOMEPAGE_ARTICLE_PLACEHOLDERS.filter(
    (a) =>
      a.id !== article.id &&
      (a.category === article.category ||
        a.secondary_categories.some(
          (c) => c === article.category || article.secondary_categories.includes(c)
        ))
  ).slice(0, limit);
}
