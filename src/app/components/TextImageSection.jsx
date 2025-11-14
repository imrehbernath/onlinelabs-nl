'use client';

import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export default function TextImageSection({ 
  layout = 'image-left', 
  title, 
  content, 
  image, 
  video, 
  serviceColor = 'green',
  background = 'white'  // ✅ NEW: Background prop voor alternating backgrounds
}) {
  
  // Background color mapping
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    beige: 'bg-[#FAFAF8]'
  };

  const bgClass = backgroundClasses[background] || backgroundClasses.white;

  // Scroll arrow styling (grijs zoals ServiceHero)
  // Geen service colors - altijd gewoon grijs
  
  // Clean simple bullets
  const processedContent = content
    ? content.replace(/<li>/g, `<li class="flex gap-3 items-start"><span class="text-gray-300 flex-shrink-0 mt-1.5 font-light text-xl">•</span><span>`)
        .replace(/<\/li>/g, '</span></li>')
    : '';

  return (
    <section className={`relative ${bgClass} py-12 lg:py-24 overflow-hidden`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Text Column - responsive order based on layout */}
          <div className={`space-y-6 lg:space-y-8 max-w-2xl order-2 ${
            layout === 'image-left' ? 'lg:order-2' : 'lg:order-1'
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
                  prose-p:mb-4 prose-p:text-gray-600 prose-p:leading-relaxed
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:space-y-3 prose-ul:my-6
                  prose-li:list-none prose-li:pl-0 prose-li:text-gray-700 prose-li:leading-relaxed
                  prose-h3:text-xl prose-h3:font-bold prose-h3:text-gray-900 prose-h3:mt-8 prose-h3:mb-4"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            )}
          </div>

          {/* Media Column - responsive order based on layout */}
          <div className={`relative order-1 ${
            layout === 'image-left' ? 'lg:order-1' : 'lg:order-2'
          }`}>
            
            {/* Blob - ALLEEN OP DESKTOP */}
            <div 
              className="hidden lg:block absolute"
              style={{
                background: '#F5F3EE',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                transform: 'rotate(-5deg)',
                top: '5%',
                left: '5%',
                right: '5%',
                bottom: '5%',
                height: '760px'
              }}
            />
            
            {/* Video - VEEL BREDER OP MOBILE, phone aspect op desktop */}
            {video?.webm && (
              <div 
                className="relative w-[85%] mx-auto aspect-[338/601] lg:absolute lg:top-[15%] lg:left-[10%] lg:w-[44%] lg:mx-0 rounded-xl overflow-hidden"
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

            {/* Image - VEEL BREDER OP MOBILE + SHINE EFFECT */}
            {!video && image && (
              <div 
                className="relative w-[85%] mx-auto aspect-[346/514] lg:absolute lg:top-[15%] lg:left-[8%] lg:w-[54%] lg:mx-0 rounded-xl overflow-hidden group"
                style={{
                  boxShadow: '0 25px 60px rgba(0,0,0,0.35)'
                }}
              >
                {/* Shine effect on hover - EXACT zoals AboutSection */}
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
                  sizes="(max-width: 1024px) 85vw, 40vw"
                />
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* Animated Scroll Arrow - Exact zoals ServiceHero */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center">
        <div className="animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400" strokeWidth={2} />
        </div>
      </div>
    </section>
  );
}