const SITE_URL = 'https://www.onlinelabs.nl';

export const revalidate = 86400; // 24 hours ISR

export const metadata = {
  title: 'Algemene voorwaarden – Leveringsvoorwaarden',
  description: 'Algemene voorwaarden van OnlineLabs. KvK 34368510, Amsterdam. Lees onze leveringsvoorwaarden, betalingstermijnen en aansprakelijkheid.',
  alternates: {
    canonical: '/algemene-voorwaarden',
  },
  openGraph: {
    title: 'Algemene voorwaarden | OnlineLabs',
    description: 'Algemene voorwaarden van OnlineLabs. KvK 34368510, Amsterdam. Lees onze leveringsvoorwaarden en betalingstermijnen.',
    url: '/algemene-voorwaarden',
    type: 'website',
    locale: 'nl_NL',
    siteName: 'OnlineLabs',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const algemeeneVoorwaardenSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/algemene-voorwaarden/#webpage`,
      "url": `${SITE_URL}/algemene-voorwaarden`,
      "name": "Algemene voorwaarden – OnlineLabs",
      "description": "Algemene voorwaarden van OnlineLabs, online marketing bureau Amsterdam. KvK 34368510.",
      "isPartOf": {
        "@id": `${SITE_URL}/#website`
      },
      "inLanguage": "nl-NL",
      "datePublished": "2024-01-01",
      "dateModified": "2025-01-01"
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/algemene-voorwaarden/#breadcrumb`,
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
          "name": "Algemene voorwaarden",
          "item": `${SITE_URL}/algemene-voorwaarden`
        }
      ]
    }
  ]
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(algemeeneVoorwaardenSchema) }}
      />

      <main className="pt-24 sm:pt-28 pb-16 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          {/* Header */}
          <header className="mb-12">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Algemene voorwaarden
            </h1>
            <p className="text-lg text-gray-600">
              Onderhavige, algemene voorwaarden betreffen de voorwaarden van OnlineLabs, statutair gevestigd te Amsterdam en kantoorhoudende te Amsterdam aan de Herengracht 221, ingeschreven in het handelsregister van de Kamer van Koophandel voor Amsterdam onder dossiernummer: 34368510.
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg prose-gray max-w-none">
            
            {/* 1. Toepasselijkheid */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">1. Toepasselijkheid</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen c.q. offertes en aanvaardingen door OnlineLabs en alle daarmee samenhangende (rechts)handelingen tussen OnlineLabs en de opdrachtgever (hierna gezamenlijk genoemd: "Partijen"), dan wel de rechtsopvolger(s) van de opdrachtgever.</li>
                <li>Voor zover de opdrachtgever in haar aanbod of aanvaarding zou verwijzen naar andere (algemene) voorwaarden, wordt de toepasselijkheid daarvan uitdrukkelijk van de hand gewezen, althans prevaleren deze algemene voorwaarden van OnlineLabs voor het geval de algemene voorwaarden van de opdrachtgever ook toepasselijk mochten zijn.</li>
                <li>Als en voor zover enige bepaling van deze algemene voorwaarden nietig wordt verklaard of wordt vernietigd, dan zullen de overige bepalingen van deze algemene voorwaarden onverminderd van kracht blijven. Partijen zullen in dat geval in overleg een nieuwe bepaling vaststellen ter vervanging van de nietige c.q. vernietigde bepaling, waarbij zoveel mogelijk de strekking van de nietige c.q. vernietigde bepaling in acht zal worden genomen.</li>
                <li>Bij tegenstrijdigheid tussen bepalingen uit een overeenkomst tussen Partijen en deze algemene voorwaarden, hebben de bepalingen uit de betreffende overeenkomst voorrang.</li>
                <li>Wijzigingen in de overeenkomst tussen Partijen en afwijkingen van deze algemene voorwaarden zullen slechts van kracht zijn, als zij schriftelijk zijn overeengekomen. OnlineLabs is op ieder moment gerechtigd de prijzen, diensten en algemene voorwaarden te wijzigen of aan te vullen. Wijzigingen gelden ook voor reeds gesloten overeenkomsten tussen Partijen. Als de opdrachtgever een wijziging niet wil accepteren, dient de opdrachtgever dit binnen 1 week na bekend daarmee te zijn geworden schriftelijk gemotiveerd mede te delen aan OnlineLabs. OnlineLabs kan daarop de wijziging heroverwegen. Als OnlineLabs daarop de wijziging niet intrekt, kan de opdrachtgever binnen 7 dagen nadien de Overeenkomst beëindigen tegen deze datum.</li>
                <li>Deze algemene voorwaarden zijn te vinden op deze pagina en aldaar in pdf-formaat te downloaden. De voorwaarden worden op verzoek kosteloos toegezonden.</li>
              </ol>
            </section>

            {/* 2. Offertes */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">2. Offertes</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Offertes en andere aanbiedingen van OnlineLabs zijn vrijblijvend en moeten worden beschouwd als een uitnodiging tot het doen van een aanbod tot het aangaan van een overeenkomst tussen Partijen.</li>
                <li>Alle aanbiedingen en offertes van OnlineLabs worden gedurende 30 dagen gestand gedaan, tenzij anders vermeldt.</li>
              </ol>
            </section>

            {/* 3. Uitvoering overeenkomst */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">3. Uitvoering overeenkomst</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Opdrachtgever staat in voor de juistheid en volledigheid van de door of namens haar aan OnlineLabs verstrekte gegevens waarop OnlineLabs haar aanbieding c.q. offerte baseert. Als die gegevens niet juist of volledig blijken te zijn, heeft OnlineLabs het recht om de aanbieding te wijzigen, dan wel om op die gegevens gebaseerde werkzaamheden in rekening te brengen.</li>
                <li>De tussen OnlineLabs en de opdrachtgever te sluiten overeenkomst draagt het karakter van een inspanningsverbintenis, tenzij en voor zover in de schriftelijke overeenkomst OnlineLabs uitdrukkelijk een resultaat heeft toegezegd en het betreffende resultaat tevens met voldoende bepaaldheid is omschreven in de overeenkomst. OnlineLabs verleent geen garanties met betrekking tot te behalen resultaten.</li>
                <li>OnlineLabs werkt volgens de Google webmaster richtlijnen.</li>
                <li>Eventuele afspraken over een serviceniveau worden schriftelijk per Service Level Agreement overeengekomen.</li>
                <li>In de overeenkomst genoemde leveringstermijnen gelden niet als fatale termijnen, tenzij Partijen uitdrukkelijk schriftelijk anders zijn overeengekomen. Overschrijding door OnlineLabs van een levertermijn kwalificeert niet als een aan OnlineLabs toe te rekenen tekortkoming en rechtvaardigt niet de ontbinding van de overeenkomst door opdrachtgever.</li>
                <li>Als is overeengekomen dat de opdracht in fasen zal worden uitgevoerd, is OnlineLabs gerechtigd de aanvang van de diensten die tot een volgende fase behoren uit te stellen totdat de opdrachtgever resultaten van de daaraan voorafgaande fase schriftelijk heeft goedgekeurd en/of wanneer een (termijn)betaling nog niet geheel of gedeeltelijk is voldaan.</li>
                <li>OnlineLabs is niet verplicht aanwijzingen op te volgen die de inhoud of omvang van de overeengekomen diensten wijzigen of aanvullen; als dergelijke aanwijzingen wel worden opgevolgd, dan zullen de desbetreffende werkzaamheden worden vergoed overeenkomstig de gebruikelijke tarieven van OnlineLabs.</li>
                <li>OnlineLabs is gerechtigd de overeenkomst geheel of gedeeltelijk door derden te laten uitvoeren, althans derden bij de uitvoering van de overeenkomst in te schakelen.</li>
                <li>Geleverde diensten zullen tussen Partijen gelden als geaccepteerd als de opdrachtgever niet binnen 5 werkdagen na aflevering van de betreffende diensten, schriftelijk en gedetailleerd heeft onderbouwd waarom de door OnlineLabs geleverde diensten niet worden geaccepteerd.</li>
                <li>Het risico van verlies, diefstal, verduistering of beschadiging van zaken, producten, informatie, data, documenten of programma's die in het kader van de uitvoering van de overeenkomst tot stand worden gebracht of worden gebruikt, gaat over op de opdrachtgever op het moment dat deze in de beschikkingsmacht van de opdrachtgever worden gebracht.</li>
                <li>OnlineLabs is gerechtigd de nakoming van de overeenkomst tussen Partijen op te schorten als de opdrachtgever de verplichtingen uit de overeenkomst niet, niet volledig of niet tijdig nakomt.</li>
                <li>Bij opzegging, beëindiging of ontbinding, om welke reden dan ook, is OnlineLabs gerechtigd om per direct alle opgeslagen data te wissen of ontoegankelijk te maken en alle accounts van de opdrachtgever op te heffen. OnlineLabs is niet verplicht in dat geval opdrachtgever een kopie van deze data te verschaffen.</li>
              </ol>
            </section>

            {/* 4. Prijzen en betaling */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">4. Prijzen en betaling</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Alle prijzen zijn exclusief omzetbelasting, andere heffingen welke van overheidswege worden opgelegd en kosten van OnlineLabs die direct gemoeid zijn met de uitvoering van de overeenkomst tussen Partijen.</li>
                <li>Tenzij uitdrukkelijk anders overeengekomen, hebben prijsindicaties, begrotingen, budgetten en/of voorcalculaties van OnlineLabs slechts een indicatief karakter en kunnen daaraan geen rechten of verwachtingen worden ontleend.</li>
                <li>Als schriftelijke vastlegging van de vergoeding voor OnlineLabs niet heeft plaats gevonden, dan is OnlineLabs bevoegd deze vast te stellen op basis van haar gebruikelijke (uur)tarieven.</li>
                <li>Als blijkt dat de opdrachtgever verkeerde of onvolledige informatie heeft aangeleverd, dan is de opdrachtgever gehouden de werkzaamheden en kosten die zijn ontstaan door vertraging aan OnlineLabs te vergoeden conform de gebruikelijke (uur)tarieven van OnlineLabs.</li>
                <li>Partijen zullen in hun overeenkomst de datum of data waarop OnlineLabs de vergoeding voor diensten aan opdrachtgever in rekening brengt, vastleggen. Bij gebreke van een specifieke regeling zal de opdrachtgever binnen 14 dagen na factuurdatum betalen.</li>
                <li>Indien de opdrachtgever de verschuldigde bedragen niet tijdig betaalt, is de opdrachtgever, zonder dat enige aanmaning of ingebrekestelling nodig is, over het openstaande bedrag wettelijke handelsrente verschuldigd. OnlineLabs is gerechtigd om € 100 administratiekosten in rekening te brengen voor het verzenden van een aanmaning.</li>
                <li>OnlineLabs heeft het recht diensten, inloggegevens, data en overige informatie die zich nog onder OnlineLabs bevinden, onder zich te houden wanneer de opdrachtgever niet aan haar betalingsverplichting voldoet.</li>
                <li>OnlineLabs is gerechtigd om gedurende de looptijd van een overeenkomst de prijzen voor haar diensten jaarlijks, met ingang van 1 januari, te verhogen conform het prijsindexcijfer van het voorgaande kalenderjaar, vermeerderd met ten hoogste 10%.</li>
                <li>Aanmerkingen of klachten over verzonden facturen, nota's en declaraties dienen binnen 14 dagen na ontvangst schriftelijk en gemotiveerd kenbaar te zijn gemaakt bij gebreke waarvan zij gelden als geaccepteerd.</li>
                <li>OnlineLabs is gerechtigd de opdrachtgever tussentijds, na aflevering c.q. voltooiing van een opdracht en/of op basis van voorschotten te factureren.</li>
                <li>De opdrachtgever gaat akkoord met elektronische facturatie door OnlineLabs.</li>
                <li>In geval van liquidatie, faillissement, beslag of surseance van betaling van de opdrachtgever zijn de vorderingen van OnlineLabs op de opdrachtgever onmiddellijk opeisbaar.</li>
              </ol>
            </section>

            {/* 5. Wijziging en meerwerk */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">5. Wijziging en meerwerk</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>De opdrachtgever aanvaardt dat de tijdsplanning van de overeenkomst kan worden beïnvloed als tussentijds de omvang van de overeenkomst wordt uitgebreid en/of gewijzigd. Als de tussentijdse wijziging de overeengekomen vergoeding beïnvloedt, zal OnlineLabs dit zo snel mogelijk aan de opdrachtgever bevestigen.</li>
                <li>Als op grond van een wijziging van de overeenkomst als gevolg van extra verzoeken, wensen van opdrachtgever of uit noodzaak, door OnlineLabs extra werkzaamheden moeten worden verricht (meerwerk), zullen deze werkzaamheden op nacalculatiebasis aan de hand van de op dat moment gebruikelijke tarieven aan opdrachtgever in rekening worden gebracht, tenzij uitdrukkelijk schriftelijk anders is overeengekomen.</li>
              </ol>
            </section>

            {/* 6. Verplichtingen opdrachtgever */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">6. Verplichtingen opdrachtgever</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>De opdrachtgever is gehouden al datgene te doen en laten wat redelijkerwijs nodig en wenselijk is om een tijdige en juiste uitvoering van de overeenkomst met OnlineLabs mogelijk te maken.</li>
                <li>De opdrachtgever draagt er zorg voor dat alle gegevens en informatie, waarvan OnlineLabs aangeeft dat deze belangrijk of noodzakelijk zijn, tijdig aan OnlineLabs worden verstrekt en zal alle door OnlineLabs verlangde medewerking verlenen.</li>
                <li>Zolang niet alle verzochte gegevens zijn aangeleverd, heeft OnlineLabs het recht de uitvoering van de opdracht op te schorten en/of de uit de vertraging voortvloeiende extra kosten aan de opdrachtgever in rekening te brengen.</li>
                <li>Voor zover in het kader van de overeenkomst tussen Partijen door OnlineLabs gebruikersnamen en/of wachtwoorden worden verstrekt, is het de opdrachtgever zonder toestemming van OnlineLabs verboden deze aan derden te verstrekken.</li>
                <li>De opdrachtgever verleent aan OnlineLabs een exclusieve volmacht tot het verrichten van alle handelingen die OnlineLabs noodzakelijk acht bij het opzetten en beheren van de SEA-campagnes en uitvoeren van SEO-werkzaamheden.</li>
                <li>De door de zoekmachines in rekening gebrachte kosten die verband houden met de SEA-campagnes dienen in beginsel rechtstreeks door de opdrachtgever te worden betaald aan het betreffende advertentieplatform.</li>
              </ol>
            </section>

            {/* 7. Intellectueel eigendom */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">7. Intellectueel eigendom</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Tenzij in de overeenkomst anders is bepaald, berusten alle rechten van intellectuele eigendom (verder te noemen: "IE-Rechten") die rusten op al de in het kader van de overeenkomst verleende diensten uitsluitend bij OnlineLabs en/of haar licentiegevers.</li>
                <li>Niets in deze algemene voorwaarden en/of de overeenkomst tussen Partijen impliceert een overdracht van IE-Rechten. De opdrachtgever verkrijgt uitsluitend het niet-exclusieve en niet-overdraagbare gebruiksrecht op de diensten.</li>
                <li>De opdrachtgever dient de naam van OnlineLabs waar mogelijk bij de geleverde diensten te vermelden. OnlineLabs doet uitdrukkelijk geen afstand van haar persoonlijkheidsrechten genoemd in artikel 25 Auteurswet.</li>
                <li>Het is OnlineLabs toegestaan de diensten en de voor de uitvoering van de overeenkomst gebruikte materialen te gebruiken ten behoeve van promotie en/of publiciteit van OnlineLabs.</li>
                <li>De opdrachtgever vrijwaart OnlineLabs voor alle aanspraken van derden met betrekking tot IE-rechten op de door haar aan OnlineLabs ter beschikking gestelde informatie en documenten.</li>
                <li>Door schending van deze bepaling door de opdrachtgever, zal de opdrachtgever een onmiddellijk opeisbare en niet voor rechterlijke matiging vatbare boete verbeuren van € 1.000 per dag of dagdeel.</li>
              </ol>
            </section>

            {/* 8. Privacy- en cookiebeleid */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">8. Privacy- en cookiebeleid</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Het privacy- en cookiebeleid van OnlineLabs is te lezen op onze <a href="/privacyverklaring" className="text-[#376eb5] hover:underline">privacyverklaring pagina</a>. Voor vragen kan contact worden opgenomen met Imre Bernáth via hallo@onlinelabs.nl of 020 820 20 22.</li>
                <li>OnlineLabs zal met haar opdrachtgevers een verwerkersovereenkomst sluiten als dit is vereist op grond de geldende wet- en regelgeving.</li>
                <li>OnlineLabs zal passende technische en organisatorische maatregelen (doen) nemen om de persoonsgegevens die zij verwerkt in opdracht van de opdrachtgever te beveiligen.</li>
                <li>De opdrachtgever garandeert dat iedere verstrekking van (persoons)gegevens aan OnlineLabs rechtmatig is.</li>
                <li>De opdrachtgever vrijwaart OnlineLabs van alle claims wegens of in verband met inbreuk op de persoonlijke levenssfeer.</li>
                <li>OnlineLabs geeft haar klanten de mogelijkheid om een Cookie consent plugin te installeren die voldoet aan de AVG wetgeving.</li>
              </ol>
            </section>

            {/* 9. Geheimhouding */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">9. Geheimhouding</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Partijen zijn verplicht tot geheimhouding van alle vertrouwelijke informatie die zij in het kader van de overeenkomst van elkaar of uit andere bron hebben verkregen.</li>
                <li>De opdrachtgever zal de vertrouwelijke informatie niet kopiëren of op andere wijze aan derden ter beschikking stellen.</li>
                <li>De opdrachtgever zal de vertrouwelijke informatie niet voor een ander doel gebruiken, dan waarvoor deze informatie door OnlineLabs is verstrekt.</li>
                <li>De opdrachtgever is verplicht om haar eigenaren, bestuurders, directie, werknemers, hulppersonen, agenten en onderaannemers schriftelijk te verbinden tot dezelfde geheimhoudingsverplichtingen.</li>
                <li>In geval van overtreding is opdrachtgever aan OnlineLabs een onmiddellijk opeisbare boete verschuldigd van € 5.000 per overtreding per dag of dagdeel dat een overtreding voortduurt.</li>
                <li>De bepalingen van dit artikel blijven ook na beëindiging of ontbinding van de overeenkomst van kracht.</li>
              </ol>
            </section>

            {/* 10. Tussentijdse beëindiging */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">10. Tussentijdse beëindiging</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Een overeenkomst gaat in op de datum als beschreven in artikel 2 en voor de periode zoals tussen Partijen schriftelijk is overeengekomen.</li>
                <li>OnlineLabs is te allen tijde bevoegd de overeenkomst schriftelijk op te zeggen.</li>
                <li>Bij duurovereenkomsten kan opdrachtgever de overeenkomst tussentijds schriftelijk opzeggen met in achtneming van een opzegtermijn van 1 maand.</li>
                <li>OnlineLabs is gerechtigd de overeenkomst geheel of gedeeltelijk te ontbinden in geval van faillissement of surséance van betaling van de opdrachtgever.</li>
                <li>In geval van ontbinding van de overeenkomst, vindt geen ongedaanmaking plaats van hetgeen OnlineLabs al heeft geleverd en/of heeft verricht.</li>
                <li>Als de overeenkomst wordt ontbonden, dan komen alle aan de opdrachtgever verleende rechten te vervallen.</li>
              </ol>
            </section>

            {/* 11. Klachten */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">11. Klachten</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Klachten over de verrichte diensten en werkzaamheden dienen door de opdrachtgever binnen 10 werkdagen na ontdekking schriftelijk en onderbouwd te worden gemeld aan OnlineLabs.</li>
                <li>Als van een klacht later melding wordt gemaakt dan de gestelde termijn, dan komt de opdrachtgever geen recht meer toe op behandeling van de klacht of schadeloosstelling.</li>
                <li>Als komt vast te staan dat een klacht ongegrond is, dan komen de kosten daardoor ontstaan integraal voor rekening van de opdrachtgever.</li>
                <li>Het indienen van een klacht schort nimmer de betalingsverplichtingen van de opdrachtgever op.</li>
              </ol>
            </section>

            {/* 12. Beschikbaarheid */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">12. Beschikbaarheid van de geleverde diensten</h2>
              <p className="text-gray-700 mb-4">OnlineLabs zal zich inspannen om:</p>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Ononderbroken beschikbaarheid van haar systemen en netwerken te realiseren, maar biedt hierover geen garanties tenzij anders is overeengekomen.</li>
                <li>De door haar gebruikte software up-to-date te houden.</li>
                <li>Te zorgen dat de opdrachtgever gebruik kan maken van de netwerken die direct of indirect verbonden zijn met het netwerk van OnlineLabs.</li>
                <li>In geval van het niet beschikbaar zijn van de diensten, de opdrachtgever te informeren over de aard en de verwachte duur van de onderbreking.</li>
              </ol>
              <p className="text-gray-700 mt-4">OnlineLabs heeft het recht om haar systemen tijdelijk buiten gebruik te stellen ten behoeve van onderhoud, aanpassing of verbetering daarvan.</p>
            </section>

            {/* 13. Overmacht */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">13. Overmacht</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Alle leveringstermijn worden verlengd met de periode, gedurende welke OnlineLabs door overmacht is verhinderd aan haar verplichtingen te voldoen.</li>
                <li>Van overmacht aan de zijde van OnlineLabs is sprake bij onder meer oorlog, terrorisme, brand, waterschade, overstroming, werkstaking, overheidsmaatregelen, storingen in de levering van energie, en cyberaanvallen.</li>
                <li>In geval van overmacht is OnlineLabs na 90 dagen bevoegd de overeenkomst te ontbinden, zonder tot enige schadevergoeding gehouden te zijn.</li>
              </ol>
            </section>

            {/* 14. Beperking aansprakelijkheid */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">14. Beperking aansprakelijkheid</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>De aansprakelijkheid van OnlineLabs wegens toerekenbare tekortkoming is beperkt tot maximaal het bedrag dat de verzekeraar van OnlineLabs uitkeert, dan wel tot maximaal de door OnlineLabs ontvangen vergoedingen over de 3 maanden voorafgaande aan de schadeveroorzakende gebeurtenis.</li>
                <li>Onder directe schade wordt uitsluitend verstaan: redelijke kosten om de prestatie aan de overeenkomst te laten beantwoorden, en redelijke kosten ter vaststelling van de oorzaak en omvang van de schade.</li>
                <li>Iedere aansprakelijkheid van OnlineLabs voor indirecte schade, waaronder gevolgschade, winstderving en omzetderving, is uitgesloten.</li>
                <li>Voorwaarde voor het ontstaan van enig recht op schadevergoeding is steeds dat de opdrachtgever de schade zo spoedig mogelijk schriftelijk bij OnlineLabs meldt. Iedere vordering tot schadevergoeding vervalt door het verloop van 1 jaar na het ontstaan van de vordering.</li>
                <li>Het gebruik van de diensten van OnlineLabs door de opdrachtgever komt volledig voor eigen risico en verantwoordelijkheid van de opdrachtgever.</li>
              </ol>
            </section>

            {/* 15. Ontwikkeling website */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">15. Ontwikkeling website</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>OnlineLabs heeft het recht een schriftelijk akkoord te verlangen op een ontwerp en/of concept van de te verwezenlijken website alvorens met de ontwikkeling te starten.</li>
                <li>Tenzij anders is bepaald, verleent OnlineLabs aan de opdrachtgever het niet-exclusieve, niet-overdraagbare en niet-sublicentieerbare recht om de website te gebruiken.</li>
                <li>OnlineLabs heeft gedurende de ontwikkeling van een website, de website in beheer. OnlineLabs is niet aansprakelijk voor eventuele schade die buiten haar opzet of grove schuld om ontstaat.</li>
                <li>De opdrachtgever is te allen tijde verantwoordelijk voor het gebruik van de website en vrijwaart OnlineLabs voor alle aanspraken van derden.</li>
              </ol>
            </section>

            {/* 16. Hosting */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">16. Hosting</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Het is de opdrachtgever verboden om met gebruikmaking van de diensten van OnlineLabs de Nederlandse of andere toepasselijke wet- of regelgeving te schenden.</li>
                <li>De opdrachtgever dient er zorg voor te dragen dat onnodige piekbelasting bij OnlineLabs wordt voorkomen.</li>
                <li>Bij gevaar voor het functioneren van de systemen is OnlineLabs gerechtigd alle maatregelen te nemen die zij redelijkerwijs nodig acht.</li>
                <li>Het is de opdrachtgever niet toegestaan de producten en diensten van OnlineLabs te wederverkopen, tenzij anders is overeengekomen.</li>
                <li>De opdrachtgever vrijwaart OnlineLabs voor alle schade als gevolg van bovenstaande.</li>
              </ol>
            </section>

            {/* 17. Toepasselijk recht */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">17. Toepasselijk recht en bevoegde rechter</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Deze overeenkomst is onderworpen aan het Nederlandse recht. Het Weens Koopverdrag wordt hierbij nadrukkelijk uitgesloten.</li>
                <li>Een geschil wordt geacht aanwezig te zijn, zodra één van de Partijen dat verklaart.</li>
                <li>Partijen verplichten zich om geschillen eerst, in het bijzijn van hun juridisch adviseurs, proberen op te lossen, alvorens zij juridische stappen zullen nemen.</li>
                <li>Alle geschillen welke tussen Partijen mochten ontstaan zullen worden beslecht door de Rechtbank te Amsterdam.</li>
              </ol>
            </section>

            {/* Contact */}
            <section className="mt-12 p-6 bg-gray-50 rounded-xl">
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Vragen?</h2>
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
              <p className="text-gray-700">
                <strong>Contactpersoon:</strong> Imre Bernáth
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}