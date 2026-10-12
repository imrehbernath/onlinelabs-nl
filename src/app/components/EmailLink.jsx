'use client';

import { useState, useEffect } from 'react';

// Het mailadres staat nergens als één stuk tekst in de HTML-bron, zodat
// scrapers die op "iets@domein" zoeken het niet vinden. Voor bezoekers ziet
// het er exact hetzelfde uit en blijft het kopieerbaar.
// Geef het adres daarom nooit als prop of string door vanuit een pagina:
// dan belandt het alsnog in de bron.
const USER = 'hallo';
const DOMAIN = 'onlinelabs.nl';

// Alleen de tekst. React zet de drie delen als losse tekstknopen in de HTML.
export function EmailAddress() {
  return (
    <>
      {USER}
      {'@'}
      {DOMAIN}
    </>
  );
}

// Klikbare variant. De mailto: wordt pas in de browser gezet; in de bron (en
// zonder JavaScript) wijst de link naar de contactpagina.
export default function EmailLink({ className, children }) {
  const [href, setHref] = useState('/contact');

  useEffect(() => {
    setHref(['mailto:' + USER, DOMAIN].join('@'));
  }, []);

  return (
    <a href={href} className={className}>
      {children ?? <EmailAddress />}
    </a>
  );
}
