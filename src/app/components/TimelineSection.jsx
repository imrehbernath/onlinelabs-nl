'use client';
import Image from 'next/image';

// Helper function to extract YouTube video ID
function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Helper function to extract Vimeo video ID
function getVimeoId(url) {
  if (!url) return null;
  const regExp = /vimeo\.com\/(\d+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// Helper function to check if URL is a direct video file
function isDirectVideo(url) {
  if (!url) return false;
  return /\.(mp4|webm|ogg)$/i.test(url);
}

function TimelineSection({ title, subtitle, items }) {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Background Gradient Accent */}
      <div 
        className="absolute top-0 left-0 w-full h-96 opacity-5 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #376eb5 0%, transparent 100%)'
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          {subtitle && (
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-primary font-semibold text-sm tracking-widest uppercase mb-6"
              style={{ backgroundColor: 'rgba(55, 110, 181, 0.1)' }}
            >
              {subtitle}
            </div>
          )}
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            {title}
          </h2>
          
          {/* Intro Text */}
          <div className="max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Van Haarlem Online naar OnlineLabs
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Wat begon als een stadportal in 2000, groeide uit tot een complete ondernemersreis. 
              Van Haarlem Online en Amsterdamonline tot de oprichting van SEOlab in 2008, elke stap 
              legde de basis voor wat nu OnlineLabs is: een full-service partner voor digitale groei 
              en innovatie.
            </p>
          </div>
        </div>

        {/* Enhanced Timeline - Alternating Layout */}
        <div className="max-w-6xl mx-auto">
          {items.map((item, index) => {
            // Check what media we have
            const youtubeId = getYouTubeId(item.videoUrl);
            const vimeoId = getVimeoId(item.videoUrl);
            const isDirectVideoUrl = isDirectVideo(item.videoUrl);
            const hasVideo = youtubeId || vimeoId || isDirectVideoUrl;
            const hasImage = item.image?.node?.sourceUrl;
            const hasMedia = hasVideo || hasImage;
            
            // Alternate sides
            const isLeft = index % 2 === 0;
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            return (
              <div 
                key={index} 
                className="relative mb-16 lg:mb-20 last:mb-0"
              >
                {/* Center Line (only visible on desktop) */}
                {!isLast && (
                  <div 
                    className="hidden lg:block absolute left-1/2 top-20 bottom-0 w-0.5 -ml-px"
                    style={{
                      background: 'linear-gradient(180deg, rgba(55, 110, 181, 0.3) 0%, rgba(55, 110, 181, 0.1) 100%)'
                    }}
                    aria-hidden="true"
                  />
                )}
                
                {/* Timeline Dot - Center on Desktop */}
                <div 
                  className="hidden lg:flex absolute left-1/2 top-0 -ml-6 w-12 h-12 rounded-full items-center justify-center z-10 shadow-lg transition-transform duration-300 hover:scale-110"
                  style={{
                    background: isFirst 
                      ? 'linear-gradient(135deg, #376eb5 0%, #4a8ed1 100%)'
                      : 'linear-gradient(135deg, #376eb5 0%, #2d5a94 100%)',
                    boxShadow: '0 4px 20px rgba(55, 110, 181, 0.3)'
                  }}
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
                
                {/* Mobile Dot (left side) */}
                <div 
                  className="lg:hidden absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #376eb5 0%, #4a8ed1 100%)',
                  }}
                >
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>

                {/* Mobile Line */}
                {!isLast && (
                  <div 
                    className="lg:hidden absolute left-5 top-12 bottom-0 w-0.5"
                    style={{
                      background: 'linear-gradient(180deg, rgba(55, 110, 181, 0.3) 0%, rgba(55, 110, 181, 0.1) 100%)'
                    }}
                    aria-hidden="true"
                  />
                )}
                
                {/* Content */}
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ml-14 lg:ml-0 ${!hasMedia ? 'lg:grid-cols-1' : ''}`}>
                  {/* Text Content */}
                  <div className={`${isLeft ? 'lg:order-1 lg:text-right lg:pr-16' : 'lg:order-2 lg:pl-16'} ${!hasMedia ? 'lg:text-center lg:px-16' : ''}`}>
                    <div className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full mb-4 ${isLeft ? 'lg:float-right lg:clear-both' : 'lg:float-left lg:clear-both'} ${!hasMedia ? 'lg:float-none' : ''}`}
                      style={{ 
                        backgroundColor: isFirst ? 'rgba(55, 110, 181, 0.15)' : 'rgba(55, 110, 181, 0.1)'
                      }}
                    >
                      <span className="text-sm font-bold text-primary uppercase tracking-wider">
                        {item.year}
                      </span>
                    </div>
                    
                    <div className={`${isLeft ? 'lg:clear-both' : 'lg:clear-both'}`}>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {item.title}
                      </h3>
                      <div 
                        className="text-base lg:text-lg text-gray-600 leading-relaxed prose prose-lg max-w-none prose-a:text-primary prose-a:underline hover:prose-a:text-primary-dark"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </div>
                  </div>
                  
                  {/* Media (Video or Image) */}
                  {hasMedia && (
                    <div className={`${isLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group transition-transform duration-500 hover:scale-[1.02]">
                        {/* Glow Effect */}
                        <div 
                          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                          style={{
                            background: 'linear-gradient(135deg, rgba(55, 110, 181, 0.3) 0%, rgba(55, 110, 181, 0.1) 100%)'
                          }}
                          aria-hidden="true"
                        />
                        
                        {/* YouTube Video */}
                        {youtubeId && (
                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title={item.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                        )}

                        {/* Vimeo Video */}
                        {!youtubeId && vimeoId && (
                          <iframe
                            src={`https://player.vimeo.com/video/${vimeoId}`}
                            title={item.title}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                        )}

                        {/* Direct Video File */}
                        {!youtubeId && !vimeoId && isDirectVideoUrl && (
                          <video
                            controls
                            className="absolute inset-0 w-full h-full object-cover"
                          >
                            <source src={item.videoUrl} type={`video/${item.videoUrl.split('.').pop()}`} />
                            Je browser ondersteunt geen video playback.
                          </video>
                        )}

                        {/* Image (fallback if no video) */}
                        {!hasVideo && hasImage && (
                          <>
                            {/* Enhanced Shine effect on hover */}
                            <div 
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"
                              style={{
                                background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                              }}
                            />
                            <Image
                              src={item.image.node.sourceUrl}
                              alt={item.image.node.altText || item.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;