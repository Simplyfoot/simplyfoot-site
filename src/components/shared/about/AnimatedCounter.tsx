'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
    target: number;
    duration?: number;
    suffix?: string;
    decimals?: number;
    className?: string;
}

const easeOutExpo = (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Compte de 0 à `target` quand l'élément entre dans le viewport. Démarre une
 * seule fois. Respecte prefers-reduced-motion en affichant directement la
 * valeur finale (utile pour les lecteurs d'écran + utilisateurs sensibles).
 *
 * Nombres formatés en espaces insécables (fr-FR) pour la lisibilité des
 * millions.
 */
export function AnimatedCounter({
    target,
    duration = 2,
    suffix = '',
    decimals = 0,
    className,
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [value, setValue] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
            setValue(target);
            return;
        }
        const node = ref.current;
        if (!node) {
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !started) {
                        setStarted(true);
                    }
                });
            },
            { threshold: 0.3 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [started, target]);

    useEffect(() => {
        if (!started) {
            return;
        }
        let raf = 0;
        const start = performance.now();
        const tick = (now: number): void => {
            const elapsed = (now - start) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            setValue(target * easeOutExpo(progress));
            if (progress < 1) {
                raf = requestAnimationFrame(tick);
            }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [started, target, duration]);

    const display =
        decimals > 0
            ? value.toLocaleString('fr-FR', {
                  minimumFractionDigits: decimals,
                  maximumFractionDigits: decimals,
              })
            : Math.round(value).toLocaleString('fr-FR');

    return (
        <span ref={ref} className={className}>
            {display}
            {suffix}
        </span>
    );
}
