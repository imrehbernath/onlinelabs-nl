export default function TrainingProblemSection({
  badge = 'Het probleem',
  title,
  content,
  quote,
  quoteAuthor,
  wrongExample,
  rightExample
}) {
  return (
    <section className="py-20 lg:py-24 bg-[#F3F4F6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <div>
            <span className="inline-block text-[#376eb5] text-sm font-semibold tracking-wide uppercase mb-4">
              {badge}
            </span>
            
            {title && (
              <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {title}
              </h2>
            )}
            
            {content && (
              <div 
                className="prose prose-lg text-gray-600 mb-8"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
            
            {quote && (
              <div className="bg-white border-l-4 border-[#376eb5] p-6 rounded-r-xl">
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  "{quote}"
                </p>
                {quoteAuthor && (
                  <p className="mt-3 font-semibold text-gray-900">
                    {quoteAuthor}
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Visual - Examples */}
          {(wrongExample || rightExample) && (
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
              
              {/* Wrong Example */}
              {wrongExample && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
                  <div className="flex items-center gap-2 text-red-600 font-semibold text-sm mb-3">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    Zo niet
                  </div>
                  <code className="block bg-white p-4 rounded-lg text-sm text-gray-700 font-mono leading-relaxed">
                    {wrongExample}
                  </code>
                </div>
              )}
              
              {/* Right Example */}
              {rightExample && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-green-600 font-semibold text-sm mb-3">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="16,12 12,8 8,12"/>
                      <line x1="12" y1="16" x2="12" y2="8"/>
                    </svg>
                    Zo wel
                  </div>
                  <code className="block bg-white p-4 rounded-lg text-sm text-gray-700 font-mono leading-relaxed">
                    {rightExample}
                  </code>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
