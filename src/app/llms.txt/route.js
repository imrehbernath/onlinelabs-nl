import { getAllBlogPostsBasic } from '../lib/wordpress';

/*
  Dynamische /llms.txt (llmstxt.org-formaat) voor AI-/LLM-vindbaarheid.
  Vaste secties (bedrijf, diensten, team) zijn curated; de bloglijst wordt
  live uit WordPress opgehaald en 1x per dag opnieuw gegenereerd (ISR),
  zodat nieuwe artikelen automatisch meekomen.
*/

const SITE_URL = 'https://www.onlinelabs.nl';

export const revalidate = 86400; // 24 uur

const INTRO = `# OnlineLabs

> Online marketing bureau uit Amsterdam, actief sinds 2008. OnlineLabs helpt bedrijven groeien met SEO, GEO (AI-zichtbaarheid), webdesign, websitesnelheid en conversie-optimalisatie. Met het eigen AI-platform Teun.ai maken we merken zichtbaar in Google, ChatGPT en andere AI-platformen.

Kerngegevens:

- Bedrijf: OnlineLabs — online marketing bureau in Amsterdam
- Sinds: 2008 (17+ jaar ervaring, 150+ klanten)
- Adres: Herengracht 221, 1016 BG Amsterdam
- E-mail: hallo@onlinelabs.nl
- Telefoon: +31 20 820 20 22
- Erkenning: Google Partner, 5★ Google Reviews
- Eigen AI-platform: Teun.ai (https://teun.ai)
- Taal: Nederlands (nl-NL)

## Diensten (skills)

- [Alle diensten](${SITE_URL}/skills): overzicht van alle skills en onze werkwijze
- [SEO & vindbaarheid](${SITE_URL}/skills/seo-specialist): hogere rankings en meer organisch verkeer via techniek, content en autoriteit
- [GEO optimalisatie (AI-SEO)](${SITE_URL}/skills/geo-optimalisatie): het antwoord worden in ChatGPT en andere AI-platformen
- [Online adverteren](${SITE_URL}/skills/online-adverteren): zichtbaar via Google Ads en social advertising
- [Webdesign & UX](${SITE_URL}/skills/website-laten-maken): websites die scoren in Google én AI en bezoekers overtuigen
- [Website snelheid](${SITE_URL}/skills/website-snelheid-optimalisatie): snelle websites die voldoen aan de Core Web Vitals
- [Conversie-optimalisatie](${SITE_URL}/skills/conversie-optimalisatie-specialist): meer resultaat uit elke bezoeker

## Belangrijkste pagina's

- [Homepage](${SITE_URL}/): wie we zijn en wat we doen
- [Over ons](${SITE_URL}/over-ons): het team en het verhaal achter OnlineLabs
- [Ons werk](${SITE_URL}/ons-werk): klantcases en behaalde resultaten
- [Blog](${SITE_URL}/blog): artikelen over SEO, GEO, AI-zichtbaarheid en online marketing
- [Trainingen](${SITE_URL}/trainingen): trainingen en workshops
- [Contact](${SITE_URL}/contact): neem contact op of vraag een analyse aan

## Teun.ai

- [Teun.ai](https://teun.ai): het AI-platform van OnlineLabs voor AI-zichtbaarheid (GEO) — meet en verbetert hoe jouw merk verschijnt in ChatGPT, Google AI en andere AI-platformen

## Team & auteurs

- [Imre Bernath](${SITE_URL}/auteur/imre-bernath): oprichter van Teun.ai
- [Sanne Verschoor](${SITE_URL}/auteur/sanne-verschoor)
- [Adrian Enders](${SITE_URL}/auteur/adrian-enders)
- [Colin Dijkstra](${SITE_URL}/auteur/colin-dijkstra)`;

const OPTIONAL = `## Optional

- [Case: HvanA (Hogeschool van Amsterdam)](${SITE_URL}/ons-werk/hvana): migratie van 3.400 artikelen naar WordPress met behoud van design en functionaliteit
- [Case: Evert Groot](${SITE_URL}/ons-werk/evert-groot): SEO en webdesign voor meer zichtbaarheid en aanvragen
- [Case: Forteiland Pampus](${SITE_URL}/ons-werk/forteiland-pampus): 10+ jaar samenwerking aan websites, SEO en campagnes
- [LinkedIn](https://www.linkedin.com/company/onlinelabs)
- [YouTube](https://www.youtube.com/@OnlineLabs-nl)
- [Privacyverklaring](${SITE_URL}/privacyverklaring)
- [Algemene voorwaarden](${SITE_URL}/algemene-voorwaarden)`;

// Veelvoorkomende HTML-entities uit WordPress-titels/excerpts naar leesbare tekst.
function decodeEntities(str = '') {
  return str
    .replace(/&amp;|&#0*38;/g, '&')
    .replace(/&#0*39;|&#8217;|&rsquo;|&lsquo;|&#8216;/g, "'")
    .replace(/&quot;|&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&hellip;|&#8230;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;|&#0*60;/g, '<')
    .replace(/&gt;|&#0*62;/g, '>');
}

// Excerpt inkorten tot één beknopte regel.
function short(text, max = 150) {
  const t = decodeEntities(text).replace(/\s+/g, ' ').trim();
  if (!t) return '';
  if (t.length <= max) return t;
  return t.slice(0, max - 1).replace(/[\s,;:.–—-]+$/, '') + '…';
}

export async function GET() {
  let posts = [];
  try {
    posts = await getAllBlogPostsBasic(200);
  } catch {
    posts = [];
  }

  const blogSection =
    posts.length > 0
      ? '## Blog — artikelen\n\n' +
        posts
          .map((p) => {
            const title = decodeEntities(p.title);
            const desc = short(p.excerpt, 150);
            return `- [${title}](${SITE_URL}/blog/${p.slug})${desc ? ': ' + desc : ''}`;
          })
          .join('\n')
      : `## Blog\n\n- [Blog](${SITE_URL}/blog): artikelen over SEO, GEO, AI-zichtbaarheid en online marketing`;

  const body = `${INTRO}\n\n${blogSection}\n\n${OPTIONAL}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
