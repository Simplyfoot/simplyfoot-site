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

export function HeroRugby() {
    const t = useTranslations('rugby.hero');
    const rootRef = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const motion = SPORT_MOTION.rugby;

    useGSAP(
        () => {
            if (!rootRef.current || reduced) {
                return;
            }
            const ease = `cubic-bezier(${motion.ease.join(',')})`;
            const tl = gsap.timeline({ defaults: { ease } });

            tl.fromTo(
                '[data-hero="badge"]',
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.3, delay: 0.15 },
            )
                .fromTo(
                    '[data-hero="title"]',
                    { y: 24, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.35 },
                    '-=0.1',
                )
                .fromTo(
                    '[data-hero="subtitle"]',
                    { y: 16, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3 },
                    '-=0.2',
                )
                .fromTo(
                    '[data-hero="cta"] > *',
                    { y: 12, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3, stagger: motion.stagger },
                    '-=0.15',
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
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(192,64,64,0.35)_0%,rgba(42,16,16,0.6)_45%,transparent_80%)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(45deg, transparent 0 20px, rgba(255,255,255,0.5) 20px 22px)',
                }}
            />
            <ParticleBackground sport="rugby" density={18} />

            <div
                className={cn(
                    'container-simply relative z-10 flex min-h-[85svh] flex-col items-center justify-center gap-6 py-(--space-section-y) text-center',
                )}
            >
                <span
                    data-hero="badge"
                    className="text-small-fluid inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-brand-primary/15 px-4 py-1.5 font-medium text-brand-primary-light backdrop-blur-sm"
                >
                    <span className="inline-block size-1.5 rounded-full bg-brand-primary-light" />
                    {t('badge')}
                </span>

                <h1
                    data-hero="title"
                    className="mx-auto max-w-[18ch] font-display text-display leading-[1.05] font-bold text-balance"
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
                        <ArrowRight className="size-4" />
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
                        <ChevronDown className="ml-2 size-4" />
                    </Link>
                </div>
            </div>

            <SectionDivider
                sport="rugby"
                className="absolute inset-x-0 bottom-0 text-[--brand-bg]"
                colorClass="text-[--brand-bg]"
            />
        </div>
    );
}
