import { ArrowLeft, CircleCheck, Mail } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import {
    CLUB_SIZES,
    DEFAULT_SIZE,
    formatPrice,
    getEffectiveMonthlyPrice,
    getPlan,
    getYearlyPrice,
    isClubSize,
    isPlanTier,
    TRIAL_DAYS,
} from '@/config/offers';
import { buildAlternates } from '@/helpers/i18n.helpers';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shadcn/button';
import { BRANDS } from '@/utils/constants.utils';

import type { AppLocale } from '~types/i18n.types';
import type { BillingCycle, ClubSize, PlanTier } from '~types/offers.types';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Offers.checkout.meta' });
    const brandLabel = BRANDS.foot.label;

    return {
        title: t('title', { brand: brandLabel }),
        description: t('description', { brand: brandLabel }),
        alternates: buildAlternates('/foot/offers/checkout', locale),
        robots: { index: false, follow: false },
    };
}

interface CheckoutPageProps {
    params: Promise<{ locale: AppLocale }>;
    searchParams: Promise<{ plan?: string; size?: string; cycle?: string }>;
}

/**
 * Stub de checkout V2.1. Rôle temporaire : afficher le récapitulatif
 * (tier × taille × cadence) et rediriger vers un contact par email tant
 * que l'intégration Stripe / Mangopay n'est pas livrée.
 *
 * Params URL attendus :
 *   - `plan`  : tier DÉCOUVERTE / STARTER / CLUB (`discovery` / `starter` / `club`)
 *   - `size`  : taille du club (`small` / `medium` / `large`)
 *   - `cycle` : `monthly` ou `yearly`
 *
 * Fallback : tier=`club`, size=`DEFAULT_SIZE` (medium), cycle=`monthly` —
 * même combinaison que le CTA par défaut de la page Offres.
 */
export default async function FootCheckoutPage({ params, searchParams }: CheckoutPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const { plan: rawPlan, size: rawSize, cycle: rawCycle } = await searchParams;

    const tier: PlanTier = isPlanTier(rawPlan) ? rawPlan : 'club';
    const size: ClubSize = isClubSize(rawSize) ? rawSize : DEFAULT_SIZE;
    const cycle: BillingCycle = rawCycle === 'yearly' ? 'yearly' : 'monthly';

    const plan = getPlan(tier);
    const sizeDef = CLUB_SIZES.find((s) => s.id === size);
    if (!sizeDef) {
        throw new Error(`Unknown club size: ${size}`);
    }

    const t = await getTranslations('Offers.checkout');
    const tTiers = await getTranslations('Offers.tiers');
    const tSizes = await getTranslations('Offers.sizes');
    const tCycle = await getTranslations('Offers.cycle');

    const monthly = getEffectiveMonthlyPrice(plan, size, cycle);
    const yearly = cycle === 'yearly' ? getYearlyPrice(plan, size) : null;
    const isFree = plan.prices[size] === 0;

    const planLabel = tTiers(`${tier}.name`);
    const sizeLabel = tSizes(`${size}.label`);

    const subjectLine = t('email.subject', { plan: planLabel });
    const bodyLine = t('email.body', {
        plan: planLabel,
        size: sizeLabel,
        cycle: tCycle(cycle),
        trialDays: TRIAL_DAYS,
    });
    const mailto = `mailto:contact@simplyfoot.fr?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyLine)}`;

    return (
        <main className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-4 py-12 sm:px-6 md:py-20">
            <nav>
                <Button asChild variant="ghost" size="sm">
                    <Link href="/foot/offers">
                        <ArrowLeft className="mr-1.5 size-4" aria-hidden />
                        {t('back')}
                    </Link>
                </Button>
            </nav>

            <header className="flex flex-col gap-3">
                <span className="bg-primary/10 text-primary inline-flex w-max items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                    <CircleCheck className="size-3.5" aria-hidden />
                    {t('eyebrow')}
                </span>
                <h1 className="font-display text-foreground text-3xl font-bold tracking-tight md:text-4xl">
                    {t('title', { plan: planLabel })}
                </h1>
                <p className="text-muted-foreground text-base leading-relaxed">{t('subtitle')}</p>
            </header>

            <section
                aria-label={t('summaryLabel')}
                className="border-border bg-card rounded-3xl border p-6 shadow-sm md:p-8"
            >
                <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                    {t('summaryLabel')}
                </h2>
                <dl className="divide-border mt-5 divide-y">
                    <Row label={t('summary.plan')} value={planLabel} />
                    <Row
                        label={t('summary.size')}
                        value={
                            sizeDef.licenseeMax === null
                                ? t('summary.sizeFrom', { min: sizeDef.licenseeMin })
                                : sizeDef.licenseeMin === 0
                                  ? t('summary.sizeUpTo', { max: sizeDef.licenseeMax })
                                  : t('summary.sizeRange', {
                                        min: sizeDef.licenseeMin,
                                        max: sizeDef.licenseeMax,
                                    })
                        }
                    />
                    <Row label={t('summary.cycle')} value={tCycle(cycle)} />
                    {isFree ? (
                        <Row label={t('summary.priceMonthly')} value={t('summary.free')} emphasis />
                    ) : (
                        <Row
                            label={t('summary.priceMonthly')}
                            value={formatPrice(monthly)}
                            emphasis
                        />
                    )}
                    {yearly !== null && (
                        <Row label={t('summary.priceYearly')} value={formatPrice(yearly)} />
                    )}
                    {plan.takeRate !== null && (
                        <Row
                            label={t('summary.takeRate')}
                            value={tTiers(`${tier}.takeRateLabel`)}
                        />
                    )}
                    <Row
                        label={t('summary.trial')}
                        value={t('summary.trialValue', { days: TRIAL_DAYS })}
                        emphasis
                    />
                </dl>
            </section>

            <section
                aria-label={t('nextStep.heading')}
                className="bg-primary/5 ring-primary/15 flex flex-col gap-4 rounded-3xl p-6 ring-1 md:p-8"
            >
                <h2 className="font-display text-foreground text-xl font-bold">
                    {t('nextStep.heading')}
                </h2>
                <p className="text-muted-foreground max-w-[55ch] text-sm leading-relaxed md:text-base">
                    {t('nextStep.body')}
                </p>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                    <Button asChild size="lg" className="shrink-0">
                        <a href={mailto}>
                            <Mail className="mr-2 size-4" aria-hidden />
                            {t('nextStep.primaryCta')}
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="shrink-0">
                        <Link href="/foot/contact">{t('nextStep.secondaryCta')}</Link>
                    </Button>
                </div>

                <p className="text-muted-foreground mt-1 text-xs">{t('nextStep.reassurance')}</p>
            </section>
        </main>
    );
}

function Row({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
    return (
        <div className="flex items-baseline justify-between gap-6 py-3 first:pt-0 last:pb-0">
            <dt className="text-muted-foreground text-sm">{label}</dt>
            <dd
                className={
                    emphasis
                        ? 'text-foreground font-display text-lg font-semibold tabular-nums'
                        : 'text-foreground text-sm font-medium'
                }
            >
                {value}
            </dd>
        </div>
    );
}
