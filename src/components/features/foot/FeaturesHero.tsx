'use client';

import { ArrowRight, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/shadcn/button';

import { SimoMascot } from './SimoMascot';

const Hero3DScene = dynamic(() => import('./Hero3DScene').then((m) => m.Hero3DScene), {
    ssr: false,
    loading: () => null,
});

interface FeaturesHeroProps {
    className?: string;
}

/**
 * Hero plein écran de la page Features. Arrière-plan 3D (planète en
 * rotation, chargée en `dynamic` avec `ssr:false`), dégradé vert forêt
 * signature, superposition de texte + SIMO + scroll indicator.
 *
 * Le bouton secondaire et le scroll indicator pointent vers l'ancre
 * `#features-list` (section `CurrentFeaturesList`).
 */
export function FeaturesHero({ className }: FeaturesHeroProps) {
    const t = useTranslations('Features.hero');

    return (
        <section
            aria-labelledby="features-hero-title"
            className={cn(
                'bg-story-forest text-secondary-50 relative isolate flex min-h-[82vh] w-full items-center overflow-hidden',
                className,
            )}
        >
            <Hero3DScene ariaLabel={t('planetAlt')} />

            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--story-forest-glow)_30%,transparent)_0%,color-mix(in_srgb,var(--story-forest)_75%,transparent)_50%,var(--story-forest)_85%)]"
            />

            <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-12">
                <div className="flex flex-col gap-6 text-center md:text-left">
                    <span className="border-story-forest-glow/40 bg-story-forest-glow/10 text-story-forest-glow inline-flex w-max items-center gap-2 self-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase md:self-start">
                        <span
                            aria-hidden
                            className="bg-story-forest-glow size-1.5 animate-pulse rounded-full"
                        />
                        {t('authorityPill')}
                    </span>
                    <span className="text-story-forest-glow/70 text-[11px] font-semibold tracking-[0.3em] uppercase md:self-start">
                        {t('eyebrow')}
                    </span>
                    <h1
                        id="features-hero-title"
                        className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-5xl lg:text-6xl"
                    >
                        {t('titleBefore')}
                        <span className="text-story-forest-glow">{t('titleHighlight')}</span>
                        {t('titleAfter')}
                    </h1>
                    <p className="text-secondary-50/85 max-w-[58ch] text-lg leading-relaxed text-balance">
                        {t('subtitle')}
                    </p>
                    <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row md:items-start">
                        <Button asChild size="lg" className="shrink-0">
                            <Link href="/foot/contact">
                                {t('ctaPrimary')}
                                <ArrowRight className="ml-2 size-4" aria-hidden />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-secondary-50/40 text-secondary-50 hover:border-secondary-50/70 hover:bg-secondary-50/10 hover:text-secondary-50 shrink-0 bg-transparent"
                        >
                            <a href="#features-list">
                                {t('ctaSecondary')}
                                <ChevronDown className="ml-2 size-4" aria-hidden />
                            </a>
                        </Button>
                    </div>
                </div>

                <div className="relative flex items-center justify-center md:justify-end">
                    <SimoMascot
                        pose="default"
                        alt={t('simoAlt')}
                        bubble={t('simoBubble')}
                        bubbleSide="left"
                        sizeClassName="size-56 md:size-72"
                        priority
                    />
                </div>
            </div>

            <p className="text-secondary-50/60 relative mx-auto mt-10 max-w-3xl px-4 text-center text-xs font-medium tracking-wide">
                {t('reassurance')}
            </p>

            <a
                href="#features-list"
                aria-label={t('ctaSecondary')}
                className="focus-visible:ring-secondary-50 absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium opacity-80 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
            >
                <span className="tracking-widest uppercase">scroll</span>
                <ChevronDown className="size-4 animate-bounce" aria-hidden />
            </a>
        </section>
    );
}
