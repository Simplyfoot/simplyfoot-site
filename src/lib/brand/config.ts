import type { BrandConfig, BrandSlug } from '@/types/brand';

export const brandConfigs: Record<BrandSlug, BrandConfig> = {
    foot: {
        slug: 'foot',
        name: 'SimplyFoot',
        sport: 'Football amateur',
        colors: {
            primary: '#567E66',
            primaryDark: '#3D5C4A',
            primaryLight: '#7A9E8A',
            surfaceDark: '#1A2E22',
            bg: '#F8E9CA',
        },
        metadata: {
            title: 'SimplyFoot — Gestion de club de football amateur',
            description: 'La plateforme dédiée aux clubs de football amateurs en France.',
        },
    },
    rugby: {
        slug: 'rugby',
        name: 'SimplyRugby',
        sport: 'Rugby amateur',
        colors: {
            primary: '#8B1A1A',
            primaryDark: '#5C1010',
            primaryLight: '#C04040',
            surfaceDark: '#2A1010',
            bg: '#F8E9CA',
        },
        metadata: {
            title: 'SimplyRugby — Gestion de club de rugby amateur',
            description: 'La plateforme dédiée aux clubs de rugby amateurs en France.',
        },
    },
    handball: {
        slug: 'handball',
        name: 'SimplyHandball',
        sport: 'Handball amateur',
        colors: {
            primary: '#1A237E',
            primaryDark: '#0D1252',
            primaryLight: '#3F51B5',
            surfaceDark: '#0A0E2A',
            bg: '#F8E9CA',
        },
        metadata: {
            title: 'SimplyHandball — Gestion de club de handball amateur',
            description: 'La plateforme dédiée aux clubs de handball amateurs en France.',
        },
    },
};

export function getBrandConfig(slug: string): BrandConfig | null {
    if (slug in brandConfigs) {
        return brandConfigs[slug as BrandSlug];
    }
    return null;
}
