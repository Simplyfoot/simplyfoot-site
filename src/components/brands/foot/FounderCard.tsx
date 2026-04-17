'use client';

import { useTranslations } from 'next-intl';

import { AnimatedCard } from '@/components/shared/AnimatedCard';
import type { Founder } from '@/content/about/founders';
import { cn } from '@/lib/utils';

interface FounderCardProps {
    founder: Founder;
    index: number;
}

export function FounderCard({ founder, index }: FounderCardProps) {
    const t = useTranslations();

    return (
        <AnimatedCard
            sport="foot"
            index={index}
            className="flex h-full flex-col items-center text-center"
        >
            <div
                className={cn(
                    'flex size-24 items-center justify-center rounded-full',
                    'bg-linear-to-br shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]',
                    'ring-1 ring-white/60 ring-offset-2 ring-offset-transparent',
                    'transition-transform duration-300 ease-out group-hover:scale-105',
                    founder.gradient,
                )}
                aria-hidden="true"
            >
                <span className="font-display text-h4 font-semibold tracking-wider text-white">
                    {founder.initials}
                </span>
            </div>
            <h3 className="mt-5 font-display text-h4 font-semibold">{founder.name}</h3>
            <p className="mt-1 text-xs font-medium tracking-wider text-brand-primary uppercase">
                {t(founder.roleKey)}
            </p>
            <p className="text-small-fluid mt-4 max-w-[32ch] leading-relaxed text-muted-foreground italic">
                {t(founder.spiritKey)}
            </p>
        </AnimatedCard>
    );
}
