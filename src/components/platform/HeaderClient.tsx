'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Menu as MenuIcon } from 'lucide-react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { getBrandConfig } from 'lib/config/brands';
import { HEADER_SCROLL_THRESHOLD } from 'lib/constants';
import type { BrandId } from 'lib/config/brands';
import { HeaderMobileMenu } from './HeaderMobileMenu';

export default function HeaderClient({
  dict,
  locale,
}: {
  dict: Record<string, string>;
  locale: string;
}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > HEADER_SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const currentBrand = useMemo<BrandId | null>(() => {
    if (pathname.startsWith('/foot')) return 'foot';
    if (pathname.startsWith('/rugby')) return 'rugby';
    if (pathname.startsWith('/handball')) return 'handball';
    return null;
  }, [pathname]);

  const isBrandContext = currentBrand !== null;
  const brandConfig = isBrandContext ? getBrandConfig(currentBrand) : null;

  return (
    <header
      data-brand={currentBrand ?? undefined}
      className={clsx(
        'sticky top-0 z-50 w-full transition-all duration-500',
        isScrolled
          ? 'bg-[var(--brand-bg)]/85 shadow-lg backdrop-blur-xl border-b border-[var(--brand-border)]'
          : 'bg-transparent backdrop-blur-none',
      )}
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 rounded bg-white px-4 py-2 text-sm text-[var(--brand-bg)] shadow-lg"
      >
        Aller au contenu principal
      </a>

      <nav
        aria-label={isBrandContext ? `Navigation ${brandConfig!.name}` : 'Navigation Simply'}
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:py-5"
      >
        {/* Logo */}
        <Link
          href={isBrandContext ? `/${currentBrand}` : '/'}
          className="flex items-center gap-3"
          aria-label={isBrandContext ? `Page d'accueil ${brandConfig!.name}` : "Page d'accueil Simply"}
        >
          <span className={clsx('text-2xl font-bold', isBrandContext ? 'text-[var(--brand-text)]' : 'text-[var(--color-text-beige)]')}>
            Simply
            {isBrandContext && <span className="text-[var(--brand-cta)]">{brandConfig!.suffix}</span>}
          </span>
        </Link>

        {/* CTA + Burger */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center rounded-lg bg-[var(--brand-cta)] px-4 py-2 text-sm font-bold text-[var(--brand-cta-text)] transition-colors hover:bg-[var(--brand-cta-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)]/60"
          >
            {dict.headerCta ?? 'D\u00e9mo gratuite'}
          </Link>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen(true)}
            className={clsx(
              'rounded p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)]/60 hover:text-[var(--brand-cta)] transition-colors',
              isBrandContext ? 'text-[var(--brand-text)]' : 'text-[var(--color-text-beige)]',
            )}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <HeaderMobileMenu
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        isBrandContext={isBrandContext}
        currentBrand={currentBrand}
        brandConfig={brandConfig}
        pathname={pathname}
        dict={dict}
        locale={locale}
      />
    </header>
  );
}
