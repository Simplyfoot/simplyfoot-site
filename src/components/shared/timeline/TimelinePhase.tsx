'use client';

import type { ReactNode } from 'react';

import { useInViewReveal } from '@/hooks/useInViewReveal';
import { cn } from '@/lib/utils';

export type TimelinePhaseTone = 'now' | 'soon' | 'later';

interface TimelinePhaseProps {
    id: string;
    title: string;
    eyebrow: string;
    intro: string;
    tone: TimelinePhaseTone;
    children: ReactNode;
    className?: string;
}

const TONE_CLASSES: Record<TimelinePhaseTone, string> = {
    now: 'text-primary bg-primary/10 ring-primary/20',
    soon: 'text-story-ink bg-secondary-50 ring-secondary-100',
    later: 'text-secondary-50 bg-story-forest ring-story-forest-glow/40',
};

/**
 * Phase d'une timeline : header (pastille + titre + intro) + slot enfants
 * pour les catégories. Apparition du header au scroll via
 * `useInViewReveal` + transition Tailwind. La tonalité `tone` mappe sur
 * des tokens projet (primary / secondary / story), jamais de hex.
 */
export function TimelinePhase({
    id,
    title,
    eyebrow,
    intro,
    tone,
    children,
    className,
}: TimelinePhaseProps) {
    const { ref, inView } = useInViewReveal<HTMLElement>();

    return (
        <section
            id={id}
            aria-label={title}
            className={cn('relative flex flex-col gap-8', className)}
        >
            <header
                ref={ref}
                data-reveal={inView}
                className={cn(
                    'flex flex-col gap-3 transition-all duration-500 ease-out motion-reduce:transition-none',
                    'data-[reveal=false]:translate-y-4 data-[reveal=false]:opacity-0',
                    'data-[reveal=true]:translate-y-0 data-[reveal=true]:opacity-100',
                )}
            >
                <span
                    className={cn(
                        'inline-flex w-max items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase ring-1',
                        TONE_CLASSES[tone],
                    )}
                >
                    {eyebrow}
                </span>
                <h3 className="font-display text-foreground text-2xl font-bold tracking-tight md:text-3xl">
                    {title}
                </h3>
                <p className="text-muted-foreground max-w-[60ch] text-sm leading-relaxed md:text-base">
                    {intro}
                </p>
            </header>
            {children}
        </section>
    );
}
