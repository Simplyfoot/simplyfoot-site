import { useTranslations } from 'next-intl';

import { FOUNDERS } from '@/config/about';

import { FounderCard } from './FounderCard';

/**
 * Section équipe — les 5 cofondateurs au même rang éditorial. Photos pour
 * Romain et Jean, avatar typographique pour les autres en attendant les
 * leurs (le rendu reste cohérent dans les deux cas).
 */
export function AboutTeam() {
    const t = useTranslations('About.team');

    return (
        <section
            aria-label={t('heading')}
            className="bg-story-cream-deep text-story-ink px-4 py-16 sm:px-6 md:py-24"
        >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
                <header className="flex max-w-[55ch] flex-col gap-3 self-center text-center">
                    <h2 className="font-display text-3xl leading-tight font-bold text-balance md:text-4xl">
                        {t('headingBefore')}
                        <span className="text-primary">{t('headingHighlight')}</span>
                    </h2>
                    <p className="text-muted-foreground text-base leading-relaxed">{t('intro')}</p>
                </header>

                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {FOUNDERS.map((founder) => (
                        <li key={founder.id}>
                            <FounderCard founder={founder} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
