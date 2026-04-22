import { Coins, Sparkles, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { computeReversion, formatPrice, getPlan, REVERSION_EXAMPLE_GROSS } from '@/config/offers';
import { cn } from '@/lib/utils';

interface ReversionHighlightProps {
    className?: string;
}

/**
 * Bloc signature de la page — matérialise la "reversion inversée" qui
 * différencie SimplyFoot de SportEasy / Spond. Calcule et affiche un
 * exemple concret (800 cartes × 3 €) avec la commission SF et la part
 * reversée au club.
 *
 * Source de vérité = `config/offers.ts` (take-rate du tier CLUB, volume
 * d'exemple). Si le modèle évolue, la section reflète automatiquement.
 */
export function ReversionHighlight({ className }: ReversionHighlightProps) {
    const t = useTranslations('Offers.reversion');

    const clubPlan = getPlan('club');
    const gross = REVERSION_EXAMPLE_GROSS;
    const breakdown = computeReversion(clubPlan, gross);

    if (!breakdown) {
        return null;
    }

    const clubPercent = Math.round((breakdown.clubShare / gross) * 100);

    return (
        <section
            aria-labelledby="offers-reversion-heading"
            className={cn(
                'bg-story-forest text-secondary-50 relative isolate overflow-hidden rounded-3xl px-6 py-14 md:px-12 md:py-20',
                className,
            )}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--story-forest-glow)_30%,transparent)_0%,color-mix(in_srgb,var(--story-forest)_70%,transparent)_50%,transparent_80%)]"
            />

            <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-14">
                <div className="flex flex-col gap-5">
                    <span className="border-story-forest-glow/40 bg-story-forest-glow/10 text-story-forest-glow inline-flex w-max items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                        <Sparkles className="size-3.5" aria-hidden />
                        {t('eyebrow')}
                    </span>
                    <h2
                        id="offers-reversion-heading"
                        className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-bold tracking-tight text-balance"
                    >
                        {t('heading')}
                    </h2>
                    <p className="text-secondary-50/80 max-w-[52ch] text-base leading-relaxed md:text-lg">
                        {t('lede')}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                        <li className="border-secondary-50/20 bg-secondary-50/5 text-secondary-50/90 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
                            <span
                                aria-hidden
                                className="bg-story-forest-glow size-1.5 rounded-full"
                            />
                            {t('pills.starter')}
                        </li>
                        <li className="border-story-forest-glow/40 bg-story-forest-glow/15 text-story-forest-glow inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
                            <span
                                aria-hidden
                                className="bg-story-forest-glow size-1.5 rounded-full"
                            />
                            {t('pills.club')}
                        </li>
                    </ul>
                </div>

                <div className="border-secondary-50/15 bg-story-midnight/60 flex flex-col gap-4 rounded-2xl border p-6 backdrop-blur-sm md:p-8">
                    <p className="text-story-forest-glow text-xs font-semibold tracking-widest uppercase">
                        {t('exampleTitle')}
                    </p>
                    <p className="text-secondary-50/90 text-sm leading-relaxed md:text-base">
                        {t('exampleBody')}
                    </p>

                    <dl className="divide-secondary-50/10 mt-2 divide-y">
                        <Row
                            icon={<TrendingUp className="size-4" aria-hidden />}
                            label={t('breakdown.gross')}
                            value={formatPrice(gross, { withDecimals: false })}
                        />
                        <Row
                            icon={<Coins className="size-4" aria-hidden />}
                            label={t('breakdown.simplyfoot')}
                            value={`− ${formatPrice(breakdown.simplyfootShare, { withDecimals: false })}`}
                            dimmed
                        />
                        <Row
                            icon={<Sparkles className="size-4 fill-current" aria-hidden />}
                            label={t('breakdown.club')}
                            value={formatPrice(breakdown.clubShare, { withDecimals: false })}
                            emphasized
                        />
                    </dl>

                    <p className="text-story-forest-glow mt-2 text-sm font-semibold">
                        {t('kicker', { percent: clubPercent })}
                    </p>
                </div>
            </div>
        </section>
    );
}

function Row({
    icon,
    label,
    value,
    dimmed = false,
    emphasized = false,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    dimmed?: boolean;
    emphasized?: boolean;
}) {
    return (
        <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <dt
                className={cn(
                    'flex items-center gap-2 text-sm',
                    dimmed ? 'text-secondary-50/60' : 'text-secondary-50/85',
                )}
            >
                <span className={cn(dimmed ? 'text-secondary-50/50' : 'text-story-forest-glow')}>
                    {icon}
                </span>
                {label}
            </dt>
            <dd
                className={cn(
                    'font-display tabular-nums',
                    emphasized
                        ? 'text-story-forest-glow text-xl font-bold md:text-2xl'
                        : dimmed
                          ? 'text-secondary-50/70 text-sm font-semibold'
                          : 'text-secondary-50 text-base font-semibold',
                )}
            >
                {value}
            </dd>
        </div>
    );
}
