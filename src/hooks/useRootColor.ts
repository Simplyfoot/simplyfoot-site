'use client';

import { useState } from 'react';

import { readRootCssVar, resolveCssColorToHex } from '@/utils/cssColor.utils';

function computeRootHex(variableName: `--${string}`): string {
    if (typeof window === 'undefined') {
        return '';
    }

    return resolveCssColorToHex(readRootCssVar(variableName));
}

/**
 * Retourne la valeur hex d'une variable CSS de `:root`.
 *
 * Résolue synchroniquement au premier render client via lazy state init :
 * aucun flash, aucun re-render inutile. Le nom de variable est supposé
 * statique — si ce besoin émerge, ajouter un effet de synchronisation.
 */
export function useRootColor(variableName: `--${string}`): string {
    const [hexColor] = useState<string>(() => computeRootHex(variableName));

    return hexColor;
}
