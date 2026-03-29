import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] bg-[var(--color-surface-low)] p-6 transition-all duration-300',
        hover &&
          'hover:bg-[var(--color-surface-high)] hover:shadow-ambient hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
}
