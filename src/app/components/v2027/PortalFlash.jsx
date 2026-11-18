'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Flitsreeks in het ronde venster van de homepage-hero: team, kantoor en buurt in harde cuts.
// Niet lager dan 170 ms per frame en maar een keer afspelen (WCAG 2.3.1, fotogevoelige epilepsie).
const FRAME_MS = 170;
const LOOPS = 1;
const FLASH_START_MS = 380;
const REPLAY_COOLDOWN_MS = 4000;

export const FLASH_FRAMES = [
  { src: '/img/flash/01-herengracht-221-onlinelabs.webp', pos: '50% 50%' },
  { src: '/img/flash/02-kantoor-onlinelabs-herengracht.webp', pos: '50% 50%' },
  { src: '/img/flash/03-imre-bernath-onlinelabs.webp', pos: '50% 50%' },
  { src: '/img/flash/04-tram-amsterdam.webp', pos: '50% 50%' },
  { src: '/img/flash/05-sanne-verschoor-onlinelabs.webp', pos: '50% 50%' },
  { src: '/img/flash/06-vergaderruimte-onlinelabs.webp', pos: '50% 50%' },
  { src: '/img/flash/07-paleis-op-de-dam-amsterdam.webp', pos: '50% 50%' },
  { src: '/img/flash/08-uitzicht-kantoor-onlinelabs.webp', pos: '50% 50%' },
  { src: '/img/flash/09-adrian-enders-onlinelabs.webp', pos: '50% 50%' },
];

export default function PortalFlash({ frames = FLASH_FRAMES, active = false, reduced = false }) {
  const rootRef = useRef(null);
  const keep = useRef([]); // houdt de gedecodeerde beelden vast, zodat de img-elementen uit het geheugen laden
  const [list, setList] = useState([]); // frames die echt geladen en gedecodeerd zijn
  const [ready, setReady] = useState(false);
  const timer = useRef(0);
  const delay = useRef(0);
  const raf = useRef(0);
  const running = useRef(false);
  const done = useRef(false);
  const lastStart = useRef(0);
  const activeRef = useRef(active);
  activeRef.current = active;

  // Pas na de load-gebeurtenis en in een rustig moment laden en decoderen, zodat LCP niet geraakt wordt
  useEffect(() => {
    let cancelled = false;
    let idleId = 0;
    let fallback = 0;
    const want = reduced ? frames.slice(0, 1) : frames;
    const load = async () => {
      const res = await Promise.allSettled(want.map((f) => {
        const im = new Image();
        im.decoding = 'async';
        im.src = f.src;
        keep.current.push(im);
        return im.decode().then(() => f);
      }));
      if (cancelled) return;
      setList(res.filter((r) => r.status === 'fulfilled').map((r) => r.value));
      setReady(true);
    };
    const idle = () => {
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(load, { timeout: 2000 });
      else fallback = window.setTimeout(load, 1200);
    };
    if (document.readyState === 'complete') idle();
    else window.addEventListener('load', idle, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', idle);
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      clearTimeout(fallback);
    };
  }, [frames, reduced]);

  const imgs = () => (rootRef.current ? Array.from(rootRef.current.querySelectorAll('.ol-flash-img')) : []);

  // Een frame tonen zonder React-render: harde cut, alleen klassen en de jitter-variabele
  const show = (i, j) => {
    imgs().forEach((el, k) => {
      el.classList.toggle('is-on', k === i);
      el.classList.remove('is-land');
      el.style.setProperty('--j', k === i ? String(j) : '1');
    });
  };

  const stopTimers = () => {
    clearTimeout(timer.current);
    clearTimeout(delay.current);
    cancelAnimationFrame(raf.current);
  };

  // Landing op frame 1 (Herengracht van buiten): rustig van 1.07 naar 1 in 450 ms
  const land = useCallback(() => {
    stopTimers();
    running.current = false;
    done.current = true;
    show(0, 1.07);
    raf.current = requestAnimationFrame(() => {
      raf.current = requestAnimationFrame(() => {
        const el = imgs()[0];
        if (!el) return;
        el.classList.add('is-land');
        el.style.setProperty('--j', '1');
      });
    });
  }, []);

  const play = useCallback((wait) => {
    const n = imgs().length;
    if (!n) return;
    stopTimers();
    running.current = true;
    lastStart.current = Date.now();
    let k = 0;
    const total = n * LOOPS;
    const step = () => {
      if (!activeRef.current || k >= total) { land(); return; }
      show(k % n, k % 2 ? 1.07 : 1);
      k += 1;
      timer.current = setTimeout(step, FRAME_MS);
    };
    delay.current = setTimeout(step, wait);
  }, [land]);

  // Start zodra het venster open is, alles gedecodeerd is en de hero in beeld is
  useEffect(() => {
    if (reduced || !ready) return;
    if (active && !done.current && !running.current) play(FLASH_START_MS);
    if (!active && running.current) land();
  }, [active, ready, reduced, play, land]);

  // Opnieuw afspelen bij hover, alleen met muis en niet vaker dan eens per 4 seconden
  useEffect(() => {
    if (reduced || !ready) return undefined;
    if (!window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const portal = rootRef.current && rootRef.current.closest('.ol-portal');
    if (!portal) return undefined;
    const onEnter = () => {
      if (!activeRef.current || running.current || !done.current) return;
      if (Date.now() - lastStart.current < REPLAY_COOLDOWN_MS) return;
      play(0);
    };
    portal.addEventListener('pointerenter', onEnter);
    return () => portal.removeEventListener('pointerenter', onEnter);
  }, [ready, reduced, play]);

  useEffect(() => () => stopTimers(), []);

  // Na het laden staan alle frames klaar; is het venster al open maar nog niet alles geladen,
  // dan alleen het eerste frame. Bij reduced motion alleen frame 1, statisch.
  let shown = [];
  if (ready) shown = list;
  else if (active) shown = frames.slice(0, 1);

  return (
    <span ref={rootRef} className="ol-flash" aria-hidden="true">
      {shown.map((f, i) => (
        <img
          key={f.src}
          src={f.src}
          alt=""
          width="640"
          height="640"
          decoding="async"
          fetchPriority="low"
          className={i === 0 ? 'ol-flash-img is-on' : 'ol-flash-img'}
          style={{ objectPosition: f.pos }}
        />
      ))}
    </span>
  );
}
