// components/Header.tsx
"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu as MenuIcon, X as XIcon, ChevronDown, LogOut, User } from "lucide-react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

/**
 * SimplyFoot – Header / Navigation bar
 *
 * ✅ Masque “Connexion” si connecté (localStorage)
 * ✅ Boutons “Tableau de bord” & “Se déconnecter”
 * ✅ Synchro multi-onglets via l’évènement storage
 * ✅ Sticky + blur + shadow au scroll
 * ✅ Accessibilité (skip-link, focus rings, menus clavier)
 */

const AUTH_KEY = "sf_auth"; // remplace par ton vrai mécanisme de session quand tu brancheras l’API

const NAV_LINKS = [
  { name: "Gestion club", href: "/gestion-club" },
  { name: "Gestion équipe", href: "/gestionequipe" },
  {
    name: "Solutions",
    dropdown: [
      { name: "Offres", href: "/offres" },
      { name: "Fonctionnalités", href: "/fonctionnalites" },
    ],
  },
  { name: "Blog", href: "/blog" },
  { name: "À propos", href: "/a-propos" },
];

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logged, setLogged] = useState(false);

  // Background/shadow on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on hash navigation (anchor)
  useEffect(() => {
    const handleRouteChange = () => setMobileMenuOpen(false);
    window.addEventListener("hashchange", handleRouteChange);
    return () => window.removeEventListener("hashchange", handleRouteChange);
  }, []);

  // Session detection + cross-tab sync
  useEffect(() => {
    const sync = () => setLogged(!!localStorage.getItem(AUTH_KEY));
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    // notifie les autres onglets/composants
    try {
      window.dispatchEvent(new StorageEvent("storage", { key: AUTH_KEY, newValue: null }));
    } catch {
      // certains navigateurs bloquent StorageEvent programmatique — ce n’est pas bloquant
    }
    router.push("/connexion");
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full backdrop-blur-md transition-shadow duration-200",
        isScrolled ? "bg-[#14482F]/90 shadow-lg" : "bg-[#14482F]/70"
      )}
    >
      {/* Skip to content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 rounded bg-white px-4 py-2 text-sm text-[#14482F] shadow-lg"
      >
        Aller au contenu principal
      </a>

      <nav
        aria-label="Navigation principale"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:py-6"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="Accueil">
          <Image src="/logo.png" alt="Logo SimplyFoot" width={40} height={40} priority />
          <span className="text-2xl font-bold text-[#D9C6A3]">
            Simply<span className="text-[#5BE37D]">Foot</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.name} className="relative">
              {link.dropdown ? (
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="flex items-center text-[#D9C6A3] font-medium hover:text-[#5BE37D]">
                    {link.name}
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
                    <Menu.Items className="absolute left-0 z-20 mt-3 w-56 origin-top-left rounded-xl border border-[#5BE37D]/40 bg-[#232729]/90 p-2 backdrop-blur">
                      {link.dropdown.map((sub) => (
                        <Menu.Item key={sub.name}>
                          {({ active }) => (
                            <Link
                              href={sub.href}
                              className={clsx(
                                "block rounded-md px-4 py-2 text-sm font-medium",
                                active ? "bg-[#5BE37D]/10 text-[#5BE37D]" : "text-[#D9C6A3]"
                              )}
                            >
                              {sub.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <Link href={link.href} className="group relative text-[#D9C6A3] font-medium">
                  {link.name}
                  <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-[#5BE37D] transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 lg:flex">
          {logged ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-[#5BE37D] px-5 py-2 text-sm font-semibold text-[#5BE37D] shadow-md transition hover:bg-[#5BE37D]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BE37D]"
              >
                <User className="h-4 w-4" />
                Tableau de bord
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full bg-[#5BE37D] px-5 py-2 text-sm font-semibold text-[#14482F] shadow-md transition hover:bg-[#63f286] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BE37D]"
              >
                <LogOut className="h-4 w-4" />
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link
                href="/connexion"
                className="inline-flex items-center rounded-full border border-[#5BE37D] px-5 py-2 text-sm font-semibold text-[#5BE37D] shadow-md transition hover:bg-[#5BE37D]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BE37D]"
              >
                Connexion
              </Link>
              <Link
                href="/inscription"
                className="inline-flex animate-[pulse_6s_ease-in-out_infinite] items-center rounded-full bg-[#5BE37D] px-5 py-2 text-sm font-semibold text-[#14482F] shadow-md transition hover:bg-[#63f286] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BE37D]"
              >
                Tester gratuitement
              </Link>
            </>
          )}
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={() => setMobileMenuOpen(true)}
          className="text-[#D9C6A3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BE37D] lg:hidden"
        >
          <MenuIcon className="h-8 w-8" />
        </button>
      </nav>

      {/* Mobile overlay */}
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
            <div className="fixed inset-0 bg-[#14482F]/90 backdrop-blur" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="transition transform ease-out duration-200"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition transform ease-in duration-150"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Dialog.Panel className="relative mx-6 w-full max-w-md rounded-2xl border border-[#5BE37D]/40 bg-[#232729]/95 p-8 backdrop-blur">
                <button
                  type="button"
                  aria-label="Fermer le menu"
                  className="absolute top-4 right-4 text-[#D9C6A3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BE37D]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XIcon className="h-7 w-7" />
                </button>

                <div className="flex flex-col items-center gap-6">
                  {NAV_LINKS.map((link) => (
                    <div key={link.name}>
                      {link.dropdown ? (
                        <Menu as="div" className="relative inline-block text-left">
                          <Menu.Button className="text-2xl font-bold text-[#5BE37D]">{link.name}</Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 translate-y-1"
                            enterTo="transform opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="transform opacity-100 translate-y-0"
                            leaveTo="transform opacity-0 translate-y-1"
                          >
                            <Menu.Items className="absolute left-1/2 z-10 mt-2 w-56 -translate-x-1/2 rounded-xl border border-[#5BE37D]/40 bg-[#232729]/90 p-2 backdrop-blur">
                              {link.dropdown.map((sub) => (
                                <Menu.Item key={sub.name}>
                                  <Link
                                    href={sub.href}
                                    className="block rounded-md px-4 py-2 text-sm font-medium text-[#D9C6A3] hover:text-[#5BE37D]"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {sub.name}
                                  </Link>
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-2xl font-bold text-[#5BE37D]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}

                  {/* Actions mobiles */}
                  {logged ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="w-full rounded-full border border-[#5BE37D] py-3 text-center text-lg font-semibold text-[#5BE37D] shadow-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Tableau de bord
                      </Link>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full rounded-full bg-[#5BE37D] py-3 text-center text-lg font-semibold text-[#14482F] shadow-md hover:bg-[#63f286]"
                      >
                        Se déconnecter
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/connexion"
                        className="w-full rounded-full border border-[#5BE37D] py-3 text-center text-lg font-semibold text-[#5BE37D] shadow-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Connexion
                      </Link>
                      <Link
                        href="/inscription"
                        className="w-full rounded-full bg-[#5BE37D] py-3 text-center text-lg font-semibold text-[#14482F] shadow-md hover:bg-[#63f286]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Tester gratuitement
                      </Link>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
