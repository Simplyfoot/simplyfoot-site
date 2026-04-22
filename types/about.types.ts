import type { BrandSlug } from '~types/brand.types';

/** Identifiant stable d'un fondateur. Sert de clé de traduction + d'anchor. */
export type FounderId = 'romain' | 'jean' | 'jeremy' | 'vanessa' | 'damien';

export interface FounderConfig {
    id: FounderId;
    /** Initiales rendues au centre de l'avatar circulaire (2 lettres). */
    initials: string;
    /** Classes Tailwind du dégradé de fond de l'avatar. */
    gradient: string;
}

/** Identifiant stable d'un club pilote. */
export type PilotClubId =
    | 'gardanne'
    | 'liffre'
    | 'toulouse-rodeo'
    | 'blagnac'
    | 'rennes-b'
    | 'martigues'
    | 'berre'
    | 'salon'
    | 'grasse'
    | 'nice';

export interface PilotClubConfig {
    id: PilotClubId;
    /** Chemin optionnel vers le logo dans /public. Affichage avec fallback typo si absent. */
    logo?: string;
}

/** Tableaux de structures (compteurs). Les textes vivent dans messages. */
export interface AboutShape {
    foundersOrder: readonly FounderId[];
    pilotClubs: readonly PilotClubConfig[];
    /** Nombre de paragraphes narratifs de l'acte 1. */
    act1ParagraphCount: number;
    /** Nombre de lignes impactantes dans l'acte 4 (manifesto). */
    manifestoLineCount: number;
    /** Nombre de citations de clubs rendues dans l'acte 3. */
    quoteCount: number;
    /** Nombre de promesses dans l'acte 5. */
    promiseCount: number;
}

/** Métadonnées d'une statistique animée (compteur) de l'acte 2. */
export interface AboutStat {
    /** Clé de traduction du label. */
    labelKey: string;
    /** Valeur cible du compteur. 0 fige le nombre sans animer. */
    target: number;
    /** Suffixe éventuel (ex: " M", "%"). */
    suffix?: string;
    /** Nombre de décimales à afficher. */
    decimals?: number;
}

/** Marque supportant la page — prolonge `BrandSlug` pour lisibilité locale. */
export type AboutBrand = BrandSlug;
