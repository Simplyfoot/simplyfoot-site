'use client';

import { ArrowRight, Hourglass } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

/**
 * Page offres — version "À venir". Décision produit du 2026-04-27 :
 * masquer la grille tarifaire V2.1 tant que l'offre n'est pas finalisée
 * avec les clubs pilotes. La page redirige vers le contact (pré-rempli
 * sujet « offres ») pour capturer les leads intéressés.
 *
 * Les composants V2.1 (`PricingControls`, `TierComparison`, `TierCard`,
 * `ReversionHighlight`, `ModulesBlock`, `OffersFaq`, `TrustStrip`,
 * `FinalCta`, `OffersHero`) restent en place côté fichiers — non
 * importés ici, donc tree-shakés du bundle. Pour réactiver la page :
 * restaurer l'ancien `OffersContent` depuis `git log` (commit feat:
 * codebase/offers/hp).
 */
export function OffersContent() {
    const t = useTranslations('Offers.comingSoon');

    return (
        <section
            aria-labelledby="offers-coming-soon-heading"
            className="bg-story-forest text-secondary-50 relative isolate flex min-h-[calc(100vh-4.5rem)] w-full items-center overflow-hidden"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--story-forest-glow)_28%,transparent)_0%,transparent_65%)]"
            />

            <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-4 py-24 text-center sm:px-6 md:py-32">
                <span className="border-story-forest-glow/40 bg-story-forest-glow/10 text-story-forest-glow inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] font-bold tracking-[0.3em] uppercase">
                    <Hourglass className="size-3.5" aria-hidden />
                    {t('eyebrow')}
                </span>

                <h1
                    id="offers-coming-soon-heading"
                    className="font-display text-[clamp(3rem,12vw,8rem)] leading-[0.95] font-bold tracking-tight text-balance"
                >
                    {t('title')}
                </h1>

                <p className="text-secondary-50/80 max-w-[55ch] text-base leading-relaxed md:text-lg">
                    {t('subtitle')}
                </p>

                <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
                    <Link
                        href="/foot/contact"
                        className="bg-secondary-50 text-story-forest hover:bg-secondary-50/95 focus-visible:ring-secondary-50 group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)] transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
                    >
                        {t('primaryCta')}
                        <ArrowRight
                            className="size-4 transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                        />
                    </Link>
                    <Link
                        href="/foot"
                        className="border-secondary-50/30 text-secondary-50 hover:border-secondary-50/60 hover:bg-secondary-50/10 focus-visible:ring-secondary-50 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border bg-transparent px-7 text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
                    >
                        {t('secondaryCta')}
                    </Link>
                </div>
            </div>
        </section>
    );
}
