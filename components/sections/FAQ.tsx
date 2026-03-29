'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { cn } from '@/lib/utils';

export default function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 md:py-32 px-6 bg-[var(--color-surface-low)]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal variant="fadeUp">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
            {t('headline')}
          </h2>
        </ScrollReveal>

        <div className="flex flex-col gap-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <ScrollReveal key={i} variant="fadeUp" delay={i * 0.08}>
              <div className="rounded-[var(--radius-lg)] bg-white overflow-hidden transition-shadow duration-300 hover:shadow-ambient">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-base font-medium pr-4">
                    {t(`items.${i}.question`)}
                  </span>
                  <ChevronDown
                    size={20}
                    className={cn(
                      'shrink-0 text-[var(--color-outline)] transition-transform duration-300',
                      openIndex === i && 'rotate-180'
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-[var(--color-outline)] leading-relaxed">
                        {t(`items.${i}.answer`)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
