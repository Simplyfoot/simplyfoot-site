import {
    Building2,
    CalendarCheck,
    Coins,
    FolderTree,
    IdCard,
    Layers,
    LayoutGrid,
    LineChart,
    type LucideIcon,
    MessageCircle,
    Sparkles,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { FEATURE_GRID } from '@/config/features-foot';
import { cn } from '@/lib/utils';

import { FeatureCard } from './FeatureCard';

const ICONS: Record<string, LucideIcon> = {
    Building2,
    CalendarCheck,
    LineChart,
    LayoutGrid,
    MessageCircle,
    FolderTree,
    IdCard,
    Layers,
    Sparkles,
    Coins,
};

interface FeatureGridProps {
    className?: string;
}

/**
 * Grille des 10 fonctionnalités phares. 3 colonnes desktop, 2 tablet,
 * 1 mobile. Les cartes `highlight: true` se distinguent par un ring
 * coloré ; les autres restent sobres. Les données de structure sont en
 * config (`FEATURE_GRID`), les libellés en i18n (`Features.featuresList`).
 */
export function FeatureGrid({ className }: FeatureGridProps) {
    const t = useTranslations('Features.featuresList');

    return (
        <section
            id="features-list"
            aria-labelledby="features-list-heading"
            className={cn('flex flex-col gap-10', className)}
        >
            <header className="flex max-w-[62ch] flex-col gap-3">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2
                    id="features-list-heading"
                    className="font-display text-foreground text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl"
                >
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                    {t('intro')}
                </p>
            </header>

            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURE_GRID.map((item) => {
                    const Icon = ICONS[item.icon] ?? Sparkles;
                    return (
                        <li key={item.id}>
                            <FeatureCard
                                id={item.id}
                                icon={Icon}
                                badge={item.badge}
                                highlight={item.highlight}
                            />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
