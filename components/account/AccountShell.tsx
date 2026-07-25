'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOutAction } from '@/app/compte/actions';
import WelcomeSectionTitle from '@/components/account/WelcomeSectionTitle';
import { getAccountInitials } from '@/lib/account-profile';

const SIDEBAR_COLLAPSED_KEY = 'tm-fr-account-sidebar-collapsed';

export type MediaAccountShellProps = {
  displayName: string;
  email: string;
  firstName: string | null;
  avatarUrl: string | null;
  children: React.ReactNode;
};

const NAV_ITEMS: Array<{
  href: string;
  label: string;
  exact?: boolean;
  icon: React.ReactNode;
}> = [
  {
    href: '/compte',
    label: 'Mon accueil',
    exact: true,
    icon: (
      <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    href: '/compte/epingles',
    label: 'Épinglés',
    icon: (
      <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    href: '/compte/parametres',
    label: 'Paramètres',
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
];

function getWelcomeLabel(firstName: string | null, displayName: string): string {
  const trimmed = firstName?.trim();
  if (trimmed) return `Bienvenue ${trimmed}`;

  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length > 0 && parts[0] !== 'Mon') {
    return `Bienvenue ${parts[0]}`;
  }

  return 'Bienvenue';
}

function getSectionTitle(
  pathname: string,
  firstName: string | null,
  displayName: string
): string {
  if (pathname === '/compte') return getWelcomeLabel(firstName, displayName);
  if (pathname.startsWith('/compte/epingles')) return 'Épinglés';
  if (pathname.startsWith('/compte/parametres/communications')) {
    return 'Préférences de communication';
  }
  if (pathname.startsWith('/compte/parametres')) return 'Paramètres';
  return 'Mon espace compte';
}

function AccountSectionTitle({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-[28px] max-[900px]:text-[24px] font-bold text-white leading-tight mb-[28px] ${className}`.trim()}
    >
      {children}
    </h2>
  );
}

function AccountAvatar({
  avatarUrl,
  initials,
  size = 'md',
}: {
  avatarUrl: string | null;
  initials: string;
  size?: 'sm' | 'md';
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const sizeClass =
    size === 'sm' ? 'w-[36px] h-[36px] text-[12px]' : 'w-[40px] h-[40px] text-[13px]';

  if (avatarUrl && !imageFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setImageFailed(true)}
        className={`${sizeClass} rounded-full object-cover shrink-0 border border-white/10`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full bg-[#FFCC00]/15 text-[#FFCC00] flex items-center justify-center font-bold shrink-0`}
      aria-hidden={Boolean(avatarUrl && imageFailed)}
    >
      {initials}
    </div>
  );
}

function SidebarAccountFooter({
  displayName,
  email,
  avatarUrl,
  initials,
  collapsed,
}: {
  displayName: string;
  email: string;
  avatarUrl: string | null;
  initials: string;
  collapsed: boolean;
}) {
  if (collapsed) {
    return (
      <div className="border-t border-white/10 px-[10px] py-[12px] flex justify-center">
        <AccountAvatar avatarUrl={avatarUrl} initials={initials} size="sm" />
      </div>
    );
  }

  return (
    <div className="border-t border-white/10">
      <div className="flex items-center gap-[10px] px-[14px] py-[12px]">
        <AccountAvatar avatarUrl={avatarUrl} initials={initials} size="md" />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-white truncate leading-tight">{displayName}</p>
          <p className="text-[11px] text-[#7F7F7F] truncate">{email}</p>
        </div>
      </div>
    </div>
  );
}

function SidebarToggleButton({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={collapsed ? 'Déplier le menu latéral' : 'Replier le menu latéral'}
      aria-expanded={!collapsed}
      className="shrink-0 w-[32px] h-[32px] rounded-[8px] flex items-center justify-center text-[#7F7F7F] hover:text-white hover:bg-white/5 transition-colors"
    >
      <svg
        className={`w-[18px] h-[18px] transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

function AccountMobileNav({
  displayName,
  email,
  avatarUrl,
  initials,
  pathname,
  sectionTitle,
}: {
  displayName: string;
  email: string;
  avatarUrl: string | null;
  initials: string;
  pathname: string;
  sectionTitle: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden mb-[24px] rounded-[12px] border border-white/10 bg-surface shadow-[0_12px_40px_rgba(0,0,0,0.45)] overflow-hidden">
      <div className="flex items-center gap-[12px] px-[14px] py-[14px]">
        <div className="shrink-0">
          <AccountAvatar avatarUrl={avatarUrl} initials={initials} size="md" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold text-white truncate leading-tight">{sectionTitle}</p>
          <p className="text-[12px] text-[#7F7F7F] truncate">{displayName}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          className="shrink-0 w-[36px] h-[36px] rounded-[8px] flex items-center justify-center text-[#A3A3A3] hover:bg-white/5 transition-colors"
        >
          {open ? (
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <>
          <nav className="border-t border-white/10 px-[12px] py-[10px] flex flex-col gap-[4px]">
            {NAV_ITEMS.map((item) => {
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-[12px] rounded-[8px] px-[14px] py-[11px] text-[14px] font-semibold transition-all ${
                    active
                      ? 'bg-white text-black shadow-sm'
                      : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className={active ? 'text-black' : 'text-[#7F7F7F]'}>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <SidebarAccountFooter
            displayName={displayName}
            email={email}
            avatarUrl={avatarUrl}
            initials={initials}
            collapsed={false}
          />

          <div className="px-[12px] py-[10px] border-t border-white/10">
            <form action={signOutAction}>
              <button
                type="submit"
                className="w-full flex items-center gap-[10px] rounded-[8px] px-[14px] py-[10px] text-left text-[13px] font-semibold text-[#7F7F7F] hover:text-[#FF3B3B] hover:bg-[#FF3B3B]/10 transition-all"
              >
                <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Se déconnecter</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

function SidebarNav({
  pathname,
  collapsed,
  onToggle,
  displayName,
  email,
  avatarUrl,
  initials,
}: {
  pathname: string;
  collapsed: boolean;
  onToggle: () => void;
  displayName: string;
  email: string;
  avatarUrl: string | null;
  initials: string;
}) {
  return (
    <>
      <div
        className={`flex items-center border-b border-white/10 ${
          collapsed ? 'justify-center px-[10px] py-[12px]' : 'justify-end px-[14px] py-[12px]'
        }`}
      >
        <SidebarToggleButton collapsed={collapsed} onToggle={onToggle} />
      </div>

      <nav
        className={`flex-1 py-[14px] flex flex-col gap-[4px] ${collapsed ? 'px-[10px]' : 'px-[12px]'}`}
      >
        {NAV_ITEMS.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center rounded-[8px] text-[14px] font-semibold transition-all ${
                collapsed ? 'justify-center px-[10px] py-[11px]' : 'gap-[12px] px-[14px] py-[11px]'
              } ${
                active
                  ? 'bg-white text-black shadow-sm'
                  : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={active ? 'text-black' : 'text-[#7F7F7F]'}>{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <SidebarAccountFooter
        displayName={displayName}
        email={email}
        avatarUrl={avatarUrl}
        initials={initials}
        collapsed={collapsed}
      />

      <div className={`py-[12px] border-t border-white/10 ${collapsed ? 'px-[10px]' : 'px-[12px]'}`}>
        <form action={signOutAction}>
          <button
            type="submit"
            title={collapsed ? 'Se déconnecter' : undefined}
            className={`w-full flex items-center rounded-[8px] text-[13px] font-semibold text-[#7F7F7F] hover:text-[#FF3B3B] hover:bg-[#FF3B3B]/10 transition-all ${
              collapsed ? 'justify-center px-[10px] py-[10px]' : 'gap-[10px] px-[14px] py-[10px] text-left'
            }`}
          >
            <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!collapsed && <span>Se déconnecter</span>}
          </button>
        </form>
      </div>
    </>
  );
}

export default function AccountShell({
  displayName,
  email,
  firstName,
  avatarUrl,
  children,
}: MediaAccountShellProps) {
  const pathname = usePathname();
  const initials = getAccountInitials(
    { id: '', email, first_name: firstName, last_name: null, avatar_url: avatarUrl, gender: null },
    displayName
  );
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (stored === 'true') {
      setCollapsed(true);
    }
  }, []);

  const toggleSidebar = () => {
    setCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      return next;
    });
  };

  const sectionTitle = getSectionTitle(pathname, firstName, displayName);
  const isWelcomePage = pathname === '/compte';

  return (
    <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
      <section className="w-full bg-band border-b border-white/10 pt-[184px] pb-[80px] max-[900px]:pt-[128px] max-[900px]:pb-[56px]">
        <div className="px-[24px] max-[900px]:px-[16px]">
          <div className="w-full max-w-[1200px] mx-auto">
            <nav className="flex items-center gap-[8px] text-[#7F7F7F] text-[14px] mb-[32px]">
              <Link href="/" className="hover:text-white transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <span className="text-white font-semibold">Mon espace compte</span>
            </nav>

            <h1 className="text-[48px] max-[900px]:text-[32px] font-bold text-white leading-tight max-w-[800px]">
              Mon espace compte
            </h1>

            <p className="mt-[24px] text-[#A3A3A3] text-[18px] max-[900px]:text-[16px] leading-[1.6] max-w-[800px]">
              Retrouvez vos contenus épinglés, vos préférences de communication et, bientôt, votre
              abonnement magazine Their memory.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full pt-[80px] pb-[100px] max-[900px]:pt-[48px] max-[900px]:pb-[64px]">
        <div className="px-[24px] max-[900px]:px-[16px]">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row lg:items-start gap-[24px] lg:gap-[32px]">
            <aside
              className={`hidden lg:flex shrink-0 flex-col sticky top-[156px] self-start rounded-[12px] border border-white/10 bg-surface shadow-[0_12px_40px_rgba(0,0,0,0.45)] overflow-hidden transition-[width] duration-300 ease-in-out ${
                collapsed ? 'lg:w-[72px]' : 'lg:w-[280px]'
              }`}
            >
              <SidebarNav
                pathname={pathname}
                collapsed={collapsed}
                onToggle={toggleSidebar}
                displayName={displayName}
                email={email}
                avatarUrl={avatarUrl}
                initials={initials}
              />
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
              <AccountMobileNav
                displayName={displayName}
                email={email}
                avatarUrl={avatarUrl}
                initials={initials}
                pathname={pathname}
                sectionTitle={sectionTitle}
              />

              <div className="flex-1">
                {isWelcomePage ? (
                  <WelcomeSectionTitle label={sectionTitle} className="hidden lg:block" />
                ) : (
                  <AccountSectionTitle className="hidden lg:block">{sectionTitle}</AccountSectionTitle>
                )}
                <div className="w-full min-w-0">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
