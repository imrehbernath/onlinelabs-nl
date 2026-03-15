'use client';

import Link from 'next/link';

const pillars = [
  {
    title: 'Technische SEO',
    description: 'Core Web Vitals, site-architectuur, structured data en indexering. Het fundament waar alles op staat.',
    color: '#376eb5',
  },
  {
    title: 'Content & autoriteit',
    description: 'E-E-A-T, thought leadership content en topical authority. Google én AI belonen expertise.',
    color: '#376eb5',
  },
  {
    title: 'GEO optimalisatie',
    description: 'AI-zichtbaarheid in ChatGPT, Perplexity en Google AI. Bouwt voort op je SEO-fundament.',
    color: '#1abc9c',
  },
];

export default function SEOBasisSection() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Content */}
          <div className="max-w-xl lg:sticky lg:top-24">
            <p 
              className="text-sm font-bold uppercase tracking-[0.15em] mb-4"
              style={{ color: '#376eb5' }}
            >
              Onze aanpak
            </p>
            
            <h2 className="font-serif font-bold text-gray-900 text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-6">
              AI-zichtbaarheid begint bij{' '}
              <span style={{ color: '#376eb5' }}>sterke SEO</span>
            </h2>

            <div className="space-y-4 text-lg text-gray-700 leading-relaxed mb-8">
              <p>
                Veel bureaus springen op de AI-hype zonder het fundament te begrijpen. 
                De waarheid is simpel: AI-zoekmachines vertrouwen dezelfde signalen als Google. 
                Technische kwaliteit, expertise en autoriteit.
              </p>
              <p>
                Met 17 jaar SEO-ervaring leggen wij eerst het fundament. Daarna bouwen we daar 
                GEO-optimalisatie op. Dat is waarom onze klanten zichtbaar zijn in Google én in AI.
              </p>
            </div>

            <Link
              href="/skills/seo-specialist"
              className="inline-flex items-center gap-2 text-base font-semibold transition-colors duration-200"
              style={{ color: '#376eb5' }}
            >
              Meer over onze SEO-aanpak
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Right Column - Pillar cards stacked */}
          <div className="space-y-4">
            {pillars.map((pillar, i) => (
              <div 
                key={pillar.title}
                className="rounded-xl p-6 lg:p-8"
                style={{ 
                  backgroundColor: i === 2 ? 'rgba(26, 188, 156, 0.06)' : '#f8fafd',
                  border: `1px solid ${i === 2 ? 'rgba(26, 188, 156, 0.15)' : '#e8eef6'}`
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: i === 2 ? '#148f77' : pillar.color }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {pillar.title}
                      {i === 2 && (
                        <span 
                          className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: 'rgba(26, 188, 156, 0.1)', color: '#0f7b64' }}
                        >
                          POWERED BY TEUN.AI
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Visual connector - arrow between SEO en GEO */}
            <div className="flex items-center justify-center py-2">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="h-px w-12 bg-gray-200" />
                <span className="italic">SEO + GEO = maximale zichtbaarheid</span>
                <div className="h-px w-12 bg-gray-200" />
              </div>
            </div>

            {/* Result card */}
            <div 
              className="rounded-xl p-6 lg:p-8 text-center"
              style={{ 
                background: 'linear-gradient(135deg, #376eb5 0%, #2a5a9a 100%)',
              }}
            >
              <p className="text-white text-lg font-semibold mb-1">
                Het resultaat?
              </p>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-white">
                Zichtbaar in Google<br className="sm:hidden" /> én in AI
              </p>
              <p className="text-white/70 text-sm mt-2">
                Waar je concurrent kiest tussen SEO of AI, combineer jij beide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
