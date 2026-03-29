'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { prefersReducedMotion } from '@/lib/animations';
import TextScramble from '@/components/animations/TextScramble';
import {
  Monitor,
  Search,
  Sparkles,
  Bot,
  MapPin,
  Handshake,
} from 'lucide-react';

const cardIcons = [Monitor, Search, Sparkles, Bot, MapPin, Handshake];

const gridSpans = [
  'md:col-span-8',
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-4 bg-[var(--color-accent)] text-white',
  'md:col-span-4',
  'md:col-span-8 bg-[var(--color-surface-dark)] text-[var(--color-on-dark)]',
];

export default function Services() {
  const t = useTranslations('services');
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !gridRef.current) return;

    const cards = gridRef.current.children;
    Array.from(cards).forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.85, rotation: 2, y: 30 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <section id="services" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <span className="font-[family-name:var(--font-label)] text-sm italic text-[var(--color-primary)] tracking-wide">
          {t('label')}
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-14 max-w-3xl">
          {t('headline')}
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const Icon = cardIcons[i];
            const isAccent = i === 3;
            const isDark = i === 5;

            return (
              <div
                key={i}
                className={`group col-span-1 ${gridSpans[i]} p-6 md:p-8 rounded-[var(--radius-lg)] transition-all duration-300 hover:-translate-y-1 hover:shadow-ambient-lg ${
                  !isAccent && !isDark ? 'bg-[var(--color-surface-low)] hover:bg-[var(--color-surface-high)]' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center mb-5 ${
                    isAccent
                      ? 'bg-white/20'
                      : isDark
                        ? 'bg-white/10'
                        : 'bg-[var(--color-primary)]/10'
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      isAccent || isDark
                        ? 'text-white'
                        : 'text-[var(--color-primary)]'
                    }
                  />
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  {t(`cards.${i}.title`)}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-4 ${
                    isAccent || isDark
                      ? 'opacity-80'
                      : 'text-[var(--color-outline)]'
                  }`}
                >
                  {t(`cards.${i}.description`)}
                </p>

                <div className="flex items-baseline gap-2 mt-auto">
                  <span className="text-2xl font-bold">
                    <TextScramble finalText={t(`cards.${i}.stat`)} />
                  </span>
                  <span
                    className={`text-xs ${
                      isAccent || isDark
                        ? 'opacity-60'
                        : 'text-[var(--color-outline)]'
                    }`}
                  >
                    {t(`cards.${i}.statLabel`)}
                  </span>
                </div>

                {/* Green gradient line on hover */}
                <div className="h-0.5 w-0 group-hover:w-full mt-4 rounded-full transition-all duration-500 gradient-primary" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
