import { cn } from 'lib/utils/cn';

interface BrandLogoProps {
  suffix: string;
  className?: string;
}

export function BrandLogo({ suffix, className }: BrandLogoProps) {
  return (
    <span className={cn('text-2xl font-bold text-[var(--color-text-beige)]', className)}>
      Simply<span className="text-[var(--brand-accent)]">{suffix}</span>
    </span>
  );
}
