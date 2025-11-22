'use client';

import Image from 'next/image';

function ContactMap() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-primary font-semibold text-sm tracking-widest uppercase mb-6"
            style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Ons kantoor
          </div>
          
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            Bezoek ons in hartje Amsterdam
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            Ons kantoor ligt aan de Herengracht, in het bruisende centrum van Amsterdam. Perfect bereikbaar met tram 1, 2 en 5 (halte Koningsplein).
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          
          {/* Google Maps */}
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.85827198372!2d4.884908777073317!3d52.37298984710281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c60a32b3be5411%3A0xedd2b94507940e9e!2sSEOlab!5e0!3m2!1snl!2snl!4v1736441168365!5m2!1snl!2snl" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="OnlineLabs locatie op Google Maps"
            />
          </div>

          {/* Office Photo */}
          <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl group">
            {/* Shine effect on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
              }}
            />
            
            <Image
              src="https://wordpress-988065-5984089.cloudwaysapps.com/wp-content/uploads/2025/11/OnlineLabs-kantoor.webp"
              alt="OnlineLabs kantoor aan de Herengracht in Amsterdam"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Photo caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 z-10">
              <p className="text-white font-medium text-lg">
                Ons kantoor aan de Herengracht 221
              </p>
              <p className="text-white/80 text-base mt-1">
                In het hart van de Amsterdamse grachtengordel
              </p>
            </div>
          </div>

        </div>

        {/* Directions */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              Hoe kom je bij ons?
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Met het OV</h4>
                  <p className="text-base text-gray-600">
                    Tram 1, 2, 5 - halte Koningsplein (2 min lopen)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Met de auto</h4>
                  <p className="text-base text-gray-600">
                    Parkeergarage Q-Park Byzantium (5 min lopen)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Met de fiets</h4>
                  <p className="text-base text-gray-600">
                    Fietsenrekken voor de deur en in de buurt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Shine animation CSS */}
      <style jsx>{`
        @keyframes shine {
          0%, 100% { transform: translateX(-100%) rotate(45deg); }
          50% { transform: translateX(100%) rotate(45deg); }
        }
      `}</style>
    </section>
  );
}

export default ContactMap;