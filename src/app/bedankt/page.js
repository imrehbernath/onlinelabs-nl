import Link from 'next/link';

export const metadata = {
  title: 'Bedankt voor je bericht',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BedanktPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="pt-32 sm:pt-40 pb-20 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
          
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Bedankt voor je bericht!
          </h1>

          {/* Message */}
          <div className="space-y-4 text-lg text-gray-600 mb-10">
            <p>
              We hebben je aanvraag ontvangen en nemen binnen 24 uur contact met je op.
            </p>
            <p>
              Ons team van specialisten staat klaar om samen met jou te werken aan jouw online succes.
            </p>
          </div>

          {/* Contact Info Card */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-10">
            <p className="text-gray-700 mb-4">
              Heb je directe vragen? Neem gerust contact op:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <a 
                href="mailto:hallo@onlinelabs.nl" 
                className="inline-flex items-center gap-2 text-[#376eb5] hover:text-[#2d5a94] font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hallo@onlinelabs.nl
              </a>
              <a 
                href="tel:0208202022" 
                className="inline-flex items-center gap-2 text-[#376eb5] hover:text-[#2d5a94] font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                020 820 20 22
              </a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#376eb5] text-white font-semibold rounded-lg hover:bg-[#2d5a94] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Naar homepage
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#376eb5] font-semibold rounded-lg border-2 border-[#376eb5] hover:bg-gray-50 transition-all duration-200"
            >
              Lees onze blog
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}