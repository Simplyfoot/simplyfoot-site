'use client';

import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT_PX = 768;

/**
 * Retourne `true` si la largeur du viewport est inférieure au breakpoint
 * mobile (< 768px). Initialise à `false` côté serveur.
 */
export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`);

        const handleChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_PX);
        };

        mediaQueryList.addEventListener('change', handleChange);
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_PX);

        return () => mediaQueryList.removeEventListener('change', handleChange);
    }, []);

    return Boolean(isMobile);
}
