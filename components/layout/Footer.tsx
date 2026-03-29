import { useTranslations } from 'next-intl';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const exploreLinks = ['services', 'howItWorks', 'about', 'caseStudies', 'faq'] as const;
const legalLinks = ['privacy', 'terms', 'imprint'] as const;

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-white pt-16 pb-8 px-6 md:px-8">
      {/* Gradient divider */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="h-px gradient-brand-line" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold tracking-tight select-none">
            <span style={{ color: '#1B5E3B' }}>CORE</span>
            <span style={{ color: '#6BAF47' }}>FRAME</span>
          </span>
          <p className="text-sm text-[var(--color-outline)] max-w-xs">
            {t('tagline')}
          </p>
        </div>

        {/* Explore links */}
        <div>
          <h4 className="font-[family-name:var(--font-label)] font-semibold text-sm text-[var(--color-on-surface)] mb-4 italic">
            {t('explore')}
          </h4>
          <ul className="flex flex-col gap-2.5">
            {exploreLinks.map((key) => (
              <li key={key}>
                <a
                  href={`#${key}`}
                  className="text-sm text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t(`links.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal links */}
        <div>
          <h4 className="font-[family-name:var(--font-label)] font-semibold text-sm text-[var(--color-on-surface)] mb-4 italic">
            {t('legal')}
          </h4>
          <ul className="flex flex-col gap-2.5">
            {legalLinks.map((key) => (
              <li key={key}>
                <a
                  href={`/${key}`}
                  className="text-sm text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t(`legalLinks.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-[family-name:var(--font-label)] font-semibold text-sm text-[var(--color-on-surface)] mb-4 italic">
            {t('newsletter.headline')}
          </h4>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder={t('newsletter.placeholder')}
              className="flex-1"
            />
            <Button variant="primary" size="sm">
              {t('newsletter.button')}
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-[var(--color-outline-ghost)]">
        <p className="text-xs text-[var(--color-outline)] text-center">
          {t('copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
