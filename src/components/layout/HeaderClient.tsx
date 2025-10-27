"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/logos/logo_simplyfoot.png";
import { Menu as MenuIcon, X as XIcon, ChevronDown, LogOut, User } from "lucide-react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { getRoute, type RouteKey } from "../../i18n/routes";
import { supabase } from "lib/supabaseClient";

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

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setLogged(!!data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLogged(!!session?.user);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem(AUTH_KEY);
    try {
      await supabase.auth.signOut();
      setLogged(false);
      router.push("/connexion");
    } catch {
    }

  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full backdrop-blur-md transition-shadow duration-200",
        isScrolled ? "bg-[#14482F]/90 shadow-lg" : "bg-[#14482F]/70"
      )}
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 rounded bg-white px-4 py-2 text-sm text-[#14482F] shadow-lg"
      >
        Aller au contenu principal
      </a>

      <nav
        aria-label="Navigation principale du site SimplyFoot"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:py-6"
      >
        <Link
          href={getRoute(locale as "fr" | "en", "home")}
          className="flex items-center gap-3"
          aria-label="Retour à la page d’accueil SimplyFoot"
        >
          <Image
            src={Logo}
            alt="SimplyFoot — Application de gestion de clubs et associations de football amateurs"
            width={40}
            height={40}
            priority
          />
          <span className="text-2xl font-bold text-[#F8E9CA]">
            Simply<span className="text-[#4e9369]">Foot</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex text-[#F8E9CA] font-medium">
          <li>
            <Link
              href={getRoute(locale as "fr" | "en", "club")}
              className={clsx(
                "transition-colors hover:text-[#29be4f]",
                pathname === "/gestion-club" ? "text-[#29be4f]" : "text-[#F8E9CA]"
              )}
              title="Solution de gestion de club – SimplyFoot"
            >
              {dict.club}
            </Link>
          </li>
          <li>
            <Link
              href={getRoute(locale as "fr" | "en", "team")}
              className={clsx(
                "transition-colors hover:text-[#29be4f]",
                pathname === "/gestion-equipe" ? "text-[#29be4f]" : "text-[#F8E9CA]"
              )}
              title="Outil de gestion d’équipe – SimplyFoot"
            >
              {dict.team}
            </Link>
          </li>

          <li className="relative">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button
                className="flex items-center cursor-pointer hover:text-[#29be4f]"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {dict.solutions}
                <ChevronDown className="ml-1 h-5 w-5" aria-hidden="true" />
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
                <Menu.Items className="absolute left-0 z-20 mt-3 w-56 origin-top-left rounded-xl border border-[#29be4f]/40 bg-[#232729]/90 p-2 backdrop-blur">
                  <Menu.Item>
                    <Link
                      href={getRoute(locale as "fr" | "en", "offers")}
                      className="block rounded-md px-4 py-2 text-sm hover:text-[#29be4f]"
                      title="Découvrez nos offres SimplyFoot"
                    >
                      {dict.offers}
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      href={getRoute(locale as "fr" | "en", "features")}
                      className="block rounded-md px-4 py-2 text-sm hover:text-[#29be4f]"
                      title="Fonctionnalités principales de SimplyFoot"
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
              href={getRoute(locale as "fr" | "en", "about")}
              className={clsx(
                "transition-colors hover:text-[#29be4f]",
                pathname.startsWith("/a-propos") ? "text-[#29be4f]" : "text-[#F8E9CA]"
              )}
              title="À propos de SimplyFoot"
            >
              {dict.about}
            </Link>
          </li>
          <li>
            <Link
              href={getRoute(locale as "fr" | "en", "contact")}
              className={clsx(
                "transition-colors hover:text-[#29be4f]",
                pathname.startsWith("/contact") ? "text-[#29be4f]" : "text-[#F8E9CA]"
              )}
              title="Contactez l’équipe SimplyFoot"
            >
              {dict.contact}
            </Link>
          </li>
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          {logged ? (
            <>
              <Link
                href="/dashboard"
                className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-[#29be4f] px-5 py-2 text-sm font-semibold text-[#29be4f] shadow-md hover:bg-[#29be4f]/10"
                title="Accéder à mon tableau de bord SimplyFoot"
              >
                <User className="h-4 w-4" />
                Tableau de bord
              </Link>
              <button
                onClick={handleLogout}
                className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-[#29be4f] px-5 py-2 text-sm font-semibold text-[#14482F] shadow-md hover:bg-[#63f286]"
                title="Se déconnecter de SimplyFoot"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                href={getRoute(locale as "fr" | "en", "login")}
                className="cursor-pointer inline-flex items-center rounded-full border border-[#29be4f] px-5 py-2 text-sm font-semibold text-[#29be4f] shadow-md hover:bg-[#29be4f]/10"
                title="Connexion à votre espace SimplyFoot"
              >
                Connexion
              </Link>
              <Link
                href={getRoute(locale as "fr" | "en", "signup")}
                className="cursor-pointer inline-flex animate-[pulse_6s_ease-in-out_infinite] items-center rounded-full bg-[#29be4f] px-5 py-2 text-sm font-semibold text-[#14482F] shadow-md hover:bg-[#63f286]"
                title="Créer un compte gratuitement sur SimplyFoot"
              >
                Créer un compte
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Ouvrir le menu mobile"
          onClick={() => setMobileMenuOpen(true)}
          className="text-[#F8E9CA] lg:hidden"
        >
          <MenuIcon className="h-8 w-8" />
        </button>
      </nav>

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
            <Dialog.Panel className="relative mx-6 w-full max-w-md rounded-2xl border border-[#29be4f]/40 bg-[#232729]/95 p-8 backdrop-blur">
              <button
                type="button"
                aria-label="Fermer le menu mobile"
                className="absolute top-4 right-4 text-[#F8E9CA]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XIcon className="h-7 w-7" />
              </button>

              <div className="flex flex-col items-center gap-6">
                {(
                  [
                    "club",
                    "team",
                    "offers",
                    "features",
                    "about",
                    "contact",
                  ] as RouteKey[]
                ).map((key) => {
                  const route = getRoute(locale as "fr" | "en", key);
                  if (!route) return null;
                  return (
                    <Link
                      key={key}
                      href={route}
                      className={clsx(
                        "text-2xl font-bold transition-all",
                        pathname.includes(key)
                          ? "text-[#29be4f]"
                          : "text-[#F8E9CA] hover:text-[#29be4f]"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                      title={`${dict[key]} – SimplyFoot`}
                    >
                      {dict[key]}
                    </Link>
                  );
                })}

                {logged ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="w-full rounded-full border border-[#29be4f] py-3 text-center text-lg font-semibold text-[#29be4f] shadow-md"
                      onClick={() => setMobileMenuOpen(false)}
                      title="Tableau de bord SimplyFoot"
                    >
                      Tableau de bord
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full rounded-full bg-[#29be4f] py-3 text-center text-lg font-semibold text-[#14482F] shadow-md hover:bg-[#63f286]"
                      title="Se déconnecter de SimplyFoot"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={getRoute(locale as "fr" | "en", "login")}
                      className="w-full rounded-full border border-[#29be4f] py-3 text-center text-lg font-semibold text-[#29be4f] shadow-md"
                      onClick={() => setMobileMenuOpen(false)}
                      title="Connexion à votre espace SimplyFoot"
                    >
                      Connexion
                    </Link>
                    <Link
                      href={getRoute(locale as "fr" | "en", "signup")}
                      className="w-full rounded-full bg-[#29be4f] py-3 text-center text-lg font-semibold text-[#14482F] shadow-md hover:bg-[#63f286]"
                      onClick={() => setMobileMenuOpen(false)}
                      title="Créer un compte SimplyFoot gratuitement"
                    >
                      Créer un compte
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
