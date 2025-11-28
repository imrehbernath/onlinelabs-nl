'use client';

import Link from 'next/link';

export default function SkillsHero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23376eb5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-[#376eb5] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Onze Skills</span>
          </nav>

          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#376eb5]" />
            <span className="text-sm font-semibold text-[#376eb5] tracking-wide">
              Full-service Online Marketing
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
            Onze skills
          </h1>

          {/* Description */}
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mb-8">
            Bij OnlineLabs zijn we jouw partner in online succes. Als full-service bureau met meer dan 25 jaar ervaring bieden we expertise in SEO, AI-zichtbaarheid, webdesign en conversie-optimalisatie. Ons team van specialisten zet strategische en datagedreven oplossingen in om jouw online zichtbaarheid te verbeteren en je bedrijf te laten groeien.
          </p>

          {/* Quick stats inline */}
          <div className="flex flex-wrap items-center gap-6 lg:gap-10 text-base">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#376eb5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">SEO & Google Rankings</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#376eb5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">AI & GEO-optimalisatie</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#376eb5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Webdesign & UX</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#376eb5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Conversie & Groei</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#376eb5]/20 to-transparent" />
    </section>
  );
}