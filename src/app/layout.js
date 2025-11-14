import { Inter, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
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

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.onlinelabs.nl/#organization",
        "name": "OnlineLabs",
        "url": "https://www.onlinelabs.nl/",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://www.onlinelabs.nl/#logo",
          "url": "https://cdn.onlinelabs.nl/wp-content/uploads/2025/01/18075444/OnlineLabs-logo.png",
          "contentUrl": "https://cdn.onlinelabs.nl/wp-content/uploads/2025/01/18075444/OnlineLabs-logo.png",
          "caption": "OnlineLabs",
          "inLanguage": "nl-NL",
          "width": "432",
          "height": "432"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Herengracht 221",
          "postalCode": "1016 BG",
          "addressLocality": "Amsterdam",
          "addressCountry": "NL"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+31-20-820-2022",
          "contactType": "customer service",
          "email": "hallo@onlinelabs.nl",
          "areaServed": "NL",
          "availableLanguage": ["nl", "en"]
        },
        "sameAs": ["https://www.linkedin.com/company/onlinelabs"],
        "foundingDate": "2008",
        "description": "OnlineLabs is een online marketing bureau uit Amsterdam, gespecialiseerd in SEO, GEO optimalisatie, WordPress websites en AI-zichtbaarheid."
      },
      {
        "@type": "WebSite",
        "@id": "https://www.onlinelabs.nl/#website",
        "url": "https://www.onlinelabs.nl",
        "name": "OnlineLabs",
        "publisher": {
          "@id": "https://www.onlinelabs.nl/#organization"
        },
        "inLanguage": "nl-NL"
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.onlinelabs.nl/#localbusiness",
        "name": "OnlineLabs",
        "image": "https://cdn.onlinelabs.nl/wp-content/uploads/2025/01/18075444/OnlineLabs-logo.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Herengracht 221",
          "addressLocality": "Amsterdam",
          "postalCode": "1016 BG",
          "addressCountry": "NL"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "52.3730796",
          "longitude": "4.8862259"
        },
        "url": "https://www.onlinelabs.nl",
        "telephone": "+31-20-820-2022",
        "priceRange": "€€",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ]
      }
    ]
  };

  return (
    <html lang="nl" className={`${metropolis.variable} ${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://cdn.onlinelabs.nl" />
        <link rel="preconnect" href="https://wordpress-988065-5984089.cloudwaysapps.com" />
        <link rel="dns-prefetch" href="https://wordpress-988065-5984089.cloudwaysapps.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* 🔒 EXTRA NOINDEX BACKUP voor non-production */}
        {!isProduction && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </head>
      <body className={`${metropolis.variable} antialiased`}>
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