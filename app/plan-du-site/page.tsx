import type { Metadata } from 'next';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import PageHero from '@/components/layout/PageHero';
import { getPublishedArticles } from '@/lib/articles';
import { buildPageMetadata } from '@/lib/seo';
import { ARTICLE_CATEGORIES, INSTITUTIONAL_SITE_URL } from '@/lib/site-config';
import { SITE_PAGE_CONTENT } from '@/lib/site-layout';

export const revalidate = 300;

export const metadata: Metadata = {
  ...buildPageMetadata({
    pageDescription: 'Plan du site',
    description:
      'Arborescence du site média Their memory : articles, magazine, vidéos, podcasts, compte et informations légales.',
    path: '/plan-du-site',
  }),
};

const BRAND_COLORS = ['#FFCC00', '#4C3FE0', '#E91E63', '#FF6600', '#00CFC1', '#59B644'];

type SitemapLink = {
  label: string;
  href: string;
  external?: boolean;
};

type SitemapSection = {
  title: string;
  href: string;
  external?: boolean;
  links: SitemapLink[];
};

const SITEMAP_DATA: SitemapSection[] = [
  {
    title: 'Médias',
    href: '/articles',
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Magazine', href: '/magazine' },
      { label: 'Vidéos', href: '/videos' },
      { label: 'Podcasts', href: '/podcasts' },
      { label: 'Recherche', href: '/recherche' },
    ],
  },
  {
    title: 'Articles',
    href: '/articles',
    links: [
      { label: 'Tous les articles', href: '/articles' },
      ...ARTICLE_CATEGORIES.map((cat) => ({
        label: cat.label,
        href: `/articles?categorie=${cat.slug}`,
      })),
    ],
  },
  {
    title: 'Mon compte',
    href: '/compte',
    links: [
      { label: 'Connexion', href: '/login' },
      { label: 'Créer un compte', href: '/inscription' },
      { label: 'Espace compte', href: '/compte' },
      { label: 'Contenus épinglés', href: '/compte/epingles' },
      { label: 'Paramètres', href: '/compte/parametres' },
      { label: 'Communications', href: '/compte/parametres/communications' },
      { label: 'Mot de passe oublié', href: '/mot-de-passe-oublie' },
    ],
  },
  {
    title: "L'association",
    href: INSTITUTIONAL_SITE_URL,
    external: true,
    links: [
      {
        label: 'Qui sommes-nous ?',
        href: `${INSTITUTIONAL_SITE_URL}/association/qui-sommes-nous`,
        external: true,
      },
      {
        label: 'Nos missions',
        href: `${INSTITUTIONAL_SITE_URL}/association/missions`,
        external: true,
      },
      {
        label: 'Nos actions',
        href: `${INSTITUTIONAL_SITE_URL}/association/actions`,
        external: true,
      },
      {
        label: 'Nous rejoindre',
        href: `${INSTITUTIONAL_SITE_URL}/rejoindre`,
        external: true,
      },
      {
        label: 'Nous soutenir',
        href: `${INSTITUTIONAL_SITE_URL}/soutenir`,
        external: true,
      },
      {
        label: 'Contact',
        href: `${INSTITUTIONAL_SITE_URL}/contact`,
        external: true,
      },
    ],
  },
  {
    title: 'Informations légales',
    href: '/mentions-legales',
    links: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
      { label: "Conditions générales d'utilisation", href: '/cgu' },
    ],
  },
];

function SitemapAnchor({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default async function PlanDuSitePage() {
  const articles = await getAllPublishedArticleSlugs();

  return (
    <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
      <PageHero
        title="Plan du site"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Plan du site' },
        ]}
        description="Naviguez facilement à travers toutes les rubriques et pages du site média Their memory."
      />

      <section className={SITE_PAGE_CONTENT}>
        <PageContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] max-[900px]:gap-[24px] items-stretch">
            {SITEMAP_DATA.map((section, index) => {
              const color = BRAND_COLORS[index % BRAND_COLORS.length];

              return (
                <div
                  key={section.title}
                  className="bg-[#141414] rounded-[12px] p-[32px] max-[900px]:p-[24px] border border-white/10 flex flex-col h-full relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 w-full h-[4px]"
                    style={{ backgroundColor: color }}
                    aria-hidden
                  />

                  <h2 className="mb-[24px]">
                    <SitemapAnchor
                      href={section.href}
                      external={section.external}
                      className="text-[22px] max-[900px]:text-[20px] font-bold text-white leading-tight hover:underline transition-all"
                    >
                      {section.title}
                    </SitemapAnchor>
                  </h2>

                  <ul className="flex flex-col gap-[12px] flex-1">
                    {section.links.map((link) => (
                      <li key={link.href} className="flex items-start gap-[12px]">
                        <svg
                          className="w-[12px] h-[12px] shrink-0 mt-[4px]"
                          style={{ color }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                          aria-hidden
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <SitemapAnchor
                          href={link.href}
                          external={link.external}
                          className="text-[#A3A3A3] text-[14px] hover:underline hover:text-white transition-colors leading-[1.4]"
                        >
                          {link.label}
                        </SitemapAnchor>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {articles.length > 0 && (
            <div className="mt-[48px] bg-[#141414] rounded-[12px] p-[32px] max-[900px]:p-[24px] border border-white/10">
              <h2 className="text-[22px] font-bold text-white mb-[20px]">
                Articles publiés
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
                {articles.map((article) => (
                  <li key={article.id}>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="text-[#A3A3A3] text-[14px] hover:underline hover:text-white transition-colors"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </PageContainer>
      </section>
    </main>
  );
}
