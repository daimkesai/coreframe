'use client';

import { useTranslations } from 'next-intl';
import { Palette, TrendingUp, Cpu } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Card from '@/components/ui/Card';

const icons = [Palette, TrendingUp, Cpu];

export default function ValueProp() {
  const t = useTranslations('valueProp');

  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal variant="fadeUp">
          <span className="font-[family-name:var(--font-label)] text-sm italic text-[var(--color-primary)] tracking-wide">
            {t('label')}
          </span>
        </ScrollReveal>

        <ScrollReveal variant="maskWipe" delay={0.1}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 max-w-3xl">
            {t('headline')}{' '}
            <span className="text-[var(--color-primary)]">{t('headlineHighlight')}</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={0.2}>
          <p className="text-[var(--color-outline)] text-base md:text-lg max-w-2xl mb-14">
            {t('description')}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => {
            const Icon = icons[i];
            return (
              <Card key={i} className="group">
                <div className="w-10 h-10 rounded-[var(--radius-lg)] gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t(`cards.${i}.title`)}
                </h3>
                <p className="text-sm text-[var(--color-outline)] leading-relaxed">
                  {t(`cards.${i}.description`)}
                </p>
              </Card>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
