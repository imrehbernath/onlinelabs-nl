'use client';

import { useEffect, useRef } from 'react';

const searchQueries = [
  { platform: 'ChatGPT', query: 'Wat is het beste online marketing bureau in Amsterdam?', color: '#376eb5' },
  { platform: 'Perplexity', query: 'Welke advocaat in Amsterdam is gespecialiseerd in arbeidsrecht?', color: '#1abc9c' },
  { platform: 'Google AI', query: 'Vergelijk SEO bureaus in Nederland met goede reviews', color: '#f59e0b' },
  { platform: 'ChatGPT', query: 'Welk bedrijf kan mijn website sneller maken?', color: '#376eb5' },
  { platform: 'Perplexity', query: 'Beste restaurant voor een zakendiner in Amsterdam centrum', color: '#1abc9c' },
  { platform: 'Google AI', query: 'Hoe vind ik een betrouwbare webdesigner voor mijn bedrijf?', color: '#f59e0b' },
  { platform: 'ChatGPT', query: 'Wat kost het om een website te laten maken in 2026?', color: '#376eb5' },
  { platform: 'Perplexity', query: 'Top 5 boekhouders in Amsterdam voor een MKB bedrijf', color: '#1abc9c' },
  { platform: 'Google AI', query: 'Welke partij doet de beste Google Ads campagnes in NL?', color: '#f59e0b' },
  { platform: 'ChatGPT', query: 'Ik zoek een loodgieter in Amsterdam-Zuid met goede beoordelingen', color: '#376eb5' },
  { platform: 'Perplexity', query: 'Welke fysiotherapeut in de buurt van de Jordaan is het beste?', color: '#1abc9c' },
  { platform: 'Google AI', query: 'Vergelijk WordPress vs Next.js voor een zakelijke website', color: '#f59e0b' },
];

export default function ShiftSection() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Check reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let animationId;
    let scrollPos = 0;
    const speed = 0.5;
    let isVisible = false;

    const animate = () => {
      if (!isVisible) return;
      scrollPos += speed;
      if (scrollPos >= el.scrollHeight / 2) {
        scrollPos = 0;
      }
      el.scrollTop = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    // Only start animation when section is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animationId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(animationId);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    // Pause on hover
    const handleEnter = () => { isVisible = false; cancelAnimationFrame(animationId); };
    const handleLeave = () => { isVisible = true; animationId = requestAnimationFrame(animate); };
    el.addEventListener('mouseenter', handleEnter);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
      el.removeEventListener('mouseenter', handleEnter);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section style={{ backgroundColor: '#F3F4F6' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="max-w-xl">
            <p 
              className="text-sm font-bold uppercase tracking-[0.15em] mb-4"
              style={{ color: '#1abc9c' }}
            >
              De zoekwereld verandert
            </p>
            
            <h2 className="font-serif font-bold text-gray-900 text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-6">
              Jouw klanten zoeken niet meer{' '}
              <span style={{ color: '#376eb5' }}>alleen in Google</span>
            </h2>

            <div className="space-y-4 text-lg text-gray-700 leading-relaxed mb-10">
              <p>
                Steeds meer mensen gebruiken ChatGPT, Perplexity en Google AI om producten te vergelijken, 
                dienstverleners te vinden en beslissingen te nemen. Het antwoord dat AI geeft, bepaalt of 
                jij wordt gevonden of je concurrent.
              </p>
              <p>
                Wij weten precies hoe je daar komt, want wij bouwden er de tools voor.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                className="bg-white rounded-xl p-6"
                style={{ border: '1px solid #e8eef6' }}
              >
                <div 
                  className="font-serif font-bold text-5xl leading-none"
                  style={{ color: '#376eb5' }}
                >
                  40%
                </div>
                <p className="text-sm text-gray-600 mt-3 leading-snug">
                  van alle online zoekopdrachten gaat al via AI-tools
                </p>
              </div>
              <div 
                className="bg-white rounded-xl p-6"
                style={{ border: '1px solid #e8eef6' }}
              >
                <div 
                  className="font-serif font-bold text-5xl leading-none"
                  style={{ color: '#376eb5' }}
                >
                  5x
                </div>
                <p className="text-sm text-gray-600 mt-3 leading-snug">
                  meer vertrouwen in AI-aanbevelingen dan in traditionele advertenties
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Animated Search Queries */}
          <div className="relative">
            {/* Gradient fade top */}
            <div 
              className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none rounded-t-2xl"
              style={{ background: 'linear-gradient(to bottom, #F3F4F6, transparent)' }}
            />
            {/* Gradient fade bottom */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none rounded-b-2xl"
              style={{ background: 'linear-gradient(to top, #F3F4F6, transparent)' }}
            />

            {/* Scrolling container */}
            <div 
              ref={scrollRef}
              className="overflow-hidden rounded-2xl"
              style={{ height: '480px' }}
            >
              <div className="space-y-3 py-4 px-1">
                {/* Render queries twice for seamless loop */}
                {[...searchQueries, ...searchQueries].map((item, i) => (
                  <div 
                    key={i}
                    className="bg-white rounded-xl p-4 transition-shadow duration-300 hover:shadow-md"
                    style={{ border: '1px solid #eef2f7' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span 
                        className="text-xs font-semibold"
                        style={{ color: item.color }}
                      >
                        {item.platform}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      &ldquo;{item.query}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle label */}
            <p className="text-center text-xs text-gray-400 mt-3">
              Zo zoeken jouw klanten nu al, elke dag
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
