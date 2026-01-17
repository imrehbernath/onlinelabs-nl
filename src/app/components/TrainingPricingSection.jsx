import Link from 'next/link';

export default function TrainingPricingSection({
  title = 'Kies je trainingsformule',
  subtitle,
  packages = []
}) {
  if (!packages || packages.length === 0) return null;

  return (
    <section id="pricing" className="py-20 lg:py-24 bg-white scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#376eb5] text-sm font-semibold tracking-wide uppercase mb-4">
            Investering
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Pricing Cards */}
        <div className={`grid gap-6 items-start max-w-5xl mx-auto ${
          packages.length === 1 ? 'grid-cols-1 max-w-md' :
          packages.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl' :
          'grid-cols-1 md:grid-cols-3'
        }`}>
          {packages.map((pkg, index) => {
            const isFeatured = pkg.featured;
            const features = pkg.features ? pkg.features.split('\n').filter(f => f.trim()) : [];
            
            return (
              <div 
                key={index}
                className={`relative rounded-2xl p-8 lg:p-10 text-center ${
                  isFeatured 
                    ? 'bg-[#376eb5] text-white transform md:scale-105 shadow-[0_20px_60px_rgba(55,110,181,0.3)]' 
                    : 'bg-[#F3F4F6]'
                }`}
              >
                {/* Featured Label */}
                {isFeatured && pkg.label && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1abc9c] text-white px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide">
                    {pkg.label}
                  </span>
                )}
                
                {/* Package Name */}
                <h3 className={`font-serif text-2xl font-bold mb-2 ${isFeatured ? 'text-white' : 'text-gray-900'}`}>
                  {pkg.name}
                </h3>
                
                {/* Subtitle */}
                {pkg.subtitle && (
                  <p className={`text-sm mb-6 ${isFeatured ? 'text-white/80' : 'text-gray-500'}`}>
                    {pkg.subtitle}
                  </p>
                )}
                
                {/* Price */}
                <div className={`text-5xl font-bold mb-1 ${isFeatured ? 'text-white' : 'text-gray-900'}`}>
                  {pkg.price}
                </div>
                
                {/* Price Period */}
                {pkg.pricePeriod && (
                  <p className={`text-sm mb-8 ${isFeatured ? 'text-white/80' : 'text-gray-500'}`}>
                    {pkg.pricePeriod}
                  </p>
                )}
                
                {/* Features */}
                {features.length > 0 && (
                  <ul className="text-left space-y-3 mb-8">
                    {features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <svg 
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isFeatured ? 'text-[#1abc9c]' : 'text-[#376eb5]'}`} 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24"
                        >
                          <polyline points="20,6 9,17 4,12"/>
                        </svg>
                        <span className={isFeatured ? 'text-white' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {/* CTA Button */}
                <Link
                  href={pkg.ctaLink || '/contact'}
                  className={`block w-full py-4 px-6 rounded-lg font-semibold text-center transition-all ${
                    isFeatured 
                      ? 'bg-white text-[#376eb5] hover:bg-gray-100' 
                      : 'border-2 border-[#376eb5] text-[#376eb5] hover:bg-[#376eb5] hover:text-white'
                  }`}
                >
                  {pkg.ctaText || 'Schrijf in'}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
