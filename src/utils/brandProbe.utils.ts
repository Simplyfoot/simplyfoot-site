import type { BrandSlug } from '~types/brand.types';

/**
 * Crée un élément DOM "probe" invisible avec l'attribut `data-brand`.
 *
 * Sert de point d'ancrage pour que `getComputedStyle` résolve les variables
 * CSS scoped à une marque donnée, depuis un contexte JS (Three.js) qui
 * n'appartient pas visuellement à la sous-hiérarchie de cette marque.
 *
 * L'élément est inséré dans `document.body`, caché, et marqué `aria-hidden`.
 * Le cycle de vie est sous la responsabilité de l'appelant — typiquement un
 * hook React qui appelle `destroyBrandProbe` dans son cleanup.
 */
export function createBrandProbe(brandSlug: BrandSlug): HTMLElement {
    const probeElement = document.createElement('div');

    probeElement.setAttribute('data-brand', brandSlug);
    probeElement.setAttribute('aria-hidden', 'true');
    probeElement.style.display = 'none';

    document.body.appendChild(probeElement);

    return probeElement;
}

/** Retire un probe du DOM. À appeler dans le cleanup du hook qui l'a créé. */
export function destroyBrandProbe(probeElement: HTMLElement): void {
    probeElement.remove();
}
