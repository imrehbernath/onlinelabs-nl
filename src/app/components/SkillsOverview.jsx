'use client';

import Link from 'next/link';

export default function SkillsOverview({ services = [] }) {
  // Service metadata with lab branding
  const serviceInfo = {
    'seo-specialist': {
      labName: 'SEOLab',
      tagline: 'Datagedreven SEO sinds 2008'
    },
    'geo-optimalisatie': {
      labName: 'AILab',
      tagline: 'AI-zichtbaarheid & GEO experts'
    },
    'website-laten-maken': {
      labName: 'DesignLab',
      tagline: 'Websites die converteren sinds 2001'
    },
    'website-snelheid-optimalisatie': {
      labName: 'SpeedLab',
      tagline: 'Performance & Core Web Vitals'
    },
    'online-adverteren': {
      labName: 'AdLab',
      tagline: 'ROI-gerichte campagnes'
    },
    'conversie-optimalisatie': {
      labName: 'CROLab',
      tagline: 'Data-driven conversie experts'
    }
  };

  // 6 core services in logische volgorde
  const displayServices = [
    // Traffic generatie
    { 
      slug: 'seo-specialist', 
      title: 'SEO specialist',
      uri: '/skills/seo-specialist',
      serviceDetails: { 
        subtitle: 'Organisch zoekverkeer voor duurzame groei',
        description: 'Verhoog je online zichtbaarheid met datagedreven SEO-strategieën. Wij zorgen voor hogere posities, meer verkeer en duurzame groei.'
      }
    },
    { 
      slug: 'geo-optimalisatie', 
      title: 'GEO optimalisatie',
      uri: '/skills/geo-optimalisatie',
      serviceDetails: { 
        subtitle: 'Zichtbaar in AI-antwoorden van ChatGPT & meer',
        description: 'Wij zorgen dat jouw merk wordt herkend, genoemd én gelinkt in AI-antwoorden van ChatGPT, Perplexity, Gemini en Bing Copilot.'
      }
    },
    { 
      slug: 'online-adverteren', 
      title: 'Online adverteren',
      uri: '/skills/online-adverteren',
      serviceDetails: { 
        subtitle: 'Google Ads & Social Media campagnes',
        description: 'Bereik jouw doelgroep met slimme campagnes die scoren. Wij zorgen voor meer zichtbaarheid, meer leads en maximaal rendement.'
      }
    },
    // Website optimalisatie
    { 
      slug: 'website-laten-maken', 
      title: 'Website laten maken',
      uri: '/skills/website-laten-maken',
      serviceDetails: { 
        subtitle: 'Unieke websites die inspireren en converteren',
        description: 'Maak indruk met een uniek webdesign dat jouw merk versterkt en bezoekers inspireert. Wij bouwen websites die presteren en converteren.'
      }
    },
    { 
      slug: 'website-snelheid-optimalisatie', 
      title: 'Website snelheid optimalisatie',
      uri: '/skills/website-snelheid-optimalisatie',
      serviceDetails: { 
        subtitle: 'Core Web Vitals & Performance',
        description: 'Een snelle website is cruciaal voor gebruikerservaring én Google rankings. Wij optimaliseren eerst de bron, dan caching voor maximale snelheid.'
      }
    },
    { 
      slug: 'conversie-optimalisatie-optimalisatie', 
      title: 'Conversie optimalisatie',
      uri: '/skills/conversie-optimalisatie-specialist',
      serviceDetails: { 
        subtitle: 'Meer resultaat uit elke bezoeker',
        description: 'Zet meer bezoekers om in klanten met data-driven CRO. Wij analyseren, testen en optimaliseren voor maximale conversieratio.'
      }
    }
  ];

  return (
    <section className="py-20 lg:py-24" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN - SERVICES LIST */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              {displayServices.map((service) => {
                const info = serviceInfo[service.slug] || {
                  labName: 'Lab',
                  tagline: 'Online marketing expertise'
                };
                
                return (
                  <Link
                    key={service.slug}
                    href={service.uri}
                    className="group block"
                  >
                    <div className="relative">
                      {/* Accent bar */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-700 group-hover:bg-[#376eb5] rounded-full transition-all duration-300 group-hover:w-2" />
                      
                      <div className="pl-8">
                        {/* Title + Arrow */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-serif text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 group-hover:text-[#376eb5] transition-colors duration-300 leading-tight">
                            {service.title}
                          </h3>
                          
                          {/* Arrow */}
                          <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-300 group-hover:border-[#376eb5] flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
                            <svg 
                              className="w-4 h-4 text-gray-400 group-hover:text-[#376eb5] transition-colors duration-300" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>

                        {/* Subtitle - uppercase tracking like ServicesSection */}
                        {service.serviceDetails?.subtitle && (
                          <p className="text-sm font-medium text-gray-500 mb-3 tracking-wider uppercase">
                            {service.serviceDetails.subtitle}
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-lg text-gray-600 leading-relaxed mb-4">
                          {service.serviceDetails?.description}
                        </p>

                        {/* LAB tagline */}
                        <div className="flex items-start gap-2 text-sm text-gray-500">
                          <span className="text-[#376eb5] font-bold">→</span>
                          <p>
                            <span className="font-semibold text-gray-900">{info.labName}</span> – {info.tagline}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN - STICKY SIDEBAR */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-6">
              
              {/* Main Info Card - Blue */}
              <div className="bg-[#376eb5] rounded-xl p-8 text-white shadow-lg">
                <h3 className="font-serif text-2xl font-bold mb-4 text-white">
                  Innovatie, betrouwbaarheid en maatwerk
                </h3>
                <div className="space-y-3 text-base leading-relaxed">
                  <p>
                    Sinds 2008 combineren we jarenlange ervaring met de nieuwste technologieën. Van SEO-pioniers tot full-service partner voor digitale groei.
                  </p>
                  <p className="text-sm opacity-90 pt-3 border-t border-white/20">
                    Amsterdam • Google Partner • 5★ Google Reviews
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="font-serif text-4xl font-bold text-[#376eb5] mb-2">25</div>
                    <div className="text-sm text-gray-600 leading-tight">Jaar online ervaring</div>
                  </div>
                  <div>
                    <div className="font-serif text-4xl font-bold text-[#376eb5] mb-2">750+</div>
                    <div className="text-sm text-gray-600 leading-tight">Succesvolle projecten</div>
                  </div>
                  <div>
                    <div className="font-serif text-4xl font-bold text-[#376eb5] mb-2">150+</div>
                    <div className="text-sm text-gray-600 leading-tight">Tevreden klanten</div>
                  </div>
                </div>
              </div>

              {/* Values Card */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
                  Wat ons drijft
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-[#376eb5] flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-base text-gray-700">
                      <span className="font-semibold">Innovatie</span> – voorop in SEO, GEO en AI
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-[#376eb5] flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-base text-gray-700">
                      <span className="font-semibold">Betrouwbaar</span> – transparant en resultaatgericht
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-[#376eb5] flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-base text-gray-700">
                      <span className="font-semibold">Resultaat</span> – meetbare groei als doel
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}