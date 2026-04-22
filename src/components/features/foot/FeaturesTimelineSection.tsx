'use client';

import {
    Building2,
    CalendarCheck,
    CalendarDays,
    ClipboardList,
    Coins,
    Crown,
    FolderTree,
    IdCard,
    Layers,
    LineChart,
    type LucideIcon,
    Megaphone,
    MessageCircle,
    Sparkles,
    Star,
    User,
    UsersRound,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { Timeline, type TimelinePhaseData } from '@/components/shared/timeline/Timeline';
import { daysUntilNextUpdate, FEATURES_TIMELINE } from '@/config/features-foot';
import { cn, range } from '@/lib/utils';

import type { FeaturesPhaseId, FeaturesRoleFilter } from '~types/features.types';

interface FeaturesTimelineSectionProps {
    /** Jours restants avant la prochaine MAJ — calculé côté serveur pour éviter le flash d'hydratation. */
    daysUntilNext?: number;
    className?: string;
}

const ICONS: Record<string, LucideIcon> = {
    Sparkles,
    UsersRound,
    CalendarCheck,
    MessageCircle,
    IdCard,
    CalendarDays,
    Crown,
    Megaphone,
    User,
    LineChart,
    ClipboardList,
    Star,
    Layers,
    FolderTree,
    Building2,
    Coins,
};

const PHASE_TONES: Record<FeaturesPhaseId, TimelinePhaseData['tone']> = {
    now: 'now',
    soon: 'soon',
    later: 'later',
};

const ROLE_IDS: readonly FeaturesRoleFilter[] = ['all', 'club', 'coach', 'player', 'parent'];

/**
 * Wrapper foot de la timeline générique. Résout les i18n, mappe les icônes
 * string → composants Lucide, puis passe la donnée "plate" à `<Timeline>`.
 *
 * Le compte à rebours "prochaine MAJ" est idéalement calculé côté serveur
 * et injecté en prop pour rester cohérent entre SSR et hydratation. Un
 * fallback client est fourni si la prop est absente.
 */
export function FeaturesTimelineSection({
    daysUntilNext,
    className,
}: FeaturesTimelineSectionProps) {
    const t = useTranslations('Features.timeline');
    const tPhases = useTranslations('Features.timeline.phases');
    const tRoles = useTranslations('Features.roles');

    const [roleFilter, setRoleFilter] = useState<FeaturesRoleFilter>('all');

    const phases: TimelinePhaseData[] = useMemo(
        () =>
            FEATURES_TIMELINE.map((phase) => ({
                id: phase.id,
                title: tPhases(`${phase.id}.title`),
                eyebrow: tPhases(`${phase.id}.eyebrow`),
                intro: tPhases(`${phase.id}.intro`),
                tone: PHASE_TONES[phase.id],
                categories: phase.categories.map((category) => {
                    const Icon = ICONS[category.icon] ?? Sparkles;
                    const bullets = range(category.bulletCount).map((i) =>
                        tPhases(`${phase.id}.categories.${category.id}.bullets.${i}`),
                    );
                    return {
                        id: category.id,
                        title: tPhases(`${phase.id}.categories.${category.id}.title`),
                        icon: <Icon className="size-5" aria-hidden />,
                        bullets,
                        roles: category.roles,
                        ...(category.highlight ? { highlight: category.highlight } : {}),
                    };
                }),
            })),
        [tPhases],
    );

    const roleOptions = ROLE_IDS.map((id) => ({ id, label: tRoles(id) }));
    const remaining = daysUntilNext ?? daysUntilNextUpdate();

    return (
        <section
            id="features-timeline"
            aria-labelledby="features-timeline-heading"
            className={cn('flex flex-col gap-10', className)}
        >
            <header className="flex flex-col items-center gap-4 text-center">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2
                    id="features-timeline-heading"
                    className="font-display text-foreground max-w-[28ch] text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl"
                >
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground max-w-[62ch] text-base leading-relaxed md:text-lg">
                    {t('intro')}
                </p>
                <p
                    aria-live="polite"
                    className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-[color-mix(in_srgb,var(--primary-700)_25%,transparent)]"
                >
                    <span className="bg-primary size-2 animate-pulse rounded-full" aria-hidden />
                    {t('nextUpdate', { days: remaining })}
                </p>
            </header>

            <Timeline
                phases={phases}
                roleOptions={roleOptions}
                roleFilter={roleFilter}
                onRoleFilterChange={(value) => setRoleFilter(value as FeaturesRoleFilter)}
                filterLabel={t('filterLabel')}
                emptyMessage={t('emptyFilter')}
                allRoleId="all"
            />
        </section>
    );
}
