'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Blog slug → categorie mapping op basis van cluster structuur
const categoryMap = {
  // Cluster 1: SEO Basis
  '10-manieren-om-jouw-seo-te-verbeteren': 'seo',
  'hoe-doe-je-een-goed-zoekwoorden-onderzoek': 'seo',
  'on-page-seo-factoren': 'seo',
  'linkbuilding-zorgt-voor-seo-succes': 'seo',
  'de-meest-effectieve-seo-tools': 'seo',
  'seo-uitbesteden-waar-moet-ik-op-letten': 'seo',
  'seo-trends-2026': 'seo',
  '5-beste-wordpress-seo-plugins': 'seo',
  'kan-mijn-website-vindbaar-worden': 'seo',
  'ultieme-seo-gids-voor-bloggers': 'seo',
  'investeren-in-seo-of-in-sea': 'seo',
  'verbeter-je-vindbaarheid-met-goed-website-onderhoud-checklist': 'seo',

  // Cluster 2: AI & GEO
  'zichtbaar-worden-in-chatgpt': 'geo',
  'kunstmatige-intelligentie-voor-seo': 'geo',
  'ai-overviews-een-zegen-of-een-vloek': 'geo',
  'trust-leadership-content': 'geo',
  'mijn-top-4-seo-trends-van-2026-tips': 'geo',

  // Cluster 3: Technische SEO
  'core-web-vitals': 'speed',
  'website-migratie-checklist': 'speed',
  'het-tabblad-pagina-indexering': 'seo',

  // Cluster 4: Lokale SEO
  'lokale-seo-voor-bedrijven-10-essentiele-strategieen': 'seo',
  'lokale-online-marketing-tips': 'seo',

  // Cluster 5: Website Kosten & Bouwen
  'wat-kost-een-website-laten-bouwen': 'website',
  '10-signalen-dat-je-nieuwe-website-nodig-hebt': 'website',
  'wordpress-website-laten-maken': 'website',
  'stappenplan-voor-het-live-zetten-van-een-website': 'website',
  'de-belangrijkste-webdesign-trends-van-2026-tips': 'website',

  // Cluster 6: Conversie & UX
  '15-manieren-om-conversies-te-verhogen': 'conversie',
  'conversies-verhogen-op-mobiel-en-desktop-tips': 'conversie',
  'hoe-maak-je-een-succesvolle-converterende-website': 'conversie',
};

// Berichten per categorie
const messages = {
  seo: {
    text: 'Wist je dat je SEO-fundament ook bepaalt of AI je aanbeveelt?',
    cta: 'Test je AI-zichtbaarheid',
    url: 'https://teun.ai/tools/ai-visibility',
    external: true,
  },
  geo: {
    text: 'Benieuwd hoe zichtbaar jij bent in ChatGPT en Perplexity?',
    cta: 'Gratis AI-scan starten',
    url: 'https://teun.ai/tools/ai-visibility',
    external: true,
  },
  speed: {
    text: 'Een snelle website scoort beter in Google én in AI.',
    cta: 'Bekijk onze speed-aanpak',
    url: '/skills/website-snelheid-optimalisatie',
    external: false,
  },
  website: {
    text: 'Wij bouwen websites die scoren in Google én gevonden worden door AI.',
    cta: 'Bekijk onze aanpak',
    url: '/skills/website-laten-maken',
    external: false,
  },
  conversie: {
    text: '97% van je bezoekers converteert niet. Wij analyseren waar het misgaat.',
    cta: 'Meer over CRO',
    url: '/skills/conversie-optimalisatie-specialist',
    external: false,
  },
  default: {
    text: 'Wij helpen bedrijven groeien met SEO, AI-zichtbaarheid en webdesign.',
    cta: 'Bekijk wat we doen',
    url: '/',
    external: false,
  },
};

export default function TeunBlogBuddy({ slug }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const category = categoryMap[slug] || 'default';
  const message = messages[category];

  useEffect(() => {
    // Check of eerder gesloten
    try {
      if (localStorage.getItem('teun-buddy-dismissed')) {
        setDismissed(true);
        return;
      }
    } catch (e) {}

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.60) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      // 7 dagen niet tonen
      localStorage.setItem('teun-buddy-dismissed', Date.now().toString());
    } catch (e) {}
  };

  // Check of dismiss verlopen is (7 dagen)
  useEffect(() => {
    try {
      const dismissedAt = localStorage.getItem('teun-buddy-dismissed');
      if (dismissedAt) {
        const daysSince = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24);
        if (daysSince > 7) {
          localStorage.removeItem('teun-buddy-dismissed');
          setDismissed(false);
        }
      }
    } catch (e) {}
  }, []);

  if (dismissed || !visible) return null;

  const LinkComponent = message.external ? 'a' : Link;
  const linkProps = message.external 
    ? { href: message.url, target: '_blank', rel: 'noopener noreferrer' }
    : { href: message.url };

  return (
    <>
      <style>{`
        @keyframes teun-slide-in {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .teun-buddy { animation: teun-slide-in 0.4s ease-out forwards; }
      `}</style>

      <div className="teun-buddy fixed bottom-6 right-4 left-4 sm:left-auto sm:right-6 z-50 flex items-end gap-3 max-w-sm sm:max-w-sm ml-auto">
        {/* Speech bubble */}
        <div 
          className="relative bg-white rounded-2xl p-4 shadow-xl"
          style={{ border: '1px solid #e2e8f0' }}
        >
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            aria-label="Sluiten"
          >
            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <p className="text-sm text-gray-700 leading-relaxed mb-3 pr-4">
            {message.text}
          </p>

          <LinkComponent
            {...linkProps}
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
            style={{ color: '#376eb5' }}
          >
            {message.cta}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </LinkComponent>

          {/* Bubble arrow */}
          <div 
            className="absolute -right-2 bottom-4 w-4 h-4 bg-white rotate-45"
            style={{ borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}
          />
        </div>

        {/* Teun mascotte */}
        <div className="flex-shrink-0">
          <Image
            src="/teun-met-vergrootglas.png"
            alt="Teun"
            width={72}
            height={72}
            className="drop-shadow-lg"
          />
        </div>
      </div>
    </>
  );
}
