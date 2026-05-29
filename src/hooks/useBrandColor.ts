'use client';

import { useLayoutEffect, useState } from 'react';

import { createBrandProbe, destroyBrandProbe } from '@/utils/brandProbe.utils';
import { readCssVarFromElement, resolveCssColorToHex } from '@/utils/cssColor.utils';

import type { BrandSlug } from '~types/brand.types';

/**
 * Retourne la valeur hex d'une variable CSS scoped à une marque donnée.
 *
 * Utile pour afficher plusieurs marques côte-à-côte (galaxie d'accueil) :
 * permet de lire la couleur `--primary` de `rugby` même depuis une route
 * `foot`. Crée un probe DOM temporaire, lit la valeur calculée, nettoie au
 * démontage — aucun état global persistant.
 *
 * `useLayoutEffect` garantit qu'aucun flash de `FALLBACK_HEX` n'est peint
 * avant que la vraie couleur soit résolue.
 */
export function useBrandColor(
    brandSlug: BrandSlug,
    variableName: `--${string}` = '--primary',
): string {
    const [hexColor, setHexColor] = useState<string>('');

    useLayoutEffect(() => {
        const probeElement = createBrandProbe(brandSlug);
        const cssValue = readCssVarFromElement(probeElement, variableName);

        setHexColor(resolveCssColorToHex(cssValue));

        return () => {
            destroyBrandProbe(probeElement);
        };
    }, [brandSlug, variableName]);

    return hexColor;
}
