export const PRICING_TIERS = ['100', '250', '500', '800', '801+'] as const;
export type PricingTier = (typeof PRICING_TIERS)[number];

export const PRICING_TIER_LABELS: Record<PricingTier, string> = {
    '100': '≤ 100',
    '250': '101-250',
    '500': '251-500',
    '800': '501-800',
    '801+': '801+',
};

export interface PricingPack {
    id: string;
    name: string;
    subtitleKey: string;
    highlighted?: boolean;
    badgeKey?: string;
    prices: Record<PricingTier, number>;
    featureKeys: Array<{ textKey: string; included: boolean }>;
    ctaKey: string;
    /** Percentage of card sales revenue returned to the club */
    cardRevenueShare: number;
    /** Royalties percentage on marketplace resales */
    cardRoyalty: number;
}

export const pricingPacks: PricingPack[] = [
    {
        id: 'free',
        name: 'Free',
        subtitleKey: 'pricing.packs.free.subtitle',
        prices: { '100': 0, '250': 0, '500': 0, '800': 0, '801+': 0 },
        featureKeys: [
            { textKey: 'pricing.features.planning', included: true },
            { textKey: 'pricing.features.convocations', included: true },
            { textKey: 'pricing.features.comBasic', included: true },
            { textKey: 'pricing.features.compoBasic', included: true },
            { textKey: 'pricing.features.matchSheet', included: true },
            { textKey: 'pricing.features.advancedExports', included: false },
            { textKey: 'pricing.features.automations', included: false },
            { textKey: 'pricing.features.multiSeason', included: false },
        ],
        ctaKey: 'pricing.packs.free.cta',
        cardRevenueShare: 10,
        cardRoyalty: 1,
    },
    {
        id: 'coach',
        name: 'Coach',
        subtitleKey: 'pricing.packs.coach.subtitle',
        highlighted: true,
        badgeKey: 'pricing.packs.coach.badge',
        prices: { '100': 9, '250': 19, '500': 39, '800': 59, '801+': 79 },
        featureKeys: [
            { textKey: 'pricing.features.allFree', included: true },
            { textKey: 'pricing.features.advancedCoach', included: true },
            { textKey: 'pricing.features.compoDnd', included: true },
            { textKey: 'pricing.features.matchday', included: true },
            { textKey: 'pricing.features.teamComAdvanced', included: true },
            { textKey: 'pricing.features.sportPilot', included: true },
        ],
        ctaKey: 'pricing.packs.coach.cta',
        cardRevenueShare: 20,
        cardRoyalty: 2,
    },
    {
        id: 'club-os',
        name: 'Club OS',
        subtitleKey: 'pricing.packs.clubOs.subtitle',
        prices: { '100': 19, '250': 39, '500': 69, '800': 99, '801+': 129 },
        featureKeys: [
            { textKey: 'pricing.features.allCoach', included: true },
            { textKey: 'pricing.features.governance', included: true },
            { textKey: 'pricing.features.officialDocs', included: true },
            { textKey: 'pricing.features.playerFiles', included: true },
            { textKey: 'pricing.features.multiTeam', included: true },
            { textKey: 'pricing.features.basicExports', included: true },
            { textKey: 'pricing.features.autoInvoices', included: true },
        ],
        ctaKey: 'pricing.packs.clubOs.cta',
        cardRevenueShare: 30,
        cardRoyalty: 3,
    },
    {
        id: 'club-os-pro',
        name: 'Club OS Pro',
        subtitleKey: 'pricing.packs.clubOsPro.subtitle',
        badgeKey: 'pricing.packs.clubOsPro.badge',
        prices: { '100': 29, '250': 59, '500': 99, '800': 139, '801+': 179 },
        featureKeys: [
            { textKey: 'pricing.features.allClubOs', included: true },
            { textKey: 'pricing.features.subscriptions', included: true },
            { textKey: 'pricing.features.accountingExports', included: true },
            { textKey: 'pricing.features.automations', included: true },
            { textKey: 'pricing.features.advancedRights', included: true },
            { textKey: 'pricing.features.prioritySupport', included: true },
            { textKey: 'pricing.features.autoInvoices', included: true },
            { textKey: 'pricing.features.feeReceipts', included: true },
            { textKey: 'pricing.features.paymentReminders', included: true },
        ],
        ctaKey: 'pricing.packs.clubOsPro.cta',
        cardRevenueShare: 30,
        cardRoyalty: 3,
    },
];
