'use client';

import { Check, CreditCard, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { PricingPack, PricingTier } from '@/content/pricing/foot-pricing';
import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';

interface PricingCardProps {
    pack: PricingPack;
    tier: PricingTier;
}

export function PricingCard({ pack, tier }: PricingCardProps) {
    const t = useTranslations('foot');
    const price = pack.prices[tier];

    return (
        <Card
            className={cn(
                'relative flex flex-col transition-transform duration-200',
                pack.highlighted && 'scale-[1.02] ring-2 ring-brand-primary',
            )}
        >
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CardTitle className="text-h4 font-bold">{pack.name}</CardTitle>
                    {pack.badgeKey ? <Badge>{t(pack.badgeKey)}</Badge> : null}
                </div>
                <CardDescription>{t(pack.subtitleKey)}</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-6">
                {/* Price */}
                <div className="flex items-baseline gap-1">
                    {price === 0 ? (
                        <span className="font-display text-h2 font-bold text-brand-primary">
                            {t('pricing.free')}
                        </span>
                    ) : (
                        <>
                            <span className="font-display text-h2 font-bold text-brand-primary">
                                {price}
                            </span>
                            <span className="text-small-fluid text-muted-foreground">
                                {t('pricing.perMonth')}
                            </span>
                        </>
                    )}
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2.5">
                    {pack.featureKeys.map((feature) => (
                        <li key={feature.textKey} className="flex items-start gap-2">
                            {feature.included ? (
                                <Check
                                    className="mt-0.5 size-4 shrink-0 text-brand-primary"
                                    aria-hidden="true"
                                />
                            ) : (
                                <X
                                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                                    aria-hidden="true"
                                />
                            )}
                            <span
                                className={cn(
                                    'text-small-fluid',
                                    !feature.included && 'text-muted-foreground line-through',
                                )}
                            >
                                {t(feature.textKey)}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Cartes revenue box */}
                <div className="mt-auto flex flex-col gap-1 rounded-xl border border-brand-primary/25 bg-[#F5E6C8]/60 p-3">
                    <div className="flex items-center gap-2">
                        <CreditCard className="size-4 text-brand-primary" aria-hidden="true" />
                        <span className="text-xs font-semibold tracking-wider text-brand-primary uppercase">
                            {t('pricing.cards.label')}
                        </span>
                    </div>
                    <p className="text-small-fluid font-medium">
                        {t('pricing.cards.revenue', { share: pack.cardRevenueShare })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {t('pricing.cards.royalty', { royalty: pack.cardRoyalty })}
                    </p>
                </div>
            </CardContent>

            <CardFooter>
                <Link
                    href="/foot/contact"
                    className={cn(
                        buttonVariants({ size: 'lg' }),
                        'min-h-11 w-full',
                        pack.highlighted
                            ? 'bg-brand-primary text-white hover:bg-brand-primary-dark'
                            : 'bg-muted text-foreground hover:bg-muted/80',
                    )}
                >
                    {t(pack.ctaKey)}
                </Link>
            </CardFooter>
        </Card>
    );
}
