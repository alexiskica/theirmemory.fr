import Link from 'next/link';

type SettingsHubCardProps = {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

function SettingsHubCard({ href, title, description, icon }: SettingsHubCardProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-[14px] p-[16px] rounded-[10px] bg-surface border border-white/10 hover:border-white/25 hover:shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-all"
    >
      <div className="w-[40px] h-[40px] rounded-[10px] bg-[#FFCC00]/15 text-[#FFCC00] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-[14px] text-white">{title}</p>
        <p className="mt-[2px] text-[12px] text-[#7F7F7F] leading-snug">{description}</p>
      </div>
      <svg
        className="w-[16px] h-[16px] text-[#404040] shrink-0 group-hover:text-[#7F7F7F] transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export default function SettingsHub() {
  return (
    <div className="flex flex-col gap-[12px]">
      <SettingsHubCard
        href="/compte/parametres/communications"
        title="Préférences de communication"
        description="Newsletter « À la une » et e-mails du site média"
        icon={
          <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        }
      />
    </div>
  );
}
