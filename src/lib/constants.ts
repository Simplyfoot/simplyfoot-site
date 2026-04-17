/**
 * Shared constants — used where CSS variables are not accessible (e.g., Three.js/WebGL).
 * These values MUST stay in sync with lib/brand/tokens.css and lib/brand/config.ts.
 */

export const SIMPLY_COLORS = {
    black: '#000000',
    beige: '#F8E9CA',
    blue: '#151B6B',
    textMuted: '#6B5D4B',
} as const;

export const BRAND_COLORS = {
    foot: {
        primary: '#567E66',
        primaryDark: '#3D5C4A',
        primaryLight: '#7A9E8A',
        surfaceDark: '#1A2E22',
    },
    rugby: {
        primary: '#8B1A1A',
        primaryDark: '#5C1010',
        primaryLight: '#C04040',
        surfaceDark: '#2A1010',
    },
    handball: {
        primary: '#1A237E',
        primaryDark: '#0D1252',
        primaryLight: '#3F51B5',
        surfaceDark: '#0A0E2A',
    },
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://simply.fr';
