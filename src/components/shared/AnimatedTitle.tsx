'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ReactNode, useRef } from 'react';

import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { SPORT_MOTION } from '@/lib/motion/sport-motion';
import { cn } from '@/lib/utils';
import type { BrandSlug } from '@/types/brand';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Level = 'h1' | 'h2' | 'h3';

interface AnimatedTitleProps {
    sport: BrandSlug;
    highlight?: string;
    before?: string;
    after?: string;
    level?: Level;
    className?: string;
    children?: ReactNode;
}

export function AnimatedTitle({
    sport,
    highlight,
    before,
    after,
    level = 'h2',
    className,
    children,
}: AnimatedTitleProps) {
    const ref = useRef<HTMLHeadingElement>(null);
    const reduced = useReducedMotion();
    const motion = SPORT_MOTION[sport];

    useGSAP(
        () => {
            if (!ref.current || reduced) {
                return;
            }
            gsap.fromTo(
                ref.current,
                { clipPath: 'inset(100% 0 0 0)', y: 20, opacity: 0 },
                {
                    clipPath: 'inset(0% 0 0 0)',
                    y: 0,
                    opacity: 1,
                    duration: motion.duration,
                    ease: `cubic-bezier(${motion.ease.join(',')})`,
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                },
            );
        },
        { scope: ref, dependencies: [reduced, sport] },
    );

    const classes = cn('font-display text-h2 text-balance font-bold leading-tight', className);
    const inner = children ?? (
        <>
            {before}
            {highlight && <span className="text-brand-primary">{highlight}</span>}
            {after}
        </>
    );

    if (level === 'h1') {
        return (
            <h1 ref={ref} className={classes}>
                {inner}
            </h1>
        );
    }
    if (level === 'h3') {
        return (
            <h3 ref={ref} className={classes}>
                {inner}
            </h3>
        );
    }
    return (
        <h2 ref={ref} className={classes}>
            {inner}
        </h2>
    );
}
