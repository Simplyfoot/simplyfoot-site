import { CalendarDays, CalendarPlus, type LucideIcon, MessagesSquare, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

interface CurrentFeaturesListProps {
    className?: string;
}

interface FeatureDef {
    /** Clé i18n sous `Features.list.items.<id>`. */
    id: 'events' | 'calendar' | 'messaging' | 'roles';
    icon: LucideIcon;
}

const FEATURES: ReadonlyArray<FeatureDef> = [
    { id: 'events', icon: CalendarPlus },
    { id: 'calendar', icon: CalendarDays },
    { id: 'messaging', icon: MessagesSquare },
    { id: 'roles', icon: Users },
];

/**
 * Liste des fonctionnalités réellement disponibles aujourd'hui. Volontairement
 * concrète et brève : 4 cartes égales, une icône, un titre, deux phrases. Pas
 * de roadmap, pas de "bientôt", pas de différenciation marketing — la page
 * ne promet que ce qui est livré.
 *
 * Pour ajouter une fonctionnalité : étendre `FEATURES` ici et ajouter une
 * entrée sous `Features.list.items.<id>` dans les 3 fichiers i18n
 * (parité obligatoire).
 */
export function CurrentFeaturesList({ className }: CurrentFeaturesListProps) {
    const t = useTranslations('Features.list');
    const tItems = useTranslations('Features.list.items');

    return (
        <section
            id="features-list"
            aria-labelledby="features-list-heading"
            className={cn('bg-secondary-50 text-story-ink w-full scroll-mt-24', className)}
        >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-20 sm:px-6 md:py-24">
                <header className="flex max-w-[60ch] flex-col gap-3">
                    <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
                        {t('eyebrow')}
                    </p>
                    <h2
                        id="features-list-heading"
                        className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-bold tracking-tight text-balance"
                    >
                        {t('title')}
                    </h2>
                    <p className="text-story-ink/70 max-w-[55ch] text-base leading-relaxed md:text-lg">
                        {t('subtitle')}
                    </p>
                </header>

                <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                    {FEATURES.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <li key={feature.id} className="contents">
                                <article
                                    className="group bg-story-cream-light flex h-full flex-col gap-4 rounded-3xl p-6 shadow-[0_2px_12px_-6px_color-mix(in_srgb,var(--story-ink)_25%,transparent)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_color-mix(in_srgb,var(--story-ink)_55%,transparent)] md:p-8"
                                    aria-labelledby={`feature-${feature.id}-title`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <span
                                            aria-hidden
                                            className="bg-primary/10 text-primary inline-flex size-12 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105"
                                        >
                                            <Icon className="size-6" />
                                        </span>
                                        <span className="border-success-200 bg-success-50 text-success-700 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.65rem] font-bold tracking-wider uppercase">
                                            <span
                                                aria-hidden
                                                className="bg-success-500 size-1.5 rounded-full"
                                            />
                                            {t('availableBadge')}
                                        </span>
                                    </div>
                                    <h3
                                        id={`feature-${feature.id}-title`}
                                        className="font-display text-xl font-bold tracking-tight md:text-2xl"
                                    >
                                        {tItems(`${feature.id}.title`)}
                                    </h3>
                                    <p className="text-story-ink/75 text-base leading-relaxed">
                                        {tItems(`${feature.id}.description`)}
                                    </p>
                                </article>
                            </li>
                        );
                    })}
                </ul>

                <p className="text-story-ink/55 max-w-[60ch] text-sm leading-relaxed">
                    {t('footnote')}
                </p>
            </div>
        </section>
    );
}
