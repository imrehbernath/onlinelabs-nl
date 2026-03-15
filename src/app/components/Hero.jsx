'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {

  return (
    <>
      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-reveal {
          opacity: 0;
          animation: hero-fade-up 0.6s ease-out forwards;
        }
        .hero-reveal-1 { animation-delay: 0.1s; }
        .hero-reveal-2 { animation-delay: 0.2s; }
        .hero-reveal-3 { animation-delay: 0.3s; }
        .hero-reveal-4 { animation-delay: 0.4s; }
        .hero-reveal-5 { animation-delay: 0.5s; }

        @keyframes float-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 30px) scale(0.95); }
          66% { transform: translate(35px, -15px) scale(1.05); }
        }

        @keyframes bar-grow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        .dash-bar-animate {
          transform-origin: bottom;
          animation: bar-grow 0.8s ease-out forwards;
        }

        @keyframes dash-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes teun-wave {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(2deg) translateY(-3px); }
          75% { transform: rotate(-1.5deg) translateY(2px); }
        }

        @media (min-width: 1024px) {
          .orb-animate-1 { animation: float-orb-1 20s ease-in-out infinite; }
          .orb-animate-2 { animation: float-orb-2 25s ease-in-out infinite; }
          .dash-float { animation: dash-float 6s ease-in-out infinite; }
          .teun-wave { animation: teun-wave 4s ease-in-out infinite; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-reveal { opacity: 1; animation: none; transform: none; }
          .orb-animate-1, .orb-animate-2, .dash-float, .teun-wave { animation: none !important; }
          .dash-bar-animate { animation: none; transform: scaleY(1); }
        }
      `}</style>
      
      <section className="relative bg-white overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="orb-animate-1 absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #376eb5 0%, transparent 70%)', willChange: 'transform' }}
          />
          <div 
            className="orb-animate-2 absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, #1abc9c 0%, transparent 70%)', willChange: 'transform' }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4 sm:py-16 lg:py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-6 lg:space-y-8 max-w-2xl flex flex-col justify-center">
              
              {/* Badge */}
              <div className="hero-reveal hero-reveal-1">
                <span 
                  className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full"
                  style={{ 
                    backgroundColor: 'rgba(55, 110, 181, 0.06)',
                    border: '1px solid rgba(55, 110, 181, 0.12)',
                    color: '#376eb5'
                  }}
                >
                  <span 
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#1abc9c' }}
                  />
                  Online marketing bureau Amsterdam, sinds 2008
                </span>
              </div>

              {/* H1 */}
              <h1 className="hero-reveal hero-reveal-2 font-serif font-bold leading-[1.1] text-gray-900 text-[2.5rem] sm:text-[3rem] lg:text-[3.75rem] xl:text-[4.25rem] tracking-tight">
                Gevonden worden in{' '}
                <span style={{ color: '#376eb5' }}>Google</span>,{' '}
                <span style={{ color: '#376eb5' }}>ChatGPT</span> én{' '}
                <span style={{ color: '#1abc9c' }}>Perplexity</span>
              </h1>

              {/* Subtitle */}
              <p className="hero-reveal hero-reveal-3 text-lg lg:text-xl text-gray-700 leading-relaxed">
                OnlineLabs combineert <strong className="text-gray-900 font-semibold">17 jaar SEO-expertise</strong> met ons eigen AI-platform{' '}
                <strong className="font-semibold" style={{ color: '#1abc9c' }}>Teun.ai</strong>. 
                Wij maken je zichtbaar waar je klanten zoeken. Niet alleen in Google, maar ook in AI-zoekmachines.
              </p>

              {/* CTA Buttons */}
              <div className="hero-reveal hero-reveal-4 flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="https://teun.ai/tools/ai-visibility"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-base font-semibold text-white transition-all duration-200 hover:brightness-110 hover:shadow-lg"
                  style={{ backgroundColor: '#376eb5' }}
                >
                  Start je gratis AI-scan
                </Link>
                <Link
                  href="https://teun.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold transition-all duration-200 hover:bg-gray-50"
                  style={{ color: '#376eb5', border: '2px solid #376eb5' }}
                >
                  Bekijk Teun.ai
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </div>

              {/* Trust signals */}
              <div className="hero-reveal hero-reveal-4 pt-2">
                <div className="text-sm tracking-wider uppercase text-gray-500 text-center lg:text-left">
                  <span>Sinds 2008 • Google Partner • </span>
                  <a 
                    href="https://www.google.com/maps/place/?q=place_id:ChIJEVS-szIKxkcRng6UB0W50u0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 transition-colors underline decoration-1 underline-offset-2"
                  >
                    5★ Google Reviews
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Teun.ai Dashboard + Mascotte */}
            <div className="hero-reveal hero-reveal-5 relative">
              
              {/* Teun mascotte - rechtsonder, deels achter dashboard */}
              <div className="teun-wave absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 lg:-bottom-6 lg:-right-8 z-30 pointer-events-none select-none">
                <Image
                  src="/teun-ai-mascotte.png"
                  alt="Teun, de AI-mascotte van Teun.ai"
                  width={160}
                  height={160}
                  className="drop-shadow-2xl w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] lg:w-[150px] lg:h-[150px]"
                  priority={false}
                />
              </div>

              {/* Dashboard Panel - Licht thema */}
              <div 
                className="dash-float relative rounded-2xl overflow-hidden z-20"
                style={{ 
                  backgroundColor: '#f8fafd',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 25px 80px rgba(55, 110, 181, 0.12), 0 10px 30px rgba(55, 110, 181, 0.08)'
                }}
              >
                {/* Dashboard Header */}
                <div 
                  className="flex items-center justify-between px-5 py-3.5"
                  style={{ backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold" style={{ color: '#1abc9c' }}>teun.ai</span>
                    <span className="text-xs text-gray-400 hidden sm:inline">AI Visibility Dashboard</span>
                  </div>
                  <div className="flex gap-1.5">
                    {['ChatGPT', 'Perplexity', 'Google AI'].map((platform, i) => (
                      <span 
                        key={platform}
                        className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                        style={{
                          backgroundColor: i === 0 ? '#376eb5' : 'transparent',
                          color: i === 0 ? '#fff' : '#94a3b8',
                          border: i === 0 ? 'none' : '1px solid #e2e8f0'
                        }}
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Score Cards */}
                <div className="grid grid-cols-4 gap-2 px-4 sm:px-5 py-4">
                  {[
                    { label: 'Visibility', value: '73%', color: '#1abc9c', sub: '+12% deze maand', subColor: '#1abc9c' },
                    { label: 'ChatGPT', value: '8/10', color: '#376eb5', sub: 'gevonden', subColor: '#94a3b8' },
                    { label: 'Perplexity', value: '6/10', color: '#1abc9c', sub: 'gevonden', subColor: '#94a3b8' },
                    { label: 'Threats', value: '3', color: '#f59e0b', sub: 'concurrenten', subColor: '#f59e0b' },
                  ].map((card) => (
                    <div 
                      key={card.label}
                      className="rounded-xl p-2 sm:p-3 text-center overflow-hidden"
                      style={{ backgroundColor: '#fff', border: '1px solid #eef2f7' }}
                    >
                      <div className="text-[8px] sm:text-[9px] uppercase tracking-wide font-semibold text-gray-400 truncate">
                        {card.label}
                      </div>
                      <div 
                        className="text-xl sm:text-2xl font-bold my-0.5"
                        style={{ color: card.color }}
                      >
                        {card.value}
                      </div>
                      <div className="text-[8px] sm:text-[9px] truncate" style={{ color: card.subColor }}>
                        {card.sub}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bar Chart */}
                <div className="px-5 pb-5">
                  <div 
                    className="rounded-xl p-4"
                    style={{ backgroundColor: '#fff', border: '1px solid #eef2f7' }}
                  >
                    <div className="flex items-end gap-1.5 h-16">
                      {[65, 40, 82, 55, 28, 50, 88, 35, 72, 60, 45, 78].map((height, i) => {
                        const colors = ['#1abc9c', '#1abc9c', '#376eb5', '#4A8FDB', '#f59e0b', '#1abc9c', '#376eb5', '#1abc9c', '#4A8FDB', '#1abc9c', '#f59e0b', '#376eb5'];
                        return (
                          <div
                            key={i}
                            className="dash-bar-animate flex-1 rounded-t"
                            style={{ 
                              height: `${height}%`,
                              backgroundColor: colors[i],
                              opacity: (i % 3 === 1) ? 0.45 : 0.75,
                              animationDelay: `${0.6 + i * 0.08}s`
                            }}
                          />
                        );
                      })}
                    </div>
                    
                    {/* Platform legend */}
                    <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: '1px solid #eef2f7' }}>
                      {[
                        { label: 'ChatGPT', color: '#376eb5' },
                        { label: 'Perplexity', color: '#1abc9c' },
                        { label: 'Google AI', color: '#f59e0b' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-[10px] text-gray-400">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating gradient accents achter dashboard */}
              <div 
                className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl z-10 opacity-50"
                style={{ background: 'linear-gradient(135deg, #4A8FDB 0%, #376eb5 100%)' }}
              />
              <div 
                className="absolute -bottom-4 -left-4 w-32 h-20 rounded-2xl z-10 opacity-40"
                style={{ background: 'linear-gradient(135deg, #1abc9c 0%, #16a085 100%)' }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
