import type { BrandSlug } from '~types/brand.types';

/** Identifiant stable d'un fondateur. Sert de clé de traduction + d'anchor. */
export type FounderId = 'romain' | 'jean' | 'jeremy' | 'vanessa' | 'damien';

export interface FounderConfig {
    id: FounderId;
    /** Initiales rendues au centre de l'avatar circulaire (2 lettres). */
    initials: string;
    /** Classes Tailwind du dégradé de fond de l'avatar (fallback si pas de photo). */
    gradient: string;
    /**
     * Chemin optionnel vers la photo dans `/public`. Si présent, la carte
     * affiche la photo plutôt que le gradient + initiales.
     */
    photo?: string;
}

/** Marque supportant la page — prolonge `BrandSlug` pour lisibilité locale. */
export type AboutBrand = BrandSlug;
