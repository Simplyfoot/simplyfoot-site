import { cn } from '@/lib/utils';
import type { BrandSlug } from '@/types/brand';

type Variant = 'wave' | 'angle' | 'sharp';

const VARIANT_BY_SPORT: Record<BrandSlug, Variant> = {
    foot: 'wave',
    rugby: 'angle',
    handball: 'sharp',
};

interface SectionDividerProps {
    sport?: BrandSlug;
    variant?: Variant;
    flip?: boolean;
    className?: string;
    colorClass?: string;
}

export function SectionDivider({
    sport,
    variant,
    flip = false,
    className,
    colorClass = 'text-brand-primary/15',
}: SectionDividerProps) {
    const resolved: Variant = variant ?? (sport ? VARIANT_BY_SPORT[sport] : 'wave');

    return (
        <div
            aria-hidden
            className={cn(
                'pointer-events-none -mt-px h-16 w-full overflow-hidden md:h-24',
                flip && 'rotate-180',
                className,
            )}
        >
            <svg
                viewBox="0 0 1440 96"
                preserveAspectRatio="none"
                className={cn('block h-full w-full', colorClass)}
            >
                {resolved === 'wave' && (
                    <path
                        d="M0,64 C240,16 480,112 720,64 C960,16 1200,112 1440,64 L1440,96 L0,96 Z"
                        fill="currentColor"
                    />
                )}
                {resolved === 'angle' && (
                    <path d="M0,0 L880,96 L1440,24 L1440,96 L0,96 Z" fill="currentColor" />
                )}
                {resolved === 'sharp' && (
                    <path
                        d="M0,40 L560,40 L720,80 L880,40 L1440,40 L1440,96 L0,96 Z"
                        fill="currentColor"
                    />
                )}
            </svg>
        </div>
    );
}
