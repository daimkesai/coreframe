'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/animations';
import { Ghost, DollarSign, Users, Wrench } from 'lucide-react';

const icons = [Ghost, DollarSign, Users, Wrench];

export default function Problem() {
  const t = useTranslations('problem');
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    // Cards animate from alternating sides
    const tweens: gsap.core.Tween[] = [];
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      Array.from(cards).forEach((card, i) => {
        tweens.push(
          gsap.fromTo(
            card,
            { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        );
      });
    }

    return () => {
      tweens.forEach((tw) => tw.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ backgroundColor: '#071e27' }}>
      <section
        ref={sectionRef}
        className="relative py-24 md:py-32 px-6 overflow-hidden noise-overlay"
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="font-[family-name:var(--font-label)] text-sm italic text-[var(--color-accent)] tracking-wide">
            {t('label')}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-[var(--color-on-dark)] max-w-3xl">
            {t('headline')}
          </h2>

          <p className="text-base md:text-lg text-[var(--color-on-dark)]/60 max-w-2xl mb-14 font-[family-name:var(--font-label)] italic">
            &ldquo;{t('quote')}&rdquo;
          </p>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => {
              const Icon = icons[i];
              return (
                <div
                  key={i}
                  className="group relative p-6 rounded-[var(--radius-lg)] bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-white/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-accent)]/20 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-500">
                      <Icon size={20} className="text-[var(--color-accent)] group-hover:text-[var(--color-primary-container)] transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[var(--color-on-dark)] mb-1">
                        {t(`cards.${i}.title`)}
                      </h3>
                      <p className="text-sm text-[var(--color-on-dark)]/50 leading-relaxed">
                        {t(`cards.${i}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
