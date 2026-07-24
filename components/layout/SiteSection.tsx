import { SITE_SECTION, cn } from '@/lib/site-layout';
import PageContainer from './PageContainer';

type SiteSectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  'aria-labelledby'?: string;
};

export default function SiteSection({
  children,
  className,
  containerClassName,
  id,
  'aria-labelledby': ariaLabelledBy,
}: SiteSectionProps) {
  return (
    <section id={id} aria-labelledby={ariaLabelledBy} className={cn(SITE_SECTION, className)}>
      <PageContainer className={containerClassName}>{children}</PageContainer>
    </section>
  );
}
