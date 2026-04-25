'use client';

import { useTranslations } from 'next-intl';

import { CLUB_SIZES } from '@/config/offers';
import { cn } from '@/lib/utils';

import type { BillingCycle, ClubSize } from '~types/offers.types';

interface PricingControlsProps {
    size: ClubSize;
    cycle: BillingCycle;
    onSizeChange: (size: ClubSize) => void;
    onCycleChange: (cycle: BillingCycle) => void;
    annualDiscount: number;
    className?: string;
}

/**
 * Barre de contrôles compacte regroupant taille de club + cadence de
 * facturation sur une seule ligne (desktop) ou deux (mobile). Conçue pour
 * être rendue en `position: sticky` côté consommateur — la couche
 * `backdrop-blur` + le ring subtil donnent l'affordance visuelle quand
 * l'élément se "stuck" au top du viewport, sans JS.
 *
 * Remplace l'ancien duo `SizeSelector` (carte verbeuse) +
 * `BillingCycleToggle` (toggle isolé). L'éducation utilisateur (eyebrow
 * "Votre club" / helper "Les tarifs s'adaptent…") est volontairement
 * laissée tomber : le pattern de pills + toggle est immédiatement
 * lisible, et le payoff vient des cartes qui se mettent à jour en live.
 *
 * Garde le pattern `role="radiogroup"` + `role="radio"` pour la
 * navigation clavier native (flèches, Espace).
 */
export function PricingControls({
    size,
    cycle,
    onSizeChange,
    onCycleChange,
    annualDiscount,
    className,
}: PricingControlsProps) {
    const tSizes = useTranslations('Offers.sizes');
    const tCycle = useTranslations('Offers.cycle');
    const discountPct = Math.round(annualDiscount * 100);

    return (
        <div
            className={cn(
                'border-border bg-background/85 ring-foreground/[0.04] rounded-2xl border p-2.5 shadow-[0_8px_24px_-12px_color-mix(in_srgb,var(--story-ink)_30%,transparent)] ring-1 backdrop-blur-md sm:p-3',
                className,
            )}
        >
            <div className="flex flex-col gap-2.5 sm:gap-3 lg:flex-row lg:items-center lg:gap-3">
                {/* Sizes */}
                <div className="flex flex-1 flex-col gap-1.5">
                    <span
                        id="pricing-controls-size-label"
                        className="text-muted-foreground/80 px-1 text-[0.65rem] font-semibold tracking-[0.18em] uppercase"
                    >
                        {tSizes('eyebrow')}
                    </span>
                    <div
                        role="radiogroup"
                        aria-labelledby="pricing-controls-size-label"
                        className="bg-muted/60 ring-foreground/5 inline-flex gap-1 rounded-full p-1 ring-1 ring-inset"
                    >
                        {CLUB_SIZES.map((s) => {
                            const active = s.id === size;
                            return (
                                <button
                                    key={s.id}
                                    type="button"
                                    role="radio"
                                    aria-checked={active}
                                    onClick={() => onSizeChange(s.id)}
                                    className={cn(
                                        'focus-visible:ring-primary flex flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2 text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:outline-none sm:px-3 sm:text-sm',
                                        active
                                            ? 'bg-primary text-primary-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5',
                                    )}
                                >
                                    <span>{tSizes(`${s.id}.label`)}</span>
                                    <span
                                        className={cn(
                                            'hidden text-[0.65rem] font-medium tracking-tight sm:inline',
                                            active
                                                ? 'text-primary-foreground/85'
                                                : 'text-muted-foreground/80',
                                        )}
                                    >
                                        {tSizes(`${s.id}.short`)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Vertical separator (desktop only) */}
                <div aria-hidden className="bg-border/70 hidden lg:block lg:h-10 lg:w-px" />

                {/* Cycle */}
                <div className="flex flex-col gap-1.5">
                    <span
                        id="pricing-controls-cycle-label"
                        className="text-muted-foreground/80 px-1 text-[0.65rem] font-semibold tracking-[0.18em] uppercase"
                    >
                        {tCycle('label')}
                    </span>
                    <div
                        role="radiogroup"
                        aria-labelledby="pricing-controls-cycle-label"
                        className="bg-muted/60 ring-foreground/5 inline-flex gap-1 rounded-full p-1 ring-1 ring-inset"
                    >
                        <CycleButton
                            active={cycle === 'monthly'}
                            onClick={() => onCycleChange('monthly')}
                            label={tCycle('monthly')}
                        />
                        <CycleButton
                            active={cycle === 'yearly'}
                            onClick={() => onCycleChange('yearly')}
                            label={tCycle('yearly')}
                            badge={tCycle('yearlyBadge', { discount: discountPct })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface CycleButtonProps {
    active: boolean;
    onClick: () => void;
    label: string;
    badge?: string;
}

function CycleButton({ active, onClick, label, badge }: CycleButtonProps) {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={active}
            onClick={onClick}
            className={cn(
                'focus-visible:ring-primary relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:outline-none sm:text-sm',
                active
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
            )}
        >
            <span>{label}</span>
            {badge && (
                <span
                    className={cn(
                        'rounded-full px-1.5 py-0.5 text-[9px] leading-none font-bold tracking-wide uppercase sm:text-[10px]',
                        active
                            ? 'bg-primary-foreground/20 text-primary-foreground'
                            : 'bg-primary/10 text-primary',
                    )}
                >
                    {badge}
                </span>
            )}
        </button>
    );
}
