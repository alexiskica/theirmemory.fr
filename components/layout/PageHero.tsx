import Link from 'next/link';
import PageContainer from './PageContainer';
import { SITE_PAGE_HERO, SITE_PAGE_HERO_TITLE, cn } from '@/lib/site-layout';

export type PageBreadcrumb = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  title: string;
  breadcrumbs: PageBreadcrumb[];
  description?: React.ReactNode;
  descriptionClassName?: string;
  className?: string;
};

export default function PageHero({
  title,
  breadcrumbs,
  description,
  descriptionClassName,
  className,
}: PageHeroProps) {
  return (
    <section className={cn('w-full bg-band border-b border-white/10', SITE_PAGE_HERO, className)}>
      <PageContainer>
        <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-[8px] text-[#7F7F7F] text-[14px] mb-[32px]">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-[8px]">
                {index > 0 && <span aria-hidden>/</span>}
                {crumb.href && !isLast ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-white font-semibold' : undefined}>{crumb.label}</span>
                )}
              </span>
            );
          })}
        </nav>

        <h1 className={cn(SITE_PAGE_HERO_TITLE, 'text-white max-w-[800px]')}>{title}</h1>

        {description && (
          <p
            className={cn(
              'text-[#A3A3A3] text-[18px] max-[900px]:text-[16px] leading-[1.75] max-w-[720px] mt-[24px] max-[900px]:mt-[20px]',
              descriptionClassName
            )}
          >
            {description}
          </p>
        )}
      </PageContainer>
    </section>
  );
}
