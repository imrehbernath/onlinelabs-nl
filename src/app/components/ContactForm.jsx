'use client';

import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    message: '',
    interests: []
  });

  const [focusedField, setFocusedField] = useState(null);

  const interests = [
    { id: 'seo', label: 'SEO & vindbaarheid in Google' },
    { id: 'geo', label: 'Zichtbaarheid in ChatGPT & Perplexity' },
    { id: 'aeo', label: 'AI SEO / Answer Engine Optimization (AEO)' },
    { id: 'webdesign', label: 'Webdesign & gebruikerservaring (UX)' },
    { id: 'ai-content', label: 'AI content repair & optimalisatie' },
    { id: 'ai-design', label: 'AI-gegenereerde designs & visuals' },
    { id: 'website-migration', label: 'Website migratie (WordPress, Shopify, etc.)' },
    { id: 'cwv', label: 'Website snelheid & Core Web Vitals' },
    { id: 'wordpress', label: 'Website onderhoud & technische aanpassingen' },
    { id: 'google-ads', label: 'Google Ads & online adverteren' },
    { id: 'content', label: 'Contentstrategie & copywriting' },
    { id: 'cro', label: 'Conversie-optimalisatie (CRO)' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Form Column */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Interests Section */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Interesse in
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {interests.map((interest) => (
                    <label
                      key={interest.id}
                      className={`
                        relative flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${formData.interests.includes(interest.id)
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest.id)}
                        onChange={() => handleInterestToggle(interest.id)}
                        className="sr-only"
                      />
                      <div className="flex items-start gap-3 w-full">
                        <div 
                          className={`
                            flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all duration-200
                            ${formData.interests.includes(interest.id)
                              ? 'bg-primary border-primary'
                              : 'bg-white border-gray-300'
                            }
                          `}
                        >
                          {formData.interests.includes(interest.id) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                            </svg>
                          )}
                        </div>
                        <span className="text-base text-gray-700 leading-tight flex-1">
                          {interest.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-gray-900 mb-2">
                  Vertel ons meer over je project
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Beschrijf je doelen, uitdagingen en wat je wilt bereiken..."
                    className={`
                      w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
                      text-base text-gray-900 placeholder-gray-400
                      focus:outline-none resize-none
                      ${focusedField === 'message'
                        ? 'border-primary ring-4 ring-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  />
                </div>
              </div>

              {/* Contact Details Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-gray-900 mb-2">
                    Naam <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Jouw naam"
                    className={`
                      w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
                      text-base text-gray-900 placeholder-gray-400
                      focus:outline-none
                      ${focusedField === 'name'
                        ? 'border-primary ring-4 ring-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-base font-medium text-gray-900 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="jouw@email.nl"
                    className={`
                      w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
                      text-base text-gray-900 placeholder-gray-400
                      focus:outline-none
                      ${focusedField === 'email'
                        ? 'border-primary ring-4 ring-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  />
                </div>
              </div>

              {/* Optional Fields Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-base font-medium text-gray-900 mb-2">
                    Telefoonnummer
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="06 - 12 34 56 78"
                    className={`
                      w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
                      text-base text-gray-900 placeholder-gray-400
                      focus:outline-none
                      ${focusedField === 'phone'
                        ? 'border-primary ring-4 ring-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-base font-medium text-gray-900 mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('website')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="https://jouwwebsite.nl"
                    className={`
                      w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
                      text-base text-gray-900 placeholder-gray-400
                      focus:outline-none
                      ${focusedField === 'website'
                        ? 'border-primary ring-4 ring-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold text-lg rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Deel je idee met ons
                </button>
                <p className="mt-4 text-sm text-gray-500">
                  We nemen meestal binnen 24 uur contact met je op
                </p>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-6">
              
              {/* Info Card */}
              <div className="bg-primary rounded-xl p-8 text-white shadow-lg">
                <h3 className="font-serif text-2xl font-bold mb-4">
                  Direct persoonlijk contact
                </h3>
                <div className="space-y-3 text-base leading-relaxed">
                  <p>
                    We nemen meestal binnen 24 uur contact met je op voor een persoonlijk gesprek. Geen verkooppraatjes, maar strategisch advies op maat.
                  </p>
                  <p className="text-sm opacity-90 pt-3 border-t border-white/20">
                    Al ruim 25 jaar online marketing expertise vanuit Amsterdam
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="font-serif text-4xl font-bold text-primary mb-2">25</div>
                    <div className="text-sm text-gray-600 leading-tight">Jaar online ervaring</div>
                  </div>
                  <div>
                    <div className="font-serif text-4xl font-bold text-primary mb-2">750+</div>
                    <div className="text-sm text-gray-600 leading-tight">Succesvolle projecten</div>
                  </div>
                  <div>
                    <div className="font-serif text-4xl font-bold text-primary mb-2">150+</div>
                    <div className="text-sm text-gray-600 leading-tight">Tevreden klanten</div>
                  </div>
                </div>
              </div>

              {/* Process */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">
                  Hoe gaat het verder?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center text-sm font-bold mt-0.5">
                      1
                    </div>
                    <p className="text-base text-gray-700">
                      Persoonlijk kennismakingsgesprek
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center text-sm font-bold mt-0.5">
                      2
                    </div>
                    <p className="text-base text-gray-700">
                      Analyse van je huidige situatie
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center text-sm font-bold mt-0.5">
                      3
                    </div>
                    <p className="text-base text-gray-700">
                      Concrete aanbevelingen en offerte
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ContactForm;