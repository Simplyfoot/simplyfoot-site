/**
 * Liens vers les stores d'applications par marque.
 *
 * - `googlePlay` : URL Play Store (production).
 * - `appStore` : URL App Store (production). Lien sans préfixe de pays :
 *   Apple redirige automatiquement vers la boutique du visiteur.
 *
 * Une marque sans entrée (ou avec toutes les valeurs `null`) ne rend
 * aucun badge sur la page d'accueil.
 */

import type { BrandSlug } from '~types/brand.types';

export interface BrandAppStoreLinks {
    googlePlay: string | null;
    appStore: string | null;
}

export const BRAND_APP_STORES: Record<BrandSlug, BrandAppStoreLinks> = {
    foot: {
        googlePlay: 'https://play.google.com/store/apps/details?id=com.simplyfoot.sf',
        appStore: 'https://apps.apple.com/app/id6760262631',
    },
    rugby: {
        googlePlay: null,
        appStore: null,
    },
    handball: {
        googlePlay: null,
        appStore: null,
    },
};
