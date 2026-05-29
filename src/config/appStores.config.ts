/**
 * Liens vers les stores d'applications par marque.
 *
 * - `googlePlay` : URL Play Store (production).
 * - `testFlight` : URL d'invitation publique TestFlight (bêta iOS,
 *   en attendant la publication sur l'App Store).
 * - `appStore` : URL App Store (production) — à renseigner dès publication.
 *
 * Une marque sans entrée (ou avec toutes les valeurs `null`) ne rend
 * aucun badge sur la page d'accueil.
 */

import type { BrandSlug } from '~types/brand.types';

export interface BrandAppStoreLinks {
    googlePlay: string | null;
    testFlight: string | null;
    appStore: string | null;
}

export const BRAND_APP_STORES: Record<BrandSlug, BrandAppStoreLinks> = {
    foot: {
        googlePlay: 'https://play.google.com/store/apps/details?id=com.simplyfoot.sf',
        testFlight: 'https://testflight.apple.com/join/UjHNyQ9k',
        appStore: null,
    },
    rugby: {
        googlePlay: null,
        testFlight: null,
        appStore: null,
    },
    handball: {
        googlePlay: null,
        testFlight: null,
        appStore: null,
    },
};
