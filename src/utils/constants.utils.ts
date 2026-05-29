import type { BrandMeta, BrandSlug } from '~types/brand.types';

/**
 * Couleur de repli retournée quand une résolution de couleur CSS échoue
 * (chaîne vide, canvas indisponible, format non reconnu).
 *
 * Choisie noire : invisible sur fonds sombres, signale un manque de donnée
 * sans casser le rendu WebGL qui attend un hex valide.
 */
export const FALLBACK_HEX = '#000000';

/**
 * URL publique du site (canonical root). Sert pour les metadata Open Graph,
 * alternates hreflang, robots.txt et sitemap.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://simply.fr';

/**
 * Registre des marques SIMPLY. Les couleurs NE sont PAS ici : le CSS reste la
 * source de vérité unique (voir `src/styles/themes/<brand>.css` + attribut
 * `[data-brand]`). Pour les contextes JS (Three.js / WebGL) qui ne peuvent
 * pas lire le CSS, passer par `useBrandColor` depuis `@/hooks/useBrandColor`.
 */
export const BRANDS: Record<BrandSlug, BrandMeta> = {
    foot: { slug: 'foot', label: 'SimplyFoot', name: 'Foot', emoji: '⚽' },
    rugby: { slug: 'rugby', label: 'SimplyRugby', name: 'Rugby', emoji: '🏉' },
    handball: { slug: 'handball', label: 'SimplyHandball', name: 'Handball', emoji: '🤾' },
};

export const BRAND_SLUGS: readonly BrandSlug[] = ['foot', 'rugby', 'handball'] as const;
