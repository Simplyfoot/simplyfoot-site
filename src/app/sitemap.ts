import type { MetadataRoute } from 'next';

import { isBrandEnabled } from '@/config/brands';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';
import type { AppPathname } from '~types/i18n.types';

/**
 * Routes indexables. Toute page publique avec `generateMetadata` doit
 * être listée ici pour apparaître dans le sitemap multilingue.
 *
 * Exclue volontairement : `/foot/offers/checkout` (page transactionnelle
 * avec `robots: noindex`), tout endpoint API, toute page brouillon.
 */
const routes: ReadonlyArray<{
    href: AppPathname;
    /** Priorité SEO 0-1. Home brand = 1.0, landing = 0.9, contenu = 0.7, légal = 0.4. */
    priority: number;
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
}> = [
    // Hub multi-marque
    { href: '/', priority: 1, changeFrequency: 'monthly' },

    // Homes par marque (cinématique foot, vide pour rugby/handball à date)
    { href: '/foot', priority: 1, changeFrequency: 'weekly' },
    { href: '/rugby', priority: 0.9, changeFrequency: 'monthly' },
    { href: '/handball', priority: 0.9, changeFrequency: 'monthly' },

    // Landing produit foot (deep dive features + roadmap)
    { href: '/foot/features', priority: 0.9, changeFrequency: 'weekly' },
    { href: '/foot/offers', priority: 0.9, changeFrequency: 'monthly' },

    // À propos par marque
    { href: '/foot/about', priority: 0.7, changeFrequency: 'monthly' },
    { href: '/rugby/about', priority: 0.7, changeFrequency: 'monthly' },
    { href: '/handball/about', priority: 0.7, changeFrequency: 'monthly' },

    // FAQ par marque
    { href: '/foot/faq', priority: 0.7, changeFrequency: 'weekly' },
    { href: '/rugby/faq', priority: 0.6, changeFrequency: 'monthly' },
    { href: '/handball/faq', priority: 0.6, changeFrequency: 'monthly' },

    // Contact par marque
    { href: '/foot/contact', priority: 0.6, changeFrequency: 'monthly' },
    { href: '/rugby/contact', priority: 0.6, changeFrequency: 'monthly' },
    { href: '/handball/contact', priority: 0.6, changeFrequency: 'monthly' },

    // Légal — basse priorité, fréquence faible
    { href: '/foot/legal/mentions-legales', priority: 0.4, changeFrequency: 'yearly' },
    { href: '/rugby/legal/mentions-legales', priority: 0.4, changeFrequency: 'yearly' },
    { href: '/handball/legal/mentions-legales', priority: 0.4, changeFrequency: 'yearly' },
];

/**
 * Extrait le slug de marque d'un href interne (`/foot/contact` → `'foot'`).
 * Retourne `null` pour les routes neutres (`/`, `/api/...`).
 */
function extractBrandSlug(href: AppPathname): BrandSlug | null {
    if (href.startsWith('/foot')) {
        return 'foot';
    }
    if (href.startsWith('/rugby')) {
        return 'rugby';
    }
    if (href.startsWith('/handball')) {
        return 'handball';
    }
    return null;
}

/**
 * Génère un sitemap multilingue : pour chaque (route × locale), on émet
 * une entrée avec ses URLs alternatives `hreflang` (incluant
 * `x-default`). Conforme aux recommandations Google pour l'indexation
 * de sites internationalisés.
 *
 * Les routes des marques désactivées (`src/config/brands.ts` —
 * `ENABLED_BRAND_SLUGS`) sont automatiquement filtrées : elles n'apparaissent
 * pas dans le sitemap tant que la marque n'est pas réactivée.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    const visibleRoutes = routes.filter((route) => {
        const slug = extractBrandSlug(route.href);
        return slug === null || isBrandEnabled(slug);
    });

    return visibleRoutes.flatMap(({ href, priority, changeFrequency }) =>
        routing.locales.map((locale) => {
            const languages: Record<string, string> = {};
            for (const alt of routing.locales) {
                languages[alt] = `${SITE_URL}${getPathname({ locale: alt, href })}`;
            }
            languages['x-default'] = `${SITE_URL}${getPathname({
                locale: routing.defaultLocale,
                href,
            })}`;

            return {
                url: `${SITE_URL}${getPathname({ locale, href })}`,
                lastModified,
                changeFrequency,
                priority,
                alternates: { languages },
            };
        }),
    );
}
