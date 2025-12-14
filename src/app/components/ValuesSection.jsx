'use client';

import { useEffect, useRef, useState } from 'react';

function ValuesSection({ title, subtitle, values }) {
  const brandBlue = '#376eb5';
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Intersection Observer - alleen animeren als in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after first trigger
        }
      },
      { threshold: 0.2 } // Trigger als 20% zichtbaar
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  // Icon mapping
  const getIcon = (iconName) => {
    const icons = {
      innovation: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
        </svg>
      ),
      trust: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      heart: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      ),
      rocket: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
        </svg>
      ),
    };
    
    return icons[iconName] || icons.innovation;
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          {subtitle && (
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm tracking-widest uppercase mb-6"
              style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)', color: brandBlue }}
            >
              {subtitle}
            </div>
          )}
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            {title}
          </h2>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div 
              key={index}
              className="group bg-white p-8 lg:p-10 rounded-2xl border border-gray-100 shadow-sm transition-all duration-500 ease-out hover:shadow-xl hover:border-gray-200"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Icon with blue background */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: brandBlue }}
              >
                {getIcon(value.icon)}
              </div>
              
              {/* Title */}
              <h3 
                className="text-xl lg:text-2xl font-bold mb-3"
                style={{ color: brandBlue }}
              >
                {value.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValuesSection;