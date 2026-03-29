'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'ar', label: 'عربي' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = locales.find((l) => l.code === locale) ?? locales[0];
  const others = locales.filter((l) => l.code !== locale);

  function switchLocale(newLocale: string) {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setOpen(false);
  }

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative" dir="ltr">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
          'border border-transparent hover:border-[var(--color-outline-ghost)]',
          'text-[var(--color-outline)] hover:text-[var(--color-on-surface)]',
          open && 'border-[var(--color-outline-ghost)] text-[var(--color-on-surface)]'
        )}
      >
        <span className="font-bold">{current.label}</span>
        <ChevronDown
          size={12}
          className={cn(
            'transition-transform duration-300',
            open && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          'absolute top-full right-0 mt-2 min-w-[100px] rounded-xl overflow-hidden',
          'bg-white/95 backdrop-blur-md shadow-ambient-lg border border-[var(--color-outline-ghost)]',
          'transition-all duration-300 origin-top',
          open
            ? 'opacity-100 scale-y-100 translate-y-0'
            : 'opacity-0 scale-y-75 -translate-y-2 pointer-events-none'
        )}
      >
        {others.map((loc, i) => (
          <button
            key={loc.code}
            onClick={() => switchLocale(loc.code)}
            className={cn(
              'w-full text-left px-4 py-2.5 text-xs font-medium transition-all duration-200',
              'text-[var(--color-outline)] hover:text-[var(--color-on-surface)] hover:bg-[var(--color-primary)]/5',
              // Staggered animation
              open
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[-8px]',
            )}
            style={{
              transitionDelay: open ? `${(i + 1) * 50}ms` : '0ms',
            }}
          >
            {loc.label}
          </button>
        ))}
      </div>
    </div>
  );
}
