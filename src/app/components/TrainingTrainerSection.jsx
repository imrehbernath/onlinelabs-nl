import Image from 'next/image';

export default function TrainingTrainerSection({
  name = 'Imre Bernáth',
  title = 'Founder OnlineLabs & Teun.ai',
  image,
  bio,
  stats = []
}) {
  // Fallback image URL (Gravatar)
  const imageUrl = image?.sourceUrl || image?.node?.sourceUrl || 'https://gravatar.com/avatar/35c26275319f1c247e76cd36518ee34a?size=400';
  const imageAlt = image?.altText || image?.node?.altText || name;

  return (
    <section className="py-20 lg:py-24 bg-[#F3F4F6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
          
          {/* Image */}
          <div className="relative mx-auto lg:mx-0">
            <div className="relative w-64 h-64 lg:w-[300px] lg:h-[300px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 256px, 300px"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block text-[#376eb5] text-sm font-semibold tracking-wide uppercase mb-4">
              Je trainer
            </span>
            
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {name}
            </h2>
            
            <p className="text-[#376eb5] font-semibold text-lg mb-6">
              {title}
            </p>
            
            {bio && (
              <div 
                className="prose prose-lg text-gray-600 mb-8"
                dangerouslySetInnerHTML={{ __html: bio }}
              />
            )}
            
            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="flex flex-wrap gap-10 justify-center lg:justify-start">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-4xl font-bold text-[#376eb5] leading-none mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
