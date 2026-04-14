import Link from 'next/link';
import { cn } from 'lib/utils/cn';

interface BrandCTAProps {
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: 'light' | 'dark' | 'brand';
  className?: string;
}

export function BrandCTA({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = 'dark',
  className,
}: BrandCTAProps) {
  const bgClass = {
    light: 'bg-white text-[var(--color-text-dark)]',
    dark: 'bg-[var(--color-surface-dark)] text-white',
    brand: 'bg-[var(--brand-bg)] text-white',
  }[variant];

  return (
    <section aria-label={title} className={cn('w-full py-16 lg:py-24', bgClass, className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-4xl font-extrabold mb-4">{title}</h2>
        {subtitle && <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">{subtitle}</p>}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={primaryHref}
            className="px-8 py-4 rounded-xl font-bold text-lg bg-[var(--brand-cta)] text-[var(--brand-cta-text)] shadow-xl hover:bg-[var(--brand-cta-hover)] hover:scale-105 active:scale-95 transition duration-150"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="px-8 py-4 rounded-xl font-bold text-lg border border-[var(--brand-cta)]/40 text-[var(--brand-cta)] hover:border-[var(--brand-cta)] hover:scale-105 active:scale-95 transition duration-150"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
