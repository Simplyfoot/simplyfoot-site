'use client';

import Link from 'next/link';
import clsx from 'clsx';

import { getRoute } from 'i18n/routes';
import { getAllBrands } from 'lib/config/brands';
import type { BrandId, BrandConfig } from 'lib/config/brands';

interface HeaderDesktopNavProps {
  isBrandContext: boolean;
  currentBrand: BrandId | null | undefined;
  brandConfig: BrandConfig | null;
  pathname: string;
  dict: Record<string, string>;
  locale: string;
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'text-sm transition-colors hover:text-[var(--brand-cta)]',
          active ? 'text-[var(--brand-cta)]' : 'text-[var(--color-text-beige)]/80',
        )}
      >
        {children}
      </Link>
    </li>
  );
}

export function HeaderDesktopNav({
  isBrandContext,
  currentBrand,
  brandConfig: _brandConfig,
  pathname,
  dict,
  locale,
}: HeaderDesktopNavProps) {
  return (
    <ul className="hidden items-center gap-6 lg:flex">
      {isBrandContext ? (
        <>
          <NavLink href={`/${currentBrand}/fonctionnalites`} active={pathname.includes('/fonctionnalites')}>
            Fonctionnalit&eacute;s
          </NavLink>
          <NavLink href={`/${currentBrand}/offres`} active={pathname.includes('/offres')}>
            Offres
          </NavLink>
          <NavLink href={`/${currentBrand}/gestion-club`} active={pathname.includes('/gestion-club')}>
            Club
          </NavLink>
          <NavLink href={`/${currentBrand}/gestion-equipe`} active={pathname.includes('/gestion-equipe')}>
            &Eacute;quipe
          </NavLink>
          <NavLink href={`/${currentBrand}/blog`} active={pathname.includes('/blog')}>
            Blog
          </NavLink>
          <NavLink href={`/${currentBrand}/faq`} active={pathname.includes('/faq')}>
            FAQ
          </NavLink>
        </>
      ) : (
        <>
          {getAllBrands().map((brand) => (
            <li key={brand.id}>
              <Link
                href={`/${brand.slug}`}
                data-brand={brand.id}
                className="text-sm transition-colors text-[var(--color-text-beige)]/80 hover:text-[var(--brand-cta)]"
              >
                Simply<span className="font-bold text-[var(--brand-cta)]">{brand.suffix}</span>
              </Link>
            </li>
          ))}
          <NavLink href={getRoute(locale as 'fr' | 'en', 'about')} active={pathname.startsWith('/a-propos')}>
            {dict.about}
          </NavLink>
          <NavLink href={getRoute(locale as 'fr' | 'en', 'contact')} active={pathname.startsWith('/contact')}>
            {dict.contact}
          </NavLink>
        </>
      )}
    </ul>
  );
}
