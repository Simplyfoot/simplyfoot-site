'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { SPORT_MOTION } from '@/lib/motion/sport-motion';
import { cn } from '@/lib/utils';
import type { BrandSlug } from '@/types/brand';

import { PhoneMockup } from './PhoneMockup';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface PhoneShowcaseItem {
    src?: string;
    alt?: string;
    label?: string;
}

interface PhoneShowcaseProps {
    items: [PhoneShowcaseItem, PhoneShowcaseItem, PhoneShowcaseItem];
    sport: BrandSlug;
    className?: string;
}

export function PhoneShowcase({ items, sport, className }: PhoneShowcaseProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const motion = SPORT_MOTION[sport];

    useGSAP(
        () => {
            if (!rootRef.current || reduced) {
                return;
            }
            const phones = rootRef.current.querySelectorAll<HTMLElement>('[data-phone]');
            if (phones.length < 3) {
                return;
            }

            const [left, center, right] = Array.from(phones) as [
                HTMLElement,
                HTMLElement,
                HTMLElement,
            ];

            gsap.set(left, { x: -40, y: 80, rotateY: 0, opacity: 0 });
            gsap.set(center, { y: 60, opacity: 0 });
            gsap.set(right, { x: 40, y: 80, rotateY: 0, opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
                defaults: {
                    duration: 0.8,
                    ease: `cubic-bezier(${motion.ease.join(',')})`,
                },
            });

            tl.to(center, { y: 0, opacity: 1 })
                .to(left, { x: 0, y: 0, rotateY: -8, opacity: 1 }, `-=${motion.stagger * 2}`)
                .to(right, { x: 0, y: 0, rotateY: 8, opacity: 1 }, `<`);
        },
        { scope: rootRef, dependencies: [reduced, sport] },
    );

    return (
        <div
            ref={rootRef}
            className={cn(
                'grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6',
                'snap-x snap-mandatory overflow-x-auto sm:overflow-visible',
                className,
            )}
            style={{ perspective: '1400px' }}
        >
            <div
                data-phone
                className="flex snap-center justify-center sm:translate-y-6 sm:transform-3d"
            >
                <PhoneMockup {...items[0]} />
            </div>
            <div
                data-phone
                className="flex snap-center justify-center sm:z-10 sm:scale-110 sm:transform-3d"
            >
                <PhoneMockup {...items[1]} />
            </div>
            <div
                data-phone
                className="flex snap-center justify-center sm:translate-y-6 sm:transform-3d"
            >
                <PhoneMockup {...items[2]} />
            </div>
        </div>
    );
}
