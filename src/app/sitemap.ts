import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/constants';
import { BRANDS } from '@/types/brand';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ['', '/a-propos', '/contact'];
    const brandRoutes = BRANDS.flatMap((brand) => [
        `/${brand}`,
        `/${brand}/blog`,
        `/${brand}/faq`,
        `/${brand}/offres`,
    ]);

    const allRoutes = [...routes, ...brandRoutes];

    return allRoutes.map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));
}
