import { getBrandConfig, isValidBrand, DEFAULT_BRAND } from '../config/brands';
import type { BrandConfig } from '../config/brands';

/**
 * Resolve a BrandConfig from a URL path segment.
 * Returns the default brand if the segment is invalid.
 */
export function resolveBrandFromSlug(slug: string | undefined): BrandConfig {
  if (slug && isValidBrand(slug)) {
    return getBrandConfig(slug);
  }
  return getBrandConfig(DEFAULT_BRAND);
}

/**
 * Extract brand slug from a pathname.
 * Matches /foot, /rugby, /handball at the start of the path.
 */
export function extractBrandFromPathname(pathname: string): string | null {
  const match = pathname.match(/^\/(foot|rugby|handball)/);
  return match ? match[1] : null;
}
