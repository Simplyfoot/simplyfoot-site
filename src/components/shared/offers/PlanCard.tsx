'use client';

import { ArrowRight, Check, Star } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { formatPrice, getEffectiveMonthlyPrice, getYearlySavings } from '@/config/offers';
import { routing } from '@/i18n/routing';
import { cn, range } from '@/lib/utils';

import type { BillingCycle, Plan } from '~types/offers.types';

interface PlanCardProps {
    plan: Plan;
    cycle: BillingCycle;
    /** Surbrillance additionnelle (hors `plan.recommended`) — suit le slider licenciés. */
    highlighted?: boolean;
    className?: string;
}

/**
 * Carte d'un plan. Affiche tranche de licenciés, prix dynamique (selon cycle
 * mensuel/annuel), badge "Le plus choisi" si `plan.recommended`, glow
 * supplémentaire si `highlighted` (= le slider a sélectionné ce plan).
 *
 * Le CTA pointe vers `/foot/offers/checkout?plan=X&cycle=Y` — structure
 * propre pour une future intégration Stripe Checkout. Préfixe locale géré
 * ici car le pathname est une URL construite manuellement.
 */
export function PlanCard({ plan, cycle, highlighted = false, className }: PlanCardProps) {
    const t = useTranslations('Offers');
    const locale = useLocale();

    const effective = getEffectiveMonthlyPrice(plan, cycle);
    const yearlySavings = getYearlySavings(plan);
    const isEnterprise = plan.priceMonthly === null;

    const localePrefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    const checkoutHref = isEnterprise
        ? `${localePrefix}/foot/contact?plan=${plan.id}`
        : `${localePrefix}/foot/offers/checkout?plan=${plan.id}&cycle=${cycle}`;

    const isRecommended = plan.recommended ?? false;
    const isEmphasized = isRecommended || highlighted;

    return (
        <article
            className={cn(
                'group relative flex h-full flex-col rounded-3xl p-6 transition-all duration-300 md:p-8',
                isEmphasized
                    ? 'bg-card border-primary ring-primary/10 border-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] ring-2'
                    : 'bg-card border-border hover:border-primary/30 border hover:-translate-y-0.5 hover:shadow-lg',
                className,
            )}
            aria-label={t(`plans.${plan.id}`)}
        >
            {isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase shadow-md">
                        <Star className="size-3 fill-current" aria-hidden />
                        {t('card.badgeRecommended')}
                    </span>
                </div>
            )}

            <header className="flex flex-col gap-1.5">
                <h3 className="font-display text-foreground text-xl font-bold md:text-2xl">
                    {t(`plans.${plan.id}`)}
                </h3>
                <p className="text-muted-foreground text-sm">
                    {plan.licenseeMax === null
                        ? t('card.rangeFrom', { min: plan.licenseeMin })
                        : t('card.range', { min: plan.licenseeMin, max: plan.licenseeMax })}
                </p>
            </header>

            <div className="mt-6 flex items-baseline gap-1.5">
                {effective === null ? (
                    <span className="font-display text-foreground text-3xl font-bold">
                        {t('card.onRequest')}
                    </span>
                ) : (
                    <>
                        <span className="font-display text-foreground text-4xl font-bold tabular-nums md:text-5xl">
                            {formatPrice(effective)}
                        </span>
                        <span className="text-muted-foreground text-sm font-medium">
                            {t('card.perMonth')}
                        </span>
                    </>
                )}
            </div>
            {cycle === 'yearly' && yearlySavings && (
                <p className="text-primary mt-1 text-xs font-semibold">
                    {t('card.billedYearly', {
                        amount: formatPrice(yearlySavings, { withDecimals: false }),
                    })}
                </p>
            )}
            {cycle === 'monthly' && plan.priceMonthly !== null && (
                <p className="text-muted-foreground mt-1 text-xs">{t('card.vatNote')}</p>
            )}

            <ul className="text-foreground/85 mt-6 flex flex-col gap-2.5 text-sm">
                {range(4).map((i) => (
                    <li key={i} className="flex items-start gap-2.5">
                        <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
                        <span>{t(`card.bullets.${i}`)}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-auto pt-6">
                <Link
                    href={checkoutHref}
                    className={cn(
                        'focus-visible:ring-primary group/cta inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                        isEmphasized
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
                            : 'bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08]',
                    )}
                >
                    {isEnterprise ? t('card.ctaEnterprise') : t('card.ctaPrimary')}
                    <ArrowRight
                        className="size-4 transition-transform group-hover/cta:translate-x-0.5"
                        aria-hidden
                    />
                </Link>
                <p className="text-muted-foreground mt-3 text-center text-xs">
                    {isEnterprise ? t('card.reassuranceEnterprise') : t('card.reassurance')}
                </p>
            </div>
        </article>
    );
}
