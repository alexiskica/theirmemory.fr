import { SITE_SECTION_HEADER, SITE_SECTION_TITLE, cn } from '@/lib/site-layout';

type SectionHeaderProps = {
  title: React.ReactNode;
  action?: React.ReactNode;
  titleId?: string;
  className?: string;
  titleClassName?: string;
};

export default function SectionHeader({
  title,
  action,
  titleId,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn(SITE_SECTION_HEADER, className)}>
      <h2 id={titleId} className={cn(SITE_SECTION_TITLE, 'text-white', titleClassName)}>
        {title}
      </h2>
      {action}
    </div>
  );
}
