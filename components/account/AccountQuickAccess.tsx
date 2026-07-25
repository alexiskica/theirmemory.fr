import Link from 'next/link';
import { INSTITUTIONAL_SITE_URL } from '@/lib/site-config';

type AccentStyle = {
  accentClass: string;
  iconBgClass: string;
};

type QuickAccessItem = {
  href?: string;
  label: string;
  description: string;
  external?: boolean;
  disabled?: boolean;
  badge?: string;
  style: AccentStyle;
  icon: React.ReactNode;
};

type AccountQuickAccessProps = {
  bookmarkCount: number;
};

const ACCENTS = {
  yellow: {
    accentClass: 'text-[#FFCC00]',
    iconBgClass: 'bg-[#FFCC00]/15',
  },
  orange: {
    accentClass: 'text-[#FF6600]',
    iconBgClass: 'bg-[#FF6600]/15',
  },
  teal: {
    accentClass: 'text-[#00CFC1]',
    iconBgClass: 'bg-[#00CFC1]/15',
  },
  blue: {
    accentClass: 'text-[#4C3FE0]',
    iconBgClass: 'bg-[#4C3FE0]/15',
  },
  neutral: {
    accentClass: 'text-[#A3A3A3]',
    iconBgClass: 'bg-white/5',
  },
} as const;

function QuickAccessCard({ item }: { item: QuickAccessItem }) {
  const content = (
    <>
      <div
        className={`w-[40px] h-[40px] rounded-[10px] flex items-center justify-center shrink-0 ${item.style.iconBgClass}`}
      >
        <span className={item.style.accentClass}>{item.icon}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-[8px]">
          <p className="font-semibold text-[14px] text-white">{item.label}</p>
          {item.badge && (
            <span className="text-[10px] font-bold uppercase tracking-wide px-[8px] py-[2px] rounded-full bg-[#FF6600]/15 text-[#FF6600]">
              {item.badge}
            </span>
          )}
        </div>
        <p className="mt-[2px] text-[12px] text-[#7F7F7F] leading-snug">{item.description}</p>
      </div>
      {!item.disabled && (
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
      )}
    </>
  );

  const className = `group flex items-center gap-[14px] p-[16px] rounded-[10px] bg-surface border border-white/10 transition-all ${
    item.disabled
      ? 'opacity-60 cursor-default'
      : 'hover:border-white/25 hover:shadow-[0_4px_16px_rgba(0,0,0,0.35)]'
  }`;

  if (item.disabled || !item.href) {
    return (
      <div className={className} aria-disabled="true">
        {content}
      </div>
    );
  }

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

export default function AccountQuickAccess({ bookmarkCount }: AccountQuickAccessProps) {
  const items: QuickAccessItem[] = [
    {
      href: '/compte/epingles',
      label: 'Épinglés',
      description:
        bookmarkCount > 0
          ? `${bookmarkCount} contenu${bookmarkCount > 1 ? 's' : ''} sauvegardé${bookmarkCount > 1 ? 's' : ''}`
          : 'Articles, vidéos et podcasts sauvegardés',
      style: ACCENTS.yellow,
      icon: (
        <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      ),
    },
    {
      href: '/compte/parametres',
      label: 'Paramètres',
      description: 'Préférences de communication',
      style: ACCENTS.neutral,
      icon: (
        <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 01-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: 'Abonnement magazine',
      description: 'Gérer In memoriam dès le lancement',
      disabled: true,
      badge: 'Bientôt',
      style: ACCENTS.orange,
      icon: (
        <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      label: 'Commandes',
      description: 'Numéros papier et reçus',
      disabled: true,
      badge: 'Bientôt',
      style: ACCENTS.teal,
      icon: (
        <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      href: `${INSTITUTIONAL_SITE_URL}/contact`,
      label: 'Aide et contact',
      description: 'Une question sur votre compte',
      external: true,
      style: ACCENTS.blue,
      icon: (
        <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-[16px]">
      <p className="text-[15px] text-[#7F7F7F]">Accès rapides</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
        {items.map((item) => (
          <QuickAccessCard key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}
