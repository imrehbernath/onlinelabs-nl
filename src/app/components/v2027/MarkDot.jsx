'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// De punt achter een H2 als venster: opent kort met een beeld als de kop in beeld komt en sluit weer.
// Puur decoratie (aria-hidden), staat stil bij reduced motion.
export default function MarkDot({ img, pos = 'center', char = '.', color = '#376EB5' }) {
  const ref = useRef(null);
  const [state, setState] = useState('');

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
          setState('is-open');
          t2 = setTimeout(() => setState('is-closing'), 1900);
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
      <span className={`ol-mw ${state}`} aria-hidden="true">
        <Image src={img} alt="" width={160} height={160} sizes="160px" quality={75} style={{ objectFit: 'cover', objectPosition: pos }} />
      </span>
    </span>
  );
}
