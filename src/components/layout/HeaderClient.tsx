"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/logos/logo_simplyfoot.png";
import { Menu as MenuIcon, X as XIcon, ChevronDown, LogOut, User } from "lucide-react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { getRoute } from "../../i18n/routes";

const AUTH_KEY = "sf_auth";

export default function HeaderClient({
  dict,
  locale,
}: {
  dict: Record<string, string>;
  locale: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logged, setLogged] = useState(false);

  // Effet scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // État connexion
  useEffect(() => {
    const sync = () => setLogged(!!localStorage.getItem(AUTH_KEY));
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    try {
      window.dispatchEvent(new StorageEvent("storage", { key: AUTH_KEY, newValue: null }));
    } catch {}
    router.push(getRoute(locale as "fr" | "en", "connexion"));
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full backdrop-blur-md transition-shadow duration-200",
        isScrolled ? "bg-[#14482F]/90 shadow-lg" : "bg-[#14482F]/70"
      )}
    >
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
        <Link href={getRoute(locale as "fr" | "en", "home")} className="flex items-center gap-3" aria-label="Accueil">
          <Image src={Logo} alt="Logo SimplyFoot" width={40} height={40} priority />
          <span className="text-2xl font-bold text-[#F8E9CA]">
            Simply<span className="text-[#567E66]">Foot</span>
          </span>
        </Link>

        {/* NAVIGATION DESKTOP */}
        <ul className="hidden items-center gap-8 lg:flex text-[#F8E9CA] font-medium">
          <li>
            <Link
              href={getRoute(locale as "fr" | "en", "clubManagement")}
              className={clsx(
                "transition-colors hover:text-[#5BE37D]",
                pathname === "/gestion-club" || pathname === "/club" ? "text-[#5BE37D]" : "text-[#F8E9CA]"
              )}
            >
              {dict.club}
            </Link>
          </li>
          <li>
            <Link
              href={getRoute(locale as "fr" | "en", "teamManagement")}
              className={clsx(
                "transition-colors hover:text-[#5BE37D]",
                pathname === "/gestion-equipe" ? "text-[#5BE37D]" : "text-[#F8E9CA]"
              )}
            >
              {dict.team}
            </Link>
          </li>
          <li className="relative">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex items-center hover:text-[#5BE37D]">
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
                <Menu.Items className="absolute left-0 z-20 mt-3 w-56 origin-top-left rounded-xl border border-[#5BE37D]/40 bg-[#232729]/90 p-2 backdrop-blur">
                  <Menu.Item>
                    <Link
                      href={getRoute(locale as "fr" | "en", "offers")}
                      className="block rounded-md px-4 py-2 text-sm hover:text-[#5BE37D]"
                    >
                      {dict.offers}
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      href={getRoute(locale as "fr" | "en", "fonctionnalites")}
                      className="block rounded-md px-4 py-2 text-sm hover:text-[#5BE37D]"
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
              href={getRoute(locale as "fr" | "en", "blog")}
              className={clsx(
                "transition-colors hover:text-[#5BE37D]",
                pathname.startsWith("/blog") ? "text-[#5BE37D]" : "text-[#F8E9CA]"
              )}
            >
              {dict.blog}
            </Link>
          </li>
          <li>
            <Link
              href={getRoute(locale as "fr" | "en", "about")}
              className={clsx(
                "transition-colors hover:text-[#5BE37D]",
                pathname.startsWith("/a-propos") ? "text-[#5BE37D]" : "text-[#F8E9CA]"
              )}
            >
              {dict.about}
            </Link>
          </li>
          <li>
            <Link
              href={getRoute(locale as "fr" | "en", "contact")}
              className={clsx(
                "transition-colors hover:text-[#5BE37D]",
                pathname.startsWith("/contact") ? "text-[#5BE37D]" : "text-[#F8E9CA]"
              )}
            >
              {dict.contact}
            </Link>
          </li>
        </ul>

        {/* BOUTONS CONNEXION / DASHBOARD */}
        <div className="hidden items-center gap-4 lg:flex">
          {logged ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-[#5BE37D] px-5 py-2 text-sm font-semibold text-[#5BE37D] shadow-md hover:bg-[#5BE37D]/10"
              >
                <User className="h-4 w-4" />
                Tableau de bord
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full bg-[#5BE37D] px-5 py-2 text-sm font-semibold text-[#14482F] shadow-md hover:bg-[#63f286]"
              >
                <LogOut className="h-4 w-4" />
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link
                href={getRoute(locale as "fr" | "en", "connexion")}
                className="inline-flex items-center rounded-full border border-[#5BE37D] px-5 py-2 text-sm font-semibold text-[#5BE37D] shadow-md hover:bg-[#5BE37D]/10"
              >
                Connexion
              </Link>
              <Link
                href={getRoute(locale as "fr" | "en", "inscription")}
                className="inline-flex animate-[pulse_6s_ease-in-out_infinite] items-center rounded-full bg-[#5BE37D] px-5 py-2 text-sm font-semibold text-[#14482F] shadow-md hover:bg-[#63f286]"
              >
                Tester gratuitement
              </Link>
            </>
          )}
        </div>

        {/* MENU BURGER MOBILE */}
        <button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={() => setMobileMenuOpen(true)}
          className="text-[#F8E9CA] lg:hidden"
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
            <div className="fixed inset-0 bg-[#14482F]/90 backdrop-blur" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="relative mx-6 w-full max-w-md rounded-2xl border border-[#5BE37D]/40 bg-[#232729]/95 p-8 backdrop-blur">
              <button
                type="button"
                aria-label="Fermer le menu"
                className="absolute top-4 right-4 text-[#F8E9CA]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XIcon className="h-7 w-7" />
              </button>

              <div className="flex flex-col items-center gap-6">
                {["club", "team", "offers", "features", "blog", "about", "contact"].map((key) => (
                  <Link
                    key={key}
                    href={getRoute(locale as "fr" | "en", key as any)}
                    className={clsx(
                      "text-2xl font-bold transition-all",
                      pathname.includes(key)
                        ? "text-[#5BE37D]"
                        : "text-[#F8E9CA] hover:text-[#5BE37D]"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {dict[key]}
                  </Link>
                ))}

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
                      href={getRoute(locale as "fr" | "en", "connexion")}
                      className="w-full rounded-full border border-[#5BE37D] py-3 text-center text-lg font-semibold text-[#5BE37D] shadow-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Connexion
                    </Link>
                    <Link
                      href={getRoute(locale as "fr" | "en", "inscription")}
                      className="w-full rounded-full bg-[#5BE37D] py-3 text-center text-lg font-semibold text-[#14482F] shadow-md hover:bg-[#63f286]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Tester gratuitement
                    </Link>
                  </>
                )}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
