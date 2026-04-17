'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { SectionBackground } from '@/components/shared/SectionBackground';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { SPORT_MOTION } from '@/lib/motion/sport-motion';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STATEMENT_KEYS = [
    'about.manifesto.kid',
    'about.manifesto.coach',
    'about.manifesto.parent',
    'about.manifesto.canteen',
] as const;

export function ManifestoSection() {
    const t = useTranslations();
    const rootRef = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const motion = SPORT_MOTION.foot;

    useGSAP(
        () => {
            if (!rootRef.current || reduced) {
                return;
            }
            gsap.fromTo(
                '[data-statement]',
                { y: 24, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: motion.duration,
                    stagger: 0.15,
                    ease: `cubic-bezier(${motion.ease.join(',')})`,
                    scrollTrigger: {
                        trigger: rootRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none none',
                    },
                },
            );
        },
        { scope: rootRef, dependencies: [reduced] },
    );

    return (
        <SectionBackground sport="foot" tone="light">
            <div ref={rootRef} className="py-(--space-section-y)">
                <div className="container-simply flex flex-col items-center gap-10 text-center">
                    <AnimatedTitle sport="foot" className="max-w-[55ch] text-h1">
                        {t('about.manifesto.titleBefore')}{' '}
                        <span className="text-brand-primary">
                            {t('about.manifesto.titleHighlight')}
                        </span>
                        {t('about.manifesto.titleEnd')}
                    </AnimatedTitle>

                    <div className="flex max-w-[55ch] flex-col gap-6 text-balance">
                        {STATEMENT_KEYS.map((key) => (
                            <p
                                key={key}
                                data-statement
                                className="font-display text-h3 leading-[1.2] font-semibold text-foreground"
                            >
                                {t(key)}
                            </p>
                        ))}
                    </div>

                    <div className="mt-6 flex max-w-[50ch] flex-col gap-2 text-balance">
                        <p className="font-display text-h4 font-semibold text-brand-primary">
                            {t('about.manifesto.firstPerson.heading')}
                        </p>
                        <p className="text-body-fluid leading-relaxed text-muted-foreground">
                            {t('about.manifesto.firstPerson.body')}
                        </p>
                    </div>
                </div>
            </div>
        </SectionBackground>
    );
}
