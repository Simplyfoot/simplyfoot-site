import type { MetadataRoute } from 'next';

import { ENABLED_BRANDS } from '@/config/features';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';
import type { AppPathname } from '~types/i18n.types';

const allRoutes: Array<AppPathname> = [
    '/foot',
    '/foot/legal/mentions-legales',
    '/rugby/legal/mentions-legales',
    '/handball/legal/mentions-legales',
    '/foot/legal/cgu',
    '/foot/legal/privacy',
    '/foot/faq',
    '/rugby/faq',
    '/handball/faq',
    '/foot/contact',
    '/rugby/contact',
    '/handball/contact',
];

const ALL_BRANDS: ReadonlyArray<BrandSlug> = ['foot', 'rugby', 'handball'];

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();
    const routes = allRoutes.filter((href) => isRouteEnabled(href));

    return routes.flatMap((href) =>
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
                changeFrequency: 'weekly' as const,
                priority: href === '/foot' ? 1 : 0.7,
                alternates: { languages },
            };
        }),
    );
}

function isRouteEnabled(href: AppPathname): boolean {
    const owningBrand = ALL_BRANDS.find(
        (brand) => href === `/${brand}` || href.startsWith(`/${brand}/`),
    );

    if (!owningBrand) {
        return true;
    }

    return ENABLED_BRANDS.includes(owningBrand);
}
