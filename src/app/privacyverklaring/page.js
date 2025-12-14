const SITE_URL = 'https://www.onlinelabs.nl';

export const revalidate = 86400; // 24 hours ISR

export const metadata = {
  title: 'Privacyverklaring – Cookies & privacy',
  description: 'Privacyverklaring van OnlineLabs. Lees hoe wij omgaan met je persoonsgegevens, cookies en welke rechten je hebt. AVG-compliant.',
  alternates: {
    canonical: '/privacyverklaring',
  },
  openGraph: {
    title: 'Privacyverklaring | OnlineLabs',
    description: 'Privacyverklaring van OnlineLabs. Lees hoe wij omgaan met je persoonsgegevens en cookies.',
    url: '/privacyverklaring',
    type: 'website',
    locale: 'nl_NL',
    siteName: 'OnlineLabs',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const privacySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/privacyverklaring/#webpage`,
      "url": `${SITE_URL}/privacyverklaring`,
      "name": "Privacyverklaring – OnlineLabs",
      "description": "Privacyverklaring van OnlineLabs. Lees hoe wij omgaan met je persoonsgegevens en cookies.",
      "isPartOf": {
        "@id": `${SITE_URL}/#website`
      },
      "inLanguage": "nl-NL",
      "datePublished": "2024-01-01",
      "dateModified": "2025-01-01"
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/privacyverklaring/#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": SITE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Privacyverklaring",
          "item": `${SITE_URL}/privacyverklaring`
        }
      ]
    }
  ]
};

export default function PrivacyverklaringPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />

      <main className="pt-24 sm:pt-28 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          {/* Header */}
          <header className="mb-12">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Privacyverklaring
            </h1>
            <p className="text-lg text-gray-600">
              Om je zo goed mogelijk van dienst te zijn, slaan we zowel online als offline gegevens van je op. We respecteren je privacy en gaan vertrouwelijk met je gegevens om.
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg prose-gray max-w-none">
            
            {/* Overeenkomsten & Formulieren */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Overeenkomsten & formulieren</h2>
              <p className="text-gray-700 mb-4">
                Wanneer je een formulier via onze website invult, hebben we gegevens nodig om contact met je op te nemen. We verwerken en gebruiken deze gegevens alleen voor zakelijk gebruik, zodat we goed kunnen samenwerken.
              </p>
              <p className="text-gray-700 mb-4">
                Als we contact met je hebben – of dat nu voor een offerte, een sollicitatie of via e-mail is – bewaren we je gegevens zolang dat nodig is voor de volledige beantwoording en afhandeling.
              </p>
              <p className="text-gray-700 mb-6">
                Als je contact met ons opneemt via de website, verzamelen we de data die je in het formulier hebt ingevuld. Daarnaast slaan we je IP-adres en de browser-gebruikersagentstring op, om spam op te sporen.
              </p>
              
              {/* Bewaartermijnen tabel */}
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type gegevens</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Bewaartermijn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-gray-700">Contactformulier</td>
                      <td className="px-6 py-4 text-gray-700">Max. 2 jaar</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-gray-700">Offerteformulier</td>
                      <td className="px-6 py-4 text-gray-700">Max. 2 jaar</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-gray-700">Aanvraag via e-mail</td>
                      <td className="px-6 py-4 text-gray-700">Max. 4 jaar</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-gray-700">Klantgegevens</td>
                      <td className="px-6 py-4 text-gray-700">Max. 4 jaar</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Verwerkersovereenkomst */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Verwerkersovereenkomst</h2>
              <p className="text-gray-700">
                We kunnen een verwerkersovereenkomst met je opstellen, waarin wordt afgesproken welke persoonsgegevens verwerkt mogen worden en hoe deze worden opgeslagen. We behandelen al je gegevens vertrouwelijk en delen ze niet met derden.
              </p>
            </section>

            {/* Beveiliging */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Beveiliging</h2>
              <p className="text-gray-700">
                Onze website is beveiligd met een SSL-certificaat. Dit betekent dat alle gegevens die je via onze website verstuurt, versleuteld worden met SSL-beveiliging op basis van het HTTPS-protocol. Gegevens die je via een formulier invult, worden opgeslagen in WordPress.
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
              <p className="text-gray-700 mb-6">
                OnlineLabs gebruikt cookies om content en advertenties te personaliseren, functies voor social media aan te bieden en ons websiteverkeer te analyseren. We delen informatie over je gebruik van onze site met onze partners voor social media, adverteren en analyse.
              </p>
              
              {/* Cookies tabel */}
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Categorie</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Cookie</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Looptijd</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Beschrijving</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-gray-700">Analytics</td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">_gcl_au</td>
                      <td className="px-4 py-3 text-gray-700">3 maanden</td>
                      <td className="px-4 py-3 text-gray-700">Google Tag Manager cookie voor advertentie-efficiëntie</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">Analytics</td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">_ga</td>
                      <td className="px-4 py-3 text-gray-700">1 jaar</td>
                      <td className="px-4 py-3 text-gray-700">Google Analytics voor bezoekers- en sessiegegevens</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700">Analytics</td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">_gid</td>
                      <td className="px-4 py-3 text-gray-700">1 dag</td>
                      <td className="px-4 py-3 text-gray-700">Google Analytics voor websitegebruik en analyserapport</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">Advertentie</td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">YSC</td>
                      <td className="px-4 py-3 text-gray-700">Sessie</td>
                      <td className="px-4 py-3 text-gray-700">YouTube cookie voor video weergaven</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700">Advertentie</td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">VISITOR_INFO1_LIVE</td>
                      <td className="px-4 py-3 text-gray-700">6 maanden</td>
                      <td className="px-4 py-3 text-gray-700">YouTube cookie voor bandbreedte en spelerinterface</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">Advertentie</td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">IDE</td>
                      <td className="px-4 py-3 text-gray-700">1 jaar</td>
                      <td className="px-4 py-3 text-gray-700">Google DoubleClick voor relevante advertenties</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-gray-700 mt-6">
                Als je onze website blijft gebruiken, ga je akkoord met onze cookies. Wil je liever geen cookies gebruiken? Je kunt je voorkeuren aanpassen in het instellingenpaneel van de cookie consent banner.
              </p>
            </section>

            {/* Analytics */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
              <p className="text-gray-700 mb-4">
                We gebruiken Google Analytics om het bezoekersgedrag en het verkeer op onze website te analyseren. Zo kunnen we zien hoeveel bezoekers we per periode hebben, hoeveel daarvan terugkerend zijn, en welk percentage via mobiele apparaten of desktop komt.
              </p>
              <p className="text-gray-700">
                Deze gegevens zijn puur statistisch en gericht op groepen gebruikers, niet op individuen. IP-adressen zijn geanonimiseerd, zodat we jouw gegevens nooit kunnen herleiden naar jou als individu.
              </p>
            </section>

            {/* Ingesloten inhoud */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Ingesloten inhoud van andere websites</h2>
              <p className="text-gray-700">
                Berichten op onze site kunnen ingesloten (embedded) inhoud tonen, zoals video's, afbeeldingen of berichten. Ingesloten inhoud van andere websites gedraagt zich exact hetzelfde alsof je die andere website rechtstreeks bezoekt. Deze websites kunnen data over jou verzamelen, cookies gebruiken, tracking van derde partijen insluiten en je interactie met de ingesloten inhoud monitoren.
              </p>
            </section>

            {/* Gegevens inzien */}
            <section className="mt-12 p-6 bg-gray-50 rounded-xl">
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Je gegevens inzien & verwijdering</h2>
              <p className="text-gray-700 mb-4">
                Wil je weten welke gegevens we van je hebben bewaard? Of wil je gegevens laten wijzigen of verwijderen? Neem dan contact met ons op:
              </p>
              <p className="text-gray-700 mb-2">
                <strong>E-mail:</strong>{' '}
                <a href="mailto:hallo@onlinelabs.nl" className="text-[#376eb5] hover:underline">
                  hallo@onlinelabs.nl
                </a>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Telefoon:</strong>{' '}
                <a href="tel:0208202022" className="text-[#376eb5] hover:underline">
                  020 820 20 22
                </a>
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Contactpersoon:</strong> Imre Bernáth
              </p>
              <p className="text-gray-700">
                Je kan hier onze{' '}
                <a href="/algemene-voorwaarden" className="text-[#376eb5] hover:underline">
                  algemene voorwaarden
                </a>{' '}
                lezen.
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}