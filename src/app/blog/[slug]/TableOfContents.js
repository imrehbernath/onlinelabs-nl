'use client';

import { useEffect, useState } from 'react';

function decodeHtmlEntities(text) {
  if (typeof window === 'undefined') {
    return text
      .replace(/&#8211;/g, '\u2013')
      .replace(/&#8212;/g, '\u2014')
      .replace(/&#8220;/g, '\u201C')
      .replace(/&#8221;/g, '\u201D')
      .replace(/&#8216;/g, '\u2018')
      .replace(/&#8217;/g, '\u2019')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');
  }
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

export default function TableOfContents({ headings, showCalculator = false }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((top, entry) => {
            return entry.boundingClientRect.top < top.boundingClientRect.top ? entry : top;
          });
          setActiveId(topEntry.target.id);
        }
      },
      { rootMargin: '-150px 0px -66%', threshold: 0.1 }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [headings]);

  const handleClick = (e, headingId) => {
    e.preventDefault();
    const element = document.getElementById(headingId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveId(headingId);
    }
  };

  return (
    <>
      <div className="lg:sticky lg:top-24 space-y-6">
        {/* Table of Contents */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 lg:p-7 shadow-sm">
          <div className="toc-heading-underline" role="heading" aria-level="2">Inhoudsopgave</div>
          <nav className="space-y-3">
            {headings.map((heading, index) => (
              <a key={index} href={`#${heading.id}`} className={`toc-link block transition-all level-${heading.level} ${heading.level === 2 ? 'font-medium' : ''} ${activeId === heading.id ? 'active' : ''}`} onClick={(e) => handleClick(e, heading.id)}>
                <span className="toc-arrow">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M7 7L17 17M17 17V7M17 17H7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{decodeHtmlEntities(heading.text)}</span>
              </a>
            ))}
          </nav>
          
          {/* Calculator CTA - only when showCalculator is true */}
          {showCalculator && (
            <a 
              href="#calculator" 
              onClick={(e) => handleClick(e, 'calculator')}
              className="mt-6 flex items-center gap-3 p-4 bg-gradient-to-r from-[#376eb5] to-[#2d5a94] text-white rounded-xl hover:shadow-lg transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="8" y1="10" x2="16" y2="10" />
                  <line x1="8" y1="14" x2="12" y2="14" />
                  <line x1="8" y1="18" x2="12" y2="18" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">Bereken je investering</div>
                <div className="text-xs text-white/80">Direct een prijsindicatie</div>
              </div>
              <svg className="w-5 h-5 transform group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          )}
        </div>

        {/* Trainingen Banner - Desktop only */}
        <a href="/trainingen" className="hidden lg:block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <img 
            src="/trainingen-banner.svg" 
            alt="Onze trainingen - AI & GEO-optimalisatie, WordPress & AI, Ads & Analytics - Vanaf €299" 
            width={300} 
            height={250}
            className="w-full h-auto"
          />
        </a>

        {/* Teun.ai Banner - Desktop only */}
        <a href="https://teun.ai" target="_blank" rel="noopener noreferrer" className="hidden lg:block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <img 
            src="/teun-ai-banner.svg" 
            alt="Hoe zichtbaar is jouw bedrijf in ChatGPT? Gratis scannen op teun.ai" 
            width={300} 
            height={250}
            className="w-full h-auto"
          />
        </a>
      </div>

      {/* Teun.ai Banner - Mobile only */}
      <a href="https://teun.ai" target="_blank" rel="noopener noreferrer" className="lg:hidden block mt-8 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <img 
          src="/teun-ai-banner.svg" 
          alt="Hoe zichtbaar is jouw bedrijf in ChatGPT? Gratis scannen op teun.ai" 
          width={300} 
          height={250}
          className="w-full h-auto"
        />
      </a>
    </>
  );
}