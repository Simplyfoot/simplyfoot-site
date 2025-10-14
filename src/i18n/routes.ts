export const ROUTES = {
  fr: {
    home: "/",
    about: "/a-propos",
    admin: "/admin",
    blog: "/blog",
    cgu: "/cgu",
    cgv: "/cgv",
    club: "/gestion-club",
    team: "/gestion-equipe",
    features: "/fonctionnalites",
    offers: "/offres",
    contact: "/contact",
    login: "/connexion",
    signup: "/inscription",
    dashboard: "/dashboard",
    privacy: "/confidentialite",
    legal: "/mentions-legales",
  },
  en: {
    home: "/en",
    about: "/en/about",
    admin: "/en/admin",
    blog: "/en/blog",
    cgu: "/en/terms",
    cgv: "/en/sales-terms",
    club: "/en/club-management",
    team: "/en/team-management",
    features: "/en/features",
    offers: "/en/offers",
    contact: "/en/contact",
    login: "/en/sign-in",
    signup: "/en/sign-up",
    dashboard: "/en/dashboard",
    privacy: "/en/privacy",
    legal: "/en/legal-notices",
  },
} as const;

export type Locale = keyof typeof ROUTES;
export type RouteKey = keyof typeof ROUTES.fr;

export const getRoute = (locale: Locale, routeKey: RouteKey): string => {
  return ROUTES[locale][routeKey] ?? "/";
};
