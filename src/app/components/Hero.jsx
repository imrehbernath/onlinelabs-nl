'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero({ data = null }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after hydration
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const defaultData = {
    heroTitle: "OnlineLabs: Dé expert in online groei en webdesign",
    heroSubtitle: "Wil je jouw bedrijf laten groeien met slimme zichtbaarheid, overtuigend webdesign en een strategie die werkt?",
    heroDescription: "OnlineLabs is een online marketing bureau uit Amsterdam dat bedrijven in heel Nederland helpt groeien met slimme strategieën, webdesign en meetbaar resultaat.",
    heroImage: {
      sourceUrl: "https://cdn.onlinelabs.nl/wp-content/uploads/2025/04/09155129/Online-marketeer-bij-OnlineLabs.webp",
      altText: "Online marketeer aan het werk bij OnlineLabs kantoor Amsterdam"
    },
    heroVideoWebm: {
      mediaItemUrl: "https://cdn.onlinelabs.nl/wp-content/uploads/2025/01/18075455/Onlinelabs.webm"
    },
    heroVideoMp4: {
      mediaItemUrl: "https://cdn.onlinelabs.nl/wp-content/uploads/2025/01/18075455/Onlinelabs.mp4"
    }
  };

  const heroData = data || defaultData;
  
  const title = heroData.heroTitle || defaultData.heroTitle;
  const subtitle = heroData.heroSubtitle || defaultData.heroSubtitle;
  const description = heroData.heroDescription || defaultData.heroDescription;
  
  const imageUrl = heroData.heroImage?.sourceUrl || defaultData.heroImage.sourceUrl;
  const imageAlt = heroData.heroImage?.altText || defaultData.heroImage.altText;
  
  const videoWebm = heroData.heroVideoWebm?.mediaItemUrl || defaultData.heroVideoWebm.mediaItemUrl;
  const videoMp4 = heroData.heroVideoMp4?.mediaItemUrl || defaultData.heroVideoMp4.mediaItemUrl;

  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('🎨 Hero using:', data ? 'WordPress data' : 'Fallback data');
  }

  return (
    <>
      <style>{`
        /* Animated gradient orbs - GPU only (transform + opacity) */
        @keyframes float-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        
        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 30px) scale(0.95); }
          66% { transform: translate(35px, -15px) scale(1.05); }
        }

        /* Floating effect for media elements */
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes gentle-float-delayed {
          0%, 100% { transform: translateY(0) scaleX(1.08) scaleY(1.08) translateX(8px); }
          50% { transform: translateY(-10px) scaleX(1.08) scaleY(1.08) translateX(8px); }
        }

        /* Stagger reveal for text */
        .hero-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .hero-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
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

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hero-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          
          .orb-animate, .float-animate, .float-animate-delayed {
            animation: none !important;
          }
          
          .media-card:hover {
            transform: none;
          }
        }

        /* Video shadow - only on desktop */
        .video-shadow {
          box-shadow: none;
        }
        @media (min-width: 1024px) {
          .video-shadow {
            box-shadow: -20px 20px 60px rgba(0,0,0,0.3);
          }
          
          .float-animate {
            animation: gentle-float 6s ease-in-out infinite;
          }
          
          .float-animate-delayed {
            animation: gentle-float-delayed 7s ease-in-out infinite;
            animation-delay: 0.5s;
          }
          
          .orb-animate-1 {
            animation: float-orb-1 20s ease-in-out infinite;
          }
          
          .orb-animate-2 {
            animation: float-orb-2 25s ease-in-out infinite;
          }
        }
      `}</style>
      
      <section className="relative bg-white overflow-hidden">
        {/* Animated background orbs - subtle depth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary orb - blue tint */}
          <div 
            className="orb-animate-1 absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.03]"
            style={{
              background: 'radial-gradient(circle, #376eb5 0%, transparent 70%)',
              willChange: 'transform'
            }}
          />
          {/* Secondary orb - teal tint */}
          <div 
            className="orb-animate-2 absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full opacity-[0.04]"
            style={{
              background: 'radial-gradient(circle, #1abc9c 0%, transparent 70%)',
              willChange: 'transform'
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4 sm:py-16 lg:py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Content with staggered reveal */}
            <div className="space-y-6 lg:space-y-8 max-w-2xl flex flex-col justify-center min-h-[550px] md:min-h-[620px] lg:min-h-[700px]">
              {/* H1 - Playfair Display */}
              <h1 
                className={`hero-reveal font-serif font-bold leading-[1.1] text-gray-900 text-[2.5rem] sm:text-[3rem] lg:text-[3.75rem] xl:text-[4.25rem] tracking-tight ${isLoaded ? 'revealed' : ''}`}
                style={{ transitionDelay: '0.1s' }}
              >
                {title}
              </h1>

              {/* Subtitle */}
              <p 
                className={`hero-reveal text-lg lg:text-xl text-gray-700 leading-relaxed ${isLoaded ? 'revealed' : ''}`}
                style={{ transitionDelay: '0.2s' }}
              >
                {subtitle}
              </p>

              {/* Description */}
              <p 
                className={`hero-reveal text-base lg:text-lg text-gray-600 leading-relaxed ${isLoaded ? 'revealed' : ''}`}
                style={{ transitionDelay: '0.3s' }}
              >
                {description}
              </p>

              {/* USP Badges - WITH CLICKABLE GOOGLE REVIEWS */}
              <div 
                className={`hero-reveal pt-4 ${isLoaded ? 'revealed' : ''}`}
                style={{ transitionDelay: '0.4s' }}
              >
                <div className="text-sm tracking-wider uppercase text-gray-600 text-center lg:text-left">
                  <span>Sinds 2008 • Google Partner • Amsterdam • </span>
                  <a 
                    href="https://www.google.com/maps/place/?q=place_id:ChIJEVS-szIKxkcRng6UB0W50u0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 transition-colors underline decoration-1 underline-offset-2"
                  >
                    5★ Google Reviews
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Overlapping Media with floating effect */}
            <div 
              className={`hero-reveal relative h-[550px] md:h-[620px] lg:h-[700px] ${isLoaded ? 'revealed' : ''}`}
              style={{ transitionDelay: '0.3s' }}
            >
              
              {/* Blue gradient block */}
              <div 
                className="gradient-block absolute top-0 md:top-[2%] xl:top-[5%] right-0 w-[52%] lg:w-[68%] h-[40%] lg:h-[58%] rounded-[1.5rem] z-10"
                style={{
                  background: 'linear-gradient(135deg, #4A8FDB 0%, #376eb5 100%)'
                }}
              />
              
              {/* Main workspace IMAGE - with hover depth */}
              <div 
                className="media-card float-animate absolute top-[8%] md:top-[8%] lg:top-[18%] left-0 lg:left-[10%] w-[56%] lg:w-[46%] aspect-[346/514] z-20 rounded-xl overflow-hidden shadow-none lg:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                style={{ willChange: 'transform' }}
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 56vw, 32vw"
                />
                {/* Subtle shine overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
                  }}
                />
              </div>

              {/* VIDEO with phone - floating delayed */}
              <div 
                className="media-card float-animate-delayed absolute bottom-[8%] md:bottom-[10%] lg:bottom-[10%] right-[2%] lg:right-[8%] w-[52%] lg:w-[44%] aspect-[338/601] z-30 rounded-xl overflow-hidden shadow-none lg:shadow-[-20px_20px_60px_rgba(0,0,0,0.3)]"
                style={{ willChange: 'transform' }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <video
                    className="w-full h-full block"
                    style={{
                      objectFit: 'cover'
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src={videoWebm} type="video/webm" />
                    <source src={videoMp4} type="video/mp4" />
                  </video>
                </div>
              </div>

              {/* Teal gradient block */}
              <div 
                className="gradient-block absolute bottom-[12%] md:bottom-[6%] lg:bottom-0 left-[1%] lg:left-0 w-[52%] lg:w-[68%] h-[40%] lg:h-[58%] rounded-[1.5rem] z-0"
                style={{
                  background: 'linear-gradient(135deg, #1abc9c 0%, #16a085 100%)'
                }}
              />
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
}