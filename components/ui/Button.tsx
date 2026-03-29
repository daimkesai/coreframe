'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'gradient-orange text-white hover:brightness-110 active:scale-95 shadow-lg hover:shadow-xl',
  secondary:
    'gradient-green text-white hover:brightness-110 active:scale-95 shadow-lg hover:shadow-xl',
  ghost:
    'bg-transparent text-[var(--color-primary)] font-[family-name:var(--font-label)] font-bold hover:underline underline-offset-4',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-7 py-3 text-sm',
  lg: 'px-9 py-4 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  onClick,
  type = 'button',
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-semibold rounded-[var(--radius-lg)] transition-all duration-200 cursor-pointer',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
