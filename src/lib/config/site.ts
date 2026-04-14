/**
 * Site-wide configuration shared across all brands and pages.
 */
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.simplyfoot.fr',
  name: 'Simply',
  tagline: 'La plateforme de gestion pour clubs de sport amateur',
  locale: {
    default: 'fr' as const,
    supported: ['fr', 'en'] as const,
  },
} as const;

export type SupportedLocale = (typeof siteConfig.locale.supported)[number];
