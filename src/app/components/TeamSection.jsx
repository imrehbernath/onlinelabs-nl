'use client';

import Image from 'next/image';
import Link from 'next/link';

const team = [
  {
    name: 'Imre Bernáth',
    role: 'Founder & SEO/GEO specialist',
    description: 'SEO-expert sinds 2008 en creator van Teun.ai. Combineert 17 jaar zoekmachine-ervaring met AI-innovatie.',
    url: '/auteur/imre-bernath',
  },
  {
    name: 'Colin Dijkstra',
    role: 'SEO content specialist',
    description: 'Schrijft content die rankt in Google én geciteerd wordt door AI. Specialist in AI Overviews en lokale SEO.',
    url: '/auteur/colin-dijkstra',
  },
  {
    name: 'Sanne Verschoor',
    role: 'Webdesigner & developer',
    description: 'Bouwt snelle, toegankelijke websites in WordPress en zorgt voor pixel-perfect webdesign.',
    url: '/auteur/sanne-verschoor',
  },
  {
    name: 'Adrian Enders',
    role: 'Google Ads & data',
    description: 'Data-driven campagnes die converteren. Google Ads specialist met focus op ROI en transparante rapportages.',
    url: '/auteur/adrian-enders',
  },
];

export default function TeamSection() {
  return (
    <section style={{ backgroundColor: '#FAF9F6' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p 
            className="text-sm font-bold uppercase tracking-[0.15em] mb-4"
            style={{ color: '#376eb5' }}
          >
            Ons team
          </p>
          <h2 className="font-serif font-bold text-gray-900 text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-6">
            Klein team, <span style={{ color: '#376eb5' }}>groot resultaat</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Geen account managers, geen junior die je project doet. Bij OnlineLabs werk je direct met 
            de specialisten. Korte lijnen, snel schakelen en altijd iemand die weet waar het over gaat.
          </p>
        </div>

        {/* Team foto */}
        <div className="relative rounded-2xl overflow-hidden mb-12 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
          <Image
            src="https://cdn.onlinelabs.nl/wp-content/uploads/2025/11/OnlineLabs-team.webp"
            alt="Het team van OnlineLabs aan het werk in Amsterdam"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
            priority={false}
          />
          {/* Subtle shine overlay on hover */}
          <div 
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)'
            }}
          />
        </div>

        {/* Team members */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member) => (
            <Link
              key={member.name}
              href={member.url}
              className="group bg-white rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ border: '1px solid #e8eef6' }}
            >
              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#376eb5] transition-colors">
                {member.name}
              </h3>
              <p 
                className="text-xs font-semibold uppercase tracking-wider mt-1 mb-3"
                style={{ color: '#376eb5' }}
              >
                {member.role}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {member.description}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/over-ons"
            className="inline-flex items-center gap-2 text-base font-semibold transition-colors duration-200"
            style={{ color: '#376eb5' }}
          >
            Meer over ons team
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
