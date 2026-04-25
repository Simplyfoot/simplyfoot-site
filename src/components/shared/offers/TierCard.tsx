'use client';

import { ArrowRight, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { formatPrice, getEffectiveMonthlyPrice, getYearlySavings } from '@/config/offers';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import type { BillingCycle, ClubSize, Plan } from '~types/offers.types';

interface TierCardProps {
    plan: Plan;
    size: ClubSize;
    cycle: BillingCycle;
    className?: string;
}

/**
 * Carte d'un tier (DÉCOUVERTE / STARTER / CLUB). Le prix se met à jour en
 * live selon la `size` sélectionnée ; le take-rate affiché est propre au
 * tier, pas à la taille. Le CLUB est emphasé (`plan.recommended`) avec
 * ring primary.
 *
 * Le CTA pointe vers `/foot/offers/checkout?plan=<tier>&size=<size>&cycle=<cycle>`
 * — format stable pour futur branchement Stripe Checkout.
 */
export function TierCard({ plan, size, cycle, className }: TierCardProps) {
    const t = useTranslations('Offers');
    const locale = useLocale();

    const effective = getEffectiveMonthlyPrice(plan, size, cycle);
    const yearlySavings = getYearlySavings(plan, size);
    const isFree = plan.prices[size] === 0;

    const localePrefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    const checkoutHref = `${localePrefix}/foot/offers/checkout?plan=${plan.tier}&size=${size}&cycle=${cycle}`;

    const isRecommended = plan.recommended ?? false;

    return (
        <article
            className={cn(
                'group relative flex h-full flex-col gap-6 rounded-3xl p-6 transition-all duration-300 md:p-8',
                isRecommended
                    ? 'bg-card border-primary ring-primary/15 border-2 shadow-[0_24px_60px_-20px_color-mix(in_srgb,var(--primary-700)_35%,transparent)] ring-2'
                    : 'bg-card border-border hover:border-primary/30 border hover:-translate-y-0.5 hover:shadow-lg',
                className,
            )}
            aria-label={t(`tiers.${plan.tier}.name`)}
        >
            {isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase shadow-md">
                        <Sparkles className="size-3 fill-current" aria-hidden />
                        {t('tiers.recommendedBadge')}
                    </span>
                </div>
            )}

            <header className="flex flex-col gap-2">
                <p className="text-primary font-mono text-[11px] font-semibold tracking-[0.3em] uppercase">
                    {t(`tiers.${plan.tier}.name`)}
                </p>
                <h3 className="font-display text-foreground text-xl leading-tight font-bold md:text-2xl">
                    {t(`tiers.${plan.tier}.positioning`)}
                </h3>
                <p className="text-muted-foreground max-w-[32ch] text-sm leading-relaxed">
                    {t(`tiers.${plan.tier}.pitch`)}
                </p>
            </header>

            {/* `key` change forces re-mount → l'animation `price-update` rejoue
                à chaque modification de size/cycle. Feedback visuel qui confirme
                la mise à jour sans bouger la mise en page. */}
            <div
                key={`${size}-${cycle}`}
                className="flex flex-col gap-1.5 motion-safe:animate-[price-update_350ms_ease-out]"
            >
                {isFree ? (
                    <span className="font-display text-foreground text-4xl font-bold">
                        {t('price.free')}
                    </span>
                ) : (
                    <div className="flex items-baseline gap-1.5">
                        <span className="font-display text-foreground text-4xl font-bold tabular-nums md:text-5xl">
                            {formatPrice(effective, { withDecimals: false })}
                        </span>
                        <span className="text-muted-foreground text-sm font-medium">
                            {t('price.perMonth')}
                        </span>
                    </div>
                )}

                {cycle === 'yearly' && yearlySavings !== null && (
                    <p className="text-primary text-xs font-semibold">
                        {t('price.billedYearly', {
                            amount: formatPrice(yearlySavings, { withDecimals: false }),
                        })}
                    </p>
                )}
                {cycle === 'monthly' && !isFree && (
                    <p className="text-muted-foreground text-xs">{t('price.vatNote')}</p>
                )}
            </div>

            {plan.takeRate !== null && (
                <div className="border-border bg-primary/5 ring-primary/10 flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold ring-1">
                    <span className="bg-primary size-1.5 rounded-full" aria-hidden />
                    <span className="text-foreground">{t(`tiers.${plan.tier}.takeRateLabel`)}</span>
                </div>
            )}

            <Link
                href={checkoutHref}
                className={cn(
                    'focus-visible:ring-primary group/cta mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                    isRecommended
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
                        : 'bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08]',
                )}
            >
                {t(`tiers.${plan.tier}.cta`)}
                <ArrowRight
                    className="size-4 transition-transform group-hover/cta:translate-x-0.5"
                    aria-hidden
                />
            </Link>

            {!isFree && (
                <p className="text-muted-foreground flex items-center justify-center gap-1.5 text-center text-xs">
                    <Check className="text-primary size-3.5" aria-hidden />
                    {t('price.reassurance')}
                </p>
            )}
        </article>
    );
}
