'use client';

import { ArrowRight, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { GradientButton } from '@/components/shared/GradientButton';
import { ParticleBackground } from '@/components/shared/ParticleBackground';

export function CtaFinal() {
    const t = useTranslations('foot.ctaFinal');

    return (
        <div className="relative isolate overflow-hidden bg-[--brand-surface-dark] py-(--space-section-y) text-[--simply-beige]">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,158,138,0.35)_0%,rgba(26,46,34,0.6)_40%,transparent_75%)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(86,126,102,0.25),transparent_55%)]"
            />
            <ParticleBackground sport="foot" density={22} />

            <div className="container-simply relative z-10 text-center">
                <AnimatedTitle
                    sport="foot"
                    className="mx-auto max-w-3xl font-display text-display leading-[1.05] text-[--simply-beige]"
                    level="h2"
                >
                    {t('title')}
                </AnimatedTitle>
                <p className="text-body-fluid mx-auto mt-5 max-w-[60ch] text-balance text-[--simply-beige]/70">
                    {t('subtitle')}
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <GradientButton href="/foot/offres">
                        {t('offers')}
                        <ArrowRight className="size-4" />
                    </GradientButton>
                    <GradientButton href="/foot/contact" variant="secondary">
                        <Mail className="size-4" />
                        {t('contact')}
                    </GradientButton>
                </div>
            </div>
        </div>
    );
}
