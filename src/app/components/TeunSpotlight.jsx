'use client';

import Image from 'next/image';
import Link from 'next/link';

const tools = [
  {
    name: 'AI Visibility Scan',
    description: 'Scan je zichtbaarheid in ChatGPT en Perplexity',
    url: 'https://teun.ai/tools/ai-visibility',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#376eb5" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    name: 'AI Rank Tracker',
    description: 'Track je AI-posities over tijd',
    url: 'https://teun.ai/tools/ai-rank-tracker',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#376eb5" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    name: 'GEO Audit',
    description: 'Technische AI-check van je website',
    url: 'https://teun.ai/tools/geo-audit',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#376eb5" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    name: 'Prompt Explorer',
    description: '50+ AI-zoekprompts met volumes',
    url: 'https://teun.ai/tools/ai-prompt-explorer',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#376eb5" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    name: 'Brand Check',
    description: 'Hoe AI over jouw merk praat',
    url: 'https://teun.ai/tools/brand-check',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#376eb5" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    name: 'WordPress Plugin',
    description: 'Gratis GEO-analyse op WordPress.org',
    url: 'https://wordpress.org/plugins/teunai-geo/',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#376eb5" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

export default function TeunSpotlight() {
  return (
    <section style={{ backgroundColor: '#FAF9F6' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        
        {/* Header row met Teun */}
        <div className="grid lg:grid-cols-3 gap-8 items-start mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl font-bold" style={{ color: '#0f1a2e' }}>
                Teun<span style={{ color: '#0f7b64' }}>.ai</span>
              </span>
              <span 
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(55, 110, 181, 0.06)', color: '#376eb5' }}
              >
                ONS EIGEN PLATFORM
              </span>
            </div>

            <h2 className="font-serif font-bold text-gray-900 text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-6">
              Wij praten niet over AI.{' '}
              <span style={{ color: '#376eb5' }}>Wij bouwden de tools.</span>
            </h2>

            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                OnlineLabs is het enige online marketing bureau in Nederland met een eigen AI-visibility platform. 
                Teun.ai geeft ons (en jou) inzicht in hoe zichtbaar je bent in ChatGPT, Perplexity en Google AI. 
                Geen giswerk, maar data.
              </p>
              <p>
                Die inzichten gebruiken wij om jouw GEO-strategie te bepalen. En met 6 gratis tools, een WordPress 
                plugin en een Chrome extensie, kun je het ook zelf testen.
              </p>
            </div>
          </div>

          {/* Teun mascotte */}
          <div className="hidden lg:flex justify-center items-start">
            <Image
              src="/Teun-ai_welkom.png"
              alt="Teun, de AI-mascotte van Teun.ai"
              width={220}
              height={220}
              className="drop-shadow-xl object-contain"
              priority={false}
            />
          </div>
        </div>

        {/* Tools Grid - klikbaar */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ border: '1px solid #e8eef6' }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: 'rgba(55, 110, 181, 0.06)' }}
              >
                {tool.icon}
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-[#376eb5] transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Proof Points */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
          {['Gratis te gebruiken', 'Chrome Web Store', 'WordPress.org goedgekeurd'].map((point) => (
            <div key={point} className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                <path d="M9 12.75L11.25 15 15 9.75" stroke="#376eb5" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm text-gray-600 font-medium">{point}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-base font-semibold text-white transition-all duration-200 hover:brightness-110 hover:shadow-lg"
            style={{ backgroundColor: '#376eb5' }}
          >
            Plan een adviesgesprek
          </Link>
          <Link
            href="https://teun.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold transition-all duration-200 hover:bg-gray-50"
            style={{ color: '#376eb5', border: '2px solid #376eb5' }}
          >
            Probeer Teun.ai zelf
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>

        {/* Teun mascotte - mobiel */}
        <div className="lg:hidden flex justify-center mt-6 -mb-4">
          <Image
            src="/Teun-ai_welkom.png"
            alt="Teun, de AI-mascotte van Teun.ai"
            width={160}
            height={160}
            className="drop-shadow-xl object-contain"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
