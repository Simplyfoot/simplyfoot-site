import type { BrandId } from '../lib/config/brands';

/**
 * Platform-level routes (not brand-specific).
 */
export const PLATFORM_ROUTES = {
  fr: {
    home: '/',
    about: '/a-propos',
    blog: '/blog',
    cgu: '/cgu',
    cgv: '/cgv',
    contact: '/contact',
    privacy: '/confidentialite',
    legal: '/mentions-legales',
  },
  en: {
    home: '/',
    about: '/a-propos',
    blog: '/blog',
    cgu: '/cgu',
    cgv: '/cgv',
    contact: '/contact',
    privacy: '/confidentialite',
    legal: '/mentions-legales',
  },
} as const;

/**
 * Brand-level routes (require a brand slug prefix).
 */
export const BRAND_ROUTES = {
  fr: {
    landing: '',
    club: '/gestion-club',
    team: '/gestion-equipe',
    features: '/fonctionnalites',
    offers: '/offres',
  },
  en: {
    landing: '',
    club: '/gestion-club',
    team: '/gestion-equipe',
    features: '/fonctionnalites',
    offers: '/offres',
  },
} as const;

export type Locale = keyof typeof PLATFORM_ROUTES;
export type PlatformRouteKey = keyof typeof PLATFORM_ROUTES.fr;
export type BrandRouteKey = keyof typeof BRAND_ROUTES.fr;

/**
 * Get a platform-level route path.
 */
export function getPlatformRoute(locale: Locale, routeKey: PlatformRouteKey): string {
  return PLATFORM_ROUTES[locale][routeKey] ?? '/';
}

/**
 * Get a brand-level route path (prefixed with /{brand}).
 */
export function getBrandRoute(locale: Locale, brand: BrandId, routeKey: BrandRouteKey): string {
  const suffix = BRAND_ROUTES[locale][routeKey] ?? '';
  return `/${brand}${suffix}`;
}

// Legacy combined route map for backward compatibility during migration.
// Brand routes are resolved with "foot" as default brand.
const LEGACY_ROUTES = {
  fr: {
    ...PLATFORM_ROUTES.fr,
    home: '/',
    club: '/foot/gestion-club',
    team: '/foot/gestion-equipe',
    features: '/foot/fonctionnalites',
    offers: '/foot/offres',
    login: '/foot',
    signup: '/foot',
    dashboard: '/foot',
    admin: '/foot',
  },
  en: {
    ...PLATFORM_ROUTES.en,
    home: '/',
    club: '/foot/gestion-club',
    team: '/foot/gestion-equipe',
    features: '/foot/fonctionnalites',
    offers: '/foot/offres',
    login: '/foot',
    signup: '/foot',
    dashboard: '/foot',
    admin: '/foot',
  },
} as const;

export type RouteKey = keyof typeof LEGACY_ROUTES.fr;
export const ROUTES = LEGACY_ROUTES;

export function getRoute(locale: Locale, routeKey: RouteKey): string {
  return LEGACY_ROUTES[locale][routeKey] ?? '/';
}
