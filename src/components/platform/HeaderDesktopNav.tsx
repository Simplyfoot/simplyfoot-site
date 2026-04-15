'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';

import { getRoute } from 'i18n/routes';
import { getAllBrands } from 'lib/config/brands';
import type { BrandId, BrandConfig } from 'lib/config/brands';
import { BrandSwitcher } from 'components/platform/BrandSwitcher';

interface HeaderDesktopNavProps {
  isBrandContext: boolean;
  currentBrand: BrandId | null | undefined;
  brandConfig: BrandConfig | null;
  pathname: string;
  dict: Record<string, string>;
  locale: string;
}

export function HeaderDesktopNav({
  isBrandContext,
  currentBrand,
  brandConfig,
  pathname,
  dict,
  locale,
}: HeaderDesktopNavProps) {
  return (
    <ul className="hidden items-center gap-8 lg:flex text-[var(--color-text-beige)] font-medium">
      {isBrandContext ? (
        <>
          <li>
            <Link
              href={`/${currentBrand}/gestion-club`}
              className={clsx(
                'transition-colors hover:text-[var(--brand-cta)]',
                pathname.includes('/gestion-club')
                  ? 'text-[var(--brand-cta)]'
                  : 'text-[var(--color-text-beige)]',
              )}
              title={`Gestion de club \u2013 ${brandConfig!.name}`}
            >
              {dict.club}
            </Link>
          </li>
          <li>
            <Link
              href={`/${currentBrand}/gestion-equipe`}
              className={clsx(
                'transition-colors hover:text-[var(--brand-cta)]',
                pathname.includes('/gestion-equipe')
                  ? 'text-[var(--brand-cta)]'
                  : 'text-[var(--color-text-beige)]',
              )}
              title={`Gestion d\u2019\u00e9quipe \u2013 ${brandConfig!.name}`}
            >
              {dict.team}
            </Link>
          </li>
          <li className="relative">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex cursor-pointer items-center hover:text-[var(--brand-cta)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)]/60 rounded">
                {dict.solutions}
                <ChevronDown className="ml-1 h-5 w-5" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 translate-y-1"
                enterTo="transform opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 translate-y-0"
                leaveTo="transform opacity-0 translate-y-1"
              >
                <Menu.Items className="absolute left-0 z-20 mt-3 w-56 origin-top-left rounded-xl border border-[var(--brand-border)] bg-[var(--color-surface-dark)]/90 p-2 backdrop-blur">
                  <Menu.Item>
                    <Link
                      href={`/${currentBrand}/offres`}
                      className="block rounded-md px-4 py-2 text-sm hover:text-[var(--brand-cta)]"
                      title={`Nos offres ${brandConfig!.name}`}
                    >
                      {dict.offers}
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      href={`/${currentBrand}/fonctionnalites`}
                      className="cursor-pointer block rounded-md px-4 py-2 text-sm hover:text-[var(--brand-cta)]"
                      title={`Fonctionnalit\u00e9s ${brandConfig!.name}`}
                    >
                      {dict.features}
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
          <li>
            <Link
              href={`/${currentBrand}/blog`}
              className={clsx(
                'transition-colors hover:text-[var(--brand-cta)]',
                pathname.includes('/blog')
                  ? 'text-[var(--brand-cta)]'
                  : 'text-[var(--color-text-beige)]',
              )}
            >
              Actualit\u00e9s
            </Link>
          </li>
          <li>
            <BrandSwitcher currentBrand={currentBrand ?? undefined} />
          </li>
          <li>
            <Link
              href="/"
              className="text-sm text-[var(--color-text-beige)]/60 transition-colors hover:text-[var(--color-text-beige)]"
            >
              \u2190 Simply
            </Link>
          </li>
        </>
      ) : (
        <>
          {getAllBrands().map((brand) => (
            <li key={brand.id}>
              <Link
                href={`/${brand.slug}`}
                data-brand={brand.id}
                aria-current={pathname === `/${brand.slug}` ? 'page' : undefined}
                className="transition-colors text-[var(--color-text-beige)] hover:text-[var(--brand-cta)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)]/60 rounded"
              >
                Simply<span className="text-[var(--brand-cta)] font-bold">{brand.suffix}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={getRoute(locale as 'fr' | 'en', 'about')}
              aria-current={pathname.startsWith('/a-propos') ? 'page' : undefined}
              className={clsx(
                'transition-colors hover:text-[var(--brand-cta)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)]/60 rounded',
                pathname.startsWith('/a-propos')
                  ? 'text-[var(--brand-cta)]'
                  : 'text-[var(--color-text-beige)]',
              )}
            >
              {dict.about}
            </Link>
          </li>
          <li>
            <Link
              href={getRoute(locale as 'fr' | 'en', 'contact')}
              aria-current={pathname.startsWith('/contact') ? 'page' : undefined}
              className={clsx(
                'transition-colors hover:text-[var(--brand-cta)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)]/60 rounded',
                pathname.startsWith('/contact')
                  ? 'text-[var(--brand-cta)]'
                  : 'text-[var(--color-text-beige)]',
              )}
            >
              {dict.contact}
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
