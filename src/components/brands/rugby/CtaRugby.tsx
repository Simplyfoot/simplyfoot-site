'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { GradientButton } from '@/components/shared/GradientButton';
import { ParticleBackground } from '@/components/shared/ParticleBackground';

export function CtaRugby() {
    const t = useTranslations('rugby.ctaFinal');

    return (
        <div className="relative isolate overflow-hidden bg-[--brand-surface-dark] py-(--space-section-y) text-[--simply-beige]">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(192,64,64,0.35)_0%,rgba(42,16,16,0.6)_45%,transparent_80%)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(45deg, transparent 0 20px, rgba(255,255,255,0.5) 20px 22px)',
                }}
            />
            <ParticleBackground sport="rugby" density={22} />

            <div className="container-simply relative z-10 text-center">
                <AnimatedTitle
                    sport="rugby"
                    className="mx-auto max-w-3xl font-display text-display leading-[1.05] text-[--simply-beige]"
                >
                    {t('title')}
                </AnimatedTitle>
                <p className="text-body-fluid mx-auto mt-5 max-w-[60ch] text-balance text-[--simply-beige]/70">
                    {t('subtitle')}
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <GradientButton href="/contact">
                        {t('cta')}
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </GradientButton>
                    <GradientButton href="/" variant="secondary">
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        {t('ctaSecondary')}
                    </GradientButton>
                </div>
            </div>
        </div>
    );
}
