'use client';
import Link from 'next/link';

export default function ServiceHero({ 
  title, 
  subtitle, 
  description, 
  ctaText, 
  ctaUrl, 
  secondaryCtaText,
  secondaryCtaUrl,
  serviceColor = 'green'
}) {
  const brandBlue = '#376eb5';
  const brandBlueHover = '#2d5a94';
  
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        
        {/* Badge - UPPERCASE + TRACKING */}
        {subtitle && (
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-primary font-semibold text-sm tracking-widest uppercase mb-8 lg:mb-6"
            style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            href={ctaUrl}
            className="inline-flex items-center justify-center px-8 py-4 text-lg text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            style={{ backgroundColor: brandBlue }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = brandBlueHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = brandBlue}
          >
            {ctaText}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          <Link 
            href={secondaryCtaUrl}
            className="inline-flex items-center justify-center px-8 py-4 text-lg bg-white font-semibold rounded-lg border-2 transition-all duration-300"
            style={{ borderColor: brandBlue, color: brandBlue }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = brandBlueHover;
              e.currentTarget.style.color = brandBlueHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = brandBlue;
              e.currentTarget.style.color = brandBlue;
            }}
          >
            {secondaryCtaText}
          </Link>
        </div>

        {/* Trust Indicators - WITH CLICKABLE GOOGLE REVIEWS */}
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