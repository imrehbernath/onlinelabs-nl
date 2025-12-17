import { Inter, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import GoogleTagManager from './components/GoogleTagManager';
import { getAllServices } from './lib/wordpress';

// Inter - Google Font (fallback voor Metropolis)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Playfair Display - Google Font (serif voor headers)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

// Metropolis - Local Font (primary sans-serif)
const metropolis = localFont({
  src: [
    {
      path: '../../public/fonts/Metropolis-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Metropolis-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Metropolis-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Metropolis-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-metropolis',
  display: 'swap',
  fallback: ['var(--font-inter)', 'system-ui', 'sans-serif'],
});

// 🔒 CONDITIONAL NOINDEX: alleen production indexeren
const isProduction = process.env.VERCEL_ENV === 'production';

export const metadata = {
  metadataBase: new URL('https://www.onlinelabs.nl'),
  title: {
    default: 'OnlineLabs | Online Marketing Bureau Amsterdam - SEO & GEO Expert',
    template: '%s | OnlineLabs',
  },
  description: 'OnlineLabs: Online marketing bureau uit Amsterdam. Specialist in SEO, GEO optimalisatie, webdesign en AI-zichtbaarheid. 15+ jaar ervaring.',
  keywords: ['online marketing amsterdam', 'seo bureau', 'geo optimalisatie', 'webdesign', 'wordpress specialist', 'ai zichtbaarheid'],
  authors: [{ name: 'OnlineLabs', url: 'https://www.onlinelabs.nl' }],
  creator: 'OnlineLabs',
  publisher: 'OnlineLabs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.onlinelabs.nl',
    siteName: 'OnlineLabs',
  },
  // 🔒 CONDITIONAL ROBOTS: alleen production indexed
  robots: {
    index: isProduction,
    follow: isProduction,
    googleBot: {
      index: isProduction,
      follow: isProduction,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code-here',
  },
};

export default async function RootLayout({ children }) {
  // Fetch services voor mega menu - Server Component (geen client-side fetch!)
  // Cached 24 uur via ISR voor maximale performance
  let services = [];
  try {
    services = await getAllServices();
  } catch (error) {
    console.error('Failed to fetch services:', error);
    // Fallback naar default services in Header component
  }

  return (
    <html lang="nl" className={`${metropolis.variable} ${inter.variable} ${playfair.variable}`}>
      <head>
        {/* 
          OPTIMIZED PRECONNECTS:
          - Removed: fonts.googleapis.com (niet gebruikt - we laden fonts via next/font)
          - Removed: fonts.gstatic.com (niet gebruikt - next/font regelt dit)
          - Fixed: cdn.onlinelabs.nl zonder crossOrigin (CORS mismatch fix)
          - Removed: duplicate cdn.onlinelabs.nl preconnect
        */}
        <link rel="preconnect" href="https://cdn.onlinelabs.nl" />
        <link rel="dns-prefetch" href="https://cdn.onlinelabs.nl" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        
        {/* Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* 🔒 EXTRA NOINDEX BACKUP voor non-production */}
        {!isProduction && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        
        {/* Structured Data wordt beheerd door Rank Math per pagina */}
      </head>
      <body className={`${metropolis.variable} antialiased`}>
        <GoogleTagManager />
        <Header services={services} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        
        {/* 🔴 VISUAL INDICATOR voor non-production */}
        {!isProduction && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg text-xs font-bold z-[9999] shadow-lg">
            {process.env.VERCEL_ENV || 'development'} - NOINDEX
          </div>
        )}
      </body>
    </html>
  );
}