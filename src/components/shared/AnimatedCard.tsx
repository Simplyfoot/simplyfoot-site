'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ReactNode, useRef } from 'react';

import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { easeToCss, SPORT_MOTION } from '@/lib/motion/sport-motion';
import { cn } from '@/lib/utils';
import type { BrandSlug } from '@/types/brand';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface AnimatedCardProps {
    children: ReactNode;
    sport: BrandSlug;
    index?: number;
    className?: string;
}

export function AnimatedCard({ children, sport, index = 0, className }: AnimatedCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const motion = SPORT_MOTION[sport];

    useGSAP(
        () => {
            if (!ref.current || reduced) {
                return;
            }
            gsap.fromTo(
                ref.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: motion.duration,
                    delay: index * motion.stagger,
                    ease: `cubic-bezier(${motion.ease.join(',')})`,
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                },
            );
        },
        { scope: ref, dependencies: [reduced, sport, index] },
    );

    return (
        <div
            ref={ref}
            data-animated-card
            data-sport={sport}
            className={cn(
                'group relative overflow-hidden rounded-2xl border border-brand-primary/15 bg-background/80 p-6',
                'shadow-sm transition-all duration-300 will-change-transform',
                'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[3px]',
                'before:bg-brand-primary before:opacity-30 before:transition-opacity before:duration-300',
                'hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:before:opacity-100',
                'focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2 hover:border-brand-primary/40',
                'after:pointer-events-none after:absolute after:inset-0 after:bg-brand-primary/0 after:transition-colors after:duration-300',
                'hover:after:bg-brand-primary/[0.03]',
                className,
            )}
            style={{ transitionTimingFunction: easeToCss(motion.ease) }}
        >
            <div className="relative z-10">{children}</div>
        </div>
    );
}
