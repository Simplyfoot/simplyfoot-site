import { routing } from '@/i18n/routing';

/**
 * Build a locale-prefixed href for a blog article. Article slugs are
 * universal (not localised) so this helper only handles the locale prefix
 * according to the `as-needed` strategy: the default locale gets no prefix,
 * other locales get `/xx` prepended.
 *
 * Kept as a plain helper (not a next-intl typed Link) because registering a
 * dynamic pathname `/foot/blog/[slug]` in `routing.pathnames` breaks every
 * existing consumer of `usePathname()` (they would suddenly have to handle
 * params when switching locales).
 */
export function localizedArticleHref(slug: string, locale: string): string {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    return `${prefix}/foot/blog/${slug}`;
}
