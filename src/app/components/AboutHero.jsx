'use client';

function AboutHero({ title, subtitle, description }) {
  const brandBlue = '#376eb5';
  
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        
        {/* Badge - UPPERCASE + TRACKING */}
        {subtitle && (
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-primary font-semibold text-sm tracking-widest uppercase mb-8 lg:mb-6"
            style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {subtitle}
          </div>
        )}
        
        {/* Title */}
        <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
          {title}
        </h1>
        
        {/* Description */}
        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-10 whitespace-pre-line">
          {description}
        </p>

        {/* Trust Indicators */}
        <div className="text-sm tracking-wider uppercase text-gray-600 mb-8">
          <span>Amsterdam • Sinds 2008 • Google Partner • </span>
          <a 
            href="https://www.google.com/maps/place/?q=place_id:ChIJEVS-szIKxkcRng6UB0W50u0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors underline decoration-1 underline-offset-2"
          >
            5★ Google Reviews
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;