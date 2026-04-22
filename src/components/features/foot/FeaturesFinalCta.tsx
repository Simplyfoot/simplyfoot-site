import { ArrowRight, MessagesSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import { SimoMascot } from './SimoMascot';

interface FeaturesFinalCtaProps {
    className?: string;
}

/**
 * CTA final de la landing. Fond forêt signature + dégradé radial, titre
 * massif, double CTA (programme pilote / contact), pastille de
 * rassurance, SimoMascot en pose "running" comme signature énergique de
 * bas de page. Cohérent avec le `FinalCta` d'Offres sur le plan visuel.
 */
export function FeaturesFinalCta({ className }: FeaturesFinalCtaProps) {
    const t = useTranslations('Features.finalCta');
    const tCommon = useTranslations('Common');

    return (
        <section
            aria-labelledby="features-final-cta-heading"
            className={cn(
                'bg-story-forest text-secondary-50 relative isolate overflow-hidden rounded-3xl px-6 py-16 md:px-12 md:py-24',
                className,
            )}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--story-forest-glow)_35%,transparent)_0%,color-mix(in_srgb,var(--story-forest)_70%,transparent)_45%,transparent_80%)]"
            />
            <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-[1.3fr_1fr]">
                <div className="flex flex-col gap-6 text-center md:text-left">
                    <p className="text-story-forest-glow text-xs font-semibold tracking-wider uppercase">
                        {t('eyebrow')}
                    </p>
                    <h2
                        id="features-final-cta-heading"
                        className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-balance md:text-5xl"
                    >
                        {t('massiveHeading')}
                    </h2>
                    <p className="text-secondary-50/80 max-w-[55ch] text-base leading-relaxed md:text-lg">
                        {t('massiveSubtitle')}
                    </p>

                    <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row md:items-start">
                        <Link
                            href="/foot/contact"
                            className="focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold shadow-[0_10px_30px_-10px_color-mix(in_srgb,var(--story-forest-glow)_80%,transparent)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_color-mix(in_srgb,var(--story-forest-glow)_90%,transparent)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                            {t('primaryCta')}
                            <ArrowRight className="size-4" aria-hidden />
                        </Link>
                        <Link
                            href="/foot/contact"
                            className="focus-visible:ring-primary-foreground border-secondary-50/30 text-secondary-50 hover:border-secondary-50/60 hover:bg-secondary-50/10 inline-flex items-center justify-center gap-2 rounded-xl border bg-transparent px-6 py-4 text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                            <MessagesSquare className="size-4" aria-hidden />
                            {t('secondaryCta')}
                        </Link>
                    </div>

                    <p className="border-secondary-50/20 bg-secondary-50/5 text-secondary-50/80 mt-2 inline-flex w-max items-center gap-2 self-center rounded-full border px-3 py-1.5 text-xs font-semibold md:self-start">
                        <span
                            aria-hidden
                            className="bg-story-forest-glow size-1.5 animate-pulse rounded-full"
                        />
                        {t('badge')}
                    </p>
                </div>

                <div className="flex justify-center md:justify-end">
                    <SimoMascot
                        pose="running"
                        alt={tCommon('simoAlt')}
                        bubble={t('simoBubble')}
                        bubbleSide="left"
                        sizeClassName="size-48 md:size-64"
                    />
                </div>
            </div>
        </section>
    );
}
