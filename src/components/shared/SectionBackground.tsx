import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import type { BrandSlug } from '@/types/brand';

import { SectionDivider } from './SectionDivider';

type Tone = 'light' | 'tinted' | 'dark';

interface SectionBackgroundProps {
    sport: BrandSlug;
    tone?: Tone;
    withPattern?: boolean;
    withDivider?: 'top' | 'bottom' | 'both' | 'none';
    className?: string;
    children: ReactNode;
}

const toneClass: Record<Tone, string> = {
    light: 'bg-[--brand-bg] text-foreground',
    tinted: 'bg-[#F0DDB4] text-foreground',
    dark: 'bg-[--brand-surface-dark] text-[--simply-beige]',
};

function Pattern({ sport }: { sport: BrandSlug }) {
    if (sport === 'foot') {
        return (
            <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-[0.04]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="foot-hex" width="60" height="52" patternUnits="userSpaceOnUse">
                        <polygon
                            points="30,2 58,17 58,45 30,60 2,45 2,17"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            className="text-brand-primary"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#foot-hex)" />
            </svg>
        );
    }
    if (sport === 'rugby') {
        return (
            <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-[0.05]"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="rugby-stripes"
                        width="24"
                        height="24"
                        patternUnits="userSpaceOnUse"
                        patternTransform="rotate(45)"
                    >
                        <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="24"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-brand-primary"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#rugby-stripes)" />
            </svg>
        );
    }
    return (
        <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-[0.05]"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern id="hand-arc" width="160" height="160" patternUnits="userSpaceOnUse">
                    <path
                        d="M0,160 A80,80 0 0 1 160,160"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-brand-primary"
                    />
                    <line
                        x1="0"
                        y1="160"
                        x2="160"
                        y2="160"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-brand-primary"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hand-arc)" />
        </svg>
    );
}

export function SectionBackground({
    sport,
    tone = 'light',
    withPattern = false,
    withDivider = 'none',
    className,
    children,
}: SectionBackgroundProps) {
    return (
        <div className={cn('relative isolate', toneClass[tone], className)}>
            {withPattern && <Pattern sport={sport} />}
            {(withDivider === 'top' || withDivider === 'both') && (
                <SectionDivider sport={sport} flip className="absolute inset-x-0 top-0 z-10" />
            )}
            <div className="relative z-0">{children}</div>
            {(withDivider === 'bottom' || withDivider === 'both') && (
                <SectionDivider sport={sport} className="relative z-10" />
            )}
        </div>
    );
}
