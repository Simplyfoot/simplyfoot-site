'use client';

import { useTranslations } from 'next-intl';

import { PLANS } from '@/config/offers';
import { cn } from '@/lib/utils';

import { TierCard } from './TierCard';

import type { BillingCycle, ClubSize } from '~types/offers.types';

interface TierComparisonProps {
    size: ClubSize;
    cycle: BillingCycle;
    className?: string;
}

/**
 * Comparatif 3-colonnes DÉCOUVERTE / STARTER / CLUB. Les prix s'adaptent à
 * la `size` sélectionnée, la cadence applique la remise annuelle côté
 * `<TierCard>`. Responsive : 3 colonnes desktop, 1 stack mobile avec
 * CLUB placé au sommet (tier recommandé) via `order-first` conditionnel
 * — CSS prioritaire sur l'ordre DOM.
 */
export function TierComparison({ size, cycle, className }: TierComparisonProps) {
    const t = useTranslations('Offers.tiers');

    return (
        <section
            aria-labelledby="offers-tiers-heading"
            className={cn('flex flex-col gap-10', className)}
        >
            <header className="flex max-w-[60ch] flex-col gap-3">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2
                    id="offers-tiers-heading"
                    className="font-display text-foreground text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl"
                >
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                    {t('intro')}
                </p>
            </header>

            <div className="grid grid-cols-1 gap-5 pt-4 lg:grid-cols-3">
                {PLANS.map((plan) => (
                    <TierCard
                        key={plan.tier}
                        plan={plan}
                        size={size}
                        cycle={cycle}
                        className={plan.recommended ? 'order-first lg:order-none' : ''}
                    />
                ))}
            </div>
        </section>
    );
}
