import { SITE_PAGE_MAIN, cn } from '@/lib/site-layout';
import PageContainer from './PageContainer';

type PageMainProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
};

export default function PageMain({ children, className, containerClassName }: PageMainProps) {
  return (
    <main className={cn('bg-page', SITE_PAGE_MAIN, className)}>
      <PageContainer className={containerClassName}>{children}</PageContainer>
    </main>
  );
}
