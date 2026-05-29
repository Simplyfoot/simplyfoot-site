import type { MetadataRoute } from 'next';

import { ENABLED_BRANDS } from '@/config/features';
import { SITE_URL } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';

const ALL_BRANDS: ReadonlyArray<BrandSlug> = ['foot', 'rugby', 'handball'];

export default function robots(): MetadataRoute.Robots {
    const disabledBrandPaths = ALL_BRANDS.filter((brand) => !ENABLED_BRANDS.includes(brand)).map(
        (brand) => `/${brand}/`,
    );

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', ...disabledBrandPaths],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
