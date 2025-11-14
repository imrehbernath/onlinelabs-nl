'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function AboutSection({ aboutData, imageCaption, imageCaptionLink }) {
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

    const element = document.getElementById('about-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const data = aboutData || {
    title: "Meer dan een Online Marketing Bureau",
    subtitle: "Jouw partner voor digitale groei en zichtbaarheid",
    paragraph1: "Met onze jarenlange ervaring in online marketing, webdesign, SEO en Social Ads helpen we bedrijven groeien. Of het nu gaat om website-optimalisatie, een betere vindbaarheid in Google, het creëren van een uniek webdesign of het ontwikkelen van gerichte advertenties op social media: bij OnlineLabs zetten we alles op alles om jouw online succes te realiseren.",
    paragraph2: "We combineren creativiteit, data en technologie om oplossingen te bieden die niet alleen werken, maar ook inspireren. Laat ons jouw ambities vertalen naar meetbare resultaten.",
    targetAudienceTitle: "Voor wie is OnlineLabs?",
    targetAudienceItems: [
      "Websites die willen groeien met betere vindbaarheid en conversie",
      "Dienstverleners die in heel Nederland zichtbaar willen zijn in Google",
      "Bedrijven die meer leads en aanvragen willen genereren",
      "Startups en scale-ups die snel online marktaandeel willen winnen",
      "MKB-bedrijven die een moderne, goed vindbare website nodig hebben",
      "Marketingteams die expertise zoeken op het gebied van SEO of (Social) Ads"
    ],
    image: {
      sourceUrl: "/images/workspace-onlinelabs.jpg",
      altText: "OnlineLabs workspace in Amsterdam"
    },
    ctaText: "over ons",
    ctaUrl: "/over-ons"
  };

  return (
    <section 
      id="about-section"
      className="py-12 lg:py-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Column - EXACT SAME AS TEXTIIMAGESECTION */}
          <div className={`relative order-1 lg:h-[760px] lg:order-1 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Blob - EXACT zoals TextImageSection */}
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
            
            {/* Image + Caption - EXACT zoals TextImageSection */}
            {!false && data.image && (
              <>
                <div 
                  className="relative w-[85%] mx-auto aspect-[346/514] lg:absolute lg:top-[15%] lg:left-[8%] lg:w-[54%] lg:translate-x-0 rounded-xl overflow-hidden group z-20"
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
                    src={data.image.sourceUrl}
                    alt={data.image.altText}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority={false}
                    sizes="(max-width: 1024px) 85vw, 40vw"
                  />
                </div>

                {/* Image Caption - onder de foto */}
                {imageCaption && (
                  <div className="relative w-[85%] mx-auto mt-4 lg:absolute lg:bottom-[2%] lg:left-[8%] lg:w-[54%] lg:mt-0 text-center lg:text-left z-20">
                    {imageCaptionLink ? (
                      <Link 
                        href={imageCaptionLink}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1 group"
                      >
                        <span dangerouslySetInnerHTML={{ __html: imageCaption }} />
                        <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ) : (
                      <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: imageCaption }} />
                    )}
                  </div>
                )}
              </>
            )}
            
          </div>

          {/* Right Column - Content */}
          <div 
            className={`order-2 lg:order-2 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="mb-8">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                {data.title}
              </h2>
              <p className="text-xl text-gray-600 italic">
                {data.subtitle}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-base text-gray-700 leading-relaxed">
                {data.paragraph1}
              </p>
              {data.paragraph2 && (
                <p className="text-base text-gray-700 leading-relaxed">
                  Wil je meer weten over wie we zijn en wat ons drijft? Bezoek dan onze{' '}
                  <Link 
                    href={data.ctaUrl}
                    className="text-primary hover:text-primary-dark font-medium underline decoration-2 decoration-primary/30 hover:decoration-primary transition-colors"
                  >
                    {data.ctaText}
                  </Link>{' '}
                  pagina.
                </p>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-base text-gray-700 leading-relaxed">
                {data.paragraph2}
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent my-10" />

            <div>
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                {data.targetAudienceTitle}
              </h3>
              
              <div className="space-y-3">
                {data.targetAudienceItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      isVisible 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-8'
                    }`}
                    style={{ 
                      transitionDelay: isVisible ? `${600 + index * 100}ms` : '0ms' 
                    }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)' }}>
                      <Check className="w-4 h-4" style={{ color: '#376eb5' }} strokeWidth={3} />
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed flex-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}