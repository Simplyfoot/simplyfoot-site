'use client';

import type { ReactElement } from 'react';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

import { RoleFilter, type RoleOption } from './RoleFilter';
import { TimelineCategory, type TimelineHighlight } from './TimelineCategory';
import { TimelinePhase, type TimelinePhaseTone } from './TimelinePhase';
import { TimelineProgress } from './TimelineProgress';

export interface TimelineCategoryData {
    id: string;
    title: string;
    icon: ReactElement;
    bullets: readonly string[];
    roles: readonly string[];
    highlight?: TimelineHighlight;
}

export interface TimelinePhaseData {
    id: string;
    title: string;
    eyebrow: string;
    intro: string;
    tone: TimelinePhaseTone;
    categories: readonly TimelineCategoryData[];
}

interface TimelineProps {
    phases: readonly TimelinePhaseData[];
    roleOptions: readonly RoleOption[];
    roleFilter: string;
    onRoleFilterChange: (value: string) => void;
    filterLabel: string;
    /** Message affiché quand une phase n'a aucune catégorie pour le rôle filtré. */
    emptyMessage: string;
    /** `'all'` → aucune restriction. Toute autre valeur masque les catégories non concernées. */
    allRoleId?: string;
    className?: string;
}

/**
 * Composant timeline générique — reçoit des données pré-résolues (titres,
 * bullets, icônes). Ne connaît rien du domaine foot/rugby/handball.
 *
 * Comportement du filtre :
 *   - si `roleFilter === allRoleId`, toutes les catégories sont rendues ;
 *   - sinon, seules les catégories dont les `roles` incluent le filtre
 *     sont rendues. Si une phase se retrouve vide, on affiche
 *     `emptyMessage` à la place pour garder la continuité du récit.
 */
export function Timeline({
    phases,
    roleOptions,
    roleFilter,
    onRoleFilterChange,
    filterLabel,
    emptyMessage,
    allRoleId = 'all',
    className,
}: TimelineProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const showAll = roleFilter === allRoleId;

    return (
        <div className={cn('flex flex-col gap-10', className)}>
            <div className="flex justify-center">
                <RoleFilter
                    label={filterLabel}
                    options={roleOptions}
                    value={roleFilter}
                    onValueChange={onRoleFilterChange}
                />
            </div>

            <div ref={containerRef} className="relative">
                <TimelineProgress containerRef={containerRef} className="left-4 hidden md:block" />

                <div className="flex flex-col gap-20 md:gap-24 md:pl-14">
                    {phases.map((phase) => {
                        const visibleCategories = showAll
                            ? phase.categories
                            : phase.categories.filter((c) => c.roles.includes(roleFilter));

                        return (
                            <TimelinePhase
                                key={phase.id}
                                id={`timeline-phase-${phase.id}`}
                                title={phase.title}
                                eyebrow={phase.eyebrow}
                                intro={phase.intro}
                                tone={phase.tone}
                            >
                                {visibleCategories.length === 0 ? (
                                    <p
                                        role="status"
                                        className="border-border bg-card text-muted-foreground rounded-2xl border border-dashed p-5 text-sm leading-relaxed"
                                    >
                                        {emptyMessage}
                                    </p>
                                ) : (
                                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                        {visibleCategories.map((category) => (
                                            <li key={category.id}>
                                                <TimelineCategory
                                                    title={category.title}
                                                    icon={category.icon}
                                                    bullets={category.bullets}
                                                    highlight={category.highlight}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </TimelinePhase>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
