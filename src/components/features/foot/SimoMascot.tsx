'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export type SimoPose = 'default' | 'running';

interface SimoMascotProps {
    pose?: SimoPose;
    alt: string;
    /** Bulle de dialogue affichée à côté de SIMO — absente = pas de bulle. */
    bubble?: string;
    className?: string;
    bubbleClassName?: string;
    /** Inverse le placement de la bulle (par défaut : bulle à droite). */
    bubbleSide?: 'left' | 'right';
    /** Désactive le flottement idle. */
    staticPose?: boolean;
    sizeClassName?: string;
    priority?: boolean;
}

const POSES: Record<SimoPose, string> = {
    default: '/images/SIMO.png',
    running: '/images/SimoRun.png',
};

/**
 * Mascotte SIMO. Deux poses PNG (par défaut / course), léger flottement
 * idle via `@keyframes simo-float` (globals.css) et une bulle de dialogue
 * optionnelle qui apparaît en fondu après un court délai pour laisser le
 * hero s'installer. Aucune dépendance d'animation externe.
 */
export function SimoMascot({
    pose = 'default',
    alt,
    bubble,
    className,
    bubbleClassName,
    bubbleSide = 'right',
    staticPose = false,
    sizeClassName = 'size-40 md:size-56',
    priority = false,
}: SimoMascotProps) {
    const [bubbleShown, setBubbleShown] = useState(false);

    useEffect(() => {
        if (!bubble) {
            return;
        }
        const timer = window.setTimeout(() => setBubbleShown(true), 350);
        return () => window.clearTimeout(timer);
    }, [bubble]);

    return (
        <div className={cn('relative flex items-center', className)}>
            <div
                className={cn(
                    'relative shrink-0',
                    sizeClassName,
                    !staticPose &&
                        'motion-safe:animate-[simo-float_4.5s_ease-in-out_infinite] motion-safe:will-change-transform',
                )}
            >
                <Image
                    src={POSES[pose]}
                    alt={alt}
                    fill
                    sizes="(min-width: 768px) 224px, 160px"
                    priority={priority}
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                />
            </div>
            {bubble && (
                <div
                    data-shown={bubbleShown}
                    className={cn(
                        'absolute max-w-[18ch] rounded-2xl px-4 py-2.5 text-sm font-medium shadow-lg backdrop-blur-sm transition-all duration-500 ease-out',
                        'bg-background/95 text-foreground ring-border ring-1',
                        'data-[shown=false]:translate-y-3 data-[shown=false]:scale-95 data-[shown=false]:opacity-0',
                        'data-[shown=true]:translate-y-0 data-[shown=true]:scale-100 data-[shown=true]:opacity-100',
                        bubbleSide === 'right'
                            ? 'left-full -translate-x-4 -translate-y-6'
                            : 'right-full translate-x-4 -translate-y-6',
                        bubbleClassName,
                    )}
                >
                    {bubble}
                    <span
                        aria-hidden
                        className={cn(
                            'bg-background/95 ring-border absolute top-5 size-3 rotate-45 ring-1',
                            bubbleSide === 'right'
                                ? '-left-1.5 border-r-0 border-b-0'
                                : '-right-1.5 border-t-0 border-l-0',
                        )}
                    />
                </div>
            )}
        </div>
    );
}
