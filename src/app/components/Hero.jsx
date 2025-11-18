'use client';

import Image from 'next/image';

export default function Hero({ data = null }) {
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
        .video-shadow {
          box-shadow: none;
        }
        @media (min-width: 1024px) {
          .video-shadow {
            box-shadow: -20px 20px 60px rgba(0,0,0,0.3);
          }
        }
      `}</style>
      <section className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-6 lg:space-y-8 max-w-2xl flex flex-col justify-center min-h-[550px] md:min-h-[620px] lg:min-h-[700px]">
            {/* H1 - Playfair Display */}
            <h1 className="font-serif font-bold leading-[1.1] text-gray-900 text-[2.5rem] sm:text-[3rem] lg:text-[3.75rem] xl:text-[4.25rem] tracking-tight">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
              {subtitle}
            </p>

            {/* Description */}
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              {description}
            </p>

            {/* USP Badges - WITH CLICKABLE GOOGLE REVIEWS */}
            <div className="pt-4">
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

          {/* Right Column - Overlapping Media */}
          <div className="relative h-[550px] md:h-[620px] lg:h-[700px]">
            
            {/* Blue gradient block */}
            <div 
              className="absolute top-0 md:top-[2%] xl:top-[5%] right-0 w-[52%] lg:w-[68%] h-[40%] lg:h-[58%] rounded-[1.5rem] z-10"
              style={{
                background: 'linear-gradient(135deg, #4A8FDB 0%, #376eb5 100%)'
              }}
            />
            
            {/* Main workspace IMAGE */}
            <div className="absolute top-[8%] md:top-[8%] lg:top-[18%] left-0 lg:left-[10%] w-[56%] lg:w-[46%] aspect-[346/514] z-20 rounded-xl overflow-hidden shadow-none lg:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 56vw, 32vw"
              />
            </div>

            {/* VIDEO with phone */}
            <div 
              className="absolute bottom-[8%] md:bottom-[10%] lg:bottom-[10%] right-[2%] lg:right-[8%] w-[52%] lg:w-[44%] aspect-[338/601] z-30 rounded-xl overflow-hidden shadow-none lg:shadow-[-20px_20px_60px_rgba(0,0,0,0.3)]"
              style={{
                transform: 'scaleX(1.08) scaleY(1.08) translateX(8px) translateY(8px)'
              }}
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
              className="absolute bottom-[12%] md:bottom-[6%] lg:bottom-0 left-[1%] lg:left-0 w-[52%] lg:w-[68%] h-[40%] lg:h-[58%] rounded-[1.5rem] z-0"
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