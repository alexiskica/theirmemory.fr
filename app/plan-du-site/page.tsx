import Link from 'next/link';
import PageMain from '@/components/layout/PageMain';
import { ARTICLE_CATEGORIES, MEDIA_NAV } from '@/lib/site-config';

export default function PlanDuSitePage() {
  return (
    <PageMain>
      <h1 className="text-white text-[40px] max-[900px]:text-[32px] font-bold mb-[48px] max-[900px]:mb-[32px]">
        Plan du site
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[48px] max-[900px]:gap-[32px]">
        <section>
          <h2 className="text-white text-[18px] font-bold mb-[16px]">Médias</h2>
          <ul className="flex flex-col gap-[8px]">
            {MEDIA_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[#A3A3A3] hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-white text-[18px] font-bold mb-[16px]">Catégories d&apos;articles</h2>
          <ul className="flex flex-col gap-[8px]">
            {ARTICLE_CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/articles?categorie=${cat.slug}`} className="text-[#A3A3A3] hover:text-white transition-colors">
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageMain>
  );
}
