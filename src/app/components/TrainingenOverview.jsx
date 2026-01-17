'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function TrainingenOverview() {
  
  // Hardcoded trainingen data
  const trainingen = [
    {
      slug: 'ai-visibility-website-optimalisatie',
      title: 'AI Visibility & Website Optimalisatie',
      subtitle: 'Leer AI-tools slim inzetten voor je online zichtbaarheid',
      description: 'Leer hoe je AI-tools écht inzet voor je online zichtbaarheid. Inclusief onze geheime prompts en custom skills die we dagelijks gebruiken.',
      trainer: {
        name: 'Imre Bernáth',
        role: 'Founder & GEO Specialist',
        image: 'https://gravatar.com/avatar/35c26275319f1c247e76cd36518ee34a?size=128'
      },
      price: 'Vanaf €399',
      duration: 'Halve of hele dag',
      tags: ['AI', 'GEO', 'ChatGPT', 'Perplexity']
    },
    {
      slug: 'wordpress-ai-training',
      title: 'WordPress & AI: Sneller en slimmer werken',
      subtitle: 'Leer je WordPress website beheren én AI slim inzetten',
      description: 'Leer je WordPress website beheren én ontdek hoe AI-tools als ChatGPT, Gemini en Claude je werk versnellen. Zonder afhankelijk te blijven van dure bureaus.',
      trainer: {
        name: 'Sanne Verschoor',
        role: 'WordPress Developer',
        image: 'https://cdn.onlinelabs.nl/wp-content/uploads/2025/11/Sanne-Verschoor-Webdesigner.webp'
      },
      price: 'Vanaf €299',
      duration: 'Halve of hele dag',
      tags: ['WordPress', 'AI', 'Content', 'Gutenberg']
    },
    {
      slug: 'online-ads-analytics',
      title: 'Online Ads & Analytics',
      subtitle: 'Van campagne setup tot live dashboard',
      description: 'Leer adverteren op Google, Meta en LinkedIn én je resultaten meten in GA4, Tag Manager en Looker Studio. Zodat elke euro aantoonbaar rendeert.',
      trainer: {
        name: 'Adrian Enders',
        role: 'Ads & Data Specialist',
        image: 'https://cdn.onlinelabs.nl/wp-content/uploads/2025/11/Adrian-Enders-Online-marketeer.webp'
      },
      price: 'Vanaf €349',
      duration: 'Halve of hele dag',
      tags: ['Google Ads', 'Meta Ads', 'GA4', 'Looker Studio']
    }
  ];

  return (
    <section className="py-20 lg:py-24" style={{ backgroundColor: '#FAFAF8' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN - TRAININGEN LIST */}
          <div className="lg:col-span-7">
            <div className="space-y-10">
              {trainingen.map((training) => (
                <Link
                  key={training.slug}
                  href={`/trainingen/${training.slug}`}
                  className="group block"
                >
                  <div className="relative">
                    {/* Accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-700 group-hover:bg-[#376eb5] rounded-full transition-all duration-300 group-hover:w-2" />
                    
                    <div className="pl-8">
                      {/* Title + Arrow */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="font-serif text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 group-hover:text-[#376eb5] transition-colors duration-300 leading-tight">
                          {training.title}
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

                      {/* Subtitle */}
                      <p className="text-sm font-medium text-gray-500 mb-3 tracking-wider uppercase">
                        {training.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-lg text-gray-600 leading-relaxed mb-4">
                        {training.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {training.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 text-xs font-medium text-[#376eb5] bg-[#376eb5]/10 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Trainer + Meta */}
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        {/* Trainer */}
                        <div className="flex items-center gap-3">
                          <Image
                            src={training.trainer.image}
                            alt={training.trainer.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{training.trainer.name}</p>
                            <p className="text-xs text-gray-500">{training.trainer.role}</p>
                          </div>
                        </div>
                        
                        {/* Price & Duration */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10"/>
                              <path d="M12 6v6l4 2"/>
                            </svg>
                            {training.duration}
                          </span>
                          <span className="font-semibold text-[#376eb5]">{training.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - STICKY SIDEBAR */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-6">
              
              {/* Main Info Card - Blue */}
              <div className="bg-[#376eb5] rounded-xl p-8 text-white shadow-lg">
                <h3 className="font-serif text-2xl font-bold mb-4 text-white">
                  Waarom een training bij OnlineLabs?
                </h3>
                <div className="space-y-3 text-base leading-relaxed">
                  <p>
                    Geen externe trainers, maar onze eigen specialisten die dagelijks met deze tools werken. Je leert direct van de mensen die het vak beheersen.
                  </p>
                  <p className="text-sm opacity-90 pt-3 border-t border-white/20">
                    Amsterdam of online • Max 6 deelnemers • Inclusief nazorg
                  </p>
                </div>
              </div>

              {/* USPs Card */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
                  Wat je krijgt
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-[#376eb5] flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-base text-gray-700">
                      <span className="font-semibold">Praktijkgericht</span> — werken op jouw eigen projecten
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-[#376eb5] flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-base text-gray-700">
                      <span className="font-semibold">Templates & tools</span> — direct toepasbare materialen
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-[#376eb5] flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-base text-gray-700">
                      <span className="font-semibold">Nazorg</span> — tot 60 dagen support na de training
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-[#376eb5] flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-base text-gray-700">
                      <span className="font-semibold">Klein groep</span> — max 6 deelnemers voor persoonlijke aandacht
                    </p>
                  </div>
                </div>
              </div>

              {/* Incompany Card */}
              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                  Incompany training?
                </h3>
                <p className="text-base text-gray-600 mb-4">
                  We komen ook naar jullie toe. Ideaal voor teams die samen willen leren. Vanaf 4 deelnemers.
                </p>
                <Link
                  href="/contact?onderwerp=incompany-training"
                  className="inline-flex items-center gap-2 text-[#376eb5] font-semibold hover:underline"
                >
                  Vraag een offerte aan
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}