'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Icon mapping for USPs
const iconMap = {
  location: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  users: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  coffee: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="1" x2="6" y2="4"/>
      <line x1="10" y1="1" x2="10" y2="4"/>
      <line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  ),
  clock: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  ),
  check: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22,4 12,14.01 9,11.01"/>
    </svg>
  ),
  book: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  certificate: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
};

export default function TrainingHero({ 
  badge = 'TRAINING',
  title,
  description,
  ctaText = 'Bekijk trainingsopties',
  ctaLink = '#pricing',
  usps = [],
  slug,
  // Image props - default to training room
  heroImage = '/Trainingsruimte.webp',
  heroImageAlt = 'Trainingsruimte OnlineLabs aan de Herengracht Amsterdam met uitzicht op de Westerkerk'
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        /* Floating orbs - OnlineLabs blue only */
        @keyframes float-orb-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.1); }
          66% { transform: translate(-30px, 20px) scale(0.9); }
        }
        
        @keyframes float-orb-medium {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 40px) scale(1.15); }
        }

        .orb-1 {
          animation: float-orb-slow 25s ease-in-out infinite;
        }
        .orb-2 {
          animation: float-orb-medium 20s ease-in-out infinite;
          animation-delay: -5s;
        }
        .orb-3 {
          animation: float-orb-slow 30s ease-in-out infinite reverse;
          animation-delay: -10s;
        }

        /* Staggered reveal */
        .training-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .training-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Badge pulse glow */
        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(55, 110, 181, 0.2); }
          50% { box-shadow: 0 0 20px 5px rgba(55, 110, 181, 0.15); }
        }
        .badge-glow {
          animation: badge-glow 3s ease-in-out infinite;
        }

        /* Line expand */
        @keyframes line-expand {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .line-animate {
          transform-origin: left;
          transform: scaleX(0);
        }
        .line-animate.visible {
          animation: line-expand 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* USP items */
        .usp-item {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .usp-item.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Floating effect for media - matching Hero.jsx */
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* Media card hover depth */
        .media-card {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
                      box-shadow 0.4s ease;
        }
        
        .media-card:hover {
          transform: translateY(-4px) scale(1.02);
        }

        /* Gradient blocks pulse */
        .gradient-block {
          transition: transform 0.6s ease, opacity 0.6s ease;
        }
        
        .gradient-block:hover {
          transform: scale(1.02);
        }

        /* Desktop floating animations */
        @media (min-width: 1024px) {
          .float-animate {
            animation: gentle-float 6s ease-in-out infinite;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .training-reveal, .usp-item {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .orb-1, .orb-2, .orb-3, .float-animate {
            animation: none;
          }
          .badge-glow {
            animation: none;
          }
          .line-animate {
            transform: scaleX(1);
          }
          .line-animate.visible {
            animation: none;
          }
          .media-card:hover {
            transform: none;
          }
        }
      `}</style>

      <section className="relative pt-28 pb-12 lg:pt-32 lg:pb-16 bg-white overflow-hidden">
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="orb-1 absolute -top-20 -right-20 lg:top-0 lg:right-[10%] w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(55, 110, 181, 0.12) 0%, rgba(55, 110, 181, 0.04) 40%, transparent 70%)',
            }}
          />
          <div 
            className="orb-2 absolute -bottom-32 -left-32 lg:bottom-[-20%] lg:left-[-5%] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(74, 143, 219, 0.15) 0%, rgba(74, 143, 219, 0.05) 40%, transparent 70%)',
            }}
          />
          <div 
            className="orb-3 absolute top-[40%] right-[25%] w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-full hidden lg:block"
            style={{
              background: 'radial-gradient(circle, rgba(55, 110, 181, 0.08) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23376eb5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Two-column grid layout - matching Hero.jsx structure */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-5 lg:space-y-6 max-w-xl">
              
              {/* Breadcrumb */}
              <nav 
                className={`training-reveal flex items-center gap-2 text-sm text-gray-500 ${isLoaded ? 'visible' : ''}`}
                style={{ transitionDelay: '0s' }}
              >
                <Link href="/" className="hover:text-[#376eb5] transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link href="/trainingen" className="hover:text-[#376eb5] transition-colors">
                  Trainingen
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium truncate max-w-[200px]">{title}</span>
              </nav>

              {/* Badge with glow */}
              <div 
                className={`training-reveal ${isLoaded ? 'visible' : ''}`}
                style={{ transitionDelay: '0.1s' }}
              >
                <div 
                  className="badge-glow inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#376eb5]" />
                  <span className="text-sm font-semibold text-[#376eb5] tracking-wide uppercase">
                    {badge}
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h1 
                className={`training-reveal font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight ${isLoaded ? 'visible' : ''}`}
                style={{ transitionDelay: '0.2s' }}
              >
                {title}
              </h1>

              {/* Description */}
              {description && (
                <p 
                  className={`training-reveal text-lg lg:text-xl text-gray-600 leading-relaxed ${isLoaded ? 'visible' : ''}`}
                  style={{ transitionDelay: '0.3s' }}
                >
                  {description}
                </p>
              )}

              {/* CTA Button */}
              <div 
                className={`training-reveal pt-2 ${isLoaded ? 'visible' : ''}`}
                style={{ transitionDelay: '0.4s' }}
              >
                <Link
                  href={ctaLink}
                  className="inline-flex items-center gap-2 bg-[#376eb5] hover:bg-[#2a5a96] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  {ctaText}
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>

              {/* USPs */}
              {usps && usps.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4">
                  {usps.map((usp, index) => (
                    <div 
                      key={index}
                      className={`usp-item flex items-center gap-2 text-gray-600 ${isLoaded ? 'visible' : ''}`}
                      style={{ transitionDelay: `${0.5 + index * 0.1}s` }}
                    >
                      <span className="text-[#376eb5]">
                        {iconMap[usp.icon] || iconMap.check}
                      </span>
                      <span className="font-medium text-sm lg:text-base">{usp.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Image with overlapping elements (matching Hero.jsx style) */}
            <div 
              className={`training-reveal relative h-[350px] sm:h-[400px] lg:h-[500px] xl:h-[550px] ${isLoaded ? 'visible' : ''}`}
              style={{ transitionDelay: '0.3s' }}
            >
              
              {/* Blue gradient block - top right */}
              <div 
                className="gradient-block absolute top-0 right-0 w-[65%] lg:w-[70%] h-[55%] lg:h-[60%] rounded-[1.5rem] z-10"
                style={{
                  background: 'linear-gradient(135deg, #4A8FDB 0%, #376eb5 100%)'
                }}
              />
              
              {/* Main image - with hover depth & floating animation */}
              <div 
                className="media-card float-animate absolute top-[12%] lg:top-[15%] left-0 lg:left-[5%] w-[75%] lg:w-[70%] aspect-[4/3] z-20 rounded-xl overflow-hidden shadow-none lg:shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                style={{ willChange: 'transform' }}
              >
                <Image
                  src={heroImage}
                  alt={heroImageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 75vw, 40vw"
                />
                {/* Subtle shine overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
                  }}
                />
              </div>

              {/* Teal gradient block - bottom left */}
              <div 
                className="gradient-block absolute bottom-0 left-[5%] lg:left-0 w-[55%] lg:w-[60%] h-[45%] lg:h-[50%] rounded-[1.5rem] z-0"
                style={{
                  background: 'linear-gradient(135deg, #1abc9c 0%, #16a085 100%)'
                }}
              />

              {/* Location badge - floating on image */}
              <div 
                className={`training-reveal absolute bottom-[15%] lg:bottom-[12%] right-[5%] lg:right-[8%] z-30 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg ${isLoaded ? 'visible' : ''}`}
                style={{ transitionDelay: '0.6s' }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <svg width="16" height="16" fill="none" stroke="#376eb5" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Herengracht, Amsterdam</span>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px">
          <div 
            className={`line-animate h-full bg-gradient-to-r from-transparent via-[#376eb5]/30 to-transparent ${isLoaded ? 'visible' : ''}`}
            style={{ animationDelay: '0.8s', transformOrigin: 'center' }}
          />
        </div>
      </section>
    </>
  );
}
