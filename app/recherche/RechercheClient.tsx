"use client";

import Link from 'next/link';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BookmarkButton from '@/components/home/BookmarkButton';
import PageContainer from '@/components/layout/PageContainer';
import { SITE_PAGE_CONTENT, SITE_PAGE_HERO } from '@/lib/site-layout';
import {
  SEARCH_CONTENT_TYPES,
  SEARCH_TYPE_COLORS,
  type SearchResultItem,
} from '@/lib/search-data';

const normalizeString = (str: string) =>
  str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';

function DateInput({
  value,
  onChange,
  onFocus,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  placeholder: string;
}) {
  const [displayValue, setDisplayValue] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!value) return setDisplayValue('');
    const [y, m, d] = value.split('-');
    if (y && m && d) setDisplayValue(`${d}/${m}/${y}`);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^\d]/g, '');
    if (val.length > 8) val = val.substring(0, 8);
    let formatted = val;
    if (val.length > 2) formatted = `${val.substring(0, 2)}/${val.substring(2)}`;
    if (val.length > 4) formatted = `${formatted.substring(0, 5)}/${val.substring(4)}`;
    setDisplayValue(formatted);
    if (val.length === 8) {
      const d = val.substring(0, 2);
      const m = val.substring(2, 4);
      const y = val.substring(4, 8);
      if (Number(d) > 0 && Number(d) <= 31 && Number(m) > 0 && Number(m) <= 12 && Number(y) > 1900) {
        onChange(`${y}-${m}-${d}`);
      }
    } else if (val.length === 0) {
      onChange('');
    }
  };

  return (
    <input
      type="text"
      readOnly={isMobile}
      inputMode={isMobile ? 'none' : 'numeric'}
      value={displayValue}
      onChange={handleChange}
      onFocus={(e) => {
        if (window.innerWidth < 1024) e.target.blur();
        onFocus();
      }}
      placeholder={placeholder}
      className="bg-transparent border-none text-white text-[13px] md:text-[14px] font-semibold focus:outline-none focus:ring-0 p-0 w-[78px] md:w-[85px] shrink-0 text-center placeholder:font-normal placeholder:text-[#7F7F7F] max-[1024px]:pointer-events-none relative z-10"
      maxLength={10}
    />
  );
}

function CustomCalendar({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const [y, m, d] = value.split('-');
      if (y && m && d) return new Date(Number(y), Number(m) - 1, Number(d));
    }
    return new Date();
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startDay = firstDay === 0 ? 6 : firstDay - 1;
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
  ];

  return (
    <div className="p-[16px] flex flex-col cursor-default bg-[#111] rounded-[12px]" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between">
        <span className="font-bold text-white text-[14px]">{title}</span>
        {value && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onChange('');
            }}
            className="text-white text-[12px] font-semibold hover:underline"
          >
            Effacer
          </button>
        )}
      </div>
      <div className="w-full h-[1px] bg-white/10 my-[12px]" />
      <div className="flex items-center justify-between mb-[8px]">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setViewDate(new Date(year, month - 1, 1));
          }}
          className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white"
        >
          <svg className="w-[6px] h-[10px]" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 13L1 7l6-6" /></svg>
        </button>
        <span className="font-bold text-white text-[14px] capitalize">
          {monthNames[month]} {year}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setViewDate(new Date(year, month + 1, 1));
          }}
          className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white"
        >
          <svg className="w-[6px] h-[10px]" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 1l6 6-6 6" /></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-[4px] mb-[4px]">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
          <div key={i} className="text-center text-[#7F7F7F] text-[12px] font-semibold">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-[4px]">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const formattedMonth = String(month + 1).padStart(2, '0');
          const formattedDay = String(day).padStart(2, '0');
          const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
          const isSelected = value === dateStr;
          const todayObj = new Date();
          const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(todayObj.getDate()).padStart(2, '0')}`;
          const isToday = todayStr === dateStr;

          return (
            <button
              type="button"
              key={day}
              onClick={(e) => {
                e.preventDefault();
                onChange(dateStr);
              }}
              className={`h-[32px] rounded-[8px] text-[13px] font-semibold flex items-center justify-center transition-colors ${
                isSelected
                  ? 'bg-white text-black'
                  : isToday
                    ? 'text-white bg-white/10 border border-white/25 hover:bg-white/15'
                    : 'text-[#A3A3A3] hover:bg-white/10'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RechercheContent({ initialData }: { initialData: SearchResultItem[] }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const formattedDatabase = initialData.map((item) => {
    const d = new Date(item.dateIso);
    const dateStr = Number.isNaN(d.getTime())
      ? ''
      : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    return {
      ...item,
      date: item.type === 'Page' ? 'Page du site' : dateStr,
    };
  });

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number | 'Tous'>(9);
  const [openMenu, setOpenMenu] = useState<'type' | 'dates' | 'sort' | 'items' | null>(null);
  const [activeCalendar, setActiveCalendar] = useState<'start' | 'end' | null>(null);

  const typeRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const itemsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTypes, startDate, endDate, sortOrder, itemsPerPage]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (openMenu === 'type' && typeRef.current && !typeRef.current.contains(target)) setOpenMenu(null);
      if (openMenu === 'dates' && datesRef.current && !datesRef.current.contains(target)) setOpenMenu(null);
      if (openMenu === 'sort' && sortRef.current && !sortRef.current.contains(target)) setOpenMenu(null);
      if (openMenu === 'items' && itemsMenuRef.current && !itemsMenuRef.current.contains(target)) setOpenMenu(null);
      if (activeCalendar && datesRef.current && !datesRef.current.contains(target)) setActiveCalendar(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [openMenu, activeCalendar]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredResults = formattedDatabase
    .filter((item) => {
      if (searchQuery) {
        const normalizedQuery = normalizeString(searchQuery);
        const normalizedTitle = normalizeString(item.title);
        const normalizedExcerpt = normalizeString(item.excerpt);
        const hasMatchingTag = item.tags.some((tag) =>
          normalizeString(tag).includes(normalizedQuery)
        );
        if (
          !normalizedTitle.includes(normalizedQuery) &&
          !normalizedExcerpt.includes(normalizedQuery) &&
          !hasMatchingTag
        ) {
          return false;
        }
      }
      if (selectedTypes.length > 0 && !selectedTypes.includes(item.type)) return false;
      if (item.type !== 'Page') {
        const mDate = new Date(item.dateIso);
        if (startDate && mDate < new Date(startDate)) return false;
        if (endDate && mDate > new Date(endDate)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (a.type === 'Page' && b.type !== 'Page') return -1;
      if (a.type !== 'Page' && b.type === 'Page') return 1;
      if (a.type === 'Page' && b.type === 'Page') return a.title.localeCompare(b.title);
      const dateA = new Date(a.dateIso).getTime();
      const dateB = new Date(b.dateIso).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const totalItems = filteredResults.length;
  const totalPages = itemsPerPage === 'Tous' ? 1 : Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedResults =
    itemsPerPage === 'Tous'
      ? filteredResults
      : filteredResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const resetFilters = () => {
    setSelectedTypes([]);
    setStartDate('');
    setEndDate('');
    setSearchQuery('');
  };

  return (
    <main className="w-full min-h-screen bg-page font-['Open_Sans',sans-serif]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            input[type="text"]::-webkit-inner-spin-button,
            input[type="text"]::-webkit-calendar-picker-indicator { display: none; -webkit-appearance: none; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `,
        }}
      />

      <section className={`w-full bg-band border-b border-white/10 ${SITE_PAGE_HERO}`}>
        <PageContainer>
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-[8px] text-[#7F7F7F] text-[14px] mb-[32px]">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white font-semibold">Recherche</span>
          </nav>

          <h1 className="text-[48px] max-[900px]:text-[32px] font-bold text-white leading-tight max-w-[900px]">
            Résultats pour :{' '}
            <span className="text-[#4C3FE0]">« {searchQuery || '...'} »</span>
          </h1>

          <p className="mt-[24px] text-[#A3A3A3] text-[18px] max-[900px]:text-[16px] leading-[1.6]">
            {filteredResults.length} résultat{filteredResults.length !== 1 ? 's' : ''} trouvé
            {filteredResults.length !== 1 ? 's' : ''} sur l&apos;ensemble du site média.
          </p>
        </PageContainer>
      </section>

      <section className={SITE_PAGE_CONTENT}>
        <PageContainer>
          <div className="bg-[#111] p-[24px] rounded-[12px] border border-white/10 mb-[40px] flex flex-col gap-[20px] relative z-[50]">
            <div className="relative w-full">
              <svg className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#7F7F7F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Modifier la recherche..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[48px] bg-black border border-white/15 rounded-[8px] pl-[44px] pr-[16px] text-[15px] font-semibold text-white focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-[16px]">
              <div className="relative flex-1" ref={typeRef}>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(openMenu === 'type' ? null : 'type');
                    setActiveCalendar(null);
                  }}
                  className="w-full flex items-center justify-between h-[48px] px-[16px] border border-white/15 bg-black hover:bg-white/5 rounded-[8px] text-[14px] font-semibold text-white"
                >
                  Type de contenu {selectedTypes.length > 0 && `(${selectedTypes.length})`}
                  <svg className={`w-[10px] h-[6px] transition-transform ${openMenu === 'type' ? 'rotate-180' : ''}`} viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l4 4 4-4" /></svg>
                </button>
                {openMenu === 'type' && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-full md:w-[320px] bg-[#111] border border-white/15 shadow-xl rounded-[12px] p-[16px] z-[100]">
                    {selectedTypes.length > 0 && (
                      <button type="button" onClick={() => setSelectedTypes([])} className="text-white text-[12px] font-semibold hover:underline mb-[12px] block text-right w-full">
                        Effacer
                      </button>
                    )}
                    <div className="flex flex-col gap-[12px]">
                      {SEARCH_CONTENT_TYPES.map((type) => (
                        <label key={type} className="flex items-center gap-[12px] cursor-pointer group">
                          <div className={`w-[20px] h-[20px] rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${selectedTypes.includes(type) ? 'bg-white border-white' : 'border-white/25 group-hover:border-white'}`}>
                            {selectedTypes.includes(type) && (
                              <svg className="w-[12px] h-[12px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                            )}
                          </div>
                          <span className={`text-[14px] transition-colors ${selectedTypes.includes(type) ? 'font-semibold text-white' : 'text-[#A3A3A3] group-hover:text-white'}`}>
                            {type}
                          </span>
                          <input type="checkbox" className="hidden" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} />
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative flex-[2] lg:flex-[1.8]" ref={datesRef}>
                <div className="flex items-center h-[48px] border border-white/15 bg-black rounded-[8px] p-[4px] gap-[6px] overflow-x-auto no-scrollbar w-full">
                  <div className="flex items-center gap-[6px] font-semibold text-[13px] md:text-[14px] text-white bg-white/10 px-[10px] h-full rounded-[6px] whitespace-nowrap shrink-0">
                    Période
                  </div>
                  <div className="w-[1px] h-[24px] bg-white/15 shrink-0 hidden md:block" />
                  <div className="flex items-center gap-[6px] shrink-0 pr-[4px]">
                    <div className="relative flex items-center gap-[4px] shrink-0">
                      <span className="text-[#7F7F7F] text-[13px] font-semibold shrink-0">Du</span>
                      <DateInput value={startDate} onChange={setStartDate} onFocus={() => { setActiveCalendar('start'); setOpenMenu(null); }} placeholder="JJ/MM/AAAA" />
                      <div className="absolute inset-0 z-20 hidden max-[1024px]:block cursor-pointer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveCalendar('start'); setOpenMenu(null); }} />
                    </div>
                    <div className="relative flex items-center gap-[4px] shrink-0">
                      <span className="text-[#7F7F7F] text-[13px] font-semibold shrink-0 pl-[4px]">Au</span>
                      <DateInput value={endDate} onChange={setEndDate} onFocus={() => { setActiveCalendar('end'); setOpenMenu(null); }} placeholder="JJ/MM/AAAA" />
                      <div className="absolute inset-0 z-20 hidden max-[1024px]:block cursor-pointer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveCalendar('end'); setOpenMenu(null); }} />
                    </div>
                  </div>
                </div>
                {activeCalendar && (
                  <div className="absolute top-[calc(100%+8px)] left-0 md:left-auto md:right-0 w-[300px] border border-white/15 shadow-xl rounded-[12px] overflow-hidden z-[100]">
                    <CustomCalendar
                      title={activeCalendar === 'start' ? 'Date de début' : 'Date de fin'}
                      value={activeCalendar === 'start' ? startDate : endDate}
                      onChange={(val) => {
                        if (activeCalendar === 'start') setStartDate(val);
                        else setEndDate(val);
                        setActiveCalendar(null);
                      }}
                    />
                  </div>
                )}
              </div>

              <div className={`relative flex-1 ${openMenu === 'sort' ? 'z-[100]' : 'z-[10]'}`} ref={sortRef}>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(openMenu === 'sort' ? null : 'sort');
                    setActiveCalendar(null);
                  }}
                  className="w-full flex items-center justify-between h-[48px] px-[16px] border border-white/15 bg-black hover:bg-white/5 rounded-[8px] text-[14px] font-semibold text-white"
                >
                  Tri : {sortOrder === 'desc' ? 'Récents' : 'Anciens'}
                  <svg className={`w-[10px] h-[6px] transition-transform ${openMenu === 'sort' ? 'rotate-180' : ''}`} viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l4 4 4-4" /></svg>
                </button>
                {openMenu === 'sort' && (
                  <div className="absolute top-[calc(100%+8px)] right-0 max-[1024px]:left-0 w-full md:w-[240px] bg-[#111] border border-white/15 shadow-xl rounded-[12px] p-[16px] flex flex-col z-[100]">
                    <div className="flex flex-col gap-[12px]">
                      {(['desc', 'asc'] as const).map((order) => (
                        <div
                          key={order}
                          onClick={() => {
                            setSortOrder(order);
                            setOpenMenu(null);
                          }}
                          className="flex items-center gap-[12px] cursor-pointer group"
                        >
                          <div className={`w-[20px] h-[20px] rounded-full border flex items-center justify-center transition-colors ${sortOrder === order ? 'border-white' : 'border-white/25 group-hover:border-white'}`}>
                            {sortOrder === order && <div className="w-[10px] h-[10px] bg-white rounded-full" />}
                          </div>
                          <span className={`text-[14px] transition-colors ${sortOrder === order ? 'font-semibold text-white' : 'text-[#A3A3A3] group-hover:text-white'}`}>
                            {order === 'desc' ? 'Plus récents' : 'Plus anciens'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {totalItems > 0 && (
            <div className="flex justify-end w-full mb-[24px]">
              <div className={`flex items-center gap-[12px] relative ${openMenu === 'items' ? 'z-[100]' : 'z-[10]'}`} ref={itemsMenuRef}>
                <span className="text-[#7F7F7F] text-[14px]">Afficher :</span>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(openMenu === 'items' ? null : 'items');
                    setActiveCalendar(null);
                  }}
                  className="flex items-center justify-between gap-[16px] px-[16px] h-[40px] rounded-[8px] font-semibold text-[14px] transition-all border bg-black border-white/15 text-white hover:bg-white/5"
                >
                  {itemsPerPage}
                  <svg className={`w-[10px] h-[6px] transition-transform ${openMenu === 'items' ? 'rotate-180' : ''}`} viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l4 4 4-4" /></svg>
                </button>
                {openMenu === 'items' && (
                  <div className="absolute top-[calc(100%+8px)] right-0 w-[100px] bg-[#111] border border-white/15 shadow-xl rounded-[12px] p-[8px] flex flex-col gap-[4px] z-[100]">
                    {([9, 18, 27, 'Tous'] as const).map((num) => (
                      <button
                        key={String(num)}
                        type="button"
                        onClick={() => {
                          setItemsPerPage(num);
                          setOpenMenu(null);
                        }}
                        className={`flex items-center justify-between w-full text-left px-[12px] py-[8px] rounded-[8px] text-[14px] transition-colors ${itemsPerPage === num ? 'bg-white/10 text-white font-bold' : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white font-semibold'}`}
                      >
                        {num}
                        {itemsPerPage === num && (
                          <svg className="w-[12px] h-[12px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {paginatedResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] max-[900px]:gap-[24px]">
              {paginatedResults.map((item) => {
                const color = SEARCH_TYPE_COLORS[item.type];
                const bookmark =
                  item.type === 'Article'
                    ? {
                        contentType: 'article' as const,
                        contentId: item.link.replace(/^\/articles\//, ''),
                      }
                    : item.type === 'Vidéo'
                      ? {
                          contentType: 'video' as const,
                          contentId: item.id.replace(/^vid_/, ''),
                        }
                      : null;

                return (
                  <div
                    key={item.id}
                    className="bg-[#111] rounded-[12px] p-[32px] max-[900px]:p-[24px] hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col relative overflow-hidden group h-full"
                  >
                    <div className="absolute top-0 left-0 w-full h-[4px] opacity-0 transition-opacity group-hover:opacity-100" style={{ backgroundColor: color }} />

                    {bookmark && (
                      <div className="absolute top-[16px] right-[16px] z-10">
                        <BookmarkButton
                          contentType={bookmark.contentType}
                          contentId={bookmark.contentId}
                          title={item.title}
                          href={item.link}
                          className="!w-[40px] !h-[40px]"
                        />
                      </div>
                    )}

                    <Link href={item.link} className="flex flex-col flex-1 min-h-0">
                    <div className="flex flex-wrap items-center gap-[12px] mb-[20px] pr-[48px]">
                      <span
                        className="text-[11px] font-bold uppercase tracking-wider px-[12px] py-[6px] rounded-[6px] text-white shadow-sm"
                        style={{ backgroundColor: color }}
                      >
                        {item.type}
                      </span>
                      {item.date && item.type !== 'Page' && (
                        <span className="text-[#7F7F7F] text-[13px] font-semibold flex items-center gap-[6px]">
                          <svg className="w-[14px] h-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {item.date}
                        </span>
                      )}
                    </div>

                    <h2 className="text-[20px] font-bold text-white mb-[12px] leading-tight group-hover:text-[#d4d4d4] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-[#A3A3A3] text-[15px] leading-[1.6] mb-[32px] flex-1 line-clamp-4">
                      {item.excerpt}
                    </p>

                    <div className="mt-auto flex items-center gap-[8px] font-semibold text-[15px] transition-colors" style={{ color }}>
                      Consulter
                      <svg className="w-[6px] h-[10px] transition-transform group-hover:translate-x-1" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 1l6 6-6 6" /></svg>
                    </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-[100px] bg-[#111] rounded-[12px] border border-dashed border-white/20 px-[24px] text-center">
              <div className="w-[80px] h-[80px] bg-black rounded-full flex items-center justify-center mb-[20px] border border-white/10">
                <svg className="w-[40px] h-[40px] text-[#404040]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3 className="text-white text-[24px] font-bold mb-[12px]">Aucun résultat trouvé</h3>
              <p className="text-[#7F7F7F] text-[16px] max-w-[500px] leading-[1.6] mb-[24px]">
                Nous n&apos;avons trouvé aucun contenu correspondant à vos critères. Essayez de vérifier l&apos;orthographe ou d&apos;effacer certains filtres.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-[24px] py-[12px] bg-white text-black font-semibold rounded-[8px] hover:bg-[#e8e8e8] transition-all"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="w-full flex items-center justify-center gap-[8px] mt-[64px]">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-[40px] h-[40px] rounded-[8px] border border-white/15 bg-[#111] flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-[6px] h-[10px]" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 13L1 7l6-6" /></svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-[40px] h-[40px] rounded-[8px] font-bold text-[14px] transition-colors flex items-center justify-center ${
                    currentPage === page
                      ? 'bg-white/10 text-white border border-white'
                      : 'bg-[#111] border border-white/15 text-white hover:bg-white/5'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-[40px] h-[40px] rounded-[8px] border border-white/15 bg-[#111] flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-[6px] h-[10px]" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 1l6 6-6 6" /></svg>
              </button>
            </div>
          )}
        </PageContainer>
      </section>
    </main>
  );
}

export default function RechercheClient({ initialData }: { initialData: SearchResultItem[] }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-page" />}>
      <RechercheContent initialData={initialData} />
    </Suspense>
  );
}
