import { FALLBACK_HEX } from './constants.utils';

/**
 * Lit une variable CSS depuis `:root` (palette par défaut, partagée entre
 * toutes les marques).
 *
 * Retourne une chaîne vide côté serveur — aucune lecture DOM possible.
 */
export function readRootCssVar(variableName: `--${string}`): string {
    if (typeof window === 'undefined') {
        return '';
    }

    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

/**
 * Lit une variable CSS résolue sur un élément DOM donné (probe de marque, ou
 * tout autre élément scoped).
 */
export function readCssVarFromElement(element: HTMLElement, variableName: `--${string}`): string {
    return getComputedStyle(element).getPropertyValue(variableName).trim();
}

/**
 * Normalise n'importe quelle chaîne de couleur CSS en hex `#rrggbb` valide
 * pour Three.js / WebGL.
 *
 * Utilise un canvas 2D comme parseur : l'API `ctx.fillStyle` résout toute
 * couleur CSS (named colors, rgb(), hsl(), oklch()) en hex normalisé lors de
 * la lecture. Si l'assignation échoue (couleur invalide), `fillStyle` garde
 * sa valeur par défaut `#000000` — d'où le fallback silencieux.
 */
export function resolveCssColorToHex(cssColor: string): string {
    if (!cssColor) {
        return FALLBACK_HEX;
    }

    if (/^#[0-9a-f]{6}$/i.test(cssColor)) {
        return cssColor.toLowerCase();
    }

    const canvasContext = document.createElement('canvas').getContext('2d');
    if (!canvasContext) {
        return FALLBACK_HEX;
    }

    canvasContext.fillStyle = cssColor;
    const resolvedColor = canvasContext.fillStyle;

    return typeof resolvedColor === 'string' && resolvedColor.startsWith('#')
        ? resolvedColor.toLowerCase()
        : FALLBACK_HEX;
}
