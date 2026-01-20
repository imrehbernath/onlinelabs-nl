'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SkillsHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const checkmarks = [
    'SEO & Google Rankings',
    'AI & GEO-optimalisatie', 
    'Webdesign & UX',
    'Conversie & Groei'
  ];

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
        .skills-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .skills-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Checkmark items */
        .check-item {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .check-item.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Check icon pop */
        .check-icon {
          transform: scale(0);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .check-item.visible .check-icon {
          transform: scale(1);
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

        /* Gradient blocks */
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
          .skills-reveal, .check-item {
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
          .check-icon {
            transform: scale(1);
            transition: none;
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
          {/* Two-column grid layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-5 lg:space-y-6 max-w-xl">
              
              {/* Breadcrumb */}
              <nav 
                className={`skills-reveal flex items-center gap-2 text-sm text-gray-500 ${isLoaded ? 'visible' : ''}`}
                style={{ transitionDelay: '0s' }}
              >
                <Link href="/" className="hover:text-[#376eb5] transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">Onze Skills</span>
              </nav>

              {/* Badge with glow */}
              <div 
                className={`skills-reveal ${isLoaded ? 'visible' : ''}`}
                style={{ transitionDelay: '0.1s' }}
              >
                <div 
                  className="badge-glow inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#376eb5]" />
                  <span className="text-sm font-semibold text-[#376eb5] tracking-wide">
                    Full-service Online Marketing
                  </span>
                </div>
              </div>

              {/* Heading with accent line */}
              <div className="relative">
                <h1 
                  className={`skills-reveal font-serif text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight ${isLoaded ? 'visible' : ''}`}
                  style={{ transitionDelay: '0.2s' }}
                >
                  Onze skills
                </h1>
                
                {/* Accent underline */}
                <div 
                  className={`line-animate absolute -bottom-1 left-0 h-1 w-24 lg:w-32 rounded-full bg-gradient-to-r from-[#376eb5] to-[#4A8FDB] ${isLoaded ? 'visible' : ''}`}
                  style={{ animationDelay: '0.5s' }}
                />
              </div>

              {/* Description */}
              <p 
                className={`skills-reveal text-lg lg:text-xl text-gray-600 leading-relaxed pt-4 ${isLoaded ? 'visible' : ''}`}
                style={{ transitionDelay: '0.3s' }}
              >
                Bij OnlineLabs zijn we jouw partner in online succes. Als full-service bureau met meer dan 25 jaar ervaring bieden we expertise in SEO, AI-zichtbaarheid, webdesign en conversie-optimalisatie. Ons team van specialisten zet strategische en datagedreven oplossingen in om jouw online zichtbaarheid te verbeteren en je bedrijf te laten groeien.
              </p>

              {/* Checkmarks - 2x2 grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-2">
                {checkmarks.map((item, index) => (
                  <div 
                    key={item}
                    className={`check-item flex items-center gap-2 ${isLoaded ? 'visible' : ''}`}
                    style={{ transitionDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                      <div className="absolute inset-0 rounded-full bg-[#376eb5]/10" />
                      <svg 
                        className="check-icon w-3 h-3 text-[#376eb5] relative z-10" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium text-sm lg:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image with overlapping elements */}
            <div 
              className={`skills-reveal relative h-[350px] sm:h-[400px] lg:h-[480px] xl:h-[520px] ${isLoaded ? 'visible' : ''}`}
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
                  src="/Trainingsruimte.webp"
                  alt="OnlineLabs kantoor aan de Herengracht Amsterdam met uitzicht op de Westerkerk"
                  fill
                  className="object-cover"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 75vw, (max-width: 1024px) 50vw, 40vw"
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
                className={`skills-reveal absolute bottom-[15%] lg:bottom-[12%] right-[5%] lg:right-[8%] z-30 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg ${isLoaded ? 'visible' : ''}`}
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
