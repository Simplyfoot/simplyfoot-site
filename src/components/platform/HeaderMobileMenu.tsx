'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { X as XIcon } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

import { getRoute } from 'i18n/routes';
import { getAllBrands } from 'lib/config/brands';
import type { BrandId, BrandConfig } from 'lib/config/brands';
import { BrandSwitcher } from 'components/platform/BrandSwitcher';

interface HeaderMobileMenuProps {
  open: boolean;
  onClose: (open: boolean) => void;
  isBrandContext: boolean;
  currentBrand: BrandId | null | undefined;
  brandConfig: BrandConfig | null;
  pathname: string;
  dict: Record<string, string>;
  locale: string;
}

export function HeaderMobileMenu({
  open,
  onClose,
  isBrandContext,
  currentBrand,
  brandConfig,
  pathname,
  dict,
  locale,
}: HeaderMobileMenuProps) {
  const close = () => onClose(false);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[var(--brand-bg)]/90 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel
            id="mobile-menu"
            className="relative mx-6 w-full max-w-md rounded-2xl border border-[var(--brand-border)] bg-[var(--color-surface-dark)]/95 p-8 backdrop-blur"
          >
            <Dialog.Title className="sr-only">
              {isBrandContext ? `Menu ${brandConfig!.name}` : 'Menu Simply'}
            </Dialog.Title>

            <button
              type="button"
              aria-label="Fermer le menu mobile"
              className="absolute top-4 right-4 rounded text-[var(--color-text-beige)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text-beige)]/60"
              onClick={close}
            >
              <XIcon className="h-7 w-7" />
            </button>

            <div className="flex flex-col items-center gap-6">
              {isBrandContext ? (
                <>
                  <Link
                    href={`/${currentBrand}/gestion-club`}
                    className={clsx(
                      'text-2xl font-bold transition-all',
                      pathname.includes('/gestion-club')
                        ? 'text-[var(--brand-cta)]'
                        : 'text-[var(--color-text-beige)] hover:text-[var(--brand-cta)]',
                    )}
                    onClick={close}
                    title={`Gestion de club \u2013 ${brandConfig!.name}`}
                  >
                    {dict.club}
                  </Link>
                  <Link
                    href={`/${currentBrand}/gestion-equipe`}
                    className={clsx(
                      'text-2xl font-bold transition-all',
                      pathname.includes('/gestion-equipe')
                        ? 'text-[var(--brand-cta)]'
                        : 'text-[var(--color-text-beige)] hover:text-[var(--brand-cta)]',
                    )}
                    onClick={close}
                    title={`Gestion d\u2019\u00e9quipe \u2013 ${brandConfig!.name}`}
                  >
                    {dict.team}
                  </Link>
                  <Link
                    href={`/${currentBrand}/offres`}
                    className={clsx(
                      'text-2xl font-bold transition-all',
                      pathname.includes('/offres')
                        ? 'text-[var(--brand-cta)]'
                        : 'text-[var(--color-text-beige)] hover:text-[var(--brand-cta)]',
                    )}
                    onClick={close}
                  >
                    {dict.offers}
                  </Link>
                  <Link
                    href={`/${currentBrand}/fonctionnalites`}
                    className={clsx(
                      'text-2xl font-bold transition-all',
                      pathname.includes('/fonctionnalites')
                        ? 'text-[var(--brand-cta)]'
                        : 'text-[var(--color-text-beige)] hover:text-[var(--brand-cta)]',
                    )}
                    onClick={close}
                  >
                    {dict.features}
                  </Link>
                  <Link
                    href={`/${currentBrand}/blog`}
                    className={clsx(
                      'text-2xl font-bold transition-all',
                      pathname.includes('/blog')
                        ? 'text-[var(--brand-cta)]'
                        : 'text-[var(--color-text-beige)] hover:text-[var(--brand-cta)]',
                    )}
                    onClick={close}
                  >
                    Actualit&eacute;s
                  </Link>
                  <BrandSwitcher currentBrand={currentBrand ?? undefined} className="mt-2" />
                  <Link
                    href="/"
                    className="text-base text-[var(--color-text-beige)]/60 transition-colors hover:text-[var(--color-text-beige)]"
                    onClick={close}
                  >
                    &larr; Simply
                  </Link>
                </>
              ) : (
                <>
                  {getAllBrands().map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/${brand.slug}`}
                      data-brand={brand.id}
                      aria-current={pathname === `/${brand.slug}` ? 'page' : undefined}
                      className="text-2xl font-bold transition-all text-[var(--color-text-beige)] hover:text-[var(--brand-cta)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)]/60 rounded"
                      onClick={close}
                    >
                      Simply<span className="text-[var(--brand-cta)] font-extrabold">{brand.suffix}</span>
                    </Link>
                  ))}
                  <Link
                    href={getRoute(locale as 'fr' | 'en', 'about')}
                    className={clsx(
                      'text-2xl font-bold transition-all',
                      pathname.startsWith('/a-propos')
                        ? 'text-[var(--brand-cta)]'
                        : 'text-[var(--color-text-beige)] hover:text-[var(--brand-cta)]',
                    )}
                    onClick={close}
                  >
                    {dict.about}
                  </Link>
                  <Link
                    href={getRoute(locale as 'fr' | 'en', 'contact')}
                    className={clsx(
                      'text-2xl font-bold transition-all',
                      pathname.startsWith('/contact')
                        ? 'text-[var(--brand-cta)]'
                        : 'text-[var(--color-text-beige)] hover:text-[var(--brand-cta)]',
                    )}
                    onClick={close}
                  >
                    {dict.contact}
                  </Link>
                </>
              )}

              <Link
                href="/contact"
                className="mt-2 block w-full rounded-xl bg-[var(--brand-cta)] py-3.5 text-center text-base font-extrabold text-[var(--brand-cta-text)] transition-colors hover:bg-[var(--brand-cta-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)]/60"
                onClick={close}
              >
                {dict.headerCta ?? 'D\u00e9mo gratuite'} &rarr;
              </Link>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
