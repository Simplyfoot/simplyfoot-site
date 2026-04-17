'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { GradientButton } from '@/components/shared/GradientButton';
import { SectionBackground } from '@/components/shared/SectionBackground';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { SPORT_MOTION } from '@/lib/motion/sport-motion';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STEPS = [
    { key: 'one' as const, ord: '01' },
    { key: 'two' as const, ord: '02' },
    { key: 'three' as const, ord: '03' },
];

export function CartesRevolution() {
    const t = useTranslations('foot.cartes');
    const ref = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const motion = SPORT_MOTION.foot;

    useGSAP(
        () => {
            if (!ref.current || reduced) {
                return;
            }
            const steps = ref.current.querySelectorAll<HTMLElement>('[data-step]');
            gsap.fromTo(
                steps,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: motion.stagger,
                    ease: `cubic-bezier(${motion.ease.join(',')})`,
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                },
            );
        },
        { scope: ref, dependencies: [reduced] },
    );

    return (
        <SectionBackground sport="foot" tone="light" withPattern>
            <div ref={ref} className="py-(--space-section-y)">
                <div className="container-simply grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-2">
                            <span className="text-small-fluid inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 font-medium text-brand-primary">
                                <Sparkles className="size-3.5" aria-hidden />
                                {t('badge')}
                            </span>
                        </div>

                        <AnimatedTitle
                            sport="foot"
                            className="font-display text-h1 leading-[1.1] text-balance"
                        >
                            {t('title')}{' '}
                            <span className="text-brand-primary">{t('titleHighlight')}</span>
                            {t('titleEnd')}
                        </AnimatedTitle>

                        <p className="text-body-fluid max-w-[60ch] leading-relaxed text-balance text-muted-foreground">
                            {t('subtitle')}
                        </p>

                        <ol className="mt-2 flex flex-col gap-5">
                            {STEPS.map((step) => (
                                <li key={step.key} data-step className="flex gap-5">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-primary/30 bg-brand-primary/5 font-display text-sm font-semibold text-brand-primary tabular-nums">
                                        {step.ord}
                                    </span>
                                    <div className="flex flex-col gap-1 pt-1">
                                        <h3 className="font-display text-h4 font-semibold">
                                            {t(`steps.${step.key}.title`)}
                                        </h3>
                                        <p className="text-small-fluid max-w-[60ch] leading-relaxed text-muted-foreground">
                                            {t(`steps.${step.key}.description`)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <div className="mt-2 flex flex-wrap items-center gap-4">
                            <GradientButton href="/foot/offres">
                                {t('cta')}
                                <ArrowRight className="size-4" aria-hidden />
                            </GradientButton>
                        </div>

                        <p className="text-small-fluid mt-2 max-w-[65ch] border-l-2 border-brand-primary/30 pl-4 leading-relaxed text-muted-foreground italic">
                            {t('differentiator')}
                        </p>
                    </div>

                    <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none">
                        <CardsVisual
                            counterPrefix={t('counter.prefix')}
                            counterCaption={t('counter.caption')}
                        />
                    </div>
                </div>
            </div>
        </SectionBackground>
    );
}

function CardsVisual({
    counterPrefix,
    counterCaption,
}: {
    counterPrefix: string;
    counterCaption: string;
}) {
    return (
        <div className="relative w-full" style={{ perspective: '1600px' }}>
            <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(122,158,138,0.15),transparent_70%)]" />

            <div className="relative mx-auto grid h-[420px] w-full max-w-sm place-items-center">
                <Card
                    rotate="-6deg"
                    translate="-28px, 24px"
                    depth={0}
                    accent="from-brand-primary/20"
                />
                <Card
                    rotate="3deg"
                    translate="14px, -4px"
                    depth={1}
                    accent="from-brand-primary/30"
                />
                <Card
                    rotate="-1deg"
                    translate="0, -30px"
                    depth={2}
                    accent="from-brand-primary/40"
                    featured
                />
            </div>

            <div className="mt-10 flex flex-col items-center gap-1 text-center">
                <p className="text-small-fluid font-medium tracking-wide text-muted-foreground uppercase">
                    {counterPrefix}
                </p>
                <p className="font-display text-display leading-none font-bold text-brand-primary">
                    <AnimatedCounter target={30} suffix="%" duration={1.4} />
                </p>
                <p className="text-small-fluid max-w-[30ch] text-muted-foreground">
                    {counterCaption}
                </p>
            </div>
        </div>
    );
}

interface CardProps {
    rotate: string;
    translate: string;
    depth: number;
    accent: string;
    featured?: boolean;
}

function Card({ rotate, translate, depth, accent, featured }: CardProps) {
    return (
        <div
            className={cn(
                'absolute aspect-[5/7] w-48 rounded-2xl border border-brand-primary/15 p-5',
                'bg-linear-to-br to-transparent shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)] transform-3d',
                accent,
            )}
            style={{
                transform: `translate(${translate}) rotate(${rotate})`,
                zIndex: depth,
                backgroundColor: featured ? 'var(--brand-surface-dark)' : '#FDF5E6',
                color: featured ? 'var(--simply-beige)' : 'var(--brand-surface-dark)',
            }}
        >
            <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-semibold tracking-[0.2em] uppercase opacity-70">
                        SimplyFoot
                    </span>
                    <span className="inline-block size-2 rounded-full bg-brand-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <div className="h-2 w-16 rounded-full bg-current opacity-20" />
                    <div className="h-2 w-24 rounded-full bg-current opacity-15" />
                    <div className="h-2 w-10 rounded-full bg-current opacity-10" />
                </div>
                <span className="self-end font-display text-xs font-semibold tracking-wider opacity-80">
                    CARTE {featured ? 'ÉDITION LIMITÉE' : 'CLUB'}
                </span>
            </div>
        </div>
    );
}
