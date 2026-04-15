'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { X as XIcon } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

import { getRoute } from 'i18n/routes';
import { getAllBrands } from 'lib/config/brands';
import type { BrandId, BrandConfig } from 'lib/config/brands';

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

function MobileLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'block py-2 text-lg font-medium transition-colors',
        active
          ? 'text-[var(--brand-cta)]'
          : 'text-[var(--color-text-beige)] hover:text-[var(--brand-cta)]',
      )}
    >
      {children}
    </Link>
  );
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
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        {/* Slide-in panel from right */}
        <Transition.Child
          as={Fragment}
          enter="transition-transform duration-300 ease-out"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-200 ease-in"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="fixed inset-y-0 right-0 w-full max-w-sm bg-[var(--brand-bg)] border-l border-[var(--brand-border)] shadow-2xl">
            <Dialog.Title className="sr-only">
              {isBrandContext ? `Menu ${brandConfig!.name}` : 'Menu Simply'}
            </Dialog.Title>

            {/* Header du panel */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--brand-border)]">
              <span className="text-lg font-bold text-[var(--color-text-beige)]">
                Simply
                {isBrandContext && (
                  <span className="text-[var(--brand-cta)]">{brandConfig!.suffix}</span>
                )}
              </span>
              <button
                type="button"
                aria-label="Fermer le menu"
                className="rounded-lg p-1.5 text-[var(--color-text-beige)]/60 hover:text-[var(--color-text-beige)] transition-colors"
                onClick={close}
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="px-6 py-6 space-y-1">
              {isBrandContext ? (
                <>
                  <MobileLink href={`/${currentBrand}/fonctionnalites`} active={pathname.includes('/fonctionnalites')} onClick={close}>
                    Fonctionnalit&eacute;s
                  </MobileLink>
                  <MobileLink href={`/${currentBrand}/offres`} active={pathname.includes('/offres')} onClick={close}>
                    Offres
                  </MobileLink>
                  <MobileLink href={`/${currentBrand}/gestion-club`} active={pathname.includes('/gestion-club')} onClick={close}>
                    Gestion de club
                  </MobileLink>
                  <MobileLink href={`/${currentBrand}/gestion-equipe`} active={pathname.includes('/gestion-equipe')} onClick={close}>
                    Gestion d&apos;&eacute;quipe
                  </MobileLink>
                  <MobileLink href={`/${currentBrand}/blog`} active={pathname.includes('/blog')} onClick={close}>
                    Blog
                  </MobileLink>
                  <MobileLink href={`/${currentBrand}/faq`} active={pathname.includes('/faq')} onClick={close}>
                    FAQ
                  </MobileLink>

                  {/* Separator + back to Simply */}
                  <div className="pt-4 mt-4 border-t border-[var(--brand-border)]">
                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-beige)]/40 mb-3">
                      Changer de sport
                    </p>
                    {getAllBrands()
                      .filter((b) => b.id !== currentBrand)
                      .map((brand) => (
                        <Link
                          key={brand.id}
                          href={`/${brand.slug}`}
                          data-brand={brand.id}
                          className="block py-1.5 text-sm text-[var(--color-text-beige)]/60 hover:text-[var(--brand-cta)] transition-colors"
                          onClick={close}
                        >
                          Simply<span className="font-semibold text-[var(--brand-cta)]">{brand.suffix}</span>
                        </Link>
                      ))}
                    <Link
                      href="/"
                      className="block py-1.5 text-sm text-[var(--color-text-beige)]/40 hover:text-[var(--color-text-beige)] transition-colors"
                      onClick={close}
                    >
                      &larr; Accueil Simply
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {getAllBrands().map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/${brand.slug}`}
                      data-brand={brand.id}
                      className="block py-2 text-lg font-medium text-[var(--color-text-beige)] hover:text-[var(--brand-cta)] transition-colors"
                      onClick={close}
                    >
                      Simply<span className="font-bold text-[var(--brand-cta)]">{brand.suffix}</span>
                    </Link>
                  ))}

                  <div className="pt-4 mt-4 border-t border-[var(--brand-border)]">
                    <MobileLink href={getRoute(locale as 'fr' | 'en', 'about')} active={pathname.startsWith('/a-propos')} onClick={close}>
                      {dict.about}
                    </MobileLink>
                    <MobileLink href={getRoute(locale as 'fr' | 'en', 'contact')} active={pathname.startsWith('/contact')} onClick={close}>
                      {dict.contact}
                    </MobileLink>
                  </div>
                </>
              )}
            </nav>

            {/* CTA en bas */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[var(--brand-border)]">
              <Link
                href="/contact"
                className="block w-full rounded-xl bg-[var(--brand-cta)] py-3 text-center text-sm font-bold text-[var(--brand-cta-text)] transition-colors hover:opacity-90"
                onClick={close}
              >
                {dict.headerCta ?? 'D\u00e9mo gratuite'}
              </Link>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
