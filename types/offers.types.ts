/** Identifiant stable d'un plan tarifaire. Utilisé comme clé i18n + URL param. */
export type PlanId = 'mini' | 'local' | 'regional' | 'grand' | 'maxi' | 'enterprise';

/** Cadence de facturation. L'annuel applique une remise définie dans `config/offers`. */
export type BillingCycle = 'monthly' | 'yearly';

/** Métadonnées d'un plan tarifaire SimplyFoot. */
export interface Plan {
    id: PlanId;
    /** Nombre minimum de licenciés couverts par le plan (inclus). */
    licenseeMin: number;
    /** Nombre maximum de licenciés couverts (inclus). `null` = illimité (plan entreprise). */
    licenseeMax: number | null;
    /** Prix mensuel HT en euros. `null` = sur devis. */
    priceMonthly: number | null;
    /** Plan mis en avant visuellement (badge "Le plus choisi"). Un seul par défaut. */
    recommended?: boolean;
}
