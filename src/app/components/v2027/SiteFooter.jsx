// Afsluiter en footer 2027: overgenomen uit het Claude Design-bestand (Main.dc.html).
export default function SiteFooter() {
  return (
    <div className="v27">
      <div className="ol-endwrap ol-snap" style={{ padding: '16px' }}>
      <div className="ol-endpanel" style={{ maxWidth: '1600px', margin: '0 auto', background: '#0A0F1F', color: '#FFFFFF', borderRadius: '12px', padding: '72px 56px 40px', boxSizing: 'border-box', minHeight: 'calc(100vh - 136px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '72px' }}>

      <section className="ol-cta-top" aria-labelledby="ol-cta-h" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '64px', alignItems: 'end' }}>
      <h2 id="ol-cta-h" className="ol-cta-h" style={{ margin: '0', fontSize: 'clamp(40px, 5.6vw, 88px)', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.035em' }}><span style={{ display: 'block', whiteSpace: 'nowrap' }}>Kop koffie aan</span><span style={{ display: 'block', whiteSpace: 'nowrap' }}>de Herengracht<span style={{ color: '#6FA3E6' }}>?</span></span></h2>
      <div>
      <p style={{ margin: '0', fontSize: '20px', lineHeight: '1.6', color: '#A9AFBF' }}>Vertel waar je staat en waar je naartoe wilt. Dan kijken we samen wat er nodig is, zonder verkooppraatje.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 32px', marginTop: '32px' }}>
      <a className="ol-pill" href="/contact" style={{ display: 'inline-flex', alignItems: 'center', height: '56px', padding: '0 30px', borderRadius: '999px', background: '#FFFFFF', color: '#0A0F1F', fontSize: '16px', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap' }}>Kennismaken</a>
      <a className="ol-big" href="tel:+31208202022" style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: '600', textDecoration: 'none' }}>020 820 20 22</a>
      <a className="ol-big" href="mailto:hallo@onlinelabs.nl" style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: '600', textDecoration: 'none' }}>hallo@onlinelabs.nl</a>
      </div>
      </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '48px' }}>
      <div className="ol-foot-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))', gap: '40px' }}>
      <div>
      <a href="/" aria-label="OnlineLabs, naar de homepage" style={{ display: 'inline-block' }}><img src="/onlinelabs-logo-2027-wit.svg" alt="OnlineLabs" style={{ height: '26px', width: 'auto', display: 'block' }} /></a>
      <p style={{ margin: '20px 0 0', fontSize: '15px', lineHeight: '1.7', color: '#A9AFBF' }}>Herengracht 221<br />1016 BG Amsterdam</p>
      <a className="ol-fl" href="https://www.google.com/partners/agency?id=8066409399" target="_blank" rel="noopener" style={{ display: 'inline-block', marginTop: '16px', fontSize: '15px' }}>Google Partner</a>
      </div>
      <div>
      <p style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '600', color: '#FFFFFF' }}>Wat we doen</p>
      <ul style={{ listStyle: 'none', margin: '0', padding: '0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
      <li><a className="ol-fl" href="/skills/seo-specialist">SEO &amp; vindbaarheid</a></li>
      <li><a className="ol-fl" href="/skills/geo-optimalisatie">GEO en AI-zichtbaarheid</a></li>
      <li><a className="ol-fl" href="/skills/online-adverteren">Online adverteren</a></li>
      <li><a className="ol-fl" href="/skills/website-laten-maken">Website laten maken</a></li>
      <li><a className="ol-fl" href="/skills/website-snelheid-optimalisatie">Website snelheid</a></li>
      <li><a className="ol-fl" href="/contact">Maatwerk en applicaties</a></li>
      </ul>
      </div>
      <div>
      <p style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '600', color: '#FFFFFF' }}>OnlineLabs</p>
      <ul style={{ listStyle: 'none', margin: '0', padding: '0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
      <li><a className="ol-fl" href="/aanpak">Aanpak</a></li>
      <li><a className="ol-fl" href="/ons-werk">Ons werk</a></li>
      <li><a className="ol-fl" href="/blog">Blog</a></li>
      <li><a className="ol-fl" href="/over-ons">Over ons</a></li>
      <li><a className="ol-fl" href="/contact">Contact</a></li>
      </ul>
      </div>
      <div>
      <p style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '600', color: '#FFFFFF' }}>Volg ons</p>
      <ul style={{ listStyle: 'none', margin: '0', padding: '0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' }}>
      <li><a className="ol-fl" href="https://www.linkedin.com/company/onlinelabs" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a className="ol-fl" href="https://teun.ai" target="_blank" rel="noopener">Teun.ai</a></li>
      </ul>
      </div>
      </div>
      <div className="ol-foot-bottom" style={{ marginTop: '48px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '12px 32px', fontSize: '14px', color: '#A9AFBF' }}>
      <span>© {new Date().getFullYear()} OnlineLabs</span>
      <span style={{ display: 'flex', gap: '24px' }}><a className="ol-fl" href="/privacyverklaring">Privacyverklaring</a><a className="ol-fl" href="/algemene-voorwaarden">Algemene voorwaarden</a></span>
      </div>
      </footer>

      </div>
      </div>
    </div>
  );
}
