import type { BrandSlug } from '~types/brand.types';

// En production seule la marque foot est exposée publiquement. En dev (et lors
// des previews locales), toutes les marques restent accessibles pour pouvoir
// continuer à travailler dessus avant leur lancement.
const isDevelopment = process.env.NODE_ENV === 'development';

export const ENABLED_BRANDS: ReadonlyArray<BrandSlug> = isDevelopment
    ? ['foot', 'rugby', 'handball']
    : ['foot'];

export function isBrandEnabled(brand: BrandSlug): boolean {
    return ENABLED_BRANDS.includes(brand);
}
