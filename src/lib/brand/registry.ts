import type { BrandMeta, BrandSlug } from './types';

/**
 * Brand metadata. Colors are NOT here: CSS is the single source of truth
 * (see src/app/globals.css [data-brand="..."] blocks). For JS contexts that
 * cannot read CSS (Three.js / WebGL), use `useBrandColor` from './css-vars'.
 */
export const BRANDS: Record<BrandSlug, BrandMeta> = {
    foot: { slug: 'foot', label: 'SimplyFoot', name: 'Foot', emoji: '⚽' },
    rugby: { slug: 'rugby', label: 'SimplyRugby', name: 'Rugby', emoji: '🏉' },
    handball: { slug: 'handball', label: 'SimplyHandball', name: 'Handball', emoji: '🤾' },
};

export const BRAND_SLUGS: readonly BrandSlug[] = ['foot', 'rugby', 'handball'] as const;
