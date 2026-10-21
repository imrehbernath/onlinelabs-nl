import { Inter, Playfair_Display, Space_Mono, Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import './components/v2027/v2027.css';
import SiteHeader from './components/v2027/SiteHeader';
import SiteFooter from './components/v2027/SiteFooter';
import CookieConsent from './components/CookieConsent';

// Inter - Google Font (fallback voor Metropolis)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: false, // alleen fallback voor Metropolis — rendert nooit als primair, dus niet preloaden
});

// Playfair Display - Google Font (serif voor headers)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'], // 500/800/900 nergens gebruikt (geen font-medium/extrabold/black op serif)
});

// Space Mono - Google Font (mono labels / "soul" details: trust tags, eyebrows, pill)
const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
  weight: ['400', '700'],
  preload: false, // decoratieve labels/eyebrows — niet kritisch above the fold, dus niet preloaden
});

// Poppins - Google Font (huisstijl 2027: header, homepage en footer)
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '600', '800'],
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
    default: 'Online marketing bureau Amsterdam | OnlineLabs | AI',
    template: '%s | OnlineLabs',
  },
  description: 'Online marketing bureau Amsterdam met AI-platform Teun.ai. SEO, GEO optimalisatie, webdesign en conversie. 17+ jaar ervaring, 150+ klanten.',
  keywords: ['online marketing bureau amsterdam', 'geo optimalisatie', 'ai zichtbaarheid', 'seo bureau amsterdam', 'webdesign amsterdam', 'teun.ai'],
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
};

export default async function RootLayout({ children }) {
  return (
    <html lang="nl" className={`${metropolis.variable} ${inter.variable} ${playfair.variable} ${spaceMono.variable} ${poppins.variable}`}>
      <head>
        {/* 
          CDN preconnect: niet nodig op homepage hero (hardcoded),
          maar wel voor About foto, blog, skills, cases en andere subpagina's.
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
        <SiteHeader />
        <main className="min-h-screen">
          {children}
        </main>
        <SiteFooter />
        
        {/* 🔴 VISUAL INDICATOR voor non-production */}
        {!isProduction && (
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg text-xs font-bold z-[9999] shadow-lg">
            {process.env.VERCEL_ENV || 'development'} - NOINDEX
          </div>
        )}

        <CookieConsent />
      </body>
    </html>
  );
}