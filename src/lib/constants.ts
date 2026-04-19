/**
 * Shared constants used where CSS variables are not accessible (e.g., Three.js/WebGL).
 * For brand colors in JS contexts, use `useBrandColor` from '@/lib/brand'.
 */

export const SIMPLY_COLORS = {
    black: '#000000',
    beige: '#F8E9CA',
    blue: '#151B6B',
    textMuted: '#6B5D4B',
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://simply.fr';
