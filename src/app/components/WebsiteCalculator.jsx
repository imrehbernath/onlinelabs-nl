'use client';

import { useState } from 'react';

// ============================================
// WEBSITE PRIJS CALCULATOR - OnlineLabs
// Plaats in: src/app/components/WebsiteCalculator.jsx
// ============================================

const WebsiteCalculator = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    designStatus: null,
    experience: null,
    websiteType: null,
    pageCount: 8,
    cms: null,
    features: {
      multilingual: false,
      blog: false,
      booking: false,
      crm: false,
      seoPackage: false,
      aiVisibility: false,
    },
    timeline: null,
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });

  // OnlineLabs prijzen
  const PRICING = {
    basePrice: { starter: 2999, business: 4499, webshop: 7499, custom: 12000 },
    designMultiplier: { figma: 0.85, sketch: 1.0, nothing: 1.25 },
    pagePrice: 175,
    standardPages: { starter: 5, business: 10, webshop: 8, custom: 10 },
    cms: { wordpress: 0, headless: 2500, custom: 5000 },
    features: {
      multilingual: 1200,
      blog: 600,
      booking: 1800,
      crm: 1200,
      seoPackage: 1500,
      aiVisibility: 800,
    },
    timelineMultiplier: { standard: 1.0, fast: 1.20, urgent: 1.40 },
  };

  const calculatePrice = () => {
    if (!formData.websiteType) return { calculated: 2999 };
    
    let price = PRICING.basePrice[formData.websiteType] || 2999;
    if (formData.designStatus) price *= PRICING.designMultiplier[formData.designStatus];
    
    const standardPages = PRICING.standardPages[formData.websiteType] || 5;
    const extraPages = Math.max(0, formData.pageCount - standardPages);
    price += extraPages * PRICING.pagePrice;
    
    if (formData.cms) price += PRICING.cms[formData.cms];
    
    Object.entries(formData.features).forEach(([feature, enabled]) => {
      if (enabled && PRICING.features[feature]) price += PRICING.features[feature];
    });
    
    if (formData.timeline) price *= PRICING.timelineMultiplier[formData.timeline];
    
    return { calculated: Math.round(price / 50) * 50 };
  };

  const price = calculatePrice();
  const totalSteps = 8;

  const canProceed = () => {
    switch (step) {
      case 1: return formData.designStatus !== null;
      case 2: return formData.experience !== null;
      case 3: return formData.websiteType !== null;
      case 4: return formData.pageCount >= 1;
      case 5: return formData.cms !== null;
      case 6: return true;
      case 7: return formData.timeline !== null;
      case 8: return formData.name && formData.email && formData.company;
      default: return false;
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          calculatedPrice: price.calculated,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Components
  const OptionCard = ({ selected, onClick, title, description, tag, tagColor }) => (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full p-5 lg:p-6 rounded-xl border-2 text-left transition-all duration-200 ${
        selected 
          ? 'border-[#376eb5] bg-[#376eb5]/5 shadow-md' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      {tag && (
        <span className={`absolute -top-2.5 right-4 px-2.5 py-0.5 text-xs font-medium rounded-full ${tagColor || 'bg-gray-100 text-gray-600'}`}>
          {tag}
        </span>
      )}
      <div className="pr-8">
        <h3 className={`font-semibold text-lg ${selected ? 'text-[#376eb5]' : 'text-gray-900'}`}>{title}</h3>
        <p className="text-gray-500 mt-1 text-sm leading-relaxed">{description}</p>
      </div>
      {selected && (
        <div className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 bg-[#376eb5] rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );

  const FeatureToggle = ({ title, price: featurePrice, checked, onChange, popular }) => (
    <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
      checked ? 'border-[#376eb5] bg-[#376eb5]/5' : 'border-gray-200 bg-white hover:border-gray-300'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
          checked ? 'bg-[#376eb5] border-[#376eb5]' : 'border-gray-300'
        }`}>
          {checked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className={`font-medium ${checked ? 'text-[#376eb5]' : 'text-gray-900'}`}>{title}</span>
        {popular && <span className="px-2 py-0.5 text-xs font-medium bg-[#1abc9c]/10 text-[#1abc9c] rounded">Populair</span>}
      </div>
      <span className="text-sm font-medium text-gray-500">+€{featurePrice.toLocaleString('nl-NL')}</span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Heb je al een design?</h2>
              <p className="text-gray-500">Een kant-en-klaar design versnelt het ontwikkelproces</p>
            </div>
            <div className="grid gap-3">
              <OptionCard selected={formData.designStatus === 'figma'} onClick={() => setFormData({ ...formData, designStatus: 'figma' })} title="Ja, Figma of Sketch" description="Volledig uitgewerkt design met alle pagina's en componenten" tag="-15%" tagColor="bg-green-100 text-green-700" />
              <OptionCard selected={formData.designStatus === 'sketch'} onClick={() => setFormData({ ...formData, designStatus: 'sketch' })} title="Schets of wireframe" description="Globale indeling en structuur, nog geen pixel-perfect design" />
              <OptionCard selected={formData.designStatus === 'nothing'} onClick={() => setFormData({ ...formData, designStatus: 'nothing' })} title="Nog geen design" description="We ontwerpen samen een passend design voor jouw doelgroep" tag="+25%" tagColor="bg-amber-100 text-amber-700" />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Hoeveel ervaring heb je met websites?</h2>
              <p className="text-gray-500">Dit helpt ons de juiste begeleiding te bieden</p>
            </div>
            <div className="grid gap-3">
              <OptionCard selected={formData.experience === 'first'} onClick={() => setFormData({ ...formData, experience: 'first' })} title="Dit is mijn eerste professionele website" description="Ik heb begeleiding nodig bij het hele traject" />
              <OptionCard selected={formData.experience === 'experienced'} onClick={() => setFormData({ ...formData, experience: 'experienced' })} title="Ik heb ervaring met websites" description="Ik weet wat ik wil en heb eerder websites laten bouwen" />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welk pakket past bij jou?</h2>
              <p className="text-gray-500">Kies het type website dat past bij jouw situatie</p>
            </div>
            <div className="grid gap-3">
              <OptionCard selected={formData.websiteType === 'starter'} onClick={() => setFormData({ ...formData, websiteType: 'starter', pageCount: 5 })} title="Starter Pakket" description="5 pagina's • Ideaal voor ZZP'ers en starters • Responsive design" tag="Vanaf €2.999" tagColor="bg-gray-100 text-gray-700" />
              <OptionCard selected={formData.websiteType === 'business'} onClick={() => setFormData({ ...formData, websiteType: 'business', pageCount: 10 })} title="Zakelijk Pakket" description="10 pagina's • Voor groeiende bedrijven • Inclusief basis SEO" tag="Vanaf €4.499" tagColor="bg-gray-100 text-gray-700" />
              <OptionCard selected={formData.websiteType === 'webshop'} onClick={() => setFormData({ ...formData, websiteType: 'webshop', pageCount: 8 })} title="Webshop" description="WooCommerce • Betaalintegraties • Productbeheer • Verzendopties" tag="Vanaf €7.499" tagColor="bg-gray-100 text-gray-700" />
              <OptionCard selected={formData.websiteType === 'custom'} onClick={() => setFormData({ ...formData, websiteType: 'custom', pageCount: 10 })} title="Custom Website" description="Maatwerk oplossing • Complexe functionaliteiten • Op maat gebouwd" tag="Vanaf €12.000" tagColor="bg-gray-100 text-gray-700" />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Hoeveel pagina's heb je nodig?</h2>
              <p className="text-gray-500">Home, Over ons, Diensten, Contact, Blog, etc.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 lg:p-8">
              <div className="text-center mb-6">
                <span className="text-5xl lg:text-6xl font-bold text-[#376eb5]">{formData.pageCount}</span>
                <span className="text-xl text-gray-400 ml-2">pagina's</span>
              </div>
              <input type="range" min="1" max="30" value={formData.pageCount} onChange={(e) => setFormData({ ...formData, pageCount: parseInt(e.target.value) })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#376eb5]" />
              <div className="flex justify-between text-sm text-gray-400 mt-3">
                <span>1</span><span>15</span><span>30+</span>
              </div>
              {formData.websiteType && formData.pageCount > PRICING.standardPages[formData.websiteType] && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{formData.pageCount - PRICING.standardPages[formData.websiteType]} extra pagina's</span> × €{PRICING.pagePrice} = €{(formData.pageCount - PRICING.standardPages[formData.websiteType]) * PRICING.pagePrice}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welke techniek past bij jou?</h2>
              <p className="text-gray-500">Het CMS bepaalt hoe je je website beheert</p>
            </div>
            <div className="grid gap-3">
              <OptionCard selected={formData.cms === 'wordpress'} onClick={() => setFormData({ ...formData, cms: 'wordpress' })} title="WordPress" description="Meest populair CMS • Makkelijk zelf te beheren • Groot plugin ecosysteem" tag="Standaard" tagColor="bg-[#376eb5]/10 text-[#376eb5]" />
              <OptionCard selected={formData.cms === 'headless'} onClick={() => setFormData({ ...formData, cms: 'headless' })} title="Headless (Next.js)" description="Maximale snelheid • Perfect voor SEO • Moderne architectuur" tag="+€2.500" tagColor="bg-[#1abc9c]/10 text-[#1abc9c]" />
              <OptionCard selected={formData.cms === 'custom'} onClick={() => setFormData({ ...formData, cms: 'custom' })} title="Volledig maatwerk" description="Custom backend • Voor specifieke eisen • Maximale flexibiliteit" tag="+€5.000" tagColor="bg-amber-100 text-amber-700" />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Extra functionaliteiten</h2>
              <p className="text-gray-500">Selecteer wat je nodig hebt (optioneel)</p>
            </div>
            <div className="grid gap-2">
              <FeatureToggle title="Meertalig (2+ talen)" price={1200} checked={formData.features.multilingual} onChange={() => setFormData({ ...formData, features: { ...formData.features, multilingual: !formData.features.multilingual }})} />
              <FeatureToggle title="Blog / Nieuws module" price={600} checked={formData.features.blog} onChange={() => setFormData({ ...formData, features: { ...formData.features, blog: !formData.features.blog }})} />
              <FeatureToggle title="Boekings- of reserveringssysteem" price={1800} checked={formData.features.booking} onChange={() => setFormData({ ...formData, features: { ...formData.features, booking: !formData.features.booking }})} />
              <FeatureToggle title="CRM / e-mail marketing integratie" price={1200} checked={formData.features.crm} onChange={() => setFormData({ ...formData, features: { ...formData.features, crm: !formData.features.crm }})} />
              <FeatureToggle title="SEO optimalisatie pakket" price={1500} popular={true} checked={formData.features.seoPackage} onChange={() => setFormData({ ...formData, features: { ...formData.features, seoPackage: !formData.features.seoPackage }})} />
              <FeatureToggle title="AI zichtbaarheid (GEO)" price={800} popular={true} checked={formData.features.aiVisibility} onChange={() => setFormData({ ...formData, features: { ...formData.features, aiVisibility: !formData.features.aiVisibility }})} />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Wanneer wil je live?</h2>
              <p className="text-gray-500">Een kortere doorlooptijd vraagt extra resources</p>
            </div>
            <div className="grid gap-3">
              <OptionCard selected={formData.timeline === 'standard'} onClick={() => setFormData({ ...formData, timeline: 'standard' })} title="Standaard (8-12 weken)" description="Voldoende tijd voor feedback en iteraties" tag="Aanbevolen" tagColor="bg-[#376eb5]/10 text-[#376eb5]" />
              <OptionCard selected={formData.timeline === 'fast'} onClick={() => setFormData({ ...formData, timeline: 'fast' })} title="Versneld (5-7 weken)" description="Prioriteit in planning, snellere feedbackrondes" tag="+20%" tagColor="bg-amber-100 text-amber-700" />
              <OptionCard selected={formData.timeline === 'urgent'} onClick={() => setFormData({ ...formData, timeline: 'urgent' })} title="Spoed (3-4 weken)" description="Dedicated team, strakke deadlines" tag="+40%" tagColor="bg-red-100 text-red-700" />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Ontvang je prijsindicatie</h2>
              <p className="text-gray-500">Vul je gegevens in voor een vrijblijvende offerte</p>
            </div>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Naam <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#376eb5] focus:ring-1 focus:ring-[#376eb5] focus:outline-none" placeholder="Je naam" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Bedrijf <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#376eb5] focus:ring-1 focus:ring-[#376eb5] focus:outline-none" placeholder="Bedrijfsnaam" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail <span className="text-red-500">*</span></label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#376eb5] focus:ring-1 focus:ring-[#376eb5] focus:outline-none" placeholder="naam@bedrijf.nl" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefoon</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#376eb5] focus:ring-1 focus:ring-[#376eb5] focus:outline-none" placeholder="06-12345678" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Vertel meer over je project</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#376eb5] focus:ring-1 focus:ring-[#376eb5] focus:outline-none resize-none" placeholder="Optioneel: beschrijf kort je wensen..." />
              </div>
            </div>
            <p className="text-xs text-gray-400">Door te versturen ga je akkoord met onze <a href="/privacyverklaring" className="text-[#376eb5] hover:underline">privacyverklaring</a></p>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div id="calculator" className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12 text-center">
        <div className="w-16 h-16 bg-[#1abc9c] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">Bedankt, {formData.name}!</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">We nemen binnen 1 werkdag contact met je op om je wensen te bespreken.</p>
        <div className="bg-gray-50 rounded-xl p-6 max-w-sm mx-auto mb-8">
          <p className="text-sm text-gray-500 mb-1">Jouw prijsindicatie</p>
          <p className="text-4xl font-bold text-[#376eb5]">€{price.calculated.toLocaleString('nl-NL')}</p>
          <p className="text-xs text-gray-400 mt-1">excl. BTW</p>
        </div>
        <p className="text-sm text-gray-500">Liever direct contact? <a href="tel:0208202022" className="text-[#376eb5] font-medium hover:underline">020 820 20 22</a></p>
      </div>
    );
  }

  return (
    <div id="calculator" className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Progress */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>Stap {step} van {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% compleet</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#376eb5] transition-all duration-300 ease-out" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>
      </div>

      <div className="lg:flex">
        {/* Content */}
        <div className="flex-1 p-6 lg:p-8">
          {renderStep()}
          
          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button type="button" onClick={() => setStep(step - 1)} disabled={step === 1} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Vorige
            </button>
            
            {step < totalSteps ? (
              <button type="button" onClick={() => canProceed() && setStep(step + 1)} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${canProceed() ? 'bg-[#376eb5] text-white hover:bg-[#2d5a94] cursor-pointer' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                Volgende
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            ) : (
              <button type="button" onClick={() => canProceed() && submitForm()} disabled={!canProceed() || isSubmitting} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${canProceed() && !isSubmitting ? 'bg-[#1abc9c] text-white hover:bg-[#16a085] cursor-pointer' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Versturen...
                  </>
                ) : (
                  <>
                    Verstuur aanvraag
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Price Panel */}
        <div className="lg:w-72 bg-gray-50 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="lg:sticky lg:top-8">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Prijsindicatie</p>
            
            <div className="bg-white rounded-xl p-5 border border-gray-200 mb-6">
              <p className="text-xs text-gray-400 mb-1">Vanaf</p>
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-gray-400">€</span>
                <span className="text-4xl font-bold text-[#376eb5] tabular-nums">{price.calculated.toLocaleString('nl-NL')}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">excl. BTW</p>
            </div>
            
            {/* Breakdown */}
            <div className="space-y-2 text-sm">
              {formData.websiteType && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Basispakket</span>
                  <span className="text-gray-700">€{PRICING.basePrice[formData.websiteType]?.toLocaleString('nl-NL')}</span>
                </div>
              )}
              {formData.designStatus === 'figma' && <div className="flex justify-between text-green-600"><span>Design korting</span><span>-15%</span></div>}
              {formData.designStatus === 'nothing' && <div className="flex justify-between text-amber-600"><span>Design opslag</span><span>+25%</span></div>}
              {formData.cms && PRICING.cms[formData.cms] > 0 && <div className="flex justify-between"><span className="text-gray-500">Techniek</span><span className="text-gray-700">+€{PRICING.cms[formData.cms].toLocaleString('nl-NL')}</span></div>}
              {Object.values(formData.features).some(v => v) && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Extra's</span>
                  <span className="text-gray-700">+€{Object.entries(formData.features).filter(([_, enabled]) => enabled).reduce((sum, [feature]) => sum + (PRICING.features[feature] || 0), 0).toLocaleString('nl-NL')}</span>
                </div>
              )}
              {formData.timeline && formData.timeline !== 'standard' && <div className="flex justify-between text-amber-600"><span>Spoedtoeslag</span><span>+{formData.timeline === 'fast' ? '20' : '40'}%</span></div>}
            </div>
            
            <p className="text-xs text-gray-400 mt-6 leading-relaxed">Dit is een indicatie. De definitieve prijs bepalen we samen na een vrijblijvend gesprek.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCalculator;
