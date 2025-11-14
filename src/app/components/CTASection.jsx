'use client';

import Link from 'next/link';

/**
 * CTASection Component
 * 
 * Call-to-action banner with gradient background
 * Perfect for placement between homepage sections
 * 
 * Props:
 * - title: Main heading
 * - description: Supporting text
 * - primaryButton: { text, url }
 * - secondaryButton: { text, url } (optional)
 * - variant: 'primary' | 'secondary' | 'light' (gradient style)
 */
export default function CTASection({ 
  title = "Klaar om jouw online zichtbaarheid te verbeteren?",
  description = "Ontdek hoe OnlineLabs jouw bedrijf helpt groeien met strategische SEO, GEO en webdesign.",
  primaryButton = { text: "Neem contact op", url: "/contact" },
  secondaryButton = null,
  variant = 'primary'
}) {
  
  const gradients = {
    primary: 'bg-gradient-to-r from-primary via-primary-dark to-indigo-700',
    secondary: 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900',
    light: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
  };

  // Text colors per variant
  const textColors = {
    primary: 'text-white',
    secondary: 'text-white',
    light: 'text-gray-900'
  };

  const descriptionColors = {
    primary: 'text-white/90',
    secondary: 'text-white/90',
    light: 'text-gray-700'
  };

  const buttonStyles = {
    primary: {
      main: 'bg-white text-primary hover:bg-gray-100',
      secondary: 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50'
    },
    secondary: {
      main: 'bg-white text-primary hover:bg-gray-100',
      secondary: 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50'
    },
    light: {
      main: 'bg-primary text-white hover:bg-primary-dark',
      secondary: 'bg-white text-primary border-primary/30 hover:bg-gray-50 hover:border-primary/50'
    }
  };

  const trustIndicatorColors = {
    primary: 'text-white/80',
    secondary: 'text-white/80',
    light: 'text-gray-600'
  };

  const trustIconColors = {
    primary: 'text-white',
    secondary: 'text-white',
    light: 'text-primary'
  };

  return (
    <section className={`${gradients[variant]} py-16 lg:py-20 relative overflow-hidden`}>
      {/* Subtle pattern overlay - only for dark variants */}
      {variant !== 'light' && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      )}

      {/* Light variant decorative elements */}
      {variant === 'light' && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        </div>
      )}

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Title - GROTER voor Metropolis */}
          <h2 className={`font-serif text-4xl lg:text-5xl xl:text-6xl font-bold ${textColors[variant]} mb-6 leading-tight tracking-tight`}>
            {title}
          </h2>

          {/* Description - GROTER */}
          {description && (
            <p className={`text-xl lg:text-2xl ${descriptionColors[variant]} mb-10 max-w-2xl mx-auto leading-relaxed`}>
              {description}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary Button */}
            <Link
              href={primaryButton.url}
              className={`inline-flex items-center justify-center px-8 py-4 ${buttonStyles[variant].main} font-semibold text-lg rounded-xl hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl min-w-[200px]`}
            >
              {primaryButton.text}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Secondary Button (optional) */}
            {secondaryButton && (
              <Link
                href={secondaryButton.url}
                className={`inline-flex items-center justify-center px-8 py-4 ${buttonStyles[variant].secondary} font-semibold text-lg rounded-xl backdrop-blur-sm transition-all duration-200 border-2 min-w-[200px]`}
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>

          {/* Trust indicators - iets groter */}
          <div className="mt-8 lg:mt-10 flex justify-center">
            <div className={`inline-flex flex-col lg:flex-row lg:flex-wrap lg:justify-center items-start lg:items-center gap-3 lg:gap-8 text-base ${trustIndicatorColors[variant]}`}>
              <div className="flex items-center gap-2">
                <svg className={`w-5 h-5 ${trustIconColors[variant]} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">15+ jaar ervaring</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className={`w-5 h-5 ${trustIconColors[variant]} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">100+ tevreden klanten</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className={`w-5 h-5 ${trustIconColors[variant]} flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="whitespace-nowrap">Google Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}