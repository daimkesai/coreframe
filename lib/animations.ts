import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function createFadeUp(
  element: gsap.TweenTarget,
  options?: { delay?: number; duration?: number; y?: number }
) {
  const { delay = 0, duration = 0.8, y = 40 } = options ?? {};
  return gsap.fromTo(
    element,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
  );
}

export function createStagger(
  elements: gsap.TweenTarget,
  options?: { stagger?: number; duration?: number; y?: number }
) {
  const { stagger = 0.15, duration = 0.7, y = 50 } = options ?? {};
  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, stagger, ease: 'power2.out' }
  );
}

export function createMaskReveal(
  element: gsap.TweenTarget,
  options?: { direction?: 'left' | 'right'; duration?: number }
) {
  const { direction = 'left', duration = 1 } = options ?? {};
  const from = direction === 'left' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';
  return gsap.fromTo(
    element,
    { clipPath: from },
    { clipPath: 'inset(0 0% 0 0)', duration, ease: 'power3.inOut' }
  );
}

export function createSlideFromSide(
  element: gsap.TweenTarget,
  options?: { from?: 'left' | 'right'; duration?: number }
) {
  const { from = 'left', duration = 0.8 } = options ?? {};
  const x = from === 'left' ? -80 : 80;
  return gsap.fromTo(
    element,
    { opacity: 0, x },
    { opacity: 1, x: 0, duration, ease: 'power2.out' }
  );
}

export { gsap, ScrollTrigger };
