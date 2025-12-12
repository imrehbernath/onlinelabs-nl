'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function TeamSection({ title, subtitle, description, teamMembers }) {
  const router = useRouter();

  const handleCardClick = (detailurl) => {
    if (!detailurl) return;
    
    // Externe URL (begint met http)
    if (detailurl.startsWith('http')) {
      window.open(detailurl, '_blank', 'noopener,noreferrer');
    } else {
      // Interne URL - gebruik Next.js router
      router.push(detailurl);
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
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
          {description && (
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => {
            // Gebruik lowercase detailurl (zoals WPGraphQL het teruggeeft)
            const hasLink = member.detailurl;
            
            return (
              <div 
                key={index}
                onClick={() => handleCardClick(member.detailurl)}
                className={`text-center ${hasLink ? 'cursor-pointer group' : ''}`}
              >
                <div>
                  {/* Photo */}
                  <div className="relative aspect-[3/4] mb-4 rounded-xl overflow-hidden shadow-lg">
                    {member.photo?.node?.sourceUrl ? (
                      <>
                        {/* Shine effect on hover */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"
                          style={{
                            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                          }}
                        />
                        <Image
                          src={member.photo.node.sourceUrl}
                          alt={member.photo.node.altText || member.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  
                  {/* Role */}
                  {member.role && (
                    <p className="text-base text-primary font-medium mb-2">
                      {member.role}
                    </p>
                  )}
                  
                  {/* Description */}
                  {member.description && (
                    <p className="text-base text-gray-600 leading-relaxed mb-4">
                      {member.description}
                    </p>
                  )}

                  {/* LinkedIn Icon */}
                  {member.linkedinUrl && (
                    <div className="flex justify-center">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center w-8 h-8 text-gray-700 hover:text-[#0A66C2] transition-colors duration-300"
                        aria-label={`${member.name} op LinkedIn`}
                      >
                        <svg 
                          className="w-6 h-6" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
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

export default TeamSection;