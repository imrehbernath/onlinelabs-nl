'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function TextImageSection({ 
  layout = 'image-left',
  subheading = null,
  title, 
  content, 
  image, 
  video, 
  serviceColor = 'green',
  background = 'white',
  imageCaption = null,
  imageCaptionLink = null,
  variant = 'photo'
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = sectionRef.current;
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Subtle parallax for blob (CSS variable based - no JS animation loop)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress (0 to 1) when section is in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = 1 - (rect.top / windowHeight);
        setScrollProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    // Use passive listener for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-[#F3F4F6]',
    beige: 'bg-[#FAFAF8]'
  };

  const bgClass = backgroundClasses[background] || backgroundClasses.white;
  
  const blobColors = {
    white: '#F5F3EE',
    gray: '#FFFFFF',
    beige: '#FFFFFF'
  };
  const blobColor = blobColors[background] || blobColors.white;
  
  const isTextOnly = layout === 'text-only';
  
  const isInfographic = variant === 'infographic' || 
    image?.altText?.toLowerCase().includes('infographic') ||
    image?.sourceUrl?.toLowerCase().includes('infographic');
  
  const processedContent = content
    ? content.replace(/<li>/g, `<li class="flex gap-3 items-start"><span class="text-gray-300 flex-shrink-0 mt-1.5 font-light text-xl">•</span><span>`)
        .replace(/<\/li>/g, '</span></li>')
    : '';

  // Text-only layout
  if (isTextOnly) {
    return (
      <>
        <style>{`
          .text-reveal {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.7s ease-out, transform 0.7s ease-out;
          }
          .text-reveal.visible {
            opacity: 1;
            transform: translateY(0);
          }
          @media (prefers-reduced-motion: reduce) {
            .text-reveal {
              opacity: 1;
              transform: none;
              transition: none;
            }
          }
        `}</style>
        <section 
          ref={sectionRef}
          className={`relative ${bgClass} py-12 lg:py-20 overflow-hidden`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-reveal max-w-3xl mx-auto ${isVisible ? 'visible' : ''}`}>
              
              <div className="relative pl-6 lg:pl-8 border-l-4 border-[#376eb5]/30">
                
                <div className="absolute -left-[10px] top-0 w-4 h-4 rounded-full bg-[#376eb5]/20 border-2 border-[#376eb5]/40" />
                
                {subheading && (
                  <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                    {subheading}
                  </span>
                )}
                
                {title && (
                  <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
                    {title}
                  </h2>
                )}

                {processedContent && (
                  <div 
                    className="prose prose-lg max-w-none text-gray-600 leading-relaxed
                      prose-p:mb-4 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-lg
                      prose-strong:text-gray-900 prose-strong:font-semibold
                      prose-a:text-[#376eb5] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                      prose-ul:space-y-3 prose-ul:my-6
                      prose-li:list-none prose-li:pl-0 prose-li:text-gray-700 prose-li:leading-relaxed prose-li:text-lg
                      prose-h3:text-2xl prose-h3:font-bold prose-h3:text-gray-900 prose-h3:mt-8 prose-h3:mb-4"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Default two-column layout
  return (
    <>
      <style>{`
        /* Staggered reveal animations */
        .content-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .content-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .media-reveal {
          opacity: 0;
          transform: translateY(40px) scale(0.98);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: 0.15s;
        }
        .media-reveal.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Morphing blob animation */
        @keyframes blob-morph {
          0%, 100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            transform: rotate(-5deg) scale(1);
          }
          25% {
            border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
            transform: rotate(-3deg) scale(1.02);
          }
          50% {
            border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
            transform: rotate(-7deg) scale(0.98);
          }
          75% {
            border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
            transform: rotate(-4deg) scale(1.01);
          }
        }

        .blob-morph {
          animation: blob-morph 20s ease-in-out infinite;
          will-change: border-radius, transform;
        }

        /* Media card interactions */
        .media-card-enhanced {
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.5s ease;
        }
        .media-card-enhanced:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 30px 70px rgba(0,0,0,0.4);
        }

        /* Shine sweep effect */
        @keyframes shine-sweep {
          0% { transform: translateX(-100%) rotate(25deg); }
          100% { transform: translateX(200%) rotate(25deg); }
        }
        .shine-effect {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 50%;
          height: 200%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.15),
            transparent
          );
          transform: translateX(-100%) rotate(25deg);
        }
        .media-card-enhanced:hover .shine-effect {
          animation: shine-sweep 0.8s ease-out;
        }

        /* Arrow bounce */
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .arrow-bounce {
          animation: gentle-bounce 2s ease-in-out infinite;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .content-reveal, .media-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .blob-morph {
            animation: none;
          }
          .media-card-enhanced:hover {
            transform: none;
          }
          .arrow-bounce {
            animation: none;
          }
        }
      `}</style>
      
      <section 
        ref={sectionRef}
        className={`relative ${bgClass} py-12 lg:py-24 overflow-hidden`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Text Column */}
            <div className={`content-reveal space-y-6 lg:space-y-8 max-w-2xl order-2 ${
              layout === 'image-left' ? 'lg:order-2' : 'lg:order-1'
            } ${isVisible ? 'visible' : ''}`}>
              
              {subheading && (
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  {subheading}
                </span>
              )}
              
              {title && (
                <h2 className={`font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight ${subheading ? '-mt-2' : ''}`}>
                  {title}
                </h2>
              )}

              {processedContent && (
                <div 
                  className="prose prose-lg max-w-none text-gray-600 leading-relaxed
                    prose-p:mb-4 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-lg
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-ul:space-y-3 prose-ul:my-6
                    prose-li:list-none prose-li:pl-0 prose-li:text-gray-700 prose-li:leading-relaxed prose-li:text-lg
                    prose-h3:text-2xl prose-h3:font-bold prose-h3:text-gray-900 prose-h3:mt-8 prose-h3:mb-4"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              )}
            </div>

            {/* Media Column */}
            <div className={`media-reveal relative order-1 ${isInfographic ? 'lg:h-auto' : 'lg:h-[760px]'} ${
              layout === 'image-left' ? 'lg:order-1' : 'lg:order-2'
            } ${isVisible ? 'visible' : ''}`}>
              
              {/* Morphing Blob - only for photo variant */}
              {!isInfographic && (
                <div 
                  className="blob-morph hidden lg:block absolute"
                  style={{
                    background: blobColor,
                    top: '5%',
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    // Subtle parallax via scroll progress
                    transform: `rotate(-5deg) translateY(${scrollProgress * -15}px)`,
                    transition: 'transform 0.1s linear'
                  }}
                />
              )}
              
              {/* Video */}
              {video?.webm && (
                <div 
                  className="media-card-enhanced relative w-[85%] mx-auto aspect-[338/601] lg:absolute lg:top-[15%] lg:left-[10%] lg:w-[44%] lg:translate-x-0 rounded-xl overflow-hidden z-20"
                  style={{
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                  }}
                >
                  <div className="shine-effect" />
                  <video
                    className="w-full h-full block"
                    style={{ objectFit: 'cover' }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src={video.webm} type="video/webm" />
                    <source src={video.mp4} type="video/mp4" />
                  </video>
                </div>
              )}

              {/* Image - Photo variant */}
              {!video && image && !isInfographic && (
                <>
                  <div 
                    className="media-card-enhanced relative w-[85%] mx-auto aspect-[346/514] lg:absolute lg:top-[15%] lg:left-[8%] lg:w-[54%] lg:translate-x-0 rounded-xl overflow-hidden group z-20"
                    style={{
                      boxShadow: '0 25px 60px rgba(0,0,0,0.35)'
                    }}
                  >
                    <div className="shine-effect" />
                    
                    <Image
                      src={image.sourceUrl}
                      alt={image.altText || title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={false}
                      quality={85}
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 85vw, 40vw"
                    />
                  </div>

                  {/* Image Caption */}
                  {imageCaption && (
                    <div className="relative w-[85%] mx-auto mt-4 lg:absolute lg:bottom-[2%] lg:left-[8%] lg:w-[54%] lg:mt-0 text-center lg:text-left z-20">
                      {imageCaptionLink ? (
                        <Link 
                          href={imageCaptionLink}
                          className="text-sm lg:text-base text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1 group italic"
                        >
                          <span dangerouslySetInnerHTML={{ __html: imageCaption }} />
                          <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ) : (
                        <p className="text-sm lg:text-base text-gray-600 italic" dangerouslySetInnerHTML={{ __html: imageCaption }} />
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Image - Infographic variant */}
              {!video && image && isInfographic && (
                <div className="relative w-full flex flex-col items-center justify-center">
                  <div className="media-card-enhanced relative w-[90%] sm:w-[80%] lg:w-full max-w-[520px] rounded-lg overflow-hidden">
                    <div className="shine-effect" />
                    <Image
                      src={image.sourceUrl}
                      alt={image.altText || title}
                      width={520}
                      height={520}
                      className="w-full h-auto"
                      priority={false}
                      quality={90}
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 520px"
                    />
                  </div>
                  
                  {imageCaption && (
                    <div className="mt-4 text-center">
                      {imageCaptionLink ? (
                        <Link 
                          href={imageCaptionLink}
                          className="text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1 group italic"
                        >
                          <span dangerouslySetInnerHTML={{ __html: imageCaption }} />
                          <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ) : (
                        <p className="text-sm text-gray-600 italic" dangerouslySetInnerHTML={{ __html: imageCaption }} />
                      )}
                    </div>
                  )}
                </div>
              )}
              
            </div>
          </div>
        </div>

        {/* Animated Scroll Arrow */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center transition-opacity duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} style={{ transitionDelay: '0.5s' }}>
          <div className="arrow-bounce">
            <ArrowDown className="w-6 h-6 text-gray-400" strokeWidth={2} />
          </div>
        </div>
      </section>
    </>
  );
}