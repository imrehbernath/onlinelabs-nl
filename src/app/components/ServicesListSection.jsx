'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

export default function ServicesListSection({ 
  title = "SEO-diensten die we aanbieden",
  subtitle = "Vanuit Amsterdam zorgen we voor SEO-groei in Nederland en daarbuiten.",
  services = [],
  background = 'beige'
}) {
  
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    beige: 'bg-[#FAFAF8]'
  };

  const bgClass = backgroundClasses[background] || backgroundClasses.beige;

  const defaultServices = [
    {
      id: 1,
      title: 'SEO Audit',
      description: 'Onze experts doen uitgebreid onderzoek naar de huidige SEO-prestaties van jouw website. We kijken naar techniek, content, structuur én AI-zichtbaarheid. Met de SEO audit als uitgangspunt ontwikkelen we een strategie waarmee we jouw doelen bereiken.',
      details: [
        'Technische analyse (Core Web Vitals, indexering, crawlability)',
        'Content audit & keyword gap analyse',
        'Concurrentieonderzoek & marktpositie',
        'AI-visibility check (ChatGPT, Perplexity, Google AI)',
        'Structured data implementatie assessment',
        'Health score streven naar 100% (Ahrefs Site Audit)'
      ]
    },
    {
      id: 2,
      title: 'Keyword Onderzoek',
      description: 'Onze experts beginnen met een zoekwoordenonderzoek waarin we niet alleen naar Google kijken, maar ook naar hoe mensen zoeken in AI-platformen. We analyseren zoekintentie, zoekvolume en concurrentie om de beste zoekwoorden voor jouw bedrijf te vinden.',
      details: [
        'Search intent analyse (informational, navigational, transactional)',
        'Long-tail keyword opportuniteiten',
        'Zoekvolume & concurrentie analyse',
        'AI-platform keyword research (ChatGPT, Perplexity)',
        'Semantische keyword clusters',
        'Featured Snippets & "People Also Ask" targeting'
      ]
    },
    {
      id: 3,
      title: 'On-page SEO',
      description: 'Voor goede rankings in Google is on-page optimalisatie essentieel. Onze SEO-experts zorgen ervoor dat zoekmachines én AI-modellen begrijpen waar jouw pagina\'s over gaan. We optimaliseren volgens de laatste richtlijnen zonder te veel te optimaliseren.',
      details: [
        'Meta titles & descriptions optimalisatie',
        'Heading structuur (H1-H6) & semantische HTML',
        'Internal linking strategie',
        'Image optimization (alt tags, compression)',
        'Content optimization voor Google én AI',
        'URL structuur & breadcrumb optimalisatie'
      ]
    },
    {
      id: 4,
      title: 'Technische SEO',
      description: 'Als een website technisch niet in orde is, zorgt dit voor slechte vindbaarheid. We scannen en analyseren jouw website volledig op technische problemen en lossen deze direct op. Core Web Vitals, snelheid en crawlability staan centraal.',
      details: [
        'Core Web Vitals optimalisatie (LCP, FID, CLS)',
        'Site speed & performance optimization',
        'Mobile-first & responsive design check',
        'Crawl budget management',
        'XML sitemaps & robots.txt configuratie',
        'HTTPS, canonicals & redirect management'
      ]
    },
    {
      id: 5,
      title: 'Structured Data & AI-Leesbare Content',
      description: 'Content die potentiële klanten niet kunnen vinden, mist zijn doel. We zorgen voor content die relevant is voor bezoekers, zoekmachines én AI-platformen. Structured data en semantische markup maken jouw content begrijpelijk voor AI-modellen.',
      details: [
        'Schema.org markup implementatie',
        'AI-leesbare content structuur',
        'Content optimalisatie voor AI-citaties (GEO)',
        'Semantische HTML voor betere context',
        'Knowledge Graph optimalisatie',
        'Rich Results & Featured Snippets targeting'
      ]
    },
    {
      id: 6,
      title: 'SEO Strategie',
      description: 'Elk bedrijf heeft een toekomstgerichte SEO-strategie nodig. We helpen met een goede sitestructuur, efficiënte keyword targeting en strategie die werkt in Google én AI-platformen. Google verandert voortdurend, maar wij zorgen dat jouw strategie altijd up-to-date blijft.',
      details: [
        'Strategische sitestructuur & informatie-architectuur',
        'Keyword targeting & content roadmap',
        'Link building & digital PR strategie',
        'Internationale SEO & hreflang setup',
        'AI-visibility strategie (GEO)',
        'Maandelijkse monitoring & bijsturing'
      ]
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;
  const [activeService, setActiveService] = useState(displayServices[0]);
  const [hoveredService, setHoveredService] = useState(null);
  const [expandedAccordion, setExpandedAccordion] = useState(displayServices[0]?.id || null);

  const toggleAccordion = (serviceId) => {
    setExpandedAccordion(expandedAccordion === serviceId ? null : serviceId);
  };

  return (
    <section className={`py-16 lg:py-24 ${bgClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Mobile Accordion (< 1024px) */}
        <div className="lg:hidden space-y-3 max-w-3xl mx-auto">
          {displayServices.map((service) => {
            const isExpanded = expandedAccordion === service.id;
            
            return (
              <div key={service.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleAccordion(service.id)}
                  className={`w-full text-left p-5 transition-all duration-300 ${
                    isExpanded ? 'bg-[#376eb5] text-white' : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-lg">
                      {service.title}
                    </span>
                    <ChevronDown 
                      className={`flex-shrink-0 w-5 h-5 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-white' : 'text-gray-400'
                      }`}
                    />
                  </div>
                </button>
                
                {/* Accordion Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 pt-0 border-t border-gray-100">
                    <p className="text-base text-gray-600 leading-relaxed mb-5 pt-5">
                      {service.description}
                    </p>
                    
                    {service.details && service.details.length > 0 && (
                      <ul className="space-y-2">
                        {service.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-[#376eb5] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700 text-sm leading-relaxed">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Tabs Layout (≥ 1024px) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          
          {/* LEFT: Services Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {displayServices.map((service) => {
              const isActive = activeService.id === service.id;
              const isHovered = hoveredService === service.id;
              
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  onMouseEnter={() => setHoveredService(service.id)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={`w-full text-left p-6 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isActive 
                      ? 'bg-[#376eb5] text-white shadow-xl' 
                      : 'bg-white text-gray-900 hover:bg-gray-50 shadow-md hover:shadow-lg'
                  }`}
                >
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#376eb5]/0 via-[#376eb5]/5 to-[#376eb5]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  
                  <div className="relative flex items-center justify-between gap-4">
                    <span className="font-semibold text-lg lg:text-xl">
                      {service.title}
                    </span>
                    
                    <ArrowUpRight 
                      className={`flex-shrink-0 transition-all duration-300 ${
                        isActive 
                          ? 'w-7 h-7 text-white translate-x-0 translate-y-0' 
                          : isHovered
                            ? 'w-7 h-7 text-[#376eb5] translate-x-1 -translate-y-1'
                            : 'w-6 h-6 text-gray-400'
                      }`}
                      strokeWidth={2.5}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Active Service Details */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAFAF8] border-2 border-gray-200 rounded-2xl p-8 lg:p-10 h-full min-h-[500px] flex flex-col">
              
              {/* Service Title */}
              <h3 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                {activeService.title}
              </h3>

              {/* Description */}
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-8">
                {activeService.description}
              </p>

              {/* Details List */}
              {activeService.details && activeService.details.length > 0 && (
                <div className="space-y-4 flex-grow">
                  <ul className="space-y-3">
                    {activeService.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-[#376eb5] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-base lg:text-lg leading-relaxed">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}