'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const TEUN_API = 'https://teun.ai';

export default function GEOToolSection({ background = 'beige' }) {
  const [formData, setFormData] = useState({
    companyName: '',
    companyCategory: '',
    website: ''
  });

  const [extractingKeywords, setExtractingKeywords] = useState(false);
  const [keywordTags, setKeywordTags] = useState([]);
  const [newKeywordInput, setNewKeywordInput] = useState('');
  const [error, setError] = useState(null);
  const lastExtractedUrl = useRef('');

  // Advanced Settings
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [excludeTerms, setExcludeTerms] = useState('');
  const [includeTerms, setIncludeTerms] = useState('');
  const [locationTerms, setLocationTerms] = useState('');

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-[#F3F4F6]',
    beige: 'bg-[#FAF9F6]'
  };
  const bg = Array.isArray(background) ? background[0] : background;
  const bgClass = backgroundClasses[bg] || backgroundClasses.beige;

  const syncKeywordsToForm = (tags) => {
    setKeywordTags(tags);
  };

  const removeKeyword = (index) => {
    syncKeywordsToForm(keywordTags.filter((_, i) => i !== index));
  };

  const addKeyword = (keyword) => {
    const trimmed = keyword.trim();
    if (!trimmed || keywordTags.includes(trimmed) || keywordTags.length >= 12) return;
    syncKeywordsToForm([...keywordTags, trimmed]);
  };

  // Auto-extract keywords when URL looks valid
  useEffect(() => {
    const url = formData.website?.trim();
    if (!url || !url.includes('.') || url === lastExtractedUrl.current || extractingKeywords) return;

    const timer = setTimeout(() => {
      lastExtractedUrl.current = url;
      handleExtractKeywords(url);
    }, 800);

    return () => clearTimeout(timer);
  }, [formData.website]);

  const handleExtractKeywords = async (url) => {
    if (!url?.trim() || extractingKeywords) return;

    setExtractingKeywords(true);
    setError(null);

    try {
      const response = await fetch(`${TEUN_API}/api/extract-keywords`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!response.ok) throw new Error('Kon website niet analyseren');
      const data = await response.json();

      if (data.keywords && data.keywords.length > 0) {
        syncKeywordsToForm(data.keywords);
        setFormData(prev => ({
          ...prev,
          companyName: prev.companyName || data.companyName || '',
          companyCategory: prev.companyCategory || data.category || '',
        }));
      }
    } catch (err) {
      console.error('Extract error:', err);
    } finally {
      setExtractingKeywords(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.companyName || !formData.companyCategory || !formData.website?.trim()) {
      setError('Vul bedrijfsnaam, branche en website in');
      return;
    }

    const params = new URLSearchParams();
    params.set('company', formData.companyName);
    params.set('category', formData.companyCategory);
    if (formData.website) params.set('website', formData.website);
    if (keywordTags.length > 0) params.set('keywords', keywordTags.join(', '));
    if (excludeTerms) params.set('exclude', excludeTerms);
    if (includeTerms) params.set('include', includeTerms);
    if (locationTerms) params.set('location', locationTerms);
    params.set('ref', 'onlinelabs');
    params.set('autostart', 'true');
    
    window.open(`${TEUN_API}/tools/ai-visibility?${params.toString()}`, '_blank');
  };

  return (
    <section id="geo-tool" className={`py-20 lg:py-24 ${bgClass}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span 
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-[#376eb5] mb-6"
            style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)' }}
          >
            Gratis AI Visibility Check
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-5">
            GEO Optimalisatie Tool
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Ontdek hoe AI-modellen jouw bedrijf vermelden bij commerciële zoekvragen
          </p>
        </div>

        {/* Tool Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Vul je gegevens in
              </h3>

              {/* Main Fields */}
              <div className="space-y-4 mb-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700 font-medium block mb-1.5">Bedrijfsnaam *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Je bedrijfsnaam"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#376eb5]/20 focus:border-[#376eb5] transition-all text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 font-medium block mb-1.5">Branche *</label>
                    <input
                      type="text"
                      value={formData.companyCategory}
                      onChange={(e) => setFormData({ ...formData, companyCategory: e.target.value })}
                      placeholder="Jouw branche"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#376eb5]/20 focus:border-[#376eb5] transition-all text-base"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-700 font-medium block mb-1.5">Website *</label>
                  <input
                    type="url"
                    inputMode="url"
                    autoComplete="off"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value.toLowerCase() })}
                    placeholder="jouwwebsite.nl"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#376eb5]/20 focus:border-[#376eb5] transition-all text-base"
                  />
                  {extractingKeywords ? (
                    <p className="text-sm text-[#376eb5] flex items-center gap-1.5 mt-1.5">
                      <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Zoekwoorden ophalen...
                    </p>
                  ) : keywordTags.length > 0 ? (
                    <p className="text-sm text-[#1abc9c] flex items-center gap-1 mt-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {keywordTags.length} zoekwoorden opgehaald
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 mt-1.5">Je URL zorgt voor betere zoekwoorden en prompts</p>
                  )}
                </div>
              </div>

              {/* Keyword Tags Panel */}
              {(keywordTags.length > 0 || extractingKeywords) && (
                <div className="mb-5">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    {extractingKeywords ? (
                      <div className="flex items-center gap-3 py-1">
                        <svg className="animate-spin w-4 h-4 text-[#376eb5]" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span className="text-base text-gray-600">Website analyseren...</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-500">{keywordTags.length} zoekwoorden</span>
                          <button type="button" onClick={() => syncKeywordsToForm([])} className="text-sm text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                            Alles wissen
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {keywordTags.map((kw, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                              {kw}
                              <button type="button" onClick={() => removeKeyword(i)} className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            </span>
                          ))}
                        </div>
                        {keywordTags.length < 12 && (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newKeywordInput}
                              onChange={(e) => setNewKeywordInput(e.target.value)}
                              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addKeyword(newKeywordInput); setNewKeywordInput(''); } }}
                              placeholder="Zoekwoord toevoegen..."
                              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-[#376eb5] focus:ring-1 focus:ring-[#376eb5]/20 outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => { addKeyword(newKeywordInput); setNewKeywordInput(''); }}
                              disabled={!newKeywordInput.trim()}
                              className="px-3 py-2 text-sm font-medium text-[#376eb5] hover:bg-[#376eb5]/5 rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              + Toevoegen
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Advanced Settings */}
              <div className="border-t border-gray-100 pt-5 mb-6">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-base text-gray-600 hover:text-[#376eb5] transition-colors"
                >
                  <span>⚙️</span>
                  <span className="font-medium">Geavanceerde instellingen</span>
                  <span className="text-gray-400 text-sm">{showAdvanced ? '▼' : '▶'}</span>
                </button>

                {showAdvanced && (
                  <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-xl">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">❌ Vermijd woorden</label>
                      <input type="text" value={excludeTerms} onChange={(e) => setExcludeTerms(e.target.value)} placeholder="goedkoop, budget, gratis"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-base focus:ring-2 focus:ring-[#376eb5]/20 focus:border-[#376eb5]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">✅ Gebruik woorden</label>
                      <input type="text" value={includeTerms} onChange={(e) => setIncludeTerms(e.target.value)} placeholder="premium, specialist, ervaren"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-base focus:ring-2 focus:ring-[#376eb5]/20 focus:border-[#376eb5]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">📍 Locatie</label>
                      <input type="text" value={locationTerms} onChange={(e) => setLocationTerms(e.target.value)} placeholder="Amsterdam, Nederland"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-base focus:ring-2 focus:ring-[#376eb5]/20 focus:border-[#376eb5]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-base text-red-700">{error}</div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!formData.companyName || !formData.companyCategory || !formData.website?.trim() || extractingKeywords}
                className="w-full px-8 py-4 bg-[#376eb5] hover:bg-[#2d5a94] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer text-lg"
              >
                Start Gratis Analyse
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-base text-gray-500 text-center mt-4">
                Analyse wordt uitgevoerd op <a href="https://teun.ai" target="_blank" rel="noopener noreferrer" className="text-[#376eb5] hover:underline font-medium">Teun.ai</a> — geen registratie nodig
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
