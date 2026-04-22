/**
 * Modèle d'offre SimplyFoot V2.1 — deux tiers payants (STARTER / CLUB) +
 * un tier gratuit (DÉCOUVERTE), chacun décliné en trois tailles de club.
 * La taille n'influe que sur le prix ; le tier détermine les
 * fonctionnalités et le take-rate billetterie.
 */

/** Les 3 niveaux d'offre. Stable, sert aussi de clé URL + i18n. */
export type PlanTier = 'discovery' | 'starter' | 'club';

/** Les 3 tailles de club (cohérentes avec la distribution FFF). */
export type ClubSize = 'small' | 'medium' | 'large';

/** Modules payants additionnels (uniquement pour STARTER — inclus dans CLUB). */
export type ModuleId = 'buvette' | 'tournois' | 'boutique';

/** Cadence de facturation. L'annuel applique une remise de `ANNUAL_DISCOUNT`. */
export type BillingCycle = 'monthly' | 'yearly';

/**
 * Identifiant combiné tier+size utilisé comme paramètre URL du checkout,
 * par exemple `starter-medium`. Permet de linker directement vers une
 * combinaison précise depuis le FinalCta ou une carte de tier.
 */
export type PlanSelectionId = `${PlanTier}-${ClubSize}`;

/** Définition d'un tier. */
export interface Plan {
    tier: PlanTier;
    /** Prix mensuel HT par taille, en euros. `0` = gratuit (DÉCOUVERTE). */
    prices: Record<ClubSize, number>;
    /** Take-rate appliqué aux recettes billetterie. `null` = pas de couche transactionnelle. */
    takeRate: number | null;
    /** Tier mis en avant (badge "Recommandé"). Un seul `true` par liste. */
    recommended?: boolean;
}

/** Définition d'une taille de club — bornes et id. */
export interface ClubSizeDef {
    id: ClubSize;
    licenseeMin: number;
    /** `null` = pas de plafond (very grand club). */
    licenseeMax: number | null;
}

/** Définition d'un module complémentaire (add-on STARTER). */
export interface ModuleDef {
    id: ModuleId;
    /** Prix mensuel HT en euros. */
    priceMonthly: number;
}
