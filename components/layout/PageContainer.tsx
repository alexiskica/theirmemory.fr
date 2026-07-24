import { SITE_CONTAINER, cn } from '@/lib/site-layout';

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn(SITE_CONTAINER, className)}>{children}</div>;
}
