"use client";

import { useState, useEffect } from 'react';

// Permet à TypeScript de connaître gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [preferences, setPreferences] = useState({
    necessary: true, 
    analytics: false,
    marketing: false,
  });

  // Fonction pour envoyer la mise à jour des consentements à Google Analytics
  const updateGtagConsent = (prefs: { analytics: boolean, marketing: boolean }) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': prefs.analytics ? 'granted' : 'denied',
        'ad_storage': prefs.marketing ? 'granted' : 'denied',
        'ad_user_data': prefs.marketing ? 'granted' : 'denied',
        'ad_personalization': prefs.marketing ? 'granted' : 'denied',
      });
    }
  };

  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (!savedPreferences) {
      setShowBanner(true);
    } else {
      const parsedPrefs = JSON.parse(savedPreferences);
      setPreferences(parsedPrefs);
      // On met à jour GA dès le chargement si l'utilisateur avait déjà fait un choix
      updateGtagConsent(parsedPrefs);
    }

    const handleOpenSettings = () => {
      setShowBanner(false);
      setShowSettings(true);
    };

    window.addEventListener('openCookieSettings', handleOpenSettings);
    return () => window.removeEventListener('openCookieSettings', handleOpenSettings);
  }, []);

  const savePreferences = (newPreferences: any) => {
    localStorage.setItem('cookiePreferences', JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setShowBanner(false);
    setShowSettings(false);
    
    // On met à jour GA en temps réel quand l'utilisateur valide ses choix
    updateGtagConsent(newPreferences);
  };

  const acceptAll = () => savePreferences({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => savePreferences({ necessary: true, analytics: false, marketing: false });
  const saveCustom = () => savePreferences(preferences);

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {/* ============================================== */}
      {/* 1. BANNIÈRE FLOTTANTE (Première visite)        */}
      {/* ============================================== */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-[9999] p-[24px] max-[900px]:p-[16px] font-['Open_Sans',sans-serif]">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-[24px]">
            
            <div className="flex flex-col flex-1">
              <h3 className="text-[18px] font-bold text-[#000] mb-[8px]">À propos de vos cookies</h3>
              <p className="text-[#404040] text-[14px] leading-[1.5] max-w-[800px]">
                Nous utilisons des cookies pour vous offrir la meilleure expérience sur notre site, mesurer l'audience et personnaliser notre communication. Vous pouvez choisir d'accepter, de refuser ou de personnaliser votre consentement. 
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-[12px] w-full md:w-auto shrink-0">
              <button 
                onClick={() => setShowSettings(true)}
                className="w-full sm:w-auto bg-white border border-gray-200 text-[#000] px-[20px] py-[10px] rounded-[8px] font-semibold text-[16px] transition-all hover:bg-gray-50"
              >
                Personnaliser
              </button>
              <button 
                onClick={rejectAll}
                className="w-full sm:w-auto bg-white border border-gray-200 text-[#000] px-[20px] py-[10px] rounded-[8px] font-semibold text-[16px] transition-all hover:bg-gray-50"
              >
                Refuser
              </button>
              <button 
                onClick={acceptAll}
                className="w-full sm:w-auto bg-[#000] text-white px-[20px] py-[10px] rounded-[8px] font-semibold text-[16px] transition-all hover:bg-[#333] shadow-sm"
              >
                Tout accepter
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================== */}
      {/* 2. MODALE DE PARAMÈTRES (Personnalisation)     */}
      {/* ============================================== */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-center justify-center p-[16px] font-['Open_Sans',sans-serif]">
          <div className="bg-white rounded-[12px] w-full max-w-[600px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between p-[24px] border-b border-gray-100">
              <h3 className="text-[20px] font-bold text-[#000]">Gestion des cookies</h3>
              <button aria-label="Fermer" onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-black transition-colors">
                <svg className="w-[24px] h-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-[24px] flex flex-col gap-[24px]">
              <p className="text-[#404040] text-[14px] leading-[1.6]">
                Lorsque vous naviguez sur notre site, des informations peuvent être enregistrées ou lues sur votre terminal. Vous pouvez configurer vos préférences ci-dessous.
              </p>

              {/* Catégorie : Strictement nécessaires */}
              <div className="flex items-start justify-between gap-[16px] p-[16px] bg-gray-50 rounded-[8px]">
                <div className="flex flex-col">
                  <h4 className="text-[16px] font-bold text-[#000] mb-[4px]">Cookies strictement nécessaires</h4>
                  <p className="text-[#7F7F7F] text-[13px] leading-[1.5]">
                    Indispensables au bon fonctionnement du site et de ses fonctionnalités de base. Ils ne peuvent pas être désactivés.
                  </p>
                </div>
                <div className="flex items-center mt-[4px] shrink-0">
                  <span className="text-[#000000] text-[14px] font-bold">Toujours actif</span>
                </div>
              </div>

              {/* Catégorie : Analytiques */}
              <div className="flex items-start justify-between gap-[16px] p-[16px] border border-gray-100 rounded-[8px] hover:bg-gray-50 transition-colors">
                <div className="flex flex-col">
                  <h4 className="text-[16px] font-bold text-[#000] mb-[4px]">Mesure d'audience</h4>
                  <p className="text-[#7F7F7F] text-[13px] leading-[1.5]">
                    Permettent de comprendre comment les visiteurs interagissent avec le site (pages visitées, temps passé) afin d'améliorer nos contenus.
                  </p>
                </div>
                <div className="mt-[4px] shrink-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#000000]"></div>
                  </label>
                </div>
              </div>

              {/* Catégorie : Marketing */}
              <div className="flex items-start justify-between gap-[16px] p-[16px] border border-gray-100 rounded-[8px] hover:bg-gray-50 transition-colors">
                <div className="flex flex-col">
                  <h4 className="text-[16px] font-bold text-[#000] mb-[4px]">Cookies publicitaires & réseaux sociaux</h4>
                  <p className="text-[#7F7F7F] text-[13px] leading-[1.5]">
                    Permettent d'afficher des contenus de nos partenaires (vidéos YouTube, posts réseaux sociaux) et des publicités adaptées.
                  </p>
                </div>
                <div className="mt-[4px] shrink-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#000000]"></div>
                  </label>
                </div>
              </div>

            </div>

            <div className="p-[24px] border-t border-gray-100 flex flex-col sm:flex-row gap-[12px] justify-end bg-gray-50">
              <button 
                onClick={rejectAll}
                className="w-full sm:w-auto bg-white border border-gray-200 text-[#000] px-[20px] py-[10px] rounded-[8px] font-semibold text-[16px] transition-all hover:bg-gray-50"
              >
                Tout refuser
              </button>
              <button 
                onClick={saveCustom}
                className="w-full sm:w-auto bg-white border border-gray-200 text-[#000] px-[20px] py-[10px] rounded-[8px] font-semibold text-[16px] transition-all hover:bg-gray-50"
              >
                Enregistrer mes choix
              </button>
              <button 
                onClick={acceptAll}
                className="w-full sm:w-auto bg-[#000] text-white px-[20px] py-[10px] rounded-[8px] font-semibold text-[16px] transition-all hover:bg-[#333] shadow-sm"
              >
                Tout accepter
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}