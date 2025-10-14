"use client";

import { ROUTES } from "i18n/routes";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";


export default function LangSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentLocale = pathname.startsWith("/en") ? "en" : "fr";
  const nextLocale = currentLocale === "fr" ? "en" : "fr";

  const switchLanguage = () => {
    const newPath = getTranslatedPath(pathname, currentLocale, nextLocale);
    startTransition(() => router.push(newPath));
  };

  return (
    <button
      onClick={switchLanguage}
      disabled={isPending}
      className="rounded-full border border-[#29be4f]/60 px-3 py-1 text-sm text-[#29be4f] hover:bg-[#29be4f]/10 transition disabled:opacity-50"
    >
      {currentLocale === "fr" ? "EN" : "FR"}
    </button>
  );
}

function getTranslatedPath(pathname: string, from: "fr" | "en", to: "fr" | "en") {
  const key = Object.keys(ROUTES[from]).find(
    (k) => ROUTES[from][k as keyof typeof ROUTES["fr"]] === pathname
  );

  if (key) return ROUTES[to][key as keyof typeof ROUTES["fr"]];
  if (pathname === "/" && to === "en") return "/en";
  if (pathname === "/en" && to === "fr") return "/";
  return to === "en" ? `/en${pathname}` : pathname.replace(/^\/en/, "");
}
