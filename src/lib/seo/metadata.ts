import type { Metadata } from 'next';
import type { BrandConfig } from '../config/brands';
import { siteConfig } from '../config/site';

// ── Structured data (JSON-LD) ──────────────────────────────────────────────

/**
 * Génère le JSON-LD SoftwareApplication pour une landing de marque.
 * À injecter via <script type="application/ld+json"> dans le composant de page.
 */
export function buildSoftwareApplicationJsonLd(brand: BrandConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: brand.name,
    applicationCategory: 'SportsApplication',
    operatingSystem: 'Web, iOS, Android',
    description: brand.meta.description,
    url: `${siteConfig.url}/${brand.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: '1 mois gratuit sans engagement',
    },
  };
}

/**
 * Génère le JSON-LD BreadcrumbList pour les sous-pages de marque.
 * Items : [{ name: "Simply", url: "/" }, { name: "SimplyFoot", url: "/foot" }, ...]
 */
export function buildBreadcrumbJsonLd(items: ReadonlyArray<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Build metadata for a brand-specific page.
 * Follows the convention: "[Page Title] | [Brand Name] — Simply"
 */
export function buildBrandMetadata(
  brand: BrandConfig,
  page: { title: string; description: string; path: string },
): Metadata {
  const url = `${siteConfig.url}${page.path}`;

  return {
    title: `${page.title} | ${brand.name} — Simply`,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${page.title} | ${brand.name}`,
      description: page.description,
      url,
      siteName: brand.name,
      type: 'website',
      images: [brand.meta.ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | ${brand.name}`,
      description: page.description,
      creator: brand.meta.twitterHandle,
    },
  };
}

/**
 * Build metadata for a platform-level page (not brand-specific).
 * Follows the convention: "[Page Title] | Simply"
 */
export function buildPlatformMetadata(page: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteConfig.url}${page.path}`;

  return {
    title: `${page.title} | Simply`,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${page.title} | Simply`,
      description: page.description,
      url,
      siteName: siteConfig.name,
      type: 'website',
    },
  };
}
