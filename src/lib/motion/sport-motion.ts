import type { BrandSlug } from '@/types/brand';

export interface SportMotion {
    ease: readonly [number, number, number, number];
    duration: number;
    stagger: number;
    iconHover:
        | { type: 'pulse' }
        | { type: 'shake'; amount: number }
        | { type: 'spin'; angle: number };
}

export const SPORT_MOTION: Record<BrandSlug, SportMotion> = {
    foot: {
        ease: [0.4, 0, 0.2, 1],
        duration: 0.4,
        stagger: 0.08,
        iconHover: { type: 'pulse' },
    },
    rugby: {
        ease: [0.16, 1, 0.3, 1],
        duration: 0.35,
        stagger: 0.06,
        iconHover: { type: 'shake', amount: 4 },
    },
    handball: {
        ease: [0.33, 1, 0.68, 1],
        duration: 0.3,
        stagger: 0.05,
        iconHover: { type: 'spin', angle: 5 },
    },
};

export const easeToCss = (ease: readonly [number, number, number, number]): string =>
    `cubic-bezier(${ease[0]}, ${ease[1]}, ${ease[2]}, ${ease[3]})`;
