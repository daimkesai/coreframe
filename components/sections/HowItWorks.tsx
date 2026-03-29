'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/animations';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const lineRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !lineRef.current || !svgRef.current) return;

    const path = lineRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: svgRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: true,
      },
    });

    // Step circles pop in with overshoot
    if (stepsRef.current) {
      const circles = stepsRef.current.querySelectorAll('.step-circle');
      circles.forEach((circle, i) => {
        gsap.fromTo(
          circle,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.1,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: circle,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, []);

  return (
    <section id="how-it-works" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal variant="fadeUp">
          <span className="font-[family-name:var(--font-label)] text-sm italic text-[var(--color-primary)] tracking-wide">
            {t('label')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-16 max-w-3xl">
            {t('headline')}
          </h2>
        </ScrollReveal>

        <div ref={stepsRef} className="relative">
          {/* SVG connecting line (desktop) */}
          <svg
            ref={svgRef}
            className="hidden md:block absolute top-8 left-0 w-full h-[calc(100%-4rem)] pointer-events-none"
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d="M 16.67% 24 Q 33% 50%, 50% 50% Q 67% 50%, 83.33% 24"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {[0, 1, 2].map((i) => (
              <ScrollReveal key={i} variant="fadeUp" delay={i * 0.2}>
                <div className="flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className="step-circle w-14 h-14 rounded-full bg-[var(--color-accent)] flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {t(`steps.${i}.number`)}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-3">
                    {t(`steps.${i}.title`)}
                  </h3>
                  <p className="text-sm text-[var(--color-outline)] leading-relaxed max-w-xs">
                    {t(`steps.${i}.description`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
