import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full px-4 py-3 rounded-[var(--radius-lg)] bg-[var(--color-surface-highest)] text-[var(--color-on-surface)] text-sm',
        'border-0 outline-none transition-all duration-200',
        'focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-0',
        'placeholder:text-[var(--color-outline)]',
        className
      )}
      {...props}
    />
  );
}
