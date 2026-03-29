import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-full)] text-xs font-medium',
        'glass shadow-ambient text-[var(--color-on-surface)]',
        className
      )}
    >
      {children}
    </span>
  );
}
