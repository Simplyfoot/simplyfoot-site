'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import type { BillingCycle } from '~types/offers.types';

interface BillingCycleToggleProps {
    value: BillingCycle;
    onChange: (cycle: BillingCycle) => void;
    annualDiscount: number;
    className?: string;
}

/**
 * Toggle segmenté Mensuel / Annuel. La cadence annuelle affiche sa remise en
 * badge (-10 %). Pattern `role="radiogroup"` pour une a11y clavier native.
 */
export function BillingCycleToggle({
    value,
    onChange,
    annualDiscount,
    className,
}: BillingCycleToggleProps) {
    const t = useTranslations('Offers.cycle');
    const discountPct = Math.round(annualDiscount * 100);

    return (
        <div
            role="radiogroup"
            aria-label={t('label')}
            className={cn(
                'bg-muted/70 inline-flex items-center gap-1 rounded-full p-1 shadow-inner',
                className,
            )}
        >
            <CycleButton
                active={value === 'monthly'}
                onClick={() => onChange('monthly')}
                label={t('monthly')}
            />
            <CycleButton
                active={value === 'yearly'}
                onClick={() => onChange('yearly')}
                label={t('yearly')}
                badge={t('yearlyBadge', { discount: discountPct })}
            />
        </div>
    );
}

function CycleButton({
    active,
    onClick,
    label,
    badge,
}: {
    active: boolean;
    onClick: () => void;
    label: string;
    badge?: string;
}) {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={active}
            onClick={onClick}
            className={cn(
                'focus-visible:ring-primary relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:outline-none',
                active
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
            )}
        >
            <span>{label}</span>
            {badge && (
                <span
                    className={cn(
                        'rounded-full px-2 py-0.5 text-[10px] leading-none font-bold tracking-wide uppercase',
                        active
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-primary/10 text-primary',
                    )}
                >
                    {badge}
                </span>
            )}
        </button>
    );
}
