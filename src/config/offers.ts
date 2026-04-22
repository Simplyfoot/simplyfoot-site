import type { BillingCycle, Plan, PlanId } from '~types/offers.types';

/**
 * Pricing SimplyFoot — philosophie "un seul produit complet, le tarif s'adapte à
 * la taille du club". Toutes les offres donnent accès à l'intégralité des
 * fonctionnalités ; seule la tranche de licenciés fait varier le prix.
 *
 * Les identifiants de plan (`mini`, `local`, …) sont stables — ils servent
 * aussi de paramètre URL pour le parcours de paiement, donc ne pas les
 * renommer sans migration.
 */
export const PLANS: readonly Plan[] = [
    { id: 'mini', licenseeMin: 1, licenseeMax: 30, priceMonthly: 4.99 },
    { id: 'local', licenseeMin: 31, licenseeMax: 75, priceMonthly: 9.99 },
    { id: 'regional', licenseeMin: 76, licenseeMax: 150, priceMonthly: 14.99 },
    {
        id: 'grand',
        licenseeMin: 151,
        licenseeMax: 300,
        priceMonthly: 19.99,
        recommended: true,
    },
    { id: 'maxi', licenseeMin: 301, licenseeMax: 500, priceMonthly: 29.99 },
    { id: 'enterprise', licenseeMin: 501, licenseeMax: null, priceMonthly: null },
];

/**
 * Remise appliquée au paiement annuel. 10 % = exactement 1.2 mois offerts.
 * Calibré pour être visible en CTA sans éroder la marge logicielle (≥ 80 %).
 */
export const ANNUAL_DISCOUNT = 0.1;

/** Durée de l'essai gratuit, sans carte bancaire. */
export const TRIAL_DAYS = 30;

/** Valeur par défaut du slider de licenciés (médiane du segment "Grand Club"). */
export const DEFAULT_LICENSEES = 180;

/** Bornes du slider (un peu au-delà de la borne supérieure pour inviter au "sur devis"). */
export const LICENSEE_SLIDER_MIN = 10;
export const LICENSEE_SLIDER_MAX = 650;

/** Clés de bénéfices produit rendues dans `BenefitsSection`. Traduits via i18n. */
export const BENEFIT_KEYS = [
    'clubManagement',
    'convocations',
    'lineups',
    'calendar',
    'messaging',
    'playerTracking',
    'coachDashboard',
    'documents',
    'parents',
    'statistics',
] as const;

export type BenefitKey = (typeof BENEFIT_KEYS)[number];

/** Clés des items de FAQ pricing. Les questions/réponses vivent dans les messages. */
export const OFFERS_FAQ_KEYS = [
    'whichPlan',
    'canChangePlan',
    'allFeaturesIncluded',
    'clubGrows',
    'engagement',
    'paymentMethods',
    'billing',
    'freeTrial',
] as const;

export type OffersFaqKey = (typeof OFFERS_FAQ_KEYS)[number];

/**
 * Sélectionne le plan adapté à un nombre de licenciés donné. Le dernier
 * plan (`enterprise`) ayant `licenseeMax: null`, il couvre toujours la queue
 * de la plage — un `throw` signale donc un bug de config plutôt qu'un
 * fallback silencieux sur un plan arbitraire.
 */
export function pickPlanForLicensees(licensees: number): Plan {
    const safe = Math.max(0, Math.floor(licensees));
    for (const plan of PLANS) {
        if (safe < plan.licenseeMin) {
            continue;
        }
        if (plan.licenseeMax === null || safe <= plan.licenseeMax) {
            return plan;
        }
    }
    throw new Error(`pickPlanForLicensees: no plan matches ${licensees} licensees`);
}

/** Prix mensuel équivalent compte tenu de la cadence choisie (annuel remisé). */
export function getEffectiveMonthlyPrice(plan: Plan, cycle: BillingCycle): number | null {
    if (plan.priceMonthly === null) {
        return null;
    }
    if (cycle === 'yearly') {
        return plan.priceMonthly * (1 - ANNUAL_DISCOUNT);
    }
    return plan.priceMonthly;
}

/** Prix annuel (12 × mois effectif). Utilisé pour afficher l'économie totale. */
export function getYearlyPrice(plan: Plan): number | null {
    if (plan.priceMonthly === null) {
        return null;
    }
    return plan.priceMonthly * 12 * (1 - ANNUAL_DISCOUNT);
}

/** Économie annuelle en euros par rapport au paiement mensuel. */
export function getYearlySavings(plan: Plan): number | null {
    if (plan.priceMonthly === null) {
        return null;
    }
    return plan.priceMonthly * 12 * ANNUAL_DISCOUNT;
}

/** Type guard pour filtrer les PlanId valides (utilisé côté query string). */
export function isPlanId(value: string | null | undefined): value is PlanId {
    if (!value) {
        return false;
    }
    return PLANS.some((p) => p.id === value);
}

/**
 * Formatteur prix EUR — virgule française, symbole €. `withDecimals: false`
 * est utilisé pour afficher les économies annuelles rondes (ex. "12 €" au
 * lieu de "12,00 €").
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
