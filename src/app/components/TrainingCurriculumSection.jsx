export default function TrainingCurriculumSection({
  title = 'Wat je leert',
  subtitle,
  modules = []
}) {
  if (!modules || modules.length === 0) return null;

  return (
    <section className="py-20 lg:py-24" style={{ backgroundColor: '#FAF9F6' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#376eb5] text-sm font-semibold tracking-wide uppercase mb-4">
            Programma
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

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {modules.map((module, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 flex gap-5 hover:shadow-lg transition-shadow"
            >
              {/* Module Number */}
              <div className="w-12 h-12 min-w-[48px] bg-[#376eb5] text-white rounded-xl flex items-center justify-center font-bold text-xl">
                {index + 1}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                  {module.title}
                </h3>
                
                {module.description && (
                  <p className="text-gray-600 mb-4">
                    {module.description}
                  </p>
                )}
                
                {/* Topics */}
                {module.topics && (
                  <div className="flex flex-wrap gap-2">
                    {module.topics.split(',').map((topic, topicIndex) => (
                      <span 
                        key={topicIndex}
                        className="bg-[#F3F4F6] text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {topic.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
