'use client';

import { useState, useCallback, memo } from 'react';

// Memoized FAQ Item - voorkomt onnodige re-renders
const FAQItem = memo(function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <div 
      className={`border border-gray-200 rounded-xl overflow-hidden bg-white transition-colors ${
        isOpen ? 'border-[#376eb5]/30' : 'hover:border-[#376eb5]/30'
      }`}
    >
      <button
        onClick={() => onToggle(index)}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-900 text-lg">
          {faq.question}
        </span>
        <svg 
          className={`w-5 h-5 text-[#376eb5] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div 
          className="px-6 pb-5 text-gray-600 border-t border-gray-100"
          style={{ fontSize: '17px', lineHeight: '1.8' }}
          dangerouslySetInnerHTML={{ __html: faq.answer }}
        />
      )}
    </div>
  );
});

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = useCallback((index) => {
    setOpenIndex(prev => prev === index ? null : index);
  }, []);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-12 mb-12">
      {/* OnlineLabs style: Playfair, gray-900, NO gradient */}
      <h2 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
        Veelgestelde vragen
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            index={index}
            isOpen={openIndex === index}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}