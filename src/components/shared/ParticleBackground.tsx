'use client';

import { useMemo } from 'react';

import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import type { BrandSlug } from '@/types/brand';

interface ParticleBackgroundProps {
    sport: BrandSlug;
    density?: number;
    className?: string;
}

interface Particle {
    id: number;
    left: string;
    top: string;
    size: number;
    delay: string;
    duration: string;
    opacity: number;
}

function generateParticles(seed: number, count: number): Particle[] {
    let s = seed;
    const rand = (): number => {
        s = (s * 9301 + 49297) % 233280;
        return s / 233280;
    };
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${rand() * 100}%`,
        top: `${rand() * 100}%`,
        size: 1 + rand() * 3,
        delay: `${rand() * 6}s`,
        duration: `${8 + rand() * 10}s`,
        opacity: 0.15 + rand() * 0.3,
    }));
}

export function ParticleBackground({ sport, density = 30, className }: ParticleBackgroundProps) {
    const reduced = useReducedMotion();
    const isMobile = useMediaQuery('(max-width: 767px)');
    const count = reduced ? 0 : isMobile ? Math.round(density / 2) : density;

    const particles = useMemo(() => generateParticles(42 + sport.length, count), [sport, count]);

    if (reduced || count === 0) {
        return null;
    }

    if (sport === 'handball') {
        return (
            <div
                aria-hidden
                className={cn(
                    'pointer-events-none absolute inset-0 overflow-hidden',
                    '[mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]',
                    className,
                )}
            >
                {particles.map((p) => (
                    <span
                        key={p.id}
                        className="absolute h-px animate-[parquet-shimmer_linear_infinite] bg-gradient-to-r from-transparent via-[#3F51B5] to-transparent"
                        style={{
                            left: 0,
                            top: p.top,
                            width: `${40 + p.size * 20}px`,
                            opacity: p.opacity * 0.6,
                            animationDelay: p.delay,
                            animationDuration: p.duration,
                            transform: `translateX(${p.left})`,
                        }}
                    />
                ))}
                <style>{`
          @keyframes parquet-shimmer {
            0% { transform: translateX(-20%); opacity: 0; }
            10%, 85% { opacity: var(--op, 0.4); }
            100% { transform: translateX(120vw); opacity: 0; }
          }
        `}</style>
            </div>
        );
    }

    const particleClass =
        sport === 'foot' ? 'bg-[#7A9E8A]' : sport === 'rugby' ? 'bg-[#C9A574]' : 'bg-[#3F51B5]';

    return (
        <div
            aria-hidden
            className={cn(
                'pointer-events-none absolute inset-0 overflow-hidden',
                '[mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]',
                className,
            )}
        >
            {particles.map((p) => (
                <span
                    key={p.id}
                    className={cn(
                        'absolute animate-[particle-float_ease-in-out_infinite] rounded-full',
                        particleClass,
                    )}
                    style={{
                        left: p.left,
                        top: p.top,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        opacity: p.opacity,
                        animationDelay: p.delay,
                        animationDuration: p.duration,
                    }}
                />
            ))}
            <style>{`
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(8px); }
        }
      `}</style>
        </div>
    );
}
