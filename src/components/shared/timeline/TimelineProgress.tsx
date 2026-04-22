'use client';

import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

interface TimelineProgressProps {
    /** Conteneur de la timeline — la barre se remplit au fur et à mesure que l'utilisateur scrolle dedans. */
    containerRef: RefObject<HTMLElement | null>;
    className?: string;
}

/**
 * Ligne verticale qui se remplit progressivement au scroll. Pur scroll
 * listener + CSS var `--timeline-progress` (0 → 1) appliqué via
 * `transform: scaleY(...)` — aucune dépendance d'animation, lissage
 * naturel grâce à `will-change: transform`.
 *
 * Le calcul mappe la position verticale du conteneur par rapport au
 * centre du viewport : 0 quand le haut atteint le centre, 1 quand le bas
 * le dépasse. Clamp hors [0,1] pour éviter les overshoots.
 */
export function TimelineProgress({ containerRef, className }: TimelineProgressProps) {
    const fillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const fill = fillRef.current;
        if (!container || !fill) {
            return;
        }

        let rafId = 0;
        const update = () => {
            const rect = container.getBoundingClientRect();
            const viewportHalf = window.innerHeight / 2;
            const start = rect.top - viewportHalf;
            const end = rect.bottom - viewportHalf;
            const total = end - start;
            if (total <= 0) {
                fill.style.setProperty('--timeline-progress', '1');
                return;
            }
            const progress = Math.max(0, Math.min(1, -start / total));
            fill.style.setProperty('--timeline-progress', String(progress));
        };

        const onScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(rafId);
        };
    }, [containerRef]);

    return (
        <div
            aria-hidden
            className={cn(
                'bg-border pointer-events-none absolute top-0 bottom-0 w-px motion-reduce:hidden',
                className,
            )}
        >
            <div
                ref={fillRef}
                className="bg-primary absolute inset-0 origin-top will-change-transform"
                style={{ transform: 'scaleY(var(--timeline-progress, 0))' }}
            />
        </div>
    );
}
