'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';

/**
 * AboutSection Component
 * 
 * Two-column about section met parallax effect en staggered animations
 * 
 * Expected data structure:
 * aboutData = {
 *   title: string,
 *   subtitle: string,
 *   paragraph1: string,
 *   paragraph2: string,
 *   targetAudienceTitle: string,
 *   targetAudienceItems: [string],
 *   image: { sourceUrl: string, altText: string },
 *   ctaText: string,
 *   ctaUrl: string
 * }
 */
export default function AboutSection({ aboutData }) {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Parallax effect op scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer voor animations
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

  // Fallback data
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

  // Bereken parallax offset (subtiel)
  const parallaxOffset = scrollY * 0.15;

  return (
    <section 
      id="about-section"
      className="py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Image met parallax effect */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {/* Decorative gradient blob achter de foto */}
            <div 
              className="absolute -left-8 -top-8 w-72 h-72 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[3rem] -z-10"
              style={{ transform: `translateY(${parallaxOffset}px)` }}
            />
            
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <Image
                src={data.image.sourceUrl}
                alt={data.image.altText}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating accent element */}
            <div 
              className="absolute -right-6 -bottom-6 w-32 h-32 bg-gradient-to-br from-accent to-accent/80 rounded-3xl opacity-80 -z-10"
              style={{ transform: `translateY(${-parallaxOffset * 0.5}px) rotate(12deg)` }}
            />
          </div>

          {/* Right Column - Content */}
          <div 
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Title & Subtitle */}
            <div className="mb-8">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                {data.title}
              </h2>
              <p className="text-xl text-gray-600 italic">
                {data.subtitle}
              </p>
            </div>

            {/* Body Paragraphs */}
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

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent my-10" />

            {/* Target Audience Section */}
            <div>
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                {data.targetAudienceTitle}
              </h3>
              
              {/* List with staggered animation */}
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
                    {/* Custom checkmark met accent color */}
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed flex-1">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button (optioneel, als je een aparte CTA wilt naast de inline link) */}
            {/* <div className="mt-10">
              <Link
                href={data.ctaUrl}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-300"
              >
                {data.ctaText}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div> */}
          </div>

        </div>
      </div>
    </section>
  );
}