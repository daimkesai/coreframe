'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/animations';

interface TextScrambleProps {
  finalText: string;
  duration?: number;
  trigger?: 'scroll' | 'immediate';
  className?: string;
}

const chars = '0123456789ABCDEF%+';

export default function TextScramble({
  finalText,
  duration = 1.5,
  trigger = 'scroll',
  className,
}: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(finalText);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) {
      setDisplay(finalText);
      return;
    }

    function scramble() {
      const length = finalText.length;
      const obj = { progress: 0 };

      gsap.to(obj, {
        progress: 1,
        duration,
        ease: 'power2.inOut',
        onUpdate: () => {
          const p = obj.progress;
          let result = '';
          for (let i = 0; i < length; i++) {
            if (i / length < p) {
              result += finalText[i];
            } else {
              result += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          setDisplay(result);
        },
        onComplete: () => setDisplay(finalText),
      });
    }

    if (trigger === 'immediate') {
      scramble();
    } else {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 80%',
        once: true,
        onEnter: scramble,
      });
    }
  }, [finalText, duration, trigger]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
