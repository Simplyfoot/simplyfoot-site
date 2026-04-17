'use client';

import { useEffect, useState } from 'react';

import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

interface ScrollProgressProps {
    className?: string;
    topOffset?: string;
}

export function ScrollProgress({ className, topOffset = 'top-[56px]' }: ScrollProgressProps) {
    const [progress, setProgress] = useState(0);
    const reduced = useReducedMotion();

    useEffect(() => {
        let raf = 0;
        const update = (): void => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const next = max <= 0 ? 0 : Math.min(Math.max(window.scrollY / max, 0), 1);
            setProgress(next);
        };
        const onScroll = (): void => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    if (reduced) {
        return null;
    }

    return (
        <div
            aria-hidden
            className={cn(
                'pointer-events-none fixed inset-x-0 z-40 h-0.5 origin-left',
                topOffset,
                className,
            )}
            style={{ transform: `scaleX(${progress})` }}
        >
            <div className="h-full w-full bg-linear-to-r from-brand-primary via-brand-primary-light to-brand-primary" />
        </div>
    );
}
