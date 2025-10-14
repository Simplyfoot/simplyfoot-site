import { getRoute } from "../i18n/routes";

// Labels qui apparaissent dans la navbar
const labels = {
  fr: {
    club: "Gestion club",
    team: "Gestion équipe",
    solutions: "Solutions",
    offers: "Offres",
    features: "Fonctionnalités",
    blog: "Blog",
    about: "À propos",
  },
  en: {
    club: "Club management",
    team: "Team management",
    solutions: "Solutions",
    offers: "Offers",
    features: "Features",
    blog: "Blog",
    about: "About",
  },
} as const;

export const getNavLinks = (locale: keyof typeof labels) => [
  { name: labels[locale].club, href: getRoute(locale, "club") },
  { name: labels[locale].team, href: getRoute(locale, "team") },
  {
    name: labels[locale].solutions,
    dropdown: [
      { name: labels[locale].offers, href: getRoute(locale, "offers") },
      { name: labels[locale].features, href: getRoute(locale, "features") },
    ],
  },
  { name: labels[locale].blog, href: getRoute(locale, "blog") },
  { name: labels[locale].about, href: getRoute(locale, "about") },
];
