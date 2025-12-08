'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

/**
 * LogoSlider Component
 * 
 * Infinite auto-scrolling logo carousel
 * Perfect for showcasing partners, clients, or certifications
 * 
 * Props:
 * - logos: Array of { name, url, imageUrl }
 * - speed: 'slow' | 'normal' | 'fast' (animation speed)
 * - grayscale: boolean (show logos in grayscale with hover color)
 * - background: 'white' | 'gray' | 'beige' (section background)
 */
export default function LogoSlider({ 
  logos = [],
  speed = 'normal',
  grayscale = true,
  title = "Vertrouwd door toonaangevende bedrijven",
  background = 'gray'
}) {
  
  const scrollerRef = useRef(null);

  // Background color mapping
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    beige: 'bg-[#FAF9F6]',
  };

  // Default demo logos if none provided
  const defaultLogos = [
    { name: 'Rijksmuseum', imageUrl: '/logos/rijksmuseum.png' },
    { name: 'KLM', imageUrl: '/logos/klm.png' },
    { name: 'ING', imageUrl: '/logos/ing.png' },
    { name: 'Philips', imageUrl: '/logos/philips.png' },
    { name: 'Shell', imageUrl: '/logos/shell.png' },
    { name: 'Heineken', imageUrl: '/logos/heineken.png' },
  ];

  const displayLogos = logos.length > 0 ? logos : defaultLogos;

  // Animation speeds in seconds - longer for smoother scroll
  const speeds = {
    slow: 120,
    normal: 80,
    fast: 50
  };

  useEffect(() => {
    if (!scrollerRef.current) return;

    const scroller = scrollerRef.current;
    const topRow = scroller.querySelector('[data-scroller-top]');
    const bottomRow = scroller.querySelector('[data-scroller-bottom]');
    
    if (!topRow || !bottomRow) return;

    // Clone items for infinite scroll effect (both rows)
    const topContent = Array.from(topRow.children);
    const bottomContent = Array.from(bottomRow.children);
    
    topContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      topRow.appendChild(duplicatedItem);
    });

    bottomContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      bottomRow.appendChild(duplicatedItem);
    });
  }, [displayLogos]);

  // Split logos into two rows for visual variety
  const midPoint = Math.ceil(displayLogos.length / 2);
  const topRowLogos = displayLogos.slice(0, midPoint);
  const bottomRowLogos = displayLogos.slice(midPoint);

  return (
    <section className={`py-16 lg:py-20 ${bgClasses[background] || bgClasses.gray}`}>
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Title */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900">
              {title}
            </h2>
          </div>
        )}

        {/* Dual-Row Logo Scroller */}
        <div ref={scrollerRef} className="space-y-1 lg:space-y-3">
          
          {/* Top Row - Scrolls LEFT (← ← ←) */}
          <div 
            className="relative overflow-hidden"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          >
            <div
              data-scroller-top
              className="flex items-center gap-6 md:gap-8 lg:gap-12"
              style={{
                animation: `scrollLeft ${speeds[speed]}s linear infinite`,
                width: 'max-content'
              }}
            >
              {topRowLogos.map((logo, index) => (
                <div
                  key={`top-${index}`}
                  className={`flex-shrink-0 ${
                    grayscale ? 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100' : ''
                  } transition-all duration-300`}
                >
                  {logo.imageUrl ? (
                    logo.url ? (
                      <a 
                        href={logo.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`Bezoek ${logo.name} website`}
                      >
                        <Image
                          src={logo.imageUrl}
                          alt={logo.altText || `${logo.name} logo`}
                          width={240}
                          height={120}
                          className="h-16 md:h-20 lg:h-24 w-auto"
                          loading="lazy"
                        />
                      </a>
                    ) : (
                      <Image
                        src={logo.imageUrl}
                        alt={logo.altText || `${logo.name} logo`}
                        width={240}
                        height={120}
                        className="h-16 md:h-20 lg:h-24 w-auto"
                        loading="lazy"
                      />
                    )
                  ) : (
                    <div className="text-gray-400 font-semibold text-xl">
                      {logo.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row - Scrolls RIGHT (→ → →) */}
          <div 
            className="relative overflow-hidden"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          >
            <div
              data-scroller-bottom
              className="flex items-center gap-6 md:gap-8 lg:gap-12"
              style={{
                animation: `scrollRight ${speeds[speed]}s linear infinite`,
                width: 'max-content'
              }}
            >
              {bottomRowLogos.map((logo, index) => (
                <div
                  key={`bottom-${index}`}
                  className={`flex-shrink-0 ${
                    grayscale ? 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100' : ''
                  } transition-all duration-300`}
                >
                  {logo.imageUrl ? (
                    logo.url ? (
                      <a 
                        href={logo.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`Bezoek ${logo.name} website`}
                      >
                        <Image
                          src={logo.imageUrl}
                          alt={logo.altText || `${logo.name} logo`}
                          width={240}
                          height={120}
                          className="h-16 md:h-20 lg:h-24 w-auto"
                          loading="lazy"
                        />
                      </a>
                    ) : (
                      <Image
                        src={logo.imageUrl}
                        alt={logo.altText || `${logo.name} logo`}
                        width={240}
                        height={120}
                        className="h-16 md:h-20 lg:h-24 w-auto"
                        loading="lazy"
                      />
                    )
                  ) : (
                    <div className="text-gray-400 font-semibold text-xl">
                      {logo.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Optional: CTA below logos */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">
            Meer dan 100 bedrijven vertrouwen op OnlineLabs voor hun online groei
          </p>
        </div>
      </div>

      {/* CSS Animations - Both Directions */}
      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50%));
          }
        }
        
        @keyframes scrollRight {
          0% {
            transform: translateX(calc(-50%));
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}