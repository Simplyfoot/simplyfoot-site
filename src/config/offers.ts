import type {
    BillingCycle,
    ClubSize,
    ClubSizeDef,
    ModuleDef,
    Plan,
    PlanTier,
} from '~types/offers.types';

/**
 * Modèle économique SimplyFoot V2.1 — source de vérité unique.
 * Deux tiers payants (STARTER / CLUB) + DÉCOUVERTE gratuit, déclinés en
 * trois tailles de club. Prix alignés sur le doc stratégique d'avril 2026.
 */

/** Les trois tiers de l'offre — ordre = ordre d'affichage gauche → droite. */
export const PLANS: readonly Plan[] = [
    {
        tier: 'discovery',
        prices: { small: 0, medium: 0, large: 0 },
        takeRate: null,
    },
    {
        tier: 'starter',
        prices: { small: 29, medium: 59, large: 99 },
        takeRate: 0.12,
    },
    {
        tier: 'club',
        prices: { small: 59, medium: 119, large: 199 },
        takeRate: 0.1,
        recommended: true,
    },
];

/** Les trois tailles de club, avec bornes en licenciés. */
export const CLUB_SIZES: readonly ClubSizeDef[] = [
    { id: 'small', licenseeMin: 0, licenseeMax: 150 },
    { id: 'medium', licenseeMin: 151, licenseeMax: 400 },
    { id: 'large', licenseeMin: 401, licenseeMax: null },
];

/** Modules complémentaires — tous inclus dans CLUB, vendus séparément aux STARTER. */
export const MODULES: readonly ModuleDef[] = [
    { id: 'buvette', priceMonthly: 19 },
    { id: 'tournois', priceMonthly: 15 },
    { id: 'boutique', priceMonthly: 25 },
];

/** Remise sur l'abonnement annuel (équivalent à ~2 mois offerts). */
export const ANNUAL_DISCOUNT = 0.17;

/** Durée de l'essai gratuit, sans carte bancaire. */
export const TRIAL_DAYS = 30;

/** Taille par défaut sélectionnée à l'arrivée sur la page. */
export const DEFAULT_SIZE: ClubSize = 'medium';

/**
 * Recette de référence utilisée dans la section "reversion". Volontairement
 * neutre (base 100 €) pour éviter d'évoquer un produit transactionnel
 * spécifique tant que la couche billetterie n'est pas publiquement annoncée.
 * Lit comme une simple répartition pédagogique : "pour 100 € générés".
 */
export const REVERSION_EXAMPLE_GROSS = 100;

/** Clés des items de FAQ pricing (ordre d'affichage). */
export const OFFERS_FAQ_KEYS = [
    'whichPlan',
    'takeRate',
    'modules',
    'canChangePlan',
    'clubGrows',
    'engagement',
    'paymentMethods',
    'billing',
    'freeTrial',
] as const;

export type OffersFaqKey = (typeof OFFERS_FAQ_KEYS)[number];

/**
 * Map licenciés → taille de club. Utilisé pour suggérer la taille par
 * défaut quand l'utilisateur n'a pas encore sélectionné son segment.
 */
export function pickSizeFromLicensees(licensees: number): ClubSize {
    const safe = Math.max(0, Math.floor(licensees));
    for (const size of CLUB_SIZES) {
        if (size.licenseeMax === null || safe <= size.licenseeMax) {
            return size.id;
        }
    }
    // Inatteignable : la dernière taille (`large`) a `licenseeMax: null`.
    throw new Error(`pickSizeFromLicensees: no size matches ${licensees}`);
}

/** Retourne la définition d'un tier, throw si tier inconnu. */
export function getPlan(tier: PlanTier): Plan {
    const plan = PLANS.find((p) => p.tier === tier);
    if (!plan) {
        throw new Error(`Unknown plan tier: ${tier}`);
    }
    return plan;
}

/**
 * Prix mensuel équivalent compte tenu de la cadence choisie (annuel
 * remisé). Retourne 0 pour DÉCOUVERTE quelle que soit la taille.
 */
export function getEffectiveMonthlyPrice(plan: Plan, size: ClubSize, cycle: BillingCycle): number {
    const price = plan.prices[size];
    if (price === 0) {
        return 0;
    }
    if (cycle === 'yearly') {
        return price * (1 - ANNUAL_DISCOUNT);
    }
    return price;
}

/** Montant annuel facturé (12 × mois effectif). `null` pour DÉCOUVERTE. */
export function getYearlyPrice(plan: Plan, size: ClubSize): number | null {
    const price = plan.prices[size];
    if (price === 0) {
        return null;
    }
    return price * 12 * (1 - ANNUAL_DISCOUNT);
}

/** Économie en euros sur un an si paiement annuel. `null` pour DÉCOUVERTE. */
export function getYearlySavings(plan: Plan, size: ClubSize): number | null {
    const price = plan.prices[size];
    if (price === 0) {
        return null;
    }
    return price * 12 * ANNUAL_DISCOUNT;
}

/**
 * Reversion que touche le club pour un volume de billetterie donné, selon
 * le tier. Le take-rate est la commission SimplyFoot ; la reversion est
 * ce qui reste au club.
 */
export function computeReversion(
    plan: Plan,
    grossRevenue: number,
): {
    clubShare: number;
    simplyfootShare: number;
} | null {
    if (plan.takeRate === null) {
        return null;
    }
    const simplyfootShare = grossRevenue * plan.takeRate;
    const clubShare = grossRevenue - simplyfootShare;
    return { clubShare, simplyfootShare };
}

/**
 * Formatteur prix EUR — virgule française, symbole €. `withDecimals: false`
 * pour afficher des montants ronds (ex. "2 160 €" au lieu de "2 160,00 €").
 */
export function formatPrice(value: number, opts?: { withDecimals?: boolean }): string {
    const withDecimals = opts?.withDecimals ?? true;
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: withDecimals ? 2 : 0,
        maximumFractionDigits: withDecimals ? 2 : 0,
    }).format(value);
}

/** Type guard pour valider un tier côté query string. */
export function isPlanTier(value: string | null | undefined): value is PlanTier {
    return value === 'discovery' || value === 'starter' || value === 'club';
}

/** Type guard pour valider une taille côté query string. */
export function isClubSize(value: string | null | undefined): value is ClubSize {
    return value === 'small' || value === 'medium' || value === 'large';
}
