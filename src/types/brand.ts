export const BRANDS = ['foot', 'rugby', 'handball'] as const;
export type BrandSlug = (typeof BRANDS)[number];

export interface BrandColors {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    surfaceDark: string;
    bg: string;
}

export interface BrandConfig {
    slug: BrandSlug;
    name: string;
    sport: string;
    colors: BrandColors;
    metadata: {
        title: string;
        description: string;
    };
}
