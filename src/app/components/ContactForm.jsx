'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// Mapping van URL parameter naar interest ID
const skillMapping = {
  'seo': 'seo',
  'seo-specialist': 'seo',
  'geo': 'geo',
  'geo-optimalisatie': 'geo',
  'cro': 'cro',
  'conversie-optimalisatie': 'cro',
  'conversie-optimalisatie-specialist': 'cro',
  'website': 'webdesign',
  'website-laten-maken': 'webdesign',
  'webdesign': 'webdesign',
  'ads': 'google-ads',
  'adverteren': 'google-ads',
  'online-adverteren': 'google-ads',
  'snelheid': 'cwv',
  'speed': 'cwv',
  'website-snelheid': 'cwv',
  'website-snelheid-optimalisatie': 'cwv',
  'ai': 'aeo',
  'aeo': 'aeo'
};

// Mapping van training URL parameter naar training info
const trainingMapping = {
  // AI Visibility trainingen
  'ai-visibility-online': { id: 'training-ai-online', label: 'Training AI Visibility — Online (€399)', shortLabel: 'AI Visibility & Website Optimalisatie — Online', price: '€399' },
  'ai-visibility-dag': { id: 'training-ai-dag', label: 'Training AI Visibility — Dagtraining (€749)', shortLabel: 'AI Visibility & Website Optimalisatie — Dagtraining', price: '€749' },
  'ai-visibility-1op1': { id: 'training-ai-1op1', label: 'Training AI Visibility — 1-op-1 Intensief (€1.499)', shortLabel: 'AI Visibility & Website Optimalisatie — 1-op-1', price: '€1.499' },
  // WordPress trainingen
  'wordpress-online': { id: 'training-wordpress-online', label: 'Training WordPress & AI — Online (€299)', shortLabel: 'WordPress & AI — Online', price: '€299' },
  'wordpress-dag': { id: 'training-wordpress-dag', label: 'Training WordPress & AI — Dagtraining (€599)', shortLabel: 'WordPress & AI — Dagtraining', price: '€599' },
  'wordpress-1op1': { id: 'training-wordpress-1op1', label: 'Training WordPress & AI — 1-op-1 Intensief (€1.199)', shortLabel: 'WordPress & AI — 1-op-1', price: '€1.199' },
  // Ads & Analytics trainingen
  'ads-analytics-online': { id: 'training-ads-online', label: 'Training Ads & Analytics — Online (€349)', shortLabel: 'Online Ads & Analytics — Online', price: '€349' },
  'ads-analytics-dag': { id: 'training-ads-dag', label: 'Training Ads & Analytics — Dagtraining (€699)', shortLabel: 'Online Ads & Analytics — Dagtraining', price: '€699' },
  'ads-analytics-1op1': { id: 'training-ads-1op1', label: 'Training Ads & Analytics — 1-op-1 Intensief (€1.399)', shortLabel: 'Online Ads & Analytics — 1-op-1', price: '€1.399' },
};

function ContactForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Standaard form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    message: '',
    interests: []
  });

  // Extra training form data
  const [trainingFormData, setTrainingFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    participants: '1',
    preferredDate: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Diensten interests
  const serviceInterests = [
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

  // Algemene training opties zonder prijs (voor normale contact pagina)
  const generalTrainingInterests = [
    { id: 'training-ai', label: 'Training AI Visibility & Website Optimalisatie' },
    { id: 'training-wordpress', label: 'Training WordPress & AI' },
    { id: 'training-ads', label: 'Training Online Ads & Analytics' },
  ];

  // Get selected training from URL param
  const trainingParam = searchParams.get('training');
  const selectedTraining = trainingParam ? trainingMapping[trainingParam.toLowerCase()] : null;

  // Alle interests voor form submission (label lookup)
  const allInterests = [
    ...serviceInterests, 
    ...generalTrainingInterests,
    ...Object.values(trainingMapping)
  ];

  // Pre-select interest based on URL parameters (alleen voor standaard formulier)
  useEffect(() => {
    const skill = searchParams.get('skill') || searchParams.get('dienst');
    if (skill) {
      const mappedInterest = skillMapping[skill.toLowerCase()];
      if (mappedInterest && !formData.interests.includes(mappedInterest)) {
        setFormData(prev => ({
          ...prev,
          interests: [mappedInterest]
        }));
      }
    }

    if (selectedTraining && !formData.interests.includes(selectedTraining.id)) {
      setFormData(prev => ({
        ...prev,
        interests: [selectedTraining.id]
      }));
    }
  }, [searchParams, selectedTraining]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTrainingChange = (e) => {
    const { name, value } = e.target;
    setTrainingFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  // Training form submit
  const handleTrainingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const fullMessage = [
        trainingFormData.message || 'Geen opmerkingen',
        '',
        '--- Training Aanvraag Details ---',
        `Training: ${selectedTraining.label}`,
        `Bedrijfsnaam: ${trainingFormData.company || 'Niet opgegeven'}`,
        `Aantal deelnemers: ${trainingFormData.participants}`,
        `Voorkeursdatum: ${trainingFormData.preferredDate || 'Geen voorkeur opgegeven'}`,
      ].join('\n');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trainingFormData.name,
          email: trainingFormData.email,
          phone: trainingFormData.phone,
          website: '',
          message: fullMessage,
          interests: [selectedTraining.label]
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/bedankt');
      } else {
        setSubmitError(true);
        console.error('Form submission error:', data.error);
      }
    } catch (error) {
      setSubmitError(true);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Standaard form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const selectedInterests = formData.interests.map(id => {
        const interest = allInterests.find(i => i.id === id);
        return interest ? interest.label : id;
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          interests: selectedInterests
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/bedankt');
      } else {
        setSubmitError(true);
        console.error('Form submission error:', data.error);
      }
    } catch (error) {
      setSubmitError(true);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // TRAINING FORMULIER (als ?training= aanwezig)
  // ============================================
  if (selectedTraining) {
    return (
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <form onSubmit={handleTrainingSubmit} className="space-y-6">
                
                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">
                      Er is iets misgegaan bij het versturen. Probeer het opnieuw of mail ons direct op{' '}
                      <a href="mailto:hallo@onlinelabs.nl" className="underline font-medium">
                        hallo@onlinelabs.nl
                      </a>
                    </p>
                  </div>
                )}

                {/* Gekozen Training Header */}
                <div className="bg-blue-50 border-2 border-primary rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary uppercase tracking-wide mb-1">Geselecteerde training</p>
                      <h2 className="text-xl font-bold text-gray-900">{selectedTraining.shortLabel}</h2>
                      <p className="text-2xl font-bold text-primary mt-1">{selectedTraining.price}</p>
                    </div>
                  </div>
                </div>

                {/* Naam */}
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-gray-900 mb-2">
                    Naam <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={trainingFormData.name}
                    onChange={handleTrainingChange}
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

                {/* Bedrijfsnaam */}
                <div>
                  <label htmlFor="company" className="block text-base font-medium text-gray-900 mb-2">
                    Bedrijfsnaam
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={trainingFormData.company}
                    onChange={handleTrainingChange}
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Naam van je bedrijf"
                    className={`
                      w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
                      text-base text-gray-900 placeholder-gray-400
                      focus:outline-none
                      ${focusedField === 'company'
                        ? 'border-primary ring-4 ring-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  />
                </div>

                {/* E-mailadres */}
                <div>
                  <label htmlFor="email" className="block text-base font-medium text-gray-900 mb-2">
                    E-mailadres <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={trainingFormData.email}
                    onChange={handleTrainingChange}
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

                {/* Telefoonnummer */}
                <div>
                  <label htmlFor="phone" className="block text-base font-medium text-gray-900 mb-2">
                    Telefoonnummer
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={trainingFormData.phone}
                    onChange={handleTrainingChange}
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

                {/* Aantal deelnemers */}
                <div>
                  <label htmlFor="participants" className="block text-base font-medium text-gray-900 mb-2">
                    Aantal deelnemers
                  </label>
                  <select
                    id="participants"
                    name="participants"
                    value={trainingFormData.participants}
                    onChange={handleTrainingChange}
                    onFocus={() => setFocusedField('participants')}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
                      text-base text-gray-900 bg-white
                      focus:outline-none
                      ${focusedField === 'participants'
                        ? 'border-primary ring-4 ring-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <option value="1">1 persoon</option>
                    <option value="2">2 personen</option>
                    <option value="3">3 personen</option>
                    <option value="4">4 personen</option>
                    <option value="5">5 personen</option>
                    <option value="6">6 personen (max)</option>
                    <option value="meer">Meer dan 6 (incompany)</option>
                  </select>
                </div>

                {/* Voorkeursdatum */}
                <div>
                  <label htmlFor="preferredDate" className="block text-base font-medium text-gray-900 mb-2">
                    Voorkeursdatum
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={trainingFormData.preferredDate}
                    onChange={handleTrainingChange}
                    onFocus={() => setFocusedField('preferredDate')}
                    onBlur={() => setFocusedField(null)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`
                      w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
                      text-base text-gray-900
                      focus:outline-none
                      ${focusedField === 'preferredDate'
                        ? 'border-primary ring-4 ring-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  />
                </div>

                {/* Opmerkingen */}
                <div>
                  <label htmlFor="message" className="block text-base font-medium text-gray-900 mb-2">
                    Opmerkingen
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={trainingFormData.message}
                    onChange={handleTrainingChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Bijv. specifieke onderwerpen, locatie voorkeur, vragen..."
                    className={`
                      w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
                      text-base text-gray-900 placeholder-gray-400 resize-none
                      focus:outline-none
                      ${focusedField === 'message'
                        ? 'border-primary ring-4 ring-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  />
                </div>

                {/* Disclaimer */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      <strong>Dit is geen directe bestelling.</strong> Na het versturen nemen we persoonlijk contact met je op om de training te bespreken en een geschikte datum te plannen.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      w-full sm:w-auto px-8 py-4 bg-primary text-white font-semibold text-lg rounded-lg 
                      transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200
                      ${isSubmitting 
                        ? 'opacity-70 cursor-not-allowed' 
                        : 'hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Versturen...
                      </span>
                    ) : (
                      'Aanvraag versturen'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-6">
                
                {/* Training Info Card */}
                <div className="bg-primary rounded-xl p-8 text-white shadow-lg">
                  <h3 className="font-serif text-2xl font-bold mb-4 text-white">
                    Wat kun je verwachten?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-white/90">Persoonlijk contact binnen 24 uur</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-white/90">Samen de beste datum kiezen</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-white/90">Training op maat afgestemd</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-white/90">60 dagen nazorg inclusief</p>
                    </div>
                  </div>
                </div>

                {/* Contact Direct */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Liever direct contact?</h4>
                  <div className="space-y-2">
                    <a href="tel:+31208202022" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>020 - 820 20 22</span>
                    </a>
                    <a href="mailto:hallo@onlinelabs.nl" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>hallo@onlinelabs.nl</span>
                    </a>
                  </div>
                </div>

                {/* Terug link */}
                <a 
                  href="/trainingen" 
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Bekijk alle trainingen
                </a>

              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // ============================================
  // STANDAARD CONTACT FORMULIER (geen ?training=)
  // ============================================
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Form Column */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">
                    Er is iets misgegaan bij het versturen. Probeer het opnieuw of mail ons direct op{' '}
                    <a href="mailto:hallo@onlinelabs.nl" className="underline font-medium">
                      hallo@onlinelabs.nl
                    </a>
                  </p>
                </div>
              )}

              {/* Diensten Interests Section */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Interesse in
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {serviceInterests.map((interest) => (
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

              {/* Trainingen Section */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Interesse in een training?
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {generalTrainingInterests.map((training) => (
                    <label
                      key={training.id}
                      className={`
                        relative flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${formData.interests.includes(training.id)
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(training.id)}
                        onChange={() => handleInterestToggle(training.id)}
                        className="sr-only"
                      />
                      <div className="flex items-start gap-3 w-full">
                        <div 
                          className={`
                            flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all duration-200
                            ${formData.interests.includes(training.id)
                              ? 'bg-primary border-primary'
                              : 'bg-white border-gray-300'
                            }
                          `}
                        >
                          {formData.interests.includes(training.id) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                            </svg>
                          )}
                        </div>
                        <span className="text-base text-gray-700 leading-tight flex-1">
                          {training.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-gray-900 mb-4">
                  Vertel ons meer over je project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Beschrijf je wensen, uitdagingen en wat je wilt bereiken..."
                  className={`
                    w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
                    text-base text-gray-900 placeholder-gray-400 resize-none
                    focus:outline-none
                    ${focusedField === 'message'
                      ? 'border-primary ring-4 ring-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                />
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
                  disabled={isSubmitting}
                  className={`
                    w-full sm:w-auto px-8 py-4 bg-primary text-white font-semibold text-lg rounded-lg 
                    transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200
                    ${isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5'
                    }
                  `}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Versturen...
                    </span>
                  ) : (
                    'Deel je idee met ons'
                  )}
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
                <h3 className="font-serif text-2xl font-bold mb-4 text-white">
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
