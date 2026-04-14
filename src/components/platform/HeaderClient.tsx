'use client';

import { useState, useEffect, Fragment, useMemo } from 'react';
import Link from 'next/link';
import { Menu as MenuIcon, X as XIcon, ChevronDown } from 'lucide-react';
import { Menu, Transition, Dialog } from '@headlessui/react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { getRoute } from 'i18n/routes';
import { getBrandConfig, getAllBrands } from 'lib/config/brands';
import type { BrandId } from 'lib/config/brands';
import { BrandSwitcher } from 'components/platform/BrandSwitcher';

// TODO: À décommenter quand l'application sera ouverte au public
// const AUTH_KEY = "sf_auth";

export default function HeaderClient({
  dict,
  locale,
}: {
  dict: Record<string, string>;
  locale: string;
}) {
  // TODO: À décommenter quand l'application sera ouverte au public
  // const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // TODO: À décommenter quand l'application sera ouverte au public
  // const [logged, setLogged] = useState(false);

  // Effet scroll : ajout d'une ombre au scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // TODO: À décommenter quand l'application sera ouverte au public
  // // État de connexion
  // useEffect(() => {
  //   const sync = () => setLogged(!!localStorage.getItem(AUTH_KEY));
  //   sync();
  //   window.addEventListener("storage", sync);
  //   return () => window.removeEventListener("storage", sync);
  // }, []);

  // TODO: À décommenter quand l'application sera ouverte au public
  // const handleLogout = () => {
  //   localStorage.removeItem(AUTH_KEY);
  //   try {
  //     window.dispatchEvent(new StorageEvent("storage", { key: AUTH_KEY, newValue: null }));
  //   } catch { }
  //   router.push(getRoute(locale as "fr" | "en", "signup"));
  // };

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
      {/* Lien d'accès rapide au contenu principal (accessibilité) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 rounded bg-white px-4 py-2 text-sm text-[var(--brand-bg)] shadow-lg"
      >
        Aller au contenu principal
      </a>

      <nav
        aria-label={isBrandContext ? `Navigation ${brandConfig!.name}` : 'Navigation Simply'}
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:py-6"
      >
        {/* Logo dynamique */}
        <Link
          href={isBrandContext ? `/${currentBrand}` : '/'}
          className="flex items-center gap-3"
          aria-label={
            isBrandContext ? `Page d'accueil ${brandConfig!.name}` : "Page d'accueil Simply"
          }
        >
          <span className="text-2xl font-bold text-[var(--color-text-beige)]">
            Simply
            {isBrandContext && (
              <span className="text-[var(--brand-cta)]">{brandConfig!.suffix}</span>
            )}
          </span>
        </Link>

        {/* NAVIGATION DESKTOP */}
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
                  title={`Gestion de club – ${brandConfig!.name}`}
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
                  title={`Gestion d'équipe – ${brandConfig!.name}`}
                >
                  {dict.team}
                </Link>
              </li>
              <li className="relative">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button
                    className="flex cursor-pointer items-center hover:text-[var(--brand-cta)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)]/60 rounded"
                  >
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
                          title={`Fonctionnalités ${brandConfig!.name}`}
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
                  Actualités
                </Link>
              </li>
              <li>
                <BrandSwitcher currentBrand={currentBrand} />
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-[var(--color-text-beige)]/60 transition-colors hover:text-[var(--color-text-beige)]"
                >
                  ← Simply
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

        {/* BOUTONS CONNEXION / DASHBOARD */}
        {/* TODO: À décommenter quand l'application sera ouverte au public */}
        {/* <div className="hidden items-center gap-4 lg:flex">
          {logged ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-cta)] px-5 py-2 text-sm font-semibold text-[var(--brand-cta)] shadow-md hover:bg-[var(--brand-cta)]/10"
                title="Tableau de bord"
              >
                <User className="h-4 w-4" />
                Tableau de bord
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-cta)] px-5 py-2 text-sm font-semibold text-[var(--brand-bg)] shadow-md hover:bg-[var(--brand-cta-hover)]"
                title="Se déconnecter"
              >
                <LogOut className="h-4 w-4" />
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link
                href={getRoute(locale as "fr" | "en", "login")}
                className="inline-flex items-center rounded-full border border-[var(--brand-cta)] px-5 py-2 text-sm font-semibold text-[var(--brand-cta)] shadow-md hover:bg-[var(--brand-cta)]/10"
                title="Connexion à l'espace club"
              >
                Connexion
              </Link>
              <Link
                href={getRoute(locale as "fr" | "en", "signup")}
                className="inline-flex animate-[pulse_6s_ease-in-out_infinite] items-center rounded-full bg-[var(--brand-cta)] px-5 py-2 text-sm font-semibold text-[var(--brand-bg)] shadow-md hover:bg-[var(--brand-cta-hover)]"
                title="Créer un compte gratuitement"
              >
                Tester gratuitement
              </Link>
            </>
          )}
        </div> */}

        {/* MENU BURGER MOBILE */}
        {/* CTA desktop — visible uniquement lg+ */}
        <Link
          href="/contact"
          className="hidden lg:inline-flex items-center rounded-lg bg-[var(--brand-cta)] px-4 py-2 text-sm font-bold text-[var(--brand-cta-text)] transition-colors hover:bg-[var(--brand-cta-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)]/60"
        >
          {dict.headerCta ?? 'Démo gratuite'}
        </Link>

        {/* Burger mobile */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Fermer le menu mobile' : 'Ouvrir le menu mobile'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen(true)}
          className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text-beige)]/60 text-[var(--color-text-beige)] lg:hidden"
        >
          <MenuIcon className="h-8 w-8" />
        </button>
      </nav>

      {/* OVERLAY MOBILE */}
      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileMenuOpen}>
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
              {/* Titre accessible — annoncé par les screen readers à l'ouverture */}
              <Dialog.Title className="sr-only">
                {isBrandContext ? `Menu ${brandConfig!.name}` : 'Menu Simply'}
              </Dialog.Title>

              <button
                type="button"
                aria-label="Fermer le menu mobile"
                className="absolute top-4 right-4 rounded text-[var(--color-text-beige)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text-beige)]/60"
                onClick={() => setMobileMenuOpen(false)}
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
                      onClick={() => setMobileMenuOpen(false)}
                      title={`Gestion de club – ${brandConfig!.name}`}
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
                      onClick={() => setMobileMenuOpen(false)}
                      title={`Gestion d'équipe – ${brandConfig!.name}`}
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
                      onClick={() => setMobileMenuOpen(false)}
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
                      onClick={() => setMobileMenuOpen(false)}
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
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Actualités
                    </Link>
                    <BrandSwitcher currentBrand={currentBrand} className="mt-2" />
                    <Link
                      href="/"
                      className="text-base text-[var(--color-text-beige)]/60 transition-colors hover:text-[var(--color-text-beige)]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ← Simply
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
                        onClick={() => setMobileMenuOpen(false)}
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
                      onClick={() => setMobileMenuOpen(false)}
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
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {dict.contact}
                    </Link>
                  </>
                )}

                {/* CTA mobile */}
                <Link
                  href="/contact"
                  className="mt-2 block w-full rounded-xl bg-[var(--brand-cta)] py-3.5 text-center text-base font-extrabold text-[var(--brand-cta-text)] transition-colors hover:bg-[var(--brand-cta-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)]/60"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {dict.headerCta ?? 'Démo gratuite'} →
                </Link>

                {/* TODO: À décommenter quand l'application sera ouverte au public */}
                {/* {logged ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="w-full rounded-full border border-[var(--brand-cta)] py-3 text-center text-lg font-semibold text-[var(--brand-cta)] shadow-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Tableau de bord
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full rounded-full bg-[var(--brand-cta)] py-3 text-center text-lg font-semibold text-[var(--brand-bg)] shadow-md hover:bg-[var(--brand-cta-hover)]"
                    >
                      Se déconnecter
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={getRoute(locale as "fr" | "en", "login")}
                      className="w-full rounded-full border border-[var(--brand-cta)] py-3 text-center text-lg font-semibold text-[var(--brand-cta)] shadow-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Connexion
                    </Link>
                    <Link
                      href={getRoute(locale as "fr" | "en", "signup")}
                      className="w-full rounded-full bg-[var(--brand-cta)] py-3 text-center text-lg font-semibold text-[var(--brand-bg)] shadow-md hover:bg-[var(--brand-cta-hover)]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Tester gratuitement
                    </Link>
                  </>
                )} */}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
