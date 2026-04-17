'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { PricingCard } from '@/components/brands/foot/PricingCard';
import {
    PRICING_TIER_LABELS,
    PRICING_TIERS,
    pricingPacks,
    type PricingTier,
} from '@/content/pricing/foot-pricing';
import { cn } from '@/lib/utils';

export function PricingSelector() {
    const [selectedTier, setSelectedTier] = useState<PricingTier>('100');
    const t = useTranslations('foot.pricing');

    return (
        <section aria-label={t('title')} className="px-(--space-section-x) py-(--space-section-y)">
            <div className="container-simply flex flex-col items-center gap-(--space-block)">
                {/* Tier selector */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                    {PRICING_TIERS.map((tier) => (
                        <button
                            key={tier}
                            type="button"
                            onClick={() => setSelectedTier(tier)}
                            className={cn(
                                'min-h-10 shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
                                selectedTier === tier
                                    ? 'bg-brand-primary text-white'
                                    : 'bg-muted text-foreground hover:bg-muted/80',
                            )}
                        >
                            {PRICING_TIER_LABELS[tier]} {t('clubSize')}
                        </button>
                    ))}
                </div>

                {/* Cards grid */}
                <div className="grid w-full grid-cols-1 gap-(--space-element) md:grid-cols-2 xl:grid-cols-4">
                    {pricingPacks.map((pack) => (
                        <PricingCard key={pack.id} pack={pack} tier={selectedTier} />
                    ))}
                </div>
            </div>
        </section>
    );
}
