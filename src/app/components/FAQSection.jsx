'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection({ 
  title = "Veelgestelde vragen", 
  subtitle = "FAQ",
  faqs = [],
  background = 'white'
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    beige: 'bg-[#FAFAF8]'
  };

  const bgClass = backgroundClasses[background] || backgroundClasses.white;

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className={`py-20 lg:py-24 ${bgClass}`}>
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          {subtitle && (
            <p className="text-sm font-semibold tracking-wider uppercase text-primary mb-4">
              {subtitle}
            </p>
          )}
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {title}
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors duration-300 hover:bg-gray-50"
                >
                  <span className="font-semibold text-lg text-gray-900 flex-1">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 text-primary transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {/* Answer */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div 
                    className="px-6 pb-5 prose prose-lg max-w-none text-gray-600
                      prose-p:mb-3 prose-p:leading-relaxed
                      prose-strong:text-gray-900 prose-strong:font-semibold
                      prose-ul:my-3 prose-li:my-1"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}