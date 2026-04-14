import type { MetadataRoute } from 'next';
import { getAllBrands } from 'lib/config/brands';
import { siteConfig } from 'lib/config/site';

const BRAND_PATHS = ['/fonctionnalites', '/offres', '/gestion-club', '/gestion-equipe'];

const PLATFORM_PATHS = ['/', '/contact', '/a-propos', '/blog', '/cgu', '/cgv', '/confidentialite', '/mentions-legales'];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  return [
    ...PLATFORM_PATHS.map((p) => ({
      url: `${base}${p}`,
      changeFrequency: 'weekly' as const,
      priority: p === '/' ? 1.0 : 0.6,
    })),
    ...getAllBrands().flatMap((b) => [
      {
        url: `${base}/${b.slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      },
      ...BRAND_PATHS.map((p) => ({
        url: `${base}/${b.slug}${p}`,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
    ]),
  ];
}
