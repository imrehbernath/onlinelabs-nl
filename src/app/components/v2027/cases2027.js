// Cases in de 2027-stijl. Andere cases komen voorlopig nog uit WordPress.

const CDN = 'https://cdn.onlinelabs.nl/wp-content/uploads';

export const CASES_2027 = {
  'de-smaak-van-italie': {
    name: 'De Smaak van Italië',
    sector: 'Magazine',
    url: 'https://www.desmaakvanitalie.nl',
    urlLabel: 'desmaakvanitalie.nl',
    metaTitle: 'De Smaak van Italië case | Website en SEO | OnlineLabs',
    metaDescription: 'Nieuwe website voor De Smaak van Italië: 1.199 artikelen, 218 plaatsen en 300 accommodaties overzichtelijk bij elkaar. Al 6 jaar website en SEO.',
    lede: 'Een jaar bouwen aan een nieuwe website voor het magazine over reizen, eten en leven in Italië. Overzichtelijk en door de redactie zelf te beheren.',
    proof: ['Al 6 jaar samen', 'Website en SEO', 'Live sinds oktober 2026'],
    desktop: { src: `${CDN}/2026/10/De-Smaak-van-Italie-Desktop.webp`, alt: 'Homepage van de nieuwe website van De Smaak van Italië op desktop' },
    stats: [
      { n: '1.199', l: 'artikelen' },
      { n: '218', l: 'plaatsen' },
      { n: '300', l: 'accommodaties' },
      { n: '6 jaar', l: 'samenwerking' },
    ],
    storyH: 'Van magazine naar website',
    story: 'De Smaak van Italië is het Nederlandse magazine over reizen, eten en leven in Italië. We werken al 6 jaar samen aan de website en de vindbaarheid in Google. De oude site draaide op een eigen thema met Elementor en was lastig te beheren. Na een jaar bouwen staat sinds oktober 2026 de nieuwe website live.',
    done: [
      { t: 'Eigen ontwerp', d: 'Een rustig, redactioneel design dat past bij het magazine. Gebouwd in WordPress, zodat de redactie alles zelf kan beheren.' },
      { t: 'Regio’s en plaatsen', d: 'Elke regio heeft een eigen pagina met de plaatsen als tegels boven de filters. Zo vind je snel artikelen, recepten en accommodaties per plek.' },
      { t: 'Content overgezet', d: 'Artikelen, recepten en reisaanbod van de oude site zijn overgezet met een eigen script, inclusief redirects van oude naar nieuwe adressen.' },
      { t: 'Gekoppeld aan de webshop', d: 'Uitgelichte producten uit de webshop staan automatisch op de magazinepagina. Wisselen kan de redactie zelf.' },
    ],
    more: [
      { name: 'Forteiland Pampus', href: '/ons-werk/forteiland-pampus', img: `${CDN}/2026/10/Forteiland-Pampus-desktop.webp`, alt: 'Website Forteiland Pampus' },
      { name: 'Evert Groot', href: '/ons-werk/evert-groot', img: `${CDN}/2026/10/Evert-Groot-desktop.webp`, alt: 'Website Evert Groot' },
      { name: 'HvanA', href: '/ons-werk/hvana', img: `${CDN}/2026/10/HvanA-Desktop.webp`, alt: 'Website Hogeschool van Amsterdam' },
    ],
  },
};
