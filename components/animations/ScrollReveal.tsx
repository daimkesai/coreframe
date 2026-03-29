'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/animations';
import { cn } from '@/lib/utils';

type Variant = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'maskWipe';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

const variantConfigs: Record<Variant, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
  fadeUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, ease: 'power2.out' },
  },
  fadeLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0, ease: 'power2.out' },
  },
  fadeRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0, ease: 'power2.out' },
  },
  scaleUp: {
    from: { opacity: 0, scale: 0.85 },
    to: { opacity: 1, scale: 1, ease: 'power4.out' },
  },
  maskWipe: {
    from: { clipPath: 'inset(0 100% 0 0)' },
    to: { clipPath: 'inset(0 0% 0 0)', ease: 'power3.inOut' },
  },
};

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.8,
  stagger = 0,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const config = variantConfigs[variant];
    const targets = stagger > 0 ? ref.current.children : ref.current;

    const tween = gsap.fromTo(targets, config.from, {
      ...config.to,
      duration,
      delay,
      stagger: stagger > 0 ? stagger : undefined,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
    };
  }, [variant, delay, duration, stagger]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
