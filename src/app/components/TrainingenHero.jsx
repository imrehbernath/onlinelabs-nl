'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TrainingenHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const checkmarks = [
    'AI & GEO-optimalisatie',
    'WordPress & Content', 
    'Ads & Analytics',
    'Door onze eigen experts'
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
        .trainingen-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .trainingen-reveal.visible {
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

        /* Floating circles */
        @keyframes circle-float-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes circle-float-2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-18px) scale(1.05); }
        }

        .circle-float-1 {
          animation: circle-float-1 5s ease-in-out infinite;
        }
        .circle-float-2 {
          animation: circle-float-2 7s ease-in-out infinite;
          animation-delay: -2s;
        }

        .deco-circles {
          opacity: 0;
          transition: opacity 1s ease-out;
          transition-delay: 0.6s;
        }
        .deco-circles.visible {
          opacity: 1;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .trainingen-reveal, .check-item {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .orb-1, .orb-2, .orb-3, .circle-float-1, .circle-float-2 {
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
          .deco-circles {
            opacity: 1;
            transition: none;
          }
        }
      `}</style>

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-white overflow-hidden">
        
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

        {/* Decorative floating circles */}
        <div className={`deco-circles absolute right-[15%] lg:right-[12%] xl:right-[15%] top-[30%] hidden lg:block pointer-events-none ${isLoaded ? 'visible' : ''}`}>
          <div className="circle-float-1 absolute w-20 h-20 rounded-full border-2 border-[#376eb5]/15" />
          <div className="circle-float-2 absolute top-28 -left-6 w-10 h-10 rounded-full bg-[#4A8FDB]/10" />
          <div className="circle-float-1 absolute top-16 left-16 w-4 h-4 rounded-full bg-[#376eb5]/25" />
          <div className="circle-float-2 absolute -top-8 -left-12 w-32 h-32 rounded-full border border-[#376eb5]/8" style={{ animationDelay: '-3s' }} />
        </div>

        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23376eb5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl">
            
            {/* Breadcrumb */}
            <nav 
              className={`trainingen-reveal flex items-center gap-2 text-sm text-gray-500 mb-8 ${isLoaded ? 'visible' : ''}`}
              style={{ transitionDelay: '0s' }}
            >
              <Link href="/" className="hover:text-[#376eb5] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Trainingen</span>
            </nav>

            {/* Badge with glow */}
            <div 
              className={`trainingen-reveal ${isLoaded ? 'visible' : ''}`}
              style={{ transitionDelay: '0.1s' }}
            >
              <div 
                className="badge-glow inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)' }}
              >
                <span className="w-2 h-2 rounded-full bg-[#376eb5]" />
                <span className="text-sm font-semibold text-[#376eb5] tracking-wide">
                  Leer van onze experts
                </span>
              </div>
            </div>

            {/* Heading with accent line */}
            <div className="relative">
              <h1 
                className={`trainingen-reveal font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight ${isLoaded ? 'visible' : ''}`}
                style={{ transitionDelay: '0.2s' }}
              >
                Onze trainingen
              </h1>
              
              {/* Accent underline */}
              <div 
                className={`line-animate absolute -bottom-1 left-0 h-1 w-24 lg:w-32 rounded-full bg-gradient-to-r from-[#376eb5] to-[#4A8FDB] ${isLoaded ? 'visible' : ''}`}
                style={{ animationDelay: '0.5s' }}
              />
            </div>

            {/* Description */}
            <p 
              className={`trainingen-reveal text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mb-10 mt-8 ${isLoaded ? 'visible' : ''}`}
              style={{ transitionDelay: '0.3s' }}
            >
              Geen standaard presentaties, maar praktische trainingen door de specialisten die dagelijks met deze tools werken. Van AI en WordPress tot Google Ads en Analytics — je leert direct van de mensen die het vak beheersen. Op locatie in Amsterdam of online.
            </p>

            {/* Checkmarks */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:gap-x-12">
              {checkmarks.map((item, index) => (
                <div 
                  key={item}
                  className={`check-item flex items-center gap-3 ${isLoaded ? 'visible' : ''}`}
                  style={{ transitionDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="relative flex items-center justify-center w-6 h-6">
                    <div className="absolute inset-0 rounded-full bg-[#376eb5]/10" />
                    <svg 
                      className="check-icon w-4 h-4 text-[#376eb5] relative z-10" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
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