'use client';

import Link from 'next/link';

const services = [
  {
    slug: 'geo-optimalisatie',
    badge: 'Onze specialiteit',
    title: 'GEO optimalisatie',
    subtitle: 'Zichtbaar in ChatGPT, Perplexity en Google AI',
    description: 'AI-zoekmachines zijn de nieuwe frontlijn. Wij zorgen dat jouw bedrijf wordt aanbevolen als iemand vraagt: "Wat is de beste [jouw dienst] in [jouw stad]?". Met ons eigen platform Teun.ai meten we precies waar je staat en bouwen we aan je AI-autoriteit.',
    featured: true,
    color: '#376eb5',
  },
  {
    slug: 'seo-specialist',
    badge: 'Het fundament',
    title: 'SEO & vindbaarheid',
    subtitle: 'Hogere rankings, meer organisch verkeer',
    description: 'SEO is geen trucje, het is vakmanschap. Wij bouwen aan duurzame posities met technische excellentie, sterke content en slimme linkbuilding. 17 jaar ervaring in de Nederlandse markt.',
    featured: false,
    color: '#376eb5',
  },
  {
    slug: 'online-adverteren',
    badge: 'Direct resultaat',
    title: 'Online adverteren',
    subtitle: 'Google Ads en social media die converteren',
    description: 'Geen budget verbranden aan clicks die niets opleveren. Wij sturen op conversies, niet op vertoningen. Google Partner, transparante rapportages en geen langlopende contracten.',
    featured: false,
    color: '#376eb5',
  },
  {
    slug: 'website-laten-maken',
    badge: 'Design & development',
    title: 'Webdesign & UX',
    subtitle: 'Snelle websites die scoren en converteren',
    description: 'Vakwerk met Next.js en WordPress. Geen templates, geen page builders. Elke website is gebouwd op snelheid, vindbaarheid en conversie. Van ontwerp tot livegang.',
    featured: false,
    color: '#376eb5',
  },
  {
    slug: 'website-snelheid-optimalisatie',
    badge: 'Performance',
    title: 'Website snelheid',
    subtitle: 'Core Web Vitals specialist',
    description: 'Een trage website kost je rankings én klanten. Wij optimaliseren eerst de bron, dan caching. Resultaatgarantie: groene Core Web Vitals scores of je geld terug.',
    featured: false,
    color: '#376eb5',
  },
  {
    slug: 'conversie-optimalisatie-specialist',
    badge: 'Meer omzet',
    title: 'Conversie optimalisatie',
    subtitle: 'Meer resultaat uit je bestaande verkeer',
    description: '97% van je bezoekers converteert niet. Met data-driven A/B testing, UX-analyse en slimme aanpassingen halen we meer omzet uit het verkeer dat je al hebt.',
    featured: false,
    color: '#376eb5',
  },
];

export default function ServicesSection() {
  return (
    <section style={{ backgroundColor: '#F3F4F6' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p 
            className="text-sm font-bold uppercase tracking-[0.15em] mb-4"
            style={{ color: '#376eb5' }}
          >
            Wat we doen
          </p>
          <h2 className="font-serif font-bold text-gray-900 text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-6">
            Alles voor jouw{' '}
            <span style={{ color: '#376eb5' }}>online groei</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Van technische SEO tot AI-zichtbaarheid, van webdesign tot conversie. 
            Wij combineren het allemaal, met 17 jaar ervaring als basis.
          </p>
        </div>

        {/* Services Grid - 3 kolommen */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/skills/${service.slug}`}
              className="group relative rounded-xl p-6 lg:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
              style={{
                backgroundColor: service.featured ? '#376eb5' : '#fff',
                border: service.featured ? 'none' : '1px solid #e8eef6',
              }}
            >
              {/* Badge */}
              <span 
                className="inline-block text-xs font-bold uppercase tracking-wider mb-3 px-3 py-1 rounded-full"
                style={{
                  backgroundColor: service.featured ? 'rgba(255,255,255,0.2)' : 'rgba(55, 110, 181, 0.06)',
                  color: service.featured ? 'rgba(255,255,255,0.9)' : '#376eb5',
                }}
              >
                {service.badge}
              </span>

              <div className="flex-1">
                <div>
                  <h3 
                    className="text-xl lg:text-2xl font-serif font-bold mb-2 transition-colors"
                    style={{ color: service.featured ? '#fff' : '#0f1a2e' }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    className="text-sm font-medium mb-3"
                    style={{ color: service.featured ? 'rgba(255,255,255,0.7)' : '#64748b' }}
                  >
                    {service.subtitle}
                  </p>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: service.featured ? 'rgba(255,255,255,0.85)' : '#4a5568' }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
              <span 
                className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all duration-300 mt-5"
                style={{ color: service.featured ? '#fff' : '#376eb5' }}
              >
                Bekijk skill
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
