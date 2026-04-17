'use client';

import { useEffect, useState } from 'react';

/**
 * Hook pour ecouter une media query CSS.
 * Retourne false pendant le SSR (hydration-safe).
 *
 * @param query - Media query CSS (ex: '(max-width: 767px)')
 * @returns true si la query matche, false sinon ou pendant le SSR
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 767px)')
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
        media.addEventListener('change', handler);
        return () => media.removeEventListener('change', handler);
    }, [query]);

    return matches;
}
