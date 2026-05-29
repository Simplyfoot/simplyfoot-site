'use client';

import { useEffect, useState } from 'react';

/**
 * Retourne `true` si l'utilisateur a activé la réduction de mouvement dans
 * ses préférences système (WCAG 2.3.3). À respecter pour les animations
 * GSAP, Framer Motion et transitions CSS longues.
 */
export function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQueryList.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches);
        };

        mediaQueryList.addEventListener('change', handleChange);

        return () => mediaQueryList.removeEventListener('change', handleChange);
    }, []);

    return prefersReducedMotion;
}
