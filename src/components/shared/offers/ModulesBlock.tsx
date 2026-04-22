import { Check, GlassWater, type LucideIcon, ShoppingBag, Trophy } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { formatPrice, MODULES } from '@/config/offers';
import { cn } from '@/lib/utils';

interface ModulesBlockProps {
    className?: string;
}

const ICONS: Record<string, LucideIcon> = {
    buvette: GlassWater,
    tournois: Trophy,
    boutique: ShoppingBag,
};

/**
 * Modules complémentaires de l'offre STARTER — 3 add-ons vendus à l'unité
 * (buvette, tournois, boutique). Tous inclus dans l'offre CLUB : chaque
 * carte affiche à la fois le prix STARTER (+X € / mois) et un tag
 * "Inclus dans CLUB" pour renforcer la valeur perçue de l'offre CLUB.
 */
export function ModulesBlock({ className }: ModulesBlockProps) {
    const t = useTranslations('Offers.modules');

    return (
        <section
            aria-labelledby="offers-modules-heading"
            className={cn('flex flex-col gap-8', className)}
        >
            <header className="flex max-w-[55ch] flex-col gap-3">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2
                    id="offers-modules-heading"
                    className="font-display text-foreground text-2xl leading-tight font-bold tracking-tight text-balance md:text-3xl"
                >
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">{t('intro')}</p>
            </header>

            <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {MODULES.map((module) => {
                    const Icon = ICONS[module.id] ?? GlassWater;
                    return (
                        <li
                            key={module.id}
                            className="border-border bg-card flex flex-col gap-4 rounded-2xl border p-5 shadow-sm transition-colors hover:border-[color-mix(in_srgb,var(--primary-700)_35%,transparent)]"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
                                    <Icon className="size-5" aria-hidden />
                                </span>
                                <span className="border-border bg-primary/5 text-primary inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase">
                                    <Check className="size-3" aria-hidden />
                                    {t('included')}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-display text-foreground text-lg font-semibold">
                                    {t(`items.${module.id}.name`)}
                                </h3>
                                <p className="text-muted-foreground/80 text-xs font-semibold tracking-wide uppercase">
                                    {t(`items.${module.id}.target`)}
                                </p>
                            </div>
                            <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
                                {t(`items.${module.id}.pitch`)}
                            </p>
                            <div className="border-border flex items-baseline gap-1.5 border-t pt-4">
                                <span className="font-display text-foreground text-2xl font-bold tabular-nums">
                                    + {formatPrice(module.priceMonthly, { withDecimals: false })}
                                </span>
                                <span className="text-muted-foreground text-xs">
                                    {t('perMonth')}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
