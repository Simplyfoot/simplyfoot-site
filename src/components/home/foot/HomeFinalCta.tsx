import { ArrowRight, MessagesSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SimoMascot } from '@/components/features/foot/SimoMascot';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

// Alt text for SIMO comes from Common namespace — translated per locale.

interface HomeFinalCtaProps {
    className?: string;
}

/**
 * CTA final home — volontairement différent du CTA final de Features.
 * Ici, format question ouverte ("Et si on écrivait la suite ensemble ?")
 * sur fond `story-midnight` continu avec le reste de la home. Ton plus
 * intime que Features qui est plus directif ("Construisons SimplyFoot
 * ensemble").
 */
export function HomeFinalCta({ className }: HomeFinalCtaProps) {
    const t = useTranslations('Home.finalCta');
    const tCommon = useTranslations('Common');

    return (
        <section
            aria-labelledby="home-final-cta-heading"
            className={cn(
                'bg-story-midnight text-secondary-50 relative isolate flex min-h-[80vh] w-full items-center overflow-hidden',
                className,
            )}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_srgb,var(--story-forest)_55%,transparent)_0%,transparent_70%)]"
            />

            <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 py-24 sm:px-6 md:grid-cols-[1.3fr_1fr] md:py-32">
                <div className="flex flex-col gap-8 text-center md:text-left">
                    <p className="text-story-forest-glow text-xs font-semibold tracking-[0.35em] uppercase">
                        {t('eyebrow')}
                    </p>
                    <h2
                        id="home-final-cta-heading"
                        className="font-display max-w-[18ch] text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] font-bold tracking-tight text-balance"
                    >
                        {t('question')}
                    </h2>
                    <p className="text-secondary-50/75 max-w-[52ch] text-base leading-relaxed md:text-lg">
                        {t('subtitle')}
                    </p>

                    <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row md:items-start">
                        <Link
                            href="/foot/contact"
                            className="focus-visible:ring-primary-foreground bg-primary text-primary-foreground hover:bg-primary/90 group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold shadow-[0_10px_30px_-10px_color-mix(in_srgb,var(--story-forest-glow)_80%,transparent)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-10px_color-mix(in_srgb,var(--story-forest-glow)_90%,transparent)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                            {t('primaryCta')}
                            <ArrowRight
                                className="size-4 transition-transform group-hover:translate-x-0.5"
                                aria-hidden
                            />
                        </Link>
                        <Link
                            href="/foot/contact"
                            className="focus-visible:ring-secondary-50 border-secondary-50/30 text-secondary-50 hover:border-secondary-50/60 hover:bg-secondary-50/10 inline-flex items-center justify-center gap-2 rounded-full border bg-transparent px-7 py-4 text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                            <MessagesSquare className="size-4" aria-hidden />
                            {t('secondaryCta')}
                        </Link>
                    </div>

                    <p className="text-secondary-50/50 text-xs font-medium tracking-wide">
                        {t('reassurance')}
                    </p>
                </div>

                <div className="flex justify-center md:justify-end">
                    <SimoMascot
                        pose="running"
                        alt={tCommon('simoAlt')}
                        bubble={t('simoBubble')}
                        bubbleSide="left"
                        sizeClassName="size-48 md:size-64"
                        bubbleClassName="bg-white/95 text-foreground"
                    />
                </div>
            </div>
        </section>
    );
}
