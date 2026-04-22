import { ArrowRight, MessagesSquare } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface FinalCtaProps {
    /** Plan id pré-rempli dans le checkout (par défaut : le plan recommandé). */
    defaultPlanId: string;
    className?: string;
}

/**
 * Bloc final haute conversion. Background sombre signature SimplyFoot, CTA
 * double (primaire : démarrer l'essai gratuit ; secondaire : nous parler).
 * Le CTA primaire mène directement au checkout du plan recommandé pour que
 * l'utilisateur indécis aille à l'essentiel.
 */
export function FinalCta({ defaultPlanId, className }: FinalCtaProps) {
    const t = useTranslations('Offers.finalCta');
    const locale = useLocale();
    const localePrefix = locale === routing.defaultLocale ? '' : `/${locale}`;

    return (
        <section
            aria-label={t('heading')}
            className={cn(
                'bg-story-forest text-secondary-50 relative isolate overflow-hidden rounded-3xl px-6 py-14 md:px-12 md:py-20',
                className,
            )}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--story-forest-glow)_35%,transparent)_0%,color-mix(in_srgb,var(--story-forest)_70%,transparent)_45%,transparent_80%)]"
            />

            <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
                <p className="text-story-forest-glow text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance md:text-5xl">
                    {t('heading')}
                </h2>
                <p className="text-secondary-50/80 max-w-[55ch] text-base leading-relaxed md:text-lg">
                    {t('subtitle')}
                </p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                        href={`${localePrefix}/foot/offers/checkout?plan=${defaultPlanId}&cycle=monthly`}
                        className="focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold shadow-[0_10px_30px_-10px_color-mix(in_srgb,var(--story-forest-glow)_80%,transparent)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_color-mix(in_srgb,var(--story-forest-glow)_90%,transparent)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                        {t('primaryCta')}
                        <ArrowRight className="size-4" aria-hidden />
                    </Link>
                    <Link
                        href={`${localePrefix}/foot/contact`}
                        className="focus-visible:ring-primary-foreground border-secondary-50/30 text-secondary-50 hover:border-secondary-50/60 hover:bg-secondary-50/10 inline-flex items-center justify-center gap-2 rounded-xl border bg-transparent px-6 py-3.5 text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                        <MessagesSquare className="size-4" aria-hidden />
                        {t('secondaryCta')}
                    </Link>
                </div>

                <p className="text-secondary-50/60 mt-2 text-xs">{t('reassurance')}</p>
            </div>
        </section>
    );
}
