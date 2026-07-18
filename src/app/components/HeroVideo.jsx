'use client';

import { useEffect, useState } from 'react';

/* Laadt de hero-video pas na de EERSTE gebruikersinteractie (pointer/touch/toets/wheel).
   Waarom: de video staat NIET in de server-render, dus Googlebot en Screaming Frog
   (die niet interacteren) laden 'm nooit en renderen de still-achtergrond — geen zware
   video die hun render-engine breekt. Echte bezoekers krijgen de video zodra ze
   bewegen of scrollen. 'scroll' bewust NIET gebruikt: Googlebot scrollt programmatisch,
   maar vuurt geen wheel/pointer/touch events. */
export default function HeroVideo() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const trigger = () => setShow(true);
    const events = ['pointermove', 'pointerdown', 'touchstart', 'keydown', 'wheel'];
    events.forEach((e) => window.addEventListener(e, trigger, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, trigger));
  }, []);

  if (!show) return null;

  return (
    <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
      <source src="/amsterdam.webm" type="video/webm" />
      <source src="/amsterdam.mp4" type="video/mp4" />
    </video>
  );
}
