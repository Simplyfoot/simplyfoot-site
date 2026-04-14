import { getPlatformRoute, getBrandRoute, type Locale } from '../i18n/routes';
import type { BrandId } from '../lib/config/brands';

// Labels qui apparaissent dans la navbar
const labels = {
  fr: {
    club: 'Gestion club',
    team: 'Gestion équipe',
    solutions: 'Solutions',
    offers: 'Offres',
    features: 'Fonctionnalités',
    blog: 'Blog',
    about: 'À propos',
    contact: 'Contact',
  },
  en: {
    club: 'Club management',
    team: 'Team management',
    solutions: 'Solutions',
    offers: 'Offers',
    features: 'Features',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
  },
} as const;

/**
 * Get navigation links for a given locale and brand.
 * Brand-specific pages use the brand prefix, platform pages don't.
 */
export const getNavLinks = (locale: Locale, brand: BrandId = 'foot') => [
  { name: labels[locale].club, href: getBrandRoute(locale, brand, 'club') },
  { name: labels[locale].team, href: getBrandRoute(locale, brand, 'team') },
  {
    name: labels[locale].solutions,
    dropdown: [
      { name: labels[locale].offers, href: getBrandRoute(locale, brand, 'offers') },
      { name: labels[locale].features, href: getBrandRoute(locale, brand, 'features') },
    ],
  },
  { name: labels[locale].about, href: getPlatformRoute(locale, 'about') },
  { name: labels[locale].contact, href: getPlatformRoute(locale, 'contact') },
];
