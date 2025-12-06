'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function TextImageSection({ 
  layout = 'image-left', 
  title, 
  content, 
  image, 
  video, 
  serviceColor = 'green',
  background = 'white',
  imageCaption = null,
  imageCaptionLink = null,
  variant = 'photo' // 'photo' | 'infographic'
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const sectionId = `text-image-section-${title?.replace(/\s+/g, '-').toLowerCase()}`;
    const element = document.getElementById(sectionId);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [title]);
  
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    beige: 'bg-[#FAFAF8]'
  };

  const bgClass = backgroundClasses[background] || backgroundClasses.white;
  
  // Auto-detect infographic from variant prop, alt text, or filename
  const isInfographic = variant === 'infographic' || 
    image?.altText?.toLowerCase().includes('infographic') ||
    image?.sourceUrl?.toLowerCase().includes('infographic');
  
  const processedContent = content
    ? content.replace(/<li>/g, `<li class="flex gap-3 items-start"><span class="text-gray-300 flex-shrink-0 mt-1.5 font-light text-xl">•</span><span>`)
        .replace(/<\/li>/g, '</span></li>')
    : '';

  return (
    <section 
      id={`text-image-section-${title?.replace(/\s+/g, '-').toLowerCase()}`}
      className={`relative ${bgClass} py-12 lg:py-24 overflow-hidden`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Text Column */}
          <div className={`space-y-6 lg:space-y-8 max-w-2xl order-2 ${
            layout === 'image-left' ? 'lg:order-2' : 'lg:order-1'
          } transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Title */}
            {title && (
              <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                {title}
              </h2>
            )}

            {/* Content */}
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
          <div className={`relative order-1 ${isInfographic ? 'lg:h-auto' : 'lg:h-[760px]'} ${
            layout === 'image-left' ? 'lg:order-1' : 'lg:order-2'
          } transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Blob - only for photo variant */}
            {!isInfographic && (
              <div 
                className="hidden lg:block absolute"
                style={{
                  background: '#F5F3EE',
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                  transform: 'rotate(-5deg)',
                  top: '5%',
                  left: '5%',
                  right: '5%',
                  bottom: '5%'
                }}
              />
            )}
            
            {/* Video */}
            {video?.webm && (
              <div 
                className="relative w-[85%] mx-auto aspect-[338/601] lg:absolute lg:top-[15%] lg:left-[10%] lg:w-[44%] lg:translate-x-0 rounded-xl overflow-hidden z-20"
                style={{
                  boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                }}
              >
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
                  <source src={video.webm} type="video/webm" />
                  <source src={video.mp4} type="video/mp4" />
                </video>
              </div>
            )}

            {/* Image - Photo variant */}
            {!video && image && !isInfographic && (
              <>
                <div 
                  className="relative w-[85%] mx-auto aspect-[346/514] lg:absolute lg:top-[15%] lg:left-[8%] lg:w-[54%] lg:translate-x-0 rounded-xl overflow-hidden group z-20"
                  style={{
                    boxShadow: '0 25px 60px rgba(0,0,0,0.35)'
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                      animation: 'shine 1.5s ease-in-out infinite'
                    }}
                  />
                  
                  <Image
                    src={image.sourceUrl}
                    alt={image.altText || title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
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
                        <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="relative w-full flex items-center justify-center">
                <div className="relative w-[90%] sm:w-[80%] lg:w-full max-w-[520px]">
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
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* Animated Scroll Arrow */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center transition-all duration-1000 delay-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400" strokeWidth={2} />
        </div>
      </div>
    </section>
  );
}