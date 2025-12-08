'use client';

import { useState } from 'react';

// Service-specific content configurations
const serviceContent = {
  // GEO Optimalisatie specific content
  'geo-optimalisatie': {
    title: "GEO optimalisatie in 3 stappen",
    subtitle: "Van onzichtbaar naar aanbevolen in ChatGPT, Gemini en Perplexity. Onze bewezen aanpak zorgt dat AI-zoekmachines jouw merk kennen én noemen.",
    steps: [
      {
        number: '01',
        title: 'AI-zichtbaarheidsanalyse',
        description: 'We analyseren hoe AI-platformen jouw merk en concurrenten noemen. Met onze GEO-tool meten we je huidige positie in ChatGPT, Gemini en Perplexity.'
      },
      {
        number: '02',
        title: 'Content & autoriteit',
        description: 'We optimaliseren je content voor AI-leesbaarheid: gestructureerde data, duidelijke expertise-signalen en citeerbare bronnen die AI\'s als betrouwbaar herkennen.'
      },
      {
        number: '03',
        title: 'Monitoring & groei',
        description: 'Via ons Teun.ai dashboard volg je realtime hoe vaak AI\'s jouw merk noemen. We sturen continu bij op basis van AI-gedragsveranderingen.'
      }
    ]
  },

  // SEO Specialist specific content  
  'seo-specialist': {
    title: "Onze SEO-aanpak in 3 stappen",
    subtitle: "Met een slimme strategie, technische optimalisatie en continue bijsturing zorgen we dat jouw website scoort in Google én zichtbaar is in AI-antwoorden.",
    steps: [
      {
        number: '01',
        title: 'Analyse & strategie',
        description: 'We brengen je SEO-status in kaart en ontwikkelen een plan op maat dat gericht is op groei.'
      },
      {
        number: '02',
        title: 'Optimalisatie & content',
        description: 'Techniek, structuur en content worden verbeterd voor Google én AI-platformen als ChatGPT.'
      },
      {
        number: '03',
        title: 'Inzicht & bijsturing',
        description: 'Je krijgt realtime SEO-data en maandelijkse updates. We sturen bij voor maximaal resultaat.'
      }
    ]
  },

  // Website laten maken specific content
  'website-laten-maken': {
    title: "Jouw website in 3 stappen",
    subtitle: "Van eerste gesprek tot livegang. We bouwen websites die niet alleen mooi zijn, maar ook scoren in Google en AI-zoekmachines.",
    steps: [
      {
        number: '01',
        title: 'Strategie & ontwerp',
        description: 'We bespreken je doelen en doelgroep. Op basis daarvan maken we een ontwerp dat converteert én vindbaar is.'
      },
      {
        number: '02',
        title: 'Ontwikkeling & SEO',
        description: 'We bouwen je site met Next.js voor optimale snelheid. SEO en AI-zichtbaarheid worden vanaf dag één meegenomen.'
      },
      {
        number: '03',
        title: 'Lancering & groei',
        description: 'Na een grondige test gaat je site live. We blijven optimaliseren voor blijvende resultaten in Google én AI.'
      }
    ]
  }
};

export default function ProcessSection({ 
  title,
  subtitle,
  steps = [],
  background = 'white',
  serviceSlug = null
}) {
  const [hoveredStep, setHoveredStep] = useState(null);

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    beige: 'bg-[#FAFAF8]'
  };

  const bgClass = backgroundClasses[background] || backgroundClasses.white;

  // Default steps (fallback)
  const defaultSteps = [
    {
      number: '01',
      title: 'Analyse & strategie',
      description: 'We brengen je SEO-status in kaart en ontwikkelen een plan op maat dat gericht is op groei.'
    },
    {
      number: '02',
      title: 'Optimalisatie & content',
      description: 'Techniek, structuur en content worden verbeterd voor Google én AI-platformen als ChatGPT.'
    },
    {
      number: '03',
      title: 'Inzicht & bijsturing',
      description: 'Je krijgt realtime SEO-data en maandelijkse updates. We sturen bij voor maximaal resultaat.'
    }
  ];

  // Determine content: props > service-specific > defaults
  let displayTitle = title;
  let displaySubtitle = subtitle;
  let displaySteps = steps.length > 0 ? steps : defaultSteps;

  // If no props provided but serviceSlug exists, use service-specific content
  if (!title && !subtitle && steps.length === 0 && serviceSlug && serviceContent[serviceSlug]) {
    const content = serviceContent[serviceSlug];
    displayTitle = content.title;
    displaySubtitle = content.subtitle;
    displaySteps = content.steps;
  }

  // Fallback title if still empty
  if (!displayTitle) {
    displayTitle = "Onze aanpak in 3 stappen";
  }
  if (!displaySubtitle) {
    displaySubtitle = "Met een slimme strategie, technische optimalisatie en continue bijsturing zorgen we dat jouw website scoort in Google én zichtbaar is in AI-antwoorden.";
  }

  return (
    <section className={`py-16 lg:py-24 ${bgClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {displayTitle}
          </h2>
          {displaySubtitle && (
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {displaySubtitle}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {displaySteps.map((step, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              className="relative group"
            >
              <div className="relative mb-6 inline-flex">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent transition-all duration-500 ${
                  hoveredStep === index ? 'scale-110 opacity-100' : 'scale-100 opacity-60'
                }`} />
                
                <div className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                  bgClass === 'bg-white' ? 'bg-white' : bgClass === 'bg-gray-50' ? 'bg-gray-50' : 'bg-[#FAFAF8]'
                } m-1`}>
                  <span className="font-serif text-3xl font-bold text-primary">
                    {step.number}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 font-serif">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < displaySteps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent -z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}