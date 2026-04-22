import { Coins, Heart, type LucideIcon, Rocket, Sparkles, Target } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DIFFERENTIATION_POINTS } from '@/config/features-foot';
import { cn } from '@/lib/utils';

const ICONS: Record<string, LucideIcon> = {
    Target,
    Sparkles,
    Heart,
    Coins,
    Rocket,
};

interface DifferentiationSectionProps {
    className?: string;
}

/**
 * Les 5 piliers de différenciation. Grille asymétrique (3+2) pour éviter
 * l'effet tableau Excel. La première carte (football) prend toute la
 * largeur sur desktop pour asseoir le positionnement central avant les
 * déclinaisons.
 */
export function DifferentiationSection({ className }: DifferentiationSectionProps) {
    const t = useTranslations('Features.differentiation');

    return (
        <section
            id="features-differentiation"
            aria-labelledby="features-differentiation-heading"
            className={cn('flex flex-col gap-10', className)}
        >
            <header className="flex max-w-[55ch] flex-col gap-3">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2
                    id="features-differentiation-heading"
                    className="font-display text-foreground text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl"
                >
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                    {t('intro')}
                </p>
            </header>

            <ul className="grid grid-cols-1 gap-4 md:grid-cols-6">
                {DIFFERENTIATION_POINTS.map((point, index) => {
                    const Icon = ICONS[point.icon] ?? Sparkles;
                    const isHero = index === 0;
                    return (
                        <li
                            key={point.id}
                            className={cn(
                                'border-border bg-card flex flex-col gap-3 rounded-2xl border p-6 shadow-sm transition-colors hover:border-[color-mix(in_srgb,var(--primary-700)_35%,transparent)]',
                                isHero ? 'md:col-span-6' : 'md:col-span-3',
                            )}
                        >
                            <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
                                <Icon className="size-5" aria-hidden />
                            </span>
                            <h3 className="font-display text-foreground text-lg font-semibold">
                                {t(`points.${point.id}.title`)}
                            </h3>
                            <p className="text-muted-foreground max-w-[55ch] text-sm leading-relaxed md:text-base">
                                {t(`points.${point.id}.description`)}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
