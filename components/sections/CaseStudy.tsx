'use client';

import { useTranslations } from 'next-intl';
import { Star, Quote } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextScramble from '@/components/animations/TextScramble';
import Button from '@/components/ui/Button';

export default function CaseStudy() {
  const t = useTranslations('caseStudy');

  return (
    <section id="case-studies" className="py-24 md:py-32 px-6 bg-[var(--color-surface-low)]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal variant="fadeUp">
          <span className="font-[family-name:var(--font-label)] text-sm italic text-[var(--color-primary)] tracking-wide">
            {t('label')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4">
            {t('headline')}
          </h2>
          <p className="text-[var(--color-outline)] text-base md:text-lg max-w-2xl mb-14">
            {t('description')}
          </p>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal variant="fadeUp" stagger={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="relative p-6 rounded-[var(--radius-lg)] bg-white transition-all duration-300 hover:shadow-ambient"
            >
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-on-surface)] mb-1">
                <TextScramble finalText={t(`stats.${i}.value`)} />
              </div>
              <p className="text-sm text-[var(--color-outline)]">
                {t(`stats.${i}.label`)}
              </p>
              {/* Accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-[var(--radius-lg)] bg-[var(--color-accent)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </div>
          ))}
        </ScrollReveal>

        {/* Testimonial */}
        <ScrollReveal variant="fadeUp">
          <div className="relative p-8 md:p-10 rounded-2xl bg-white shadow-ambient max-w-3xl">
            <Quote size={32} className="text-[var(--color-primary)]/20 mb-4" />
            <blockquote className="text-lg md:text-xl font-medium text-[var(--color-on-surface)] leading-relaxed mb-6">
              &ldquo;{t('testimonial.quote')}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-[var(--color-secondary-accent)] text-[var(--color-secondary-accent)]"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">{t('testimonial.author')}</span>
              <span className="text-sm text-[var(--color-outline)]">{t('testimonial.role')}</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="mt-10">
            <Button variant="ghost">{t('cta')}</Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
