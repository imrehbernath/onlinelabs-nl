'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// De punt achter een H2 als venster: opent kort met een beeld als de kop in beeld komt en sluit weer.
// Puur decoratie (aria-hidden), staat stil bij reduced motion.
export default function MarkDot({ img, pos = 'center', char = '.', color = '#376EB5' }) {
  const ref = useRef(null);
  const winRef = useRef(null);
  const [state, setState] = useState('');
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.IntersectionObserver) return undefined;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const head = el.closest('h2') || el;
    let armed = true;
    let t1 = 0;
    let t2 = 0;
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && armed) {
        armed = false;
        t1 = setTimeout(() => {
          // Past het venster rechts niet in beeld, dan opent het naar links
          const w = winRef.current ? winRef.current.offsetWidth : 0;
          setFlip(el.getBoundingClientRect().left + w > window.innerWidth - 8);
          setState('is-open');
          t2 = setTimeout(() => setState('is-closing'), 1400);
        }, 450);
      }
      if (!en.isIntersecting) armed = true;
    }, { threshold: 0.9 });
    io.observe(head);
    return () => { io.disconnect(); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <span ref={ref} className="ol-mark" style={{ color }}>
      {char}
      <span ref={winRef} className={`ol-mw ${state}${flip ? ' is-left' : ''}`} aria-hidden="true">
        <Image src={img} alt="" width={160} height={160} sizes="160px" quality={75} style={{ objectFit: 'cover', objectPosition: pos }} />
      </span>
    </span>
  );
}
