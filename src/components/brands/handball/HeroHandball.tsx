'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { GradientButton } from '@/components/shared/GradientButton';
import { ParticleBackground } from '@/components/shared/ParticleBackground';
import { SectionDivider } from '@/components/shared/SectionDivider';
import { buttonVariants } from '@/components/ui/button';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { Link } from '@/lib/i18n/routing';
import { SPORT_MOTION } from '@/lib/motion/sport-motion';
import { cn } from '@/lib/utils';

export function HeroHandball() {
    const t = useTranslations('handball.hero');
    const rootRef = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const motion = SPORT_MOTION.handball;

    useGSAP(
        () => {
            if (!rootRef.current || reduced) {
                return;
            }
            const ease = `cubic-bezier(${motion.ease.join(',')})`;
            const tl = gsap.timeline({ defaults: { ease } });

            tl.fromTo(
                '[data-hero="badge"]',
                { y: 8, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.25, delay: 0.15 },
            )
                .fromTo(
                    '[data-hero="title"]',
                    { y: 16, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3 },
                    '-=0.1',
                )
                .fromTo(
                    '[data-hero="subtitle"]',
                    { y: 10, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.28 },
                    '-=0.15',
                )
                .fromTo(
                    '[data-hero="cta"] > *',
                    { y: 8, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.25, stagger: motion.stagger },
                    '-=0.12',
                );
        },
        { scope: rootRef, dependencies: [reduced] },
    );

    return (
        <div
            ref={rootRef}
            className="relative min-h-[85svh] overflow-hidden bg-[--brand-surface-dark] text-[--simply-beige]"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(63,81,181,0.35)_0%,rgba(10,14,42,0.65)_45%,transparent_80%)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(180deg,transparent_0%,rgba(63,81,181,0.08)_100%)]"
            />
            <ParticleBackground sport="handball" density={18} />

            <div
                className={cn(
                    'container-simply relative z-10 flex min-h-[85svh] flex-col items-center justify-center gap-6 py-(--space-section-y) text-center',
                )}
            >
                <span
                    data-hero="badge"
                    className="text-small-fluid inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-brand-primary/20 px-4 py-1.5 font-medium text-brand-primary-light backdrop-blur-sm"
                >
                    <span className="inline-block size-1.5 rounded-full bg-brand-primary-light" />
                    {t('badge')}
                </span>

                <h1
                    data-hero="title"
                    className="mx-auto max-w-[20ch] font-display text-display leading-[1.05] font-bold text-balance"
                >
                    {t('title')}
                </h1>

                <p
                    data-hero="subtitle"
                    className="text-body-fluid mx-auto max-w-[60ch] leading-relaxed text-balance text-[--simply-beige]/80"
                >
                    {t('subtitle')}
                </p>

                <div data-hero="cta" className="flex flex-wrap justify-center gap-4 pt-2">
                    <GradientButton href="#features">
                        {t('cta')}
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </GradientButton>
                    <Link
                        href="#features"
                        className={cn(
                            buttonVariants({ variant: 'outline', size: 'lg' }),
                            'min-h-11 border-[--simply-beige]/30 px-6 text-[--simply-beige]',
                            'hover:border-[--simply-beige]/60 hover:bg-[--simply-beige]/10 hover:text-[--simply-beige]',
                        )}
                    >
                        {t('ctaSecondary')}
                        <ChevronDown className="ml-2 size-4" aria-hidden="true" />
                    </Link>
                </div>
            </div>

            <SectionDivider
                sport="handball"
                className="absolute inset-x-0 bottom-0 text-[--brand-bg]"
                colorClass="text-[--brand-bg]"
            />
        </div>
    );
}
