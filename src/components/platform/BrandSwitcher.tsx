'use client';

import Link from 'next/link';
import { cn } from 'lib/utils/cn';
import { BRAND_IDS, getBrandConfig } from 'lib/config/brands';
import type { BrandId } from 'lib/config/brands';

interface BrandSwitcherProps {
  currentBrand?: BrandId;
  className?: string;
}

export function BrandSwitcher({ currentBrand, className }: BrandSwitcherProps) {
  return (
    <nav aria-label="Changer d'univers sportif" className={cn('flex items-center gap-2', className)}>
      {BRAND_IDS.map((id) => {
        const brand = getBrandConfig(id);
        const isActive = currentBrand === id;

        return (
          <Link
            key={id}
            href={`/${id}`}
            // data-brand active les CSS vars de cette marque sur cet élément et ses enfants,
            // ce qui permet à var(--brand-cta) de résoudre la bonne couleur même hors du
            // contexte du layout de marque (header = hors data-brand du body).
            data-brand={id}
            aria-label={brand.name}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)] focus-visible:ring-offset-1 focus-visible:ring-offset-transparent',
              isActive
                ? 'bg-[var(--brand-cta)] text-[var(--brand-cta-text)] shadow-md'
                : 'text-[var(--color-text-beige)]/60 hover:bg-[var(--brand-cta)]/15 hover:text-[var(--brand-cta)]',
            )}
          >
            {brand.suffix}
          </Link>
        );
      })}
    </nav>
  );
}
