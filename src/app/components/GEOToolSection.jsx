'use client';

import { useState } from 'react';
import { Search, Building2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function GEOToolSection({ background = 'beige' }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    keywords: '',
    companyName: '',
    companyCategory: ''
  });

  // Advanced Settings
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [excludeTerms, setExcludeTerms] = useState('');
  const [includeTerms, setIncludeTerms] = useState('');
  const [locationTerms, setLocationTerms] = useState('');

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    beige: 'bg-[#FAFAF8]'
  };
  // Handle both array (from WordPress Select) and string
  const bg = Array.isArray(background) ? background[0] : background;
  const bgClass = backgroundClasses[bg] || backgroundClasses.beige;

  const handleSubmit = () => {
    const params = new URLSearchParams();
    
    if (formData.companyName) params.set('company', formData.companyName);
    if (formData.companyCategory) params.set('category', formData.companyCategory);
    if (formData.keywords) params.set('keywords', formData.keywords);
    if (excludeTerms) params.set('exclude', excludeTerms);
    if (includeTerms) params.set('include', includeTerms);
    if (locationTerms) params.set('location', locationTerms);
    params.set('ref', 'onlinelabs');
    params.set('autostart', 'true');
    
    const teunUrl = `https://teun.ai/tools/ai-visibility?${params.toString()}`;
    window.open(teunUrl, '_blank');
  };

  return (
    <section id="geo-tool" className={`py-16 lg:py-24 ${bgClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#376eb5]/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#376eb5]" />
            <span className="text-sm font-semibold text-[#376eb5]">Gratis AI Visibility Check</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
            GEO Optimalisatie Tool
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ontdek hoe AI-modellen jouw bedrijf vermelden bij commerciële zoekvragen
          </p>
        </div>

        {/* Tool Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            
            {/* Progress Steps */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {[
                  { num: 1, label: 'Zoekopdrachten' },
                  { num: 2, label: 'Bedrijfsinfo' },
                  { num: 3, label: 'Analyse' },
                  { num: 4, label: 'Rapport' }
                ].map(({ num, label }) => (
                  <div
                    key={num}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      step === num
                        ? 'bg-[#376eb5] text-white'
                        : num <= 2
                        ? 'bg-gray-200 text-gray-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {num}. {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8">
              
              {/* Step 1: Keywords */}
              {step === 1 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#376eb5]/10 rounded-xl flex items-center justify-center">
                      <Search className="w-5 h-5 text-[#376eb5]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">1. Geef belangrijkste zoekwoorden op</h3>
                  </div>

                  {/* Tip Box */}
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-[#376eb5] flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <strong>Tip: Eerste zoekwoord is het belangrijkst</strong>
                        <p className="mt-1 text-gray-600">
                          Dit wordt gebruikt om relevante AI-prompts te genereren die matchen met waar jouw klanten naar zoeken.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Keywords Input */}
                  <div className="space-y-2 mb-6">
                    <label className="text-sm text-gray-700 font-medium block">
                      Zoekwoorden (optioneel)
                    </label>
                    <textarea
                      value={formData.keywords}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                      placeholder="Bijv: Linnen gordijnen, Linnen gordijnen op maat, Inbetween gordijnen"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#376eb5]/20 focus:border-[#376eb5] transition-all min-h-[120px] resize-y"
                    />
                  </div>

                  {/* Advanced Settings */}
                  <div className="border-t border-gray-100 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#376eb5] transition-colors"
                    >
                      <span className="text-lg">⚙️</span>
                      <span className="font-medium">Geavanceerde instellingen</span>
                      <span className="text-gray-400">{showAdvanced ? '▼' : '▶'}</span>
                    </button>

                    {showAdvanced && (
                      <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-xl">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ❌ Vermijd woorden
                          </label>
                          <input
                            type="text"
                            value={excludeTerms}
                            onChange={(e) => setExcludeTerms(e.target.value)}
                            placeholder="goedkoop, budget, gratis"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#376eb5]/20 focus:border-[#376eb5]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ✅ Gebruik woorden
                          </label>
                          <input
                            type="text"
                            value={includeTerms}
                            onChange={(e) => setIncludeTerms(e.target.value)}
                            placeholder="premium, specialist, ervaren"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#376eb5]/20 focus:border-[#376eb5]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            📍 Locatie
                          </label>
                          <input
                            type="text"
                            value={locationTerms}
                            onChange={(e) => setLocationTerms(e.target.value)}
                            placeholder="Amsterdam, Nederland"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#376eb5]/20 focus:border-[#376eb5]"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Next Button */}
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => setStep(2)}
                      className="px-8 py-4 bg-[#376eb5] hover:bg-[#2d5a94] text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                    >
                      Volgende
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Company Info */}
              {step === 2 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#376eb5]/10 rounded-xl flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#376eb5]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">2. Voer je bedrijfsgegevens in</h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-6">
                    Vul je bedrijfsnaam en branche in om te zien hoe vaak jij wordt genoemd versus concurrenten.
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-700 font-medium block">
                        Bedrijfsnaam *
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Bijv: OnlineLabs"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#376eb5]/20 focus:border-[#376eb5] transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-700 font-medium block">
                        Categorie/Branche *
                      </label>
                      <input
                        type="text"
                        value={formData.companyCategory}
                        onChange={(e) => setFormData({ ...formData, companyCategory: e.target.value })}
                        placeholder="Bijv: Online marketing bureau, SEO bureau"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#376eb5]/20 focus:border-[#376eb5] transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-[#376eb5]/5 border border-[#376eb5]/20 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-700">
                      <strong>Meer analyses nodig?</strong><br />
                      De analyse wordt uitgevoerd op Teun.ai. Maak daar een gratis account aan voor onbeperkte scans.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      ← Terug
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.companyName || !formData.companyCategory}
                      className="px-8 py-4 bg-[#376eb5] hover:bg-[#2d5a94] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                    >
                      Start Analyse op Teun.ai
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Powered by <a href="https://teun.ai" target="_blank" rel="noopener noreferrer" className="text-[#376eb5] hover:underline font-medium">Teun.ai</a> – AI Visibility Platform
          </p>
        </div>
      </div>
    </section>
  );
}