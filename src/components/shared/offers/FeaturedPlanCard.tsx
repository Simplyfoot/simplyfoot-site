'use client';

import { ArrowRight, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { formatPrice, getEffectiveMonthlyPrice, getYearlySavings } from '@/config/offers';
import { routing } from '@/i18n/routing';
import { cn, range } from '@/lib/utils';

import type { BillingCycle, Plan } from '~types/offers.types';

interface FeaturedPlanCardProps {
    plan: Plan;
    cycle: BillingCycle;
    className?: string;
}

/**
 * Carte unique "offre recommandée pour votre club". Remplace l'ancienne
 * grille des 6 plans : seul le plan correspondant à la taille du club
 * (selon le slider de `LicenseeSelector`) est affiché. `aria-live="polite"`
 * pour que les lecteurs d'écran annoncent le changement de plan quand
 * l'utilisateur manipule le slider.
 *
 * L'ergonomie volontaire : zéro comparaison, zéro choix latéral — un seul
 * chemin vers le CTA, qui pointe directement vers le checkout (ou le
 * contact pour `enterprise`).
 */
export function FeaturedPlanCard({ plan, cycle, className }: FeaturedPlanCardProps) {
    const t = useTranslations('Offers');
    const locale = useLocale();

    const effective = getEffectiveMonthlyPrice(plan, cycle);
    const yearlySavings = getYearlySavings(plan);
    const isEnterprise = plan.priceMonthly === null;

    const localePrefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    const checkoutHref = isEnterprise
        ? `${localePrefix}/foot/contact?plan=${plan.id}`
        : `${localePrefix}/foot/offers/checkout?plan=${plan.id}&cycle=${cycle}`;

    return (
        <article
            aria-live="polite"
            aria-label={t(`plans.${plan.id}`)}
            className={cn(
                'bg-card border-primary/40 ring-primary/10 relative mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-3xl border-2 p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)] ring-2 md:p-10',
                className,
            )}
        >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase shadow-md">
                    <Sparkles className="size-3 fill-current" aria-hidden />
                    {t('card.badgeForClub')}
                </span>
            </div>

            <header className="flex flex-col items-center gap-2 text-center">
                <h3 className="font-display text-foreground text-2xl font-bold md:text-3xl">
                    {t(`plans.${plan.id}`)}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                    {plan.licenseeMax === null
                        ? t('card.rangeFrom', { min: plan.licenseeMin })
                        : t('card.range', { min: plan.licenseeMin, max: plan.licenseeMax })}
                </p>
            </header>

            <div className="flex flex-col items-center gap-2 text-center">
                {effective === null ? (
                    <span className="font-display text-foreground text-4xl font-bold md:text-5xl">
                        {t('card.onRequest')}
                    </span>
                ) : (
                    <div className="flex items-baseline gap-2">
                        <span className="font-display text-foreground text-5xl font-bold tabular-nums md:text-6xl">
                            {formatPrice(effective)}
                        </span>
                        <span className="text-muted-foreground text-base font-medium">
                            {t('card.perMonth')}
                        </span>
                    </div>
                )}
                {cycle === 'yearly' && yearlySavings && (
                    <p className="text-primary text-sm font-semibold">
                        {t('card.billedYearly', {
                            amount: formatPrice(yearlySavings, { withDecimals: false }),
                        })}
                    </p>
                )}
                {cycle === 'monthly' && plan.priceMonthly !== null && (
                    <p className="text-muted-foreground text-xs">{t('card.vatNote')}</p>
                )}
            </div>

            <ul className="mx-auto grid w-full max-w-md grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                {range(4).map((i) => (
                    <li key={i} className="text-foreground/85 flex items-start gap-2.5">
                        <Check className="text-primary mt-0.5 size-4 shrink-0" aria-hidden />
                        <span>{t(`card.bullets.${i}`)}</span>
                    </li>
                ))}
            </ul>

            <div className="flex flex-col items-center gap-2">
                <Link
                    href={checkoutHref}
                    className="focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 group inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                    {isEnterprise ? t('card.ctaEnterprise') : t('card.ctaPrimary')}
                    <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                    />
                </Link>
                <p className="text-muted-foreground text-xs">
                    {isEnterprise ? t('card.reassuranceEnterprise') : t('card.reassurance')}
                </p>
            </div>
        </article>
    );
}
