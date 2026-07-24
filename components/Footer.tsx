"use client";

import Link from 'next/link';
import { useState } from 'react';
import { createOrgClient } from '@/utils/supabase/org-client';
import {
  ARTICLE_CATEGORIES,
  INSTITUTIONAL_SITE_URL,
  ORG_FOOTER_LINKS,
  SOCIAL_NETWORKS,
} from '@/lib/site-config';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      setStatus('error');
      setMessage('Veuillez entrer une adresse e-mail valide.');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const supabase = createOrgClient();
      const cleanEmail = email.toLowerCase().trim();
      const { data: listData, error: listError } = await supabase
        .schema('diffusion')
        .from('lists')
        .select('id')
        .ilike('name', 'À la une')
        .eq('is_global', true)
        .single();

      if (listError) throw new Error(listError.message || 'Liste introuvable');

      let subscriberId: string | null = null;
      const { data: subData, error: subError } = await supabase
        .schema('diffusion')
        .from('subscribers')
        .insert([{ email: cleanEmail }])
        .select('id')
        .single();

      if (subError?.code === '23505') {
        const { data: existingSub, error: fetchError } = await supabase
          .schema('diffusion')
          .from('subscribers')
          .select('id')
          .eq('email', cleanEmail)
          .single();
        if (fetchError) throw new Error(fetchError.message);
        subscriberId = existingSub?.id ?? null;
      } else if (subError) {
        throw new Error(subError.message);
      } else {
        subscriberId = subData?.id ?? null;
      }

      if (subscriberId && listData?.id) {
        const { error: linkError } = await supabase
          .schema('diffusion')
          .from('subscriber_lists')
          .insert([{ subscriber_id: subscriberId, list_id: listData.id }]);

        if (linkError?.code === '23505') {
          setStatus('error');
          setMessage('Vous êtes déjà inscrit à cette newsletter !');
          return;
        }
        if (linkError) throw new Error(linkError.message);
      }

      setStatus('success');
      setMessage('Merci pour votre inscription !');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(`Erreur : ${err instanceof Error ? err.message : 'inconnue'}`);
    } finally {
      setTimeout(() => setStatus('idle'), 8000);
    }
  };

  return (
    <footer className="w-full flex flex-col font-['Open_Sans',sans-serif] bg-band">
      <div className="w-full bg-band py-[48px] max-[900px]:py-[40px] border-t border-white/10">
        <div className="w-full max-w-[1200px] mx-auto px-[24px] flex flex-col md:flex-row items-start md:items-center justify-between gap-[32px]">
          <div className="flex flex-col flex-1 min-w-0 max-w-[600px] pr-[16px]">
            <div className="flex items-center gap-[12px] mb-[8px]">
              <svg className="w-[24px] h-[24px] text-[#7F7F7F] shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              <h2 className="text-[24px] max-[900px]:text-[20px] font-bold text-[#7F7F7F] leading-tight whitespace-nowrap">
                Newsletter « À la une »
              </h2>
            </div>
            <p className="text-[#404040] text-[16px] leading-[1.5]">
              Recevez une sélection de nos meilleurs articles, vidéos et podcasts directement dans votre boîte mail.
            </p>
          </div>
          <div className="relative w-full md:w-auto flex flex-col shrink">
            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-[12px]" noValidate>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                disabled={status === 'loading'}
                placeholder="Votre adresse e-mail"
                className="w-full sm:w-[380px] h-[48px] bg-[#111] border border-white/15 rounded-[8px] px-[16px] text-[15px] font-semibold text-white focus:outline-none focus:border-white/40 transition-colors placeholder:font-normal placeholder:text-[#404040] disabled:opacity-50"
              />
              <button type="submit" disabled={status === 'loading'} className="h-[48px] px-[24px] bg-[#404040] text-white font-semibold text-[15px] md:text-[16px] rounded-[8px] transition-all hover:bg-[#505050] flex items-center justify-center shrink-0 disabled:opacity-50">
                {status === 'loading' ? '...' : "S'abonner"}
              </button>
            </form>
            <div className="absolute top-full left-0 mt-[6px] w-full pointer-events-none">
              {status === 'success' && <p className="text-[13px] font-semibold text-[#59B644]">{message}</p>}
              {status === 'error' && <p className="text-[13px] font-semibold text-[#FF3B3B]">{message}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-band pt-[64px] pb-[64px] max-[900px]:pt-[48px] max-[900px]:pb-[48px] border-t border-white/10">
        <div className="w-full max-w-[1200px] mx-auto px-[24px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[32px] gap-y-[32px] md:gap-y-[48px]">
            <div className="flex flex-col">
              <h3 className="text-[#7F7F7F] text-[16px] max-[900px]:text-[14px] font-bold mb-[20px] max-[900px]:mb-[12px]">
                <Link href="/articles" className="hover:underline hover:text-white transition-colors">Médias</Link>
              </h3>
              <ul className="flex flex-col gap-[12px] max-[900px]:gap-[8px]">
                <li><Link href="/articles" className="text-[#404040] text-[14px] max-[900px]:text-[12px] hover:underline hover:text-[#7F7F7F] transition-colors">Articles</Link></li>
                <li><Link href="/magazine" className="text-[#404040] text-[14px] max-[900px]:text-[12px] hover:underline hover:text-[#7F7F7F] transition-colors">Magazine</Link></li>
                <li><Link href="/videos" className="text-[#404040] text-[14px] max-[900px]:text-[12px] hover:underline hover:text-[#7F7F7F] transition-colors">Vidéos</Link></li>
                <li><Link href="/podcasts" className="text-[#404040] text-[14px] max-[900px]:text-[12px] hover:underline hover:text-[#7F7F7F] transition-colors">Podcasts</Link></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="text-[#7F7F7F] text-[16px] max-[900px]:text-[14px] font-bold mb-[20px] max-[900px]:mb-[12px]">
                <Link href="/articles" className="hover:underline hover:text-white transition-colors">Articles</Link>
              </h3>
              <ul className="flex flex-col gap-[12px] max-[900px]:gap-[8px]">
                {ARTICLE_CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <Link href={`/articles?categorie=${cat.slug}`} className="text-[#404040] text-[14px] max-[900px]:text-[12px] hover:underline hover:text-[#7F7F7F] transition-colors">
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="text-[#7F7F7F] text-[16px] max-[900px]:text-[14px] font-bold mb-[20px] max-[900px]:mb-[12px]">
                <a href={`${INSTITUTIONAL_SITE_URL}/association`} className="hover:underline hover:text-white transition-colors">Their memory</a>
              </h3>
              <ul className="flex flex-col gap-[12px] max-[900px]:gap-[8px]">
                {ORG_FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-[#404040] text-[14px] max-[900px]:text-[12px] hover:underline hover:text-[#7F7F7F] transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-band pt-[40px] pb-[32px] max-[900px]:pt-[32px] border-t border-white/10">
        <div className="w-full max-w-[1200px] mx-auto px-[24px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-[32px] mb-[32px]">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <img src="/images/horizontal_7f7f7f.png" alt="Their memory" width={200} height={56} loading="lazy" decoding="async" className="h-[56px] w-auto max-[900px]:h-[40px] object-contain" />
            </Link>
            <div className="flex flex-col items-start md:items-end gap-[16px]">
              <span className="text-[#404040] text-[14px] max-[900px]:text-left text-right">Suivez-nous sur les réseaux sociaux</span>
              <div className="flex flex-wrap gap-[16px]">
                {SOCIAL_NETWORKS.map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="transition-opacity duration-300 group">
                    <img src={social.icon} alt={social.name} width={32} height={32} loading="lazy" decoding="async" className="w-[32px] h-[32px] object-contain group-hover:opacity-80 transition-opacity drop-shadow-sm" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/10 mb-[16px]" />

          <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[8px] text-[#404040] text-[12px]">
            <a href={`${INSTITUTIONAL_SITE_URL}/contact`} className="hover:underline hover:text-[#7F7F7F]">Aide et contact</a>
            <span className="text-white/15 hidden sm:inline">|</span>
            <Link href="/plan-du-site" className="hover:underline hover:text-[#7F7F7F]">Plan du site</Link>
            <span className="text-white/15 hidden sm:inline">|</span>
            <a href={`${INSTITUTIONAL_SITE_URL}/mentions-legales`} className="hover:underline hover:text-[#7F7F7F]">Mentions légales</a>
            <span className="text-white/15 hidden sm:inline">|</span>
            <a href={`${INSTITUTIONAL_SITE_URL}/politique-de-confidentialite`} className="hover:underline hover:text-[#7F7F7F]">Politique de confidentialité</a>
            <span className="text-white/15 hidden sm:inline">|</span>
            <a href={`${INSTITUTIONAL_SITE_URL}/cgu`} className="hover:underline hover:text-[#7F7F7F]">CGU</a>
            <span className="text-white/15 hidden sm:inline">|</span>
            <button type="button" onClick={() => window.dispatchEvent(new Event('openCookieSettings'))} className="hover:underline hover:text-[#7F7F7F] cursor-pointer">
              Gestion des cookies
            </button>
          </div>

          <p className="text-[#7F7F7F] text-[12px] mt-[16px]">
            © {new Date().getFullYear()} Their memory – Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
