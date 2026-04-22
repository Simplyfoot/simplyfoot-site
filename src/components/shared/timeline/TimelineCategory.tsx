'use client';

import type { ReactElement } from 'react';

import { useInViewReveal } from '@/hooks/useInViewReveal';
import { cn } from '@/lib/utils';

export type TimelineHighlight = 'signature' | 'strategic';

interface TimelineCategoryProps {
    title: string;
    icon: ReactElement;
    bullets: readonly string[];
    highlight?: TimelineHighlight;
    className?: string;
}

/**
 * Carte d'une catégorie dans la timeline. Apparition progressive via
 * `useInViewReveal` (IntersectionObserver natif) + transition Tailwind,
 * zéro dépendance d'animation. Bordure et glow renforcés pour les
 * catégories `highlight`.
 *
 * Le filtrage par rôle est géré en amont par `<Timeline>` — cette carte
 * ne connaît pas la notion de rôle, elle se contente d'afficher ce qu'on
 * lui passe.
 */
export function TimelineCategory({
    title,
    icon,
    bullets,
    highlight,
    className,
}: TimelineCategoryProps) {
    const { ref, inView } = useInViewReveal<HTMLElement>();

    return (
        <article
            ref={ref}
            data-reveal={inView}
            className={cn(
                'border-border bg-card relative flex flex-col gap-3 rounded-2xl border p-5 shadow-sm transition-all duration-500 ease-out motion-reduce:transition-none',
                'data-[reveal=false]:translate-y-6 data-[reveal=false]:opacity-0',
                'data-[reveal=true]:translate-y-0 data-[reveal=true]:opacity-100',
                highlight === 'signature' && 'border-primary/40 ring-primary/10 ring-2',
                highlight === 'strategic' &&
                    'border-story-forest-glow/50 ring-story-forest-glow/15 ring-2',
                className,
            )}
        >
            <header className="flex items-center gap-3">
                <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                    {icon}
                </span>
                <h3 className="font-display text-foreground text-base leading-tight font-semibold">
                    {title}
                </h3>
            </header>
            <ul className="text-muted-foreground flex flex-col gap-2 text-sm leading-relaxed">
                {bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2">
                        <span
                            aria-hidden
                            className="bg-primary/60 mt-[0.55rem] size-1.5 shrink-0 rounded-full"
                        />
                        <span className="text-foreground/85">{bullet}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}
