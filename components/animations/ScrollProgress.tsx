'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/animations';

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const tween = gsap.to(ref.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left gradient-brand-line"
      style={{
        transform: 'scaleX(0)',
      }}
    />
  );
}
