export const routes = {
  fr: {
    home: "/",
    about: "/a-propos",
    admin: "/admin",
    blog: "/blog",
    cgu: "/cgu",
    cgv: "/cgv",
    clubManagement: "/gestion-club",
    teamManagement: "/gestion-equipe",
    fonctionnalites: "/fonctionnalites",
    offers: "/offres",
    contact: "/contact",
    connexion: "/connexion",
    inscription: "/inscription",
    dashboard: "/dashboard",
    confidentialite: "/confidentialite",
    mentionsLegales: "/mentions-legales",
  },
  en: {
    home: "/en",
    about: "/en/about",
    admin: "/en/admin",
    blog: "/en/blog",
    cgu: "/en/terms",
    cgv: "/en/sales-terms",
    clubManagement: "/en/club-management",
    teamManagement: "/en/team-management",
    fonctionnalites: "/en/features",
    offers: "/en/offers",
    contact: "/en/contact",
    connexion: "/en/sign-in",
    inscription: "/en/sign-up",
    dashboard: "/en/dashboard",
    confidentialite: "/en/privacy",
    mentionsLegales: "/en/legal-notices",
  },
} as const;

export type Locale = keyof typeof routes;
export type RouteKey = keyof typeof routes.fr;

export const getRoute = (locale: Locale, key: RouteKey) => {
  if (locale === "fr") return routes.fr[key];
  else return routes[locale][key];
};
