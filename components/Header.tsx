"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ARTICLE_CATEGORIES,
  INSTITUTIONAL_SITE_URL,
  MEDIA_NAV,
} from '@/lib/site-config';

const LANGUAGES = {
  fr: { label: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
  en: { label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  de: { label: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
  es: { label: 'Español', flag: 'https://flagcdn.com/w40/es.png' },
  it: { label: 'Italiano', flag: 'https://flagcdn.com/w40/it.png' },
};

const INSTITUTIONAL_SITE_ICON_PATH =
  'M1.8 14C1.305 14 0.88125 13.8286 0.52875 13.4859C0.17625 13.1432 0 12.7312 0 12.25V1.75C0 1.26875 0.17625 0.856771 0.52875 0.514063C0.88125 0.171354 1.305 0 1.8 0H16.2C16.695 0 17.1187 0.171354 17.4713 0.514063C17.8238 0.856771 18 1.26875 18 1.75V12.25C18 12.7312 17.8238 13.1432 17.4713 13.4859C17.1187 13.8286 16.695 14 16.2 14H1.8ZM1.8 12.25H11.25V9.1875H1.8V12.25ZM13.05 12.25H16.2V4.375H13.05V12.25ZM1.8 7.4375H11.25V4.375H1.8V7.4375Z';

function InstitutionalSiteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 14"
      fill="currentColor"
      aria-hidden
    >
      <path d={INSTITUTIONAL_SITE_ICON_PATH} />
    </svg>
  );
}

const TRANSLATIONS = {
  fr: {
    institutionalSite: 'Site institutionnel',
    search: 'Rechercher',
    searchTitle: 'Que recherchez-vous ?',
    searchPlaceholder: 'Ex: Résistance, Biographie, Politique...',
    login: 'Se connecter',
    myAccount: 'Mon compte',
    back: 'Retour',
    nav: { articles: 'Articles', magazine: 'Magazine', videos: 'Vidéos', podcasts: 'Podcasts' },
    articlesMega: { title: 'Articles', seeAll: 'Tous les articles' },
  },
  en: {
    institutionalSite: 'Institutional site',
    search: 'Search',
    searchTitle: 'What are you looking for?',
    searchPlaceholder: 'Ex: Resistance, Biography, Politics...',
    login: 'Log in',
    myAccount: 'My account',
    back: 'Back',
    nav: { articles: 'Articles', magazine: 'Magazine', videos: 'Videos', podcasts: 'Podcasts' },
    articlesMega: { title: 'Articles', seeAll: 'All articles' },
  },
  de: {
    institutionalSite: 'Institutionelle Website',
    search: 'Suchen',
    searchTitle: 'Wonach suchen Sie?',
    searchPlaceholder: 'Bsp: Widerstand, Biografie, Politik...',
    login: 'Anmelden',
    myAccount: 'Mein Konto',
    back: 'Zurück',
    nav: { articles: 'Artikel', magazine: 'Magazin', videos: 'Videos', podcasts: 'Podcasts' },
    articlesMega: { title: 'Artikel', seeAll: 'Alle Artikel' },
  },
  es: {
    institutionalSite: 'Sitio institucional',
    search: 'Buscar',
    searchTitle: '¿Qué está buscando?',
    searchPlaceholder: 'Ej: Resistencia, Biografía, Política...',
    login: 'Iniciar sesión',
    myAccount: 'Mi cuenta',
    back: 'Volver',
    nav: { articles: 'Artículos', magazine: 'Revista', videos: 'Vídeos', podcasts: 'Podcasts' },
    articlesMega: { title: 'Artículos', seeAll: 'Todos los artículos' },
  },
  it: {
    institutionalSite: 'Sito istituzionale',
    search: 'Cerca',
    searchTitle: 'Cosa stai cercando?',
    searchPlaceholder: 'Es: Resistenza, Biografia, Politica...',
    login: 'Accedi',
    myAccount: 'Il mio account',
    back: 'Indietro',
    nav: { articles: 'Articoli', magazine: 'Rivista', videos: 'Video', podcasts: 'Podcast' },
    articlesMega: { title: 'Articoli', seeAll: 'Tutti gli articoli' },
  },
};

export default function Header() {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<keyof typeof LANGUAGES>('fr');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);
  const [isAuthenticated] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    (window as Window & { googleTranslateElementInit?: () => void }).googleTranslateElementInit = () => {
      new (window as Window & { google?: { translate: { TranslateElement: new (...args: unknown[]) => void } } }).google!.translate.TranslateElement(
        { pageLanguage: 'fr', autoDisplay: false },
        'google_translate_element'
      );
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    const match = document.cookie.match(/googtrans=\/fr\/(en|fr|de|es|it)/);
    if (match?.[1]) setCurrentLang(match[1] as keyof typeof LANGUAGES);
  }, []);

  const changeLanguage = (langCode: keyof typeof LANGUAGES) => {
    setCurrentLang(langCode);
    const selectField = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (selectField) {
      selectField.value = langCode;
      selectField.dispatchEvent(new Event('change'));
    } else {
      document.cookie = `googtrans=/fr/${langCode}; path=/`;
      document.cookie = `googtrans=/fr/${langCode}; domain=${window.location.hostname}; path=/`;
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
        setActiveMenu(null);
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = 'unset';
        setMobileActiveSubmenu(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  const closeMenus = () => {
    setActiveMenu(null);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
      closeMenus();
      setSearchQuery('');
    }
  };

  const navLinks = [
    { key: 'articles', href: '/articles', label: t.nav.articles, hasSubmenu: true },
    { key: 'magazine', href: '/magazine', label: t.nav.magazine, hasSubmenu: false },
    { key: 'videos', href: '/videos', label: t.nav.videos, hasSubmenu: false },
    { key: 'podcasts', href: '/podcasts', label: t.nav.podcasts, hasSubmenu: false },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body { top: 0 !important; }
        .skiptranslate { display: none !important; }
        #goog-gt-tt { display: none !important; }
        .goog-te-banner-frame { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
      ` }} />

      <div id="google_translate_element" className="hidden" />

      <header className="fixed top-[20px] left-0 w-full z-[1000] pointer-events-none max-[900px]:top-[12px] font-['Open_Sans',sans-serif] px-[24px] max-[900px]:px-[16px] notranslate">
        <div ref={headerRef} className="w-full max-w-[1200px] mx-auto flex flex-col pointer-events-auto relative">

          {/* Desktop top bar */}
          <div className="w-full h-[40px] flex max-[900px]:hidden">
            <div className="flex-1 bg-white rounded-tl-[12px] flex justify-between items-center pl-[24px]">
              <div className="flex items-center gap-[40px]">
                <div className="relative">
                  <div
                    className="flex items-center gap-[8px] cursor-pointer"
                    onClick={() => { setIsLangMenuOpen(!isLangMenuOpen); setActiveMenu(null); setIsSearchOpen(false); }}
                  >
                    <div className="w-[20px] h-[20px] rounded-full bg-gray-200 bg-cover bg-center shadow-sm" style={{ backgroundImage: `url('${LANGUAGES[currentLang].flag}')` }} />
                    <span className="text-[#7F7F7F] text-[14px] font-semibold select-none">{LANGUAGES[currentLang].label}</span>
                    <svg className={`w-[10px] h-[7px] shrink-0 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 7" fill="none"><path d="M5 3.83333L8.83333 0L10 1.16667L5 6.16667L0 1.16667L1.16667 0L5 3.83333Z" fill="#7F7F7F" /></svg>
                  </div>
                  {isLangMenuOpen && (
                    <div className="absolute top-[40px] left-[-16px] min-w-[184px] bg-white border border-gray-200 shadow-lg rounded-[8px] z-[1010] p-[8px]">
                      {(Object.keys(LANGUAGES) as Array<keyof typeof LANGUAGES>).map((langCode) => (
                        <button key={langCode} className="w-full flex items-center gap-[16px] p-[8px] bg-transparent border-none cursor-pointer rounded-[4px] hover:bg-gray-50" onClick={() => { changeLanguage(langCode); setIsLangMenuOpen(false); }}>
                          <div className={`w-[16px] h-[16px] rounded-full border-[2px] flex items-center justify-center shrink-0 ${currentLang === langCode ? 'border-black' : 'border-gray-300'}`}>
                            {currentLang === langCode && <div className="w-[8px] h-[8px] bg-black rounded-full" />}
                          </div>
                          <div className="w-[20px] h-[20px] rounded-full bg-gray-200 bg-cover bg-center shrink-0 shadow-sm" style={{ backgroundImage: `url('${LANGUAGES[langCode].flag}')` }} />
                          <span className="text-[14px] font-semibold text-[#7F7F7F]">{LANGUAGES[langCode].label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <a href={INSTITUTIONAL_SITE_URL} className="flex items-center gap-[8px] cursor-pointer transition-all hover:brightness-110 text-[#7F7F7F]">
                  <InstitutionalSiteIcon className="w-[18px] h-[14px] shrink-0" />
                  <span className="text-[14px] font-semibold">{t.institutionalSite}</span>
                </a>
              </div>

              <div className="flex items-center h-full">
                <button aria-label={t.search} onClick={() => { setIsSearchOpen(!isSearchOpen); setActiveMenu(null); setIsLangMenuOpen(false); }} className="flex items-center gap-[8px] cursor-pointer mr-[24px] transition-all hover:opacity-70 text-[#000]">
                  <span className="text-[#000] text-[14px] font-semibold">{t.search}</span>
                  <svg className="w-[14px] h-[14px] shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none"><path d="M12.9111 14L8.01111 9.1C7.62222 9.41111 7.175 9.65741 6.66944 9.83889C6.16389 10.0204 5.62593 10.1111 5.05556 10.1111C3.64259 10.1111 2.44676 9.62176 1.46806 8.64306C0.489352 7.66435 0 6.46852 0 5.05556C0 3.64259 0.489352 2.44676 1.46806 1.46806C2.44676 0.489352 3.64259 0 5.05556 0C6.46852 0 7.66435 0.489352 8.64306 1.46806C9.62176 2.44676 10.1111 3.64259 10.1111 5.05556C10.1111 5.62593 10.0204 6.16389 9.83889 6.66944C9.65741 7.175 9.41111 7.62222 9.1 8.01111L14 12.9111L12.9111 14ZM5.05556 8.55556C6.02778 8.55556 6.85417 8.21528 7.53472 7.53472C8.21528 6.85417 8.55556 6.02778 8.55556 5.05556C8.55556 4.08333 8.21528 3.25694 7.53472 2.57639C6.85417 1.89583 6.02778 1.55556 5.05556 1.55556C4.08333 1.55556 3.25694 1.89583 2.57639 2.57639C1.89583 3.25694 1.55556 4.08333 1.55556 5.05556C1.55556 6.02778 1.89583 6.85417 2.57639 7.53472C3.25694 8.21528 4.08333 8.55556 5.05556 8.55556Z" fill="currentColor" /></svg>
                </button>
              </div>
            </div>

            <div className="relative h-full flex-shrink-0">
              <div className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-white pointer-events-none" />
              <a href={`${INSTITUTIONAL_SITE_URL}/login`} className="relative z-10 flex items-center justify-center h-full gap-[8px] cursor-pointer bg-[#FFCC00] px-[24px] rounded-bl-[12px] rounded-tr-[12px] transition-all hover:bg-[#FFD633]">
                <span className="text-black text-[14px] font-semibold">{isAuthenticated ? t.myAccount : t.login}</span>
                <svg className="w-[14px] h-[14px] shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none"><path d="M2.695 10.57C3.29 10.115 3.955 9.75625 4.69 9.49375C5.425 9.23125 6.195 9.1 7 9.1C7.805 9.1 8.575 9.23125 9.31 9.49375C10.045 9.75625 10.71 10.115 11.305 10.57C11.7133 10.0917 12.0312 9.54917 12.2587 8.9425C12.4862 8.33583 12.6 7.68833 12.6 7C12.6 5.44833 12.0546 4.12708 10.9637 3.03625C9.87292 1.94542 8.55167 1.4 7 1.4C5.44833 1.4 4.12708 1.94542 3.03625 3.03625C1.94542 4.12708 1.4 5.44833 1.4 7C1.4 7.68833 1.51375 8.33583 1.74125 8.9425C1.96875 9.54917 2.28667 10.0917 2.695 10.57ZM7 7.7C6.31167 7.7 5.73125 7.46375 5.25875 6.99125C4.78625 6.51875 4.55 5.93833 4.55 5.25C4.55 4.56167 4.78625 3.98125 5.25875 3.50875C5.73125 3.03625 6.31167 2.8 7 2.8C7.68833 2.8 8.26875 3.03625 8.74125 3.50875C9.21375 3.98125 9.45 4.56167 9.45 5.25C9.45 5.93833 9.21375 6.51875 8.74125 6.99125C8.26875 7.46375 7.68833 7.7 7 7.7ZM7 14C6.03167 14 5.12167 13.8162 4.27 13.4488C3.41833 13.0813 2.6775 12.5825 2.0475 11.9525C1.4175 11.3225 0.91875 10.5817 0.55125 9.73C0.18375 8.87833 0 7.96833 0 7C0 6.03167 0.18375 5.12167 0.55125 4.27C0.91875 3.41833 1.4175 2.6775 2.0475 2.0475C2.6775 1.4175 3.41833 0.91875 4.27 0.55125C5.12167 0.18375 6.03167 0 7 0C7.96833 0 8.87833 0.18375 9.73 0.55125C10.5817 0.91875 11.3225 1.4175 11.9525 2.0475C12.5825 2.6775 13.0813 3.41833 13.4488 4.27C13.8162 5.12167 14 6.03167 14 7C14 7.96833 13.8162 8.87833 13.4488 9.73C13.0813 10.5817 12.5825 11.3225 11.9525 11.9525C11.3225 12.5825 10.5817 13.0813 9.73 13.4488C8.87833 13.8162 7.96833 14 7 14Z" fill="black" /></svg>
              </a>
            </div>
          </div>

          {/* Desktop main nav */}
          <div className={`w-full h-[80px] max-[900px]:hidden relative z-[20] transition-all duration-200 ${activeMenu || isSearchOpen ? 'bg-white rounded-b-none' : 'bg-white/50 backdrop-blur-[10px] rounded-b-[12px]'}`}>
            <div className="w-full h-full flex justify-between items-end px-[24px] pb-[20px]">
              <Link href="/" onClick={closeMenus} className="flex-shrink-0">
                <img src="/images/horizontal_noir.png" alt="Their memory" width={253} height={40} className="w-auto h-[40px] hidden min-[1152px]:block" />
                <img src="/images/avatar_noir.png" alt="Their memory" width={78} height={40} className="w-auto h-[40px] hidden max-[1151px]:block" />
              </Link>
              <nav className="flex items-center gap-[32px]">
                {navLinks.map((item) =>
                  item.hasSubmenu ? (
                    <button key={item.key} onClick={() => setActiveMenu(activeMenu === 'articles' ? null : 'articles')} className="text-[#000] text-[16px] font-semibold cursor-pointer hover:opacity-70 transition-opacity">
                      {item.label}
                    </button>
                  ) : (
                    <Link key={item.key} href={item.href} onClick={closeMenus} className="text-[#000] text-[16px] font-semibold hover:opacity-70 transition-opacity">
                      {item.label}
                    </Link>
                  )
                )}
              </nav>
            </div>
          </div>

          {/* Mobile bar */}
          <div className={`hidden max-[900px]:flex w-full h-[64px] transition-all duration-300 justify-between items-center px-[16px] relative z-[20] ${isSearchOpen || isMobileMenuOpen ? 'bg-white rounded-t-[12px] rounded-b-none' : 'bg-white/50 backdrop-blur-[10px] rounded-[12px]'}`}>
            <Link href="/" onClick={closeMenus}>
              <img src="/images/avatar_noir.png" alt="Their memory" width={63} height={32} className="w-auto h-[32px] block" />
            </Link>
            <div className="flex items-center gap-[24px]">
              <button aria-label={t.search} onClick={() => { setIsSearchOpen(!isSearchOpen); setIsMobileMenuOpen(false); }} className="cursor-pointer w-[20px] h-[20px]">
                <svg className="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none"><path d="M12.9111 14L8.01111 9.1C7.62222 9.41111 7.175 9.65741 6.66944 9.83889C6.16389 10.0204 5.62593 10.1111 5.05556 10.1111C3.64259 10.1111 2.44676 9.62176 1.46806 8.64306C0.489352 7.66435 0 6.46852 0 5.05556C0 3.64259 0.489352 2.44676 1.46806 1.46806C2.44676 0.489352 3.64259 0 5.05556 0C6.46852 0 7.66435 0.489352 8.64306 1.46806C9.62176 2.44676 10.1111 3.64259 10.1111 5.05556C10.1111 5.62593 10.0204 6.16389 9.83889 6.66944C9.65741 7.175 9.41111 7.62222 9.1 8.01111L14 12.9111L12.9111 14ZM5.05556 8.55556C6.02778 8.55556 6.85417 8.21528 7.53472 7.53472C8.21528 6.85417 8.55556 6.02778 8.55556 5.05556C8.55556 4.08333 8.21528 3.25694 7.53472 2.57639C6.85417 1.89583 6.02778 1.55556 5.05556 1.55556C4.08333 1.55556 3.25694 1.89583 2.57639 2.57639C1.89583 3.25694 1.55556 4.08333 1.55556 5.05556C1.55556 6.02778 1.89583 6.85417 2.57639 7.53472C3.25694 8.21528 4.08333 8.55556 5.05556 8.55556Z" fill="black" /></svg>
              </button>
              <button aria-label="Menu" onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setIsSearchOpen(false); }} className="cursor-pointer w-[24px] h-[24px]">
                {isMobileMenuOpen ? (
                  <svg className="w-[24px] h-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                ) : (
                  <svg className="w-[24px] h-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Articles mega menu */}
          <div className={`absolute top-[120px] left-0 w-full bg-[#ebebeb] shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-b-[12px] overflow-hidden transition-all duration-300 ease-out z-[10] max-[900px]:hidden ${activeMenu === 'articles' ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-[12px] pointer-events-none'}`}>
            <div className="flex px-[40px] py-[80px] gap-[60px]">
              <div className="w-[30%] flex flex-col items-start pr-[40px]">
                <h2 className="text-[28px] font-bold text-[#000] mb-[24px] leading-tight">{t.articlesMega.title}</h2>
                <Link href="/articles" className="bg-[#000] text-white px-[20px] py-[10px] rounded-[8px] font-semibold text-[16px] transition-all hover:bg-[#333]" onClick={closeMenus}>
                  {t.articlesMega.seeAll}
                </Link>
              </div>
              <div className="w-[70%] grid grid-cols-2 gap-y-[24px] gap-x-[40px] content-start pt-[4px]">
                {ARTICLE_CATEGORIES.map((cat) => (
                  <Link key={cat.slug} href={`/articles?categorie=${cat.slug}`} className="text-[#000] font-semibold text-[16px] hover:opacity-70 transition-opacity" onClick={closeMenus}>
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Search drawer */}
          <div className={`absolute top-[120px] max-[900px]:top-[64px] left-0 w-full bg-[#ebebeb] max-[900px]:bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-b-[12px] max-[900px]:rounded-none overflow-hidden transition-all duration-300 ease-out z-[10] max-[900px]:fixed max-[900px]:top-[76px] max-[900px]:-bottom-[24px] max-[900px]:pb-[24px] max-[900px]:left-[16px] max-[900px]:right-[16px] max-[900px]:w-auto ${isSearchOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible max-[900px]:-translate-y-[24px] min-[901px]:-translate-y-[12px] pointer-events-none'}`}>
            <div className="flex flex-col items-center px-[40px] py-[48px] max-[900px]:px-[20px] max-[900px]:py-[32px]">
              <div className="w-full max-w-[800px] flex flex-col">
                <h2 className="text-[24px] max-[900px]:text-[20px] font-bold text-[#000] mb-[20px] text-center">{t.searchTitle}</h2>
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-[16px] max-[900px]:flex-col w-full">
                  <div className="relative flex-1 w-full">
                    <svg className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.searchPlaceholder} className="w-full h-[48px] bg-white border border-gray-300 rounded-[8px] pl-[44px] pr-[16px] text-[15px] font-semibold text-[#000] focus:outline-none focus:border-black transition-colors shadow-sm" />
                  </div>
                  <button type="submit" className="bg-[#000] text-white px-[24px] h-[48px] rounded-[8px] font-semibold text-[15px] transition-all hover:bg-[#333] shadow-sm max-[900px]:w-full">{t.search}</button>
                </form>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`hidden max-[900px]:flex fixed top-[76px] -bottom-[24px] pb-[24px] left-[16px] right-[16px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-b-[12px] overflow-hidden transition-all duration-300 ease-out z-[10] flex-col ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-[24px] pointer-events-none'}`}>
            <div className={`flex-1 overflow-y-auto w-full pb-[120px] ${mobileActiveSubmenu ? 'bg-[#f5f5f5]' : 'bg-white'}`}>
              {!mobileActiveSubmenu ? (
                <div className="flex flex-col w-full min-h-full pb-[40px]">
                  <a href={`${INSTITUTIONAL_SITE_URL}/login`} className="w-full bg-[#FFCC00] hover:bg-[#FFD633] px-[20px] py-[16px] flex items-center justify-between" onClick={closeMenus}>
                    <span className="text-black text-[16px] font-bold">{isAuthenticated ? t.myAccount : t.login}</span>
                  </a>
                  <div className="flex flex-col pt-[16px]">
                    <button onClick={() => setMobileActiveSubmenu('articles')} className="flex items-center justify-between py-[16px] px-[20px] w-full text-left">
                      <span className="text-[#000] text-[16px] font-bold">{t.nav.articles}</span>
                      <svg className="w-[8px] h-[16px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 14" fill="none" stroke="#000" strokeWidth="2.5"><path d="M1 1l6 6-6 6" /></svg>
                    </button>
                    {MEDIA_NAV.filter((m) => !m.hasSubmenu).map((item) => (
                      <Link key={item.href} href={item.href} onClick={closeMenus} className="flex items-center justify-between py-[16px] px-[20px] text-[#000] text-[16px] font-bold">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div className="w-[calc(100%-40px)] mx-auto h-[1px] bg-gray-200 mt-[8px] mb-[24px]" />
                  <div className="px-[20px] flex flex-col gap-[24px]">
                    <a href={INSTITUTIONAL_SITE_URL} onClick={closeMenus} className="text-[#000] text-[16px] font-semibold flex items-center gap-[12px]">
                      <InstitutionalSiteIcon className="w-[20px] h-[16px] shrink-0" />
                      <span>{t.institutionalSite}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full min-h-full">
                  <div className="flex flex-col bg-white px-[20px] pt-[20px] pb-[24px]">
                    <button onClick={() => setMobileActiveSubmenu(null)} className="flex items-center gap-[8px] text-[#000] text-[16px] font-bold mb-[24px] w-fit">
                      <svg className="w-[8px] h-[16px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 14" fill="none" stroke="#000" strokeWidth="2.5"><path d="M7 13L1 7l6-6" /></svg>
                      {t.back}
                    </button>
                    <h2 className="text-[28px] font-bold text-[#000] mb-[20px]">{t.articlesMega.title}</h2>
                    <Link href="/articles" className="bg-[#000] text-white px-[20px] py-[10px] rounded-[8px] font-semibold text-[16px] text-center" onClick={closeMenus}>{t.articlesMega.seeAll}</Link>
                  </div>
                  <div className="flex-1 flex flex-col gap-[24px] p-[24px]">
                    {ARTICLE_CATEGORIES.map((cat) => (
                      <Link key={cat.slug} href={`/articles?categorie=${cat.slug}`} className="text-[#000] font-semibold text-[16px]" onClick={closeMenus}>{cat.label}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
