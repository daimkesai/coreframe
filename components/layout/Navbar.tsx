'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import LanguageSwitcher from './LanguageSwitcher';

const navLinks = [
  { key: 'services', href: '#services' },
  { key: 'howItWorks', href: '#how-it-works' },
  { key: 'about', href: '#about' },
  { key: 'caseStudies', href: '#case-studies' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > 300 && y > lastScrollY.current);
      lastScrollY.current = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Show CTA button only after scrolling past the hero video
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show CTA when hero is no longer mostly visible
        setShowCta(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        dir="ltr"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex justify-between items-center',
          'px-6 md:px-8 py-3 rounded-full mt-4 md:mt-6 mx-4 md:mx-auto max-w-5xl',
          'transition-all duration-300',
          scrolled ? 'glass shadow-ambient' : 'bg-transparent',
          hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        )}
      >
        <Link href="/" className="flex items-center shrink-0 hover:scale-[1.03] transition-transform duration-200">
          <span className="text-xl font-bold tracking-tight select-none">
            <span style={{ color: '#1B5E3B' }}>CORE</span>
            <span style={{ color: '#6BAF47' }}>FRAME</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors relative group"
            >
              {t(link.key)}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <div
            className={cn(
              'hidden md:block overflow-hidden transition-all duration-500 ease-out',
              showCta ? 'max-w-[250px] opacity-100' : 'max-w-0 opacity-0'
            )}
          >
            <Button variant="primary" size="sm" className="whitespace-nowrap">
              {t('cta')}
            </Button>
          </div>
          <button
            className="md:hidden p-1 text-[var(--color-on-surface)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-ambient-lg p-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-base font-medium text-[var(--color-on-surface)] hover:text-[var(--color-primary)] transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </a>
            ))}
            <Button variant="primary" size="md" className="mt-2 w-full">
              {t('cta')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
