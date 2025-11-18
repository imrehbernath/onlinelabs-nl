'use client';

import { useState } from 'react';

export default function ProcessSection({ 
  title = "Onze aanpak in 3 stappen",
  subtitle = "Met een slimme strategie, technische optimalisatie en continue bijsturing zorgen we dat jouw website scoort in Google én zichtbaar is in AI-antwoorden.",
  steps = [],
  background = 'white'
}) {
  const [hoveredStep, setHoveredStep] = useState(null);

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    beige: 'bg-[#FAFAF8]'
  };

  const bgClass = backgroundClasses[background] || backgroundClasses.white;

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

  const displaySteps = steps.length > 0 ? steps : defaultSteps;

  return (
    <section className={`py-16 lg:py-24 ${bgClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {subtitle}
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