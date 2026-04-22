/** Rôles ciblés par une catégorie de la timeline. `all` = visible quel que soit le filtre. */
export type FeaturesRole = 'club' | 'coach' | 'player' | 'parent';

/** Filtre actif dans `<RoleFilter>` — `all` = aucune restriction. */
export type FeaturesRoleFilter = FeaturesRole | 'all';

/** Trois grandes phases narratives de la roadmap SimplyFoot. */
export type FeaturesPhaseId = 'now' | 'soon' | 'later';

/**
 * Catégorie (= un bloc thématique) d'une phase. Les bullets sont stockés en
 * i18n sous `Features.timeline.{phase}.{categoryId}.bullets.{0..bulletCount-1}`.
 */
export interface FeaturesCategory {
    id: string;
    /** Nom d'icône Lucide (valeur du composant, pas un string runtime). */
    icon: string;
    /** Rôles pour lesquels la catégorie est pertinente (pour le filtre). */
    roles: readonly FeaturesRole[];
    /** Nombre de puces de la catégorie (drive l'i18n `bullets.0..N`). */
    bulletCount: number;
    /** Catégorie mise en exergue (border + glow renforcés). */
    highlight?: 'signature' | 'strategic';
}

/** Une phase complète (liste ordonnée de catégories). */
export interface FeaturesPhase {
    id: FeaturesPhaseId;
    categories: readonly FeaturesCategory[];
}

/** Chiffre-clé animé dans la section `<FeaturesPromise>`. */
export interface FeaturesStat {
    id: string;
    target: number;
    suffix?: string;
    decimals?: number;
}

/** Un des 5 points de différenciation. */
export interface DifferentiationPoint {
    id: string;
    icon: string;
}
