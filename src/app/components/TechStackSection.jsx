'use client';

import { useState } from 'react';
import { Zap, Shield, TrendingUp, Code2, Gauge, Bot } from 'lucide-react';

const defaultFeatures = [
  {
    icon: 'gauge',
    title: '100/100 PageSpeed',
    description: 'Razendsnelle laadtijden door statische generatie en edge caching.'
  },
  {
    icon: 'shield',
    title: 'Maximale veiligheid',
    description: 'Geen directe database-toegang, minimale aanvalsvectoren.'
  },
  {
    icon: 'trendingup',
    title: 'SEO & AI-ready',
    description: 'Perfect gestructureerde HTML die Google én AI-modellen begrijpen.'
  },
  {
    icon: 'bot',
    title: 'Vibe Coding ready',
    description: 'Moderne codebase die AI-assistenten kunnen lezen en uitbreiden.'
  }
];

const iconMap = {
  zap: Zap,
  shield: Shield,
  trendingup: TrendingUp,
  code2: Code2,
  gauge: Gauge,
  bot: Bot
};

export default function TechStackSection({
  badge = "Next.js + WordPress",
  title = "Headless websites: nu bereikbaar voor aantrekkelijke prijzen",
  description = "Dankzij 'vibe coding' – programmeren met AI-assistentie – bouwen we razendsnelle Next.js websites met WordPress als CMS in een fractie van de tijd. Wat voorheen alleen voor grote budgetten bereikbaar was, is nu toegankelijk voor ambitieuze ondernemers.",
  features = defaultFeatures,
  background = 'beige',
  ctaText = "Vraag een headless offerte aan",
  ctaUrl = "/contact"
}) {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    beige: 'bg-[#FAFAF8]',
    dark: 'bg-[#1a2b3c]'
  };

  const bgClass = backgroundClasses[background] || backgroundClasses.beige;
  const isDark = background === 'dark';

  // FIX: Ensure features is always an array, fallback to defaults if null/empty
  const displayFeatures = Array.isArray(features) && features.length > 0 
    ? features 
    : defaultFeatures;

  return (
    <section className={`py-16 lg:py-24 ${bgClass} overflow-hidden`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Content */}
          <div>
            {/* Badge */}
            {badge && (
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6 ${
                isDark 
                  ? 'bg-[#376eb5]/20 text-[#7eb3ff]' 
                  : 'bg-[#376eb5]/10 text-[#376eb5]'
              }`}>
                <Code2 className="w-4 h-4" />
                {badge}
              </div>
            )}

            {/* Title */}
            <h2 className={`font-serif text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {title}
            </h2>

            {/* Description */}
            <p className={`text-lg leading-relaxed mb-8 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {description}
            </p>

            {/* Additional paragraph */}
            <div className={`p-6 rounded-xl mb-8 ${
              isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100 shadow-sm'
            }`}>
              <p className={`text-base leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <strong className={isDark ? 'text-white' : 'text-gray-900'}>Wat is vibe coding?</strong>
                <br />
                Vibe coding is een nieuwe manier van ontwikkelen waarbij AI-tools zoals Claude en Cursor de code schrijven terwijl de developer de richting bepaalt. Het resultaat: hoogwaardige websites in minder tijd, tegen lagere kosten – zonder concessies aan kwaliteit.
              </p>
            </div>

            {/* CTA */}
            <a
              href={ctaUrl}
              className="inline-flex items-center justify-center px-8 py-4 text-lg text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 bg-[#376eb5] hover:bg-[#2d5a94]"
            >
              {ctaText}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right: Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {displayFeatures.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Zap;
              const isHovered = hoveredFeature === index;

              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-300 ${
                    isDark 
                      ? 'bg-white/5 hover:bg-white/10 border border-white/10' 
                      : 'bg-white hover:shadow-lg border border-gray-100'
                  } ${isHovered ? 'scale-[1.02]' : ''}`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                    isDark ? 'bg-[#376eb5]/30' : 'bg-[#376eb5]/10'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      isDark ? 'text-[#7eb3ff]' : 'text-[#376eb5]'
                    }`} />
                  </div>

                  {/* Title */}
                  <h3 className={`font-bold text-lg mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech Stack Logos */}
        <div className={`mt-16 pt-12 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <p className={`text-center text-sm font-medium tracking-wider uppercase mb-8 ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Onze moderne tech stack
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {/* Next.js */}
            <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <svg className="w-8 h-8" viewBox="0 0 180 180" fill="currentColor">
                <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                  <circle cx="90" cy="90" r="90" fill="currentColor"/>
                </mask>
                <g mask="url(#mask0)">
                  <circle cx="90" cy="90" r="90" fill="currentColor"/>
                  <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0)"/>
                  <rect x="115" y="54" width="12" height="72" fill="url(#paint1)"/>
                </g>
                <defs>
                  <linearGradient id="paint0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="paint1" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-semibold">Next.js</span>
            </div>

            {/* React */}
            <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9-.82-.08-1.63-.2-2.4-.36-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96.77-.16 1.58-.28 2.4-.36.48-.67.99-1.31 1.51-1.9z"/>
              </svg>
              <span className="font-semibold">React</span>
            </div>

            {/* WordPress */}
            <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.86 14.89L6.5 9.2c.47-.02.89-.07.89-.07.42-.05.37-.66-.05-.64 0 0-1.26.1-2.07.1-.15 0-.32 0-.5-.01C6.07 5.63 8.85 4 12 4c2.34 0 4.47.89 6.07 2.36-.04 0-.08-.01-.12-.01-.78 0-1.33.68-1.33 1.41 0 .66.38 1.21.78 1.87.3.53.65 1.21.65 2.19 0 .68-.26 1.47-.61 2.57l-.8 2.67-2.9-8.63c.48-.02.91-.08.91-.08.43-.05.38-.68-.04-.66 0 0-1.27.1-2.08.1-.08 0-.16 0-.24 0l3.87 11.52zM17.73 17.55l2.39-6.89c.44-1.11.59-2 .59-2.79 0-.29-.02-.55-.06-.8.87 1.58 1.35 3.4 1.35 5.33 0 3.04-1.65 5.7-4.1 7.14l-.17.01zm-6.13.49l2.05-5.97 2.1 5.76c.01.04.03.07.04.1-1.3.48-2.69.73-4.12.73-.37 0-.73-.02-1.09-.05l1.02-.57zM4 12c0-1.2.27-2.33.74-3.35l3.54 9.69C5.52 16.94 4 14.67 4 12z"/>
              </svg>
              <span className="font-semibold">WordPress</span>
            </div>

            {/* Tailwind */}
            <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
              </svg>
              <span className="font-semibold">Tailwind</span>
            </div>

            {/* Vercel */}
            <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 19.5h20L12 2z"/>
              </svg>
              <span className="font-semibold">Vercel</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}