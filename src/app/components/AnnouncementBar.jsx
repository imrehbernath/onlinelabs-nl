'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [showBar, setShowBar] = useState(false);
  const [mounted, setMounted] = useState(false);

  const items = [
    { text: 'Laatste blogs:', link: '/blog', highlight: true },
    { text: 'SEO trends 2026', link: '/blog/seo-trends-2026' },
    { text: 'Webdesign trends 2026', link: '/blog/webdesign-trends-2025-waardevolle-dos-en-donts' },
    { text: 'NIEUW: Trainingen bij OnlineLabs', link: '/trainingen', highlight: true },
    { text: 'AI & GEO optimalisatie', link: '/trainingen/ai-visibility-website-optimalisatie' },
    { text: 'WordPress & AI', link: '/trainingen/wordpress-ai-training' },
    { text: 'Ads & Analytics', link: '/trainingen/online-ads-analytics' },
  ];

  // 4x dupliceren voor seamless loop op alle schermgroottes
  const duplicatedItems = [...items, ...items, ...items, ...items];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const barDismissed = localStorage.getItem('announcementBarDismissed');
    const dismissedTime = barDismissed ? parseInt(barDismissed, 10) : 0;
    // 1 uur voor development, voor productie: 24 * 60 * 60 * 1000 (24 uur)
    const dismissDuration = 1 * 60 * 60 * 1000; // 1 uur
    const threshold = Date.now() - dismissDuration;
    
    if (!barDismissed || dismissedTime < threshold) {
      setShowBar(true);
    }
  }, [mounted]);

  const handleDismiss = () => {
    setShowBar(false);
    localStorage.setItem('announcementBarDismissed', Date.now().toString());
  };

  // Don't render anything until mounted and should show
  if (!mounted || !showBar) return null;

  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .announcement-ticker-track {
          animation: ticker-scroll 47s linear infinite;
        }
        .announcement-ticker-track:hover {
          animation-play-state: paused;
        }
        /* Sneller op mobiel */
        @media (max-width: 768px) {
          .announcement-ticker-track {
            animation: ticker-scroll 40s linear infinite;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .announcement-ticker-track {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>
      
      <div className="bg-[#376eb5] text-white relative overflow-hidden">
        <div className="flex items-center">
          {/* Scrolling content */}
          <div className="flex-1 overflow-hidden">
            <div className="announcement-ticker-track flex items-center whitespace-nowrap w-max">
              {duplicatedItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className={`inline-flex items-center px-3 sm:px-4 py-2.5 text-xs sm:text-sm hover:text-white/80 transition-colors ${
                    item.highlight ? 'font-semibold' : ''
                  }`}
                >
                  {item.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 flex-shrink-0" />
                  )}
                  {item.text}
                  <span className="mx-3 sm:mx-4 text-white/40">|</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-2.5 hover:bg-white/10 transition-colors"
            aria-label="Sluiten"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
