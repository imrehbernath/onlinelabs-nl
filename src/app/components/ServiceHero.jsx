'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ServiceHero({ 
  title, 
  subtitle, 
  description, 
  ctaText, 
  ctaUrl, 
  secondaryCtaText,
  secondaryCtaUrl,
  serviceColor = 'green'
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const brandBlue = '#376eb5';
  const brandBlueHover = '#2d5a94';

  // Helper: check of URL extern is
  const isExternal = (url) => url?.startsWith('http');
  
  // Helper: check of URL een anchor is
  const isAnchor = (url) => url?.startsWith('#');

  // Smooth scroll naar anchor
  const handleAnchorClick = (e, anchor) => {
    e.preventDefault();
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Render de juiste link component
  const renderLink = (url, text, isPrimary = true) => {
    const baseClasses = isPrimary
      ? "inline-flex items-center justify-center px-8 py-4 text-lg text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
      : "inline-flex items-center justify-center px-8 py-4 text-lg bg-white font-semibold rounded-lg border-2 transition-all duration-300";

    const primaryStyle = { backgroundColor: brandBlue };
    const secondaryStyle = { borderColor: brandBlue, color: brandBlue };

    const handleMouseEnter = (e) => {
      if (isPrimary) {
        e.currentTarget.style.backgroundColor = brandBlueHover;
      } else {
        e.currentTarget.style.borderColor = brandBlueHover;
        e.currentTarget.style.color = brandBlueHover;
      }
    };

    const handleMouseLeave = (e) => {
      if (isPrimary) {
        e.currentTarget.style.backgroundColor = brandBlue;
      } else {
        e.currentTarget.style.borderColor = brandBlue;
        e.currentTarget.style.color = brandBlue;
      }
    };

    // Anchor link
    if (isAnchor(url)) {
      return (
        <a
          href={url}
          onClick={(e) => handleAnchorClick(e, url)}
          className={baseClasses}
          style={isPrimary ? primaryStyle : secondaryStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {text}
          {isPrimary && (
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
        </a>
      );
    }

    // Externe link
    if (isExternal(url)) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          style={isPrimary ? primaryStyle : secondaryStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {text}
          {isPrimary && (
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </a>
      );
    }

    // Interne link
    return (
      <Link
        href={url}
        className={baseClasses}
        style={isPrimary ? primaryStyle : secondaryStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
        {isPrimary && (
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </Link>
    );
  };
  
  return (
    <>
      <style>{`
        /* Floating orbs */
        @keyframes float-orb-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -25px) scale(1.08); }
          66% { transform: translate(-25px, 15px) scale(0.95); }
        }
        
        @keyframes float-orb-medium {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.1); }
        }

        .orb-1 { animation: float-orb-slow 22s ease-in-out infinite; }
        .orb-2 { animation: float-orb-medium 18s ease-in-out infinite; animation-delay: -4s; }
        .orb-3 { animation: float-orb-slow 26s ease-in-out infinite reverse; animation-delay: -8s; }

        /* Staggered reveal */
        .hero-reveal {
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Badge glow */
        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(55, 110, 181, 0.2); }
          50% { box-shadow: 0 0 20px 5px rgba(55, 110, 181, 0.12); }
        }
        .badge-glow { animation: badge-glow 3s ease-in-out infinite; }

        /* Floating circles */
        @keyframes circle-float-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes circle-float-2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-18px) scale(1.05); }
        }
        @keyframes circle-float-3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .circle-float-1 { animation: circle-float-1 5s ease-in-out infinite; }
        .circle-float-2 { animation: circle-float-2 7s ease-in-out infinite; animation-delay: -2s; }
        .circle-float-3 { animation: circle-float-3 6s ease-in-out infinite; animation-delay: -3s; }
        .circle-float-4 { animation: circle-float-1 8s ease-in-out infinite; animation-delay: -1s; }

        /* Circles container fade in */
        .deco-circles {
          opacity: 0;
          transition: opacity 1s ease-out;
          transition-delay: 0.5s;
        }
        .deco-circles.visible { opacity: 1; }

        /* Scroll arrow */
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(8px); opacity: 1; }
        }
        .scroll-arrow {
          opacity: 0;
          transition: opacity 0.5s ease-out;
          transition-delay: 0.8s;
        }
        .scroll-arrow.visible {
          opacity: 1;
          animation: scroll-bounce 2s ease-in-out infinite;
          animation-delay: 1s;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .orb-1, .orb-2, .orb-3,
          .circle-float-1, .circle-float-2, .circle-float-3, .circle-float-4 {
            animation: none;
          }
          .badge-glow { animation: none; }
          .deco-circles {
            opacity: 1;
            transition: none;
          }
          .scroll-arrow {
            opacity: 0.6;
            transition: none;
            animation: none;
          }
        }
      `}</style>

      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-32 overflow-hidden">
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large blue orb - top right */}
          <div 
            className="orb-1 absolute -top-32 -right-32 lg:top-[-10%] lg:right-[5%] w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(55, 110, 181, 0.1) 0%, rgba(55, 110, 181, 0.03) 40%, transparent 70%)',
            }}
          />
          
          {/* Light blue orb - bottom left */}
          <div 
            className="orb-2 absolute -bottom-24 -left-24 lg:bottom-[-15%] lg:left-[-5%] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(74, 143, 219, 0.12) 0%, rgba(74, 143, 219, 0.04) 40%, transparent 70%)',
            }}
          />
          
          {/* Small accent orb - center right */}
          <div 
            className="orb-3 absolute top-[50%] right-[8%] w-[120px] h-[120px] lg:w-[180px] lg:h-[180px] rounded-full hidden lg:block"
            style={{
              background: 'radial-gradient(circle, rgba(55, 110, 181, 0.08) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* Decorative floating circles - left side */}
        <div className={`deco-circles absolute left-[8%] lg:left-[10%] top-[25%] hidden lg:block pointer-events-none ${isLoaded ? 'visible' : ''}`}>
          <div className="circle-float-1 absolute w-16 h-16 rounded-full border-2 border-[#376eb5]/12" />
          <div className="circle-float-2 absolute top-20 left-12 w-8 h-8 rounded-full bg-[#4A8FDB]/8" />
          <div className="circle-float-3 absolute top-8 left-20 w-3 h-3 rounded-full bg-[#376eb5]/20" />
          <div className="circle-float-4 absolute top-28 left-4 w-2 h-2 rounded-full bg-[#376eb5]/30" />
        </div>

        {/* Decorative floating circles - right side */}
        <div className={`deco-circles absolute right-[8%] lg:right-[10%] bottom-[30%] hidden lg:block pointer-events-none ${isLoaded ? 'visible' : ''}`}>
          <div className="circle-float-2 absolute w-20 h-20 rounded-full border border-[#376eb5]/10" />
          <div className="circle-float-3 absolute -top-6 -left-8 w-6 h-6 rounded-full bg-[#4A8FDB]/10" />
          <div className="circle-float-1 absolute top-16 left-16 w-4 h-4 rounded-full bg-[#376eb5]/15" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative">
          
          {/* Badge */}
          {subtitle && (
            <div 
              className={`hero-reveal ${isLoaded ? 'visible' : ''}`}
              style={{ transitionDelay: '0s' }}
            >
              <div 
                className="badge-glow inline-flex items-center gap-2 px-4 py-2 rounded-full text-primary font-semibold text-sm tracking-widest uppercase mb-8 lg:mb-6"
                style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {subtitle}
              </div>
            </div>
          )}
          
          {/* Title */}
          <h1 
            className={`hero-reveal font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6 ${isLoaded ? 'visible' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            {title}
          </h1>
          
          {/* Description */}
          <p 
            className={`hero-reveal text-lg lg:text-xl text-gray-600 leading-relaxed mb-10 whitespace-pre-line ${isLoaded ? 'visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            {description}
          </p>
          
          {/* CTAs */}
          <div 
            className={`hero-reveal flex flex-col sm:flex-row gap-4 justify-center mb-12 ${isLoaded ? 'visible' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          >
            {renderLink(ctaUrl, ctaText, true)}
            {secondaryCtaText && secondaryCtaUrl && renderLink(secondaryCtaUrl, secondaryCtaText, false)}
          </div>

          {/* Trust Indicators */}
          <div 
            className={`hero-reveal text-sm tracking-wider uppercase text-gray-600 mb-8 ${isLoaded ? 'visible' : ''}`}
            style={{ transitionDelay: '0.4s' }}
          >
            <span>Amsterdam • Sinds 2008 • Google Partner • </span>
            <a 
              href="https://www.google.com/maps/place/?q=place_id:ChIJEVS-szIKxkcRng6UB0W50u0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors underline decoration-1 underline-offset-2"
            >
              5★ Google Reviews
            </a>
          </div>

          {/* Scroll Indicator - improved animation */}
          <div className="flex justify-center">
            <div className={`scroll-arrow ${isLoaded ? 'visible' : ''}`}>
              <svg className="w-6 h-6 text-[#376eb5]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}