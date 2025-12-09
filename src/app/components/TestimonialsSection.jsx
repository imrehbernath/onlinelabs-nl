'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * TestimonialsSection Component
 * 
 * Modern testimonials slider with auto-play, manual navigation, and modal view
 * 
 * Props:
 * - testimonials: Array of testimonial objects
 * - title: Section title (default: "Wat zeggen klanten over OnlineLabs")
 * - subtitle: Section subtitle (default: "Onze klanten waarderen onze expertise en toewijding")
 * - background: 'white' | 'gray' | 'beige' (section background)
 * 
 * Expected testimonial structure:
 * testimonials = [{
 *   id: string,
 *   testimonialDetails: {
 *     rating: number (1-5),
 *     shortQuote: string,
 *     fullReview: string (optional - if exists, shows "Lees meer"),
 *     reviewerName: string,
 *     reviewerRole: string,
 *     reviewerCompany: string (optional),
 *     reviewerPhoto: { node: { sourceUrl: string } } (optional),
 *     verified: boolean (shows blue checkmark),
 *     googleReviewUrl: string (optional)
 *   }
 * }]
 */
export default function TestimonialsSection({ 
  testimonials = [],
  title = "Wat zeggen klanten over OnlineLabs",
  subtitle = "Onze klanten waarderen onze expertise en toewijding",
  background = 'gray'
}) {
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleSlides, setVisibleSlides] = useState(1); // Start with 1 to match server
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Background color mapping
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-[#F3F4F6]',
    beige: 'bg-[#FAF9F6]',
  };

  // Filter out testimonials without required fields
  const validTestimonials = testimonials?.filter(t => 
    t?.testimonialDetails?.reviewerName && 
    t?.testimonialDetails?.shortQuote
  ) || [];

  // Reverse testimonials array - nieuwste eerst
  const reversedTestimonials = [...validTestimonials].reverse();

  // Set visible slides after mount (client-only)
  useEffect(() => {
    const updateVisibleSlides = () => {
      if (window.innerWidth >= 1024) {
        setVisibleSlides(3); // Desktop: 3 kolommen (optimal voor testimonials)
      } else if (window.innerWidth >= 768) {
        setVisibleSlides(2); // Tablet: 2 kolommen
      } else {
        setVisibleSlides(1); // Mobile: 1 kolom
      }
    };

    // Set initial value
    updateVisibleSlides();

    // Update on resize
    window.addEventListener('resize', updateVisibleSlides);
    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, []);

  // Stop auto-play on user interaction
  const stopAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  }, []);

  // Handle next slide - spring per scherm (visibleSlides)
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + visibleSlides;
      // Als we voorbij het einde gaan, wrap naar 0
      if (nextIndex >= reversedTestimonials.length) {
        return 0;
      }
      return nextIndex;
    });
  }, [reversedTestimonials.length, visibleSlides]);

  // Handle previous slide - spring per scherm (visibleSlides)
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - visibleSlides;
      // Als we onder 0 gaan, ga naar laatste volledige scherm
      if (prevIndex < 0) {
        // Bereken laatste scherm start index
        const totalScreens = Math.ceil(reversedTestimonials.length / visibleSlides);
        const lastScreenIndex = (totalScreens - 1) * visibleSlides;
        return lastScreenIndex;
      }
      return prevIndex;
    });
  }, [reversedTestimonials.length, visibleSlides]);

  // Go to specific slide
  const goToSlide = useCallback((index) => {
    stopAutoPlay();
    setCurrentIndex(index);
  }, [stopAutoPlay]);

  // Auto-play functionality
  useEffect(() => {
    // Auto-play als meer dan 1 testimonial (ook als 4 testimonials en 4 kolommen)
    if (!isAutoPlaying || reversedTestimonials.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 5000); // 5 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, isAutoPlaying, reversedTestimonials.length, visibleSlides, handleNext]);

  // Early returns AFTER all hooks
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  if (validTestimonials.length === 0) {
    return null;
  }

  // Helper: Render stars
  const renderStars = (rating) => {
    const validRating = rating || 5;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-orange-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        <span className="ml-2 text-base font-semibold text-orange-400">
          {validRating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Get slides to display - wrap around if not enough items
  const getDisplayedTestimonials = () => {
    const displayed = [];
    
    for (let i = 0; i < visibleSlides; i++) {
      const index = (currentIndex + i) % reversedTestimonials.length;
      displayed.push(reversedTestimonials[index]);
    }
    
    return displayed;
  };

  const displayedTestimonials = getDisplayedTestimonials();

  return (
    <>
      <section className={`py-20 lg:py-24 ${bgClasses[background] || bgClasses.gray}`}>
        <div className="container mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          {/* Slider Container */}
          <div 
            className="relative"
            onMouseEnter={stopAutoPlay}
          >
            {/* Testimonials Grid/Slider */}
            <div 
              ref={sliderRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {displayedTestimonials.map((testimonial, idx) => {
                const details = testimonial?.testimonialDetails || {};
                const rating = details?.rating || 5;
                const shortQuote = details?.shortQuote || '';
                const fullReview = details?.fullReview || '';
                const reviewerName = details?.reviewerName || 'Anonymous';
                const reviewerRole = details?.reviewerRole || '';
                const reviewerCompany = details?.reviewerCompany || '';
                const reviewerPhoto = details?.reviewerPhoto?.node?.sourceUrl || details?.reviewerPhoto || '';
                const verified = details?.verified || false;
                
                return (
                  <div
                    key={`${testimonial.id}-${idx}`}
                    onClick={() => {
                      if (fullReview && fullReview !== shortQuote) {
                        stopAutoPlay();
                        setSelectedReview({
                          ...details,
                          rating,
                          reviewerName,
                          reviewerPhoto
                        });
                      }
                    }}
                    className={`bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full ${
                      fullReview && fullReview !== shortQuote 
                        ? 'cursor-pointer' 
                        : ''
                    }`}
                  >
                    {/* Stars */}
                    <div className="mb-3">
                      {renderStars(rating)}
                    </div>

                    {/* Short Quote - Flexible height */}
                    <p className="text-base text-gray-700 leading-relaxed mb-2 flex-grow">
                      &ldquo;{shortQuote}&rdquo;
                    </p>

                    {/* Subtle "read more" indicator - altijd dezelfde hoogte reserveren */}
                    <div className="h-6 mb-2">
                      {fullReview && fullReview !== shortQuote && (
                        <div className="text-xs text-primary font-medium flex items-center gap-1">
                          <span>Klik voor volledige review</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    {/* Reviewer Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200 mt-auto">
                      {/* Photo or Initial Avatar */}
                      <div className="relative flex-shrink-0">
                        {reviewerPhoto ? (
                          <img
                            src={reviewerPhoto}
                            alt={reviewerName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                            <span className="text-lg font-semibold text-white">
                              {reviewerName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        
                        {/* Google Badge */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        </div>
                      </div>

                      {/* Name & Company */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {reviewerName}
                          </p>
                          {verified && (
                            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        {reviewerRole && (
                          <p className="text-xs text-gray-500 truncate">
                            {reviewerRole}
                          </p>
                        )}
                        {reviewerCompany && (
                          <p className="text-xs text-gray-500 truncate">
                            {reviewerCompany}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows - Only show if more testimonials than visible - Hidden on mobile */}
            {reversedTestimonials.length > visibleSlides && (
              <>
                <button
                  onClick={() => {
                    stopAutoPlay();
                    handlePrev();
                  }}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl items-center justify-center text-gray-700 hover:text-primary transition-all duration-300 hover:scale-110"
                  aria-label="Vorige review"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => {
                    stopAutoPlay();
                    handleNext();
                  }}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl items-center justify-center text-gray-700 hover:text-primary transition-all duration-300 hover:scale-110"
                  aria-label="Volgende review"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Dots Navigation - One dot per screen */}
          {reversedTestimonials.length > visibleSlides && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(reversedTestimonials.length / visibleSlides) }).map((_, screenIndex) => {
                const screenStartIndex = screenIndex * visibleSlides;
                const screenEndIndex = Math.min(screenStartIndex + visibleSlides - 1, reversedTestimonials.length - 1);
                // Dot is active als currentIndex binnen dit scherm valt
                const isActive = currentIndex >= screenStartIndex && currentIndex <= screenEndIndex;
                
                return (
                  <button
                    key={screenIndex}
                    onClick={() => {
                      stopAutoPlay();
                      setCurrentIndex(screenStartIndex);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      isActive
                        ? 'w-8 h-2 bg-primary'
                        : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Ga naar scherm ${screenIndex + 1}`}
                  />
                );
              })}
            </div>
          )}

          {/* All Reviews Link */}
          <div className="text-center mt-12">
            <a
              href="https://www.google.com/maps/place/OnlineLabs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors duration-200"
            >
              Alle reviews bekijken op Google
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Modal - Only render if review is selected */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <h3 className="font-serif text-2xl font-bold text-gray-900">
                Review
              </h3>
              <button
                onClick={() => setSelectedReview(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
                aria-label="Sluit modal"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {/* Stars */}
              <div className="mb-6">
                {renderStars(selectedReview.rating)}
              </div>

              {/* Full Review */}
              <p className="text-lg text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
                {selectedReview.fullReview}
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200 mb-6">
                {/* Photo or Initial Avatar */}
                {selectedReview.reviewerPhoto ? (
                  <img
                    src={selectedReview.reviewerPhoto}
                    alt={selectedReview.reviewerName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                    <span className="text-2xl font-semibold text-white">
                      {selectedReview.reviewerName ? selectedReview.reviewerName.charAt(0).toUpperCase() : '?'}
                    </span>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">
                      {selectedReview.reviewerName || 'Anonymous'}
                    </p>
                    {selectedReview.verified && (
                      <svg className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  {selectedReview.reviewerRole && (
                    <p className="text-sm text-gray-500">
                      {selectedReview.reviewerRole}
                      {selectedReview.reviewerCompany && ` bij ${selectedReview.reviewerCompany}`}
                    </p>
                  )}
                </div>
              </div>

              {/* Google Review Link */}
              {selectedReview.googleReviewUrl && (
                <a
                  href={selectedReview.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors duration-200"
                >
                  Bekijk deze review op Google
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 200ms ease-out;
        }
        .animate-slideUp {
          animation: slideUp 300ms ease-out;
        }
      `}</style>
    </>
  );
}