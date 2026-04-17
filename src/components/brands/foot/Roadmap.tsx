'use client';

import { CheckCircle, Gem, Loader, Rocket } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

type PhaseStatus = 'done' | 'inProgress' | 'soon' | 'planned';

interface PhaseConfig {
    icon: ReactNode;
    badgeClass: string;
}

const phaseConfigs: Record<PhaseStatus, PhaseConfig> = {
    done: {
        icon: <CheckCircle className="size-5" />,
        badgeClass: 'bg-green-100 text-green-800',
    },
    inProgress: {
        icon: <Loader className="size-5" />,
        badgeClass: 'bg-yellow-100 text-yellow-800',
    },
    soon: {
        icon: <Rocket className="size-5" />,
        badgeClass: 'bg-blue-100 text-blue-800',
    },
    planned: {
        icon: <Gem className="size-5" />,
        badgeClass: 'bg-purple-100 text-purple-800',
    },
};

const phaseKeys = ['phase1', 'phase2', 'phase3', 'phase4'] as const;

export function Roadmap() {
    const t = useTranslations('foot.roadmap');

    return (
        <div className="py-(--space-section-y)">
            <div className="container-simply">
                <div className="mb-(--space-block) text-center">
                    <h2 className="font-display text-h2 font-bold">{t('title')}</h2>
                    <p className="text-body-fluid mt-2 text-muted-foreground">{t('subtitle')}</p>
                </div>

                {/* Desktop: horizontal timeline */}
                <div className="hidden lg:block">
                    {/* Timeline line */}
                    <div className="relative mb-8 h-1 rounded-full bg-border">
                        <div className="absolute inset-y-0 left-0 w-1/4 rounded-full bg-brand-primary" />
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                        {phaseKeys.map((phaseKey) => {
                            const status = t(`${phaseKey}.status`) as PhaseStatus;
                            const config = phaseConfigs[status];
                            const items = t.raw(`${phaseKey}.items`) as string[];

                            return (
                                <div key={phaseKey} className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-caption font-medium ${config.badgeClass}`}
                                        >
                                            {config.icon}
                                            {t(`${phaseKey}.title`)}
                                        </span>
                                    </div>
                                    <ul className="space-y-2">
                                        {items.map((item) => (
                                            <li
                                                key={item}
                                                className="text-small-fluid flex items-start gap-2 text-muted-foreground"
                                            >
                                                <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-brand-primary/50" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile: vertical timeline */}
                <div className="lg:hidden">
                    <div className="relative border-l-2 border-brand-primary/30 pl-8">
                        {phaseKeys.map((phaseKey) => {
                            const status = t(`${phaseKey}.status`) as PhaseStatus;
                            const config = phaseConfigs[status];
                            const items = t.raw(`${phaseKey}.items`) as string[];

                            return (
                                <div key={phaseKey} className="relative pb-10 last:pb-0">
                                    {/* Dot on the line */}
                                    <div className="absolute top-0 -left-[calc(1rem+5px)] flex size-6 items-center justify-center rounded-full bg-brand-primary text-white">
                                        <span className="block size-2.5 rounded-full bg-white" />
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <span
                                            className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-caption font-medium ${config.badgeClass}`}
                                        >
                                            {config.icon}
                                            {t(`${phaseKey}.title`)}
                                        </span>

                                        <ul className="space-y-2">
                                            {items.map((item) => (
                                                <li
                                                    key={item}
                                                    className="text-small-fluid flex items-start gap-2 text-muted-foreground"
                                                >
                                                    <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-brand-primary/50" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
