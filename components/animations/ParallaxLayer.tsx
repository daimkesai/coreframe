'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/animations';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxLayer({
  children,
  speed = 0.5,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const yPercent = (1 - speed) * 100;

    const tween = gsap.to(ref.current, {
      yPercent: -yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
