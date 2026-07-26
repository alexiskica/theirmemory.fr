import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import PageHero from '@/components/layout/PageHero';
import { SITE_PAGE_CONTENT, SITE_PROSE } from '@/lib/site-layout';

type LegalDocumentProps = {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
};

export default function LegalDocument({ title, updatedAt, children }: LegalDocumentProps) {
  return (
    <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
      <PageHero
        title={title}
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Aide & Informations légales' },
          { label: title },
        ]}
        description={`Dernière mise à jour : ${updatedAt}`}
        descriptionClassName="text-[#7F7F7F] text-[16px] mt-[16px] max-[900px]:mt-[12px]"
      />

      <section className={SITE_PAGE_CONTENT}>
        <div className={SITE_PROSE}>
          <div className="legal-prose text-[#A3A3A3] text-[17px] leading-[1.8]">{children}</div>
        </div>
      </section>

      <section className="w-full pb-[100px] max-[900px]:pb-[64px]">
        <PageContainer>
          <nav
            aria-label="Autres pages légales"
            className="flex flex-wrap gap-x-[20px] gap-y-[12px] text-[14px] text-[#7F7F7F] border-t border-white/10 pt-[32px]"
          >
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/cgu" className="hover:text-white transition-colors">
              CGU
            </Link>
          </nav>
        </PageContainer>
      </section>
    </main>
  );
}

export function LegalHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[28px] font-bold text-white mt-[48px] mb-[20px] leading-[1.3] first:mt-0">
      {children}
    </h2>
  );
}

export function LegalParagraph({ children }: { children: React.ReactNode }) {
  return <p className="mb-[24px]">{children}</p>;
}

export function LegalList({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-[24px] mb-[24px] space-y-[12px]">{children}</ul>;
}
