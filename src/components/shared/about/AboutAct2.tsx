import { useTranslations } from 'next-intl';

import { ABOUT_STATS } from '@/config/about';
import { cn } from '@/lib/utils';

import { AnimatedCounter } from './AnimatedCounter';

/**
 * Acte 2 — l'idée + les chiffres. 2 colonnes sur desktop : texte à gauche,
 * grille de stats à droite (compteurs animés au scroll).
 */
export function AboutAct2() {
    const t = useTranslations('About.act2');

    return (
        <section
            aria-label={t('title')}
            className="bg-story-cream-deep text-story-ink px-4 py-16 sm:px-6 md:py-24"
        >
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col gap-5">
                    <h2 className="font-display text-3xl leading-tight font-bold text-balance md:text-4xl">
                        {t('titleBefore')}
                        <span className="text-primary">{t('titleHighlight')}</span>
                        {t('titleAfter')}
                    </h2>
                    <p className="text-foreground/90 max-w-[60ch] text-base leading-relaxed md:text-lg">
                        {t('p0')}
                    </p>
                    <p className="text-foreground/90 max-w-[60ch] text-base leading-relaxed md:text-lg">
                        {t('p1')}
                    </p>
                </div>

                <ul className="grid grid-cols-2 gap-4">
                    {ABOUT_STATS.map((stat, i) => (
                        <li
                            key={stat.labelKey}
                            className={cn(
                                'border-border flex flex-col items-center gap-2 rounded-2xl border bg-white/70 p-5 text-center shadow-sm',
                                // Balance : sur 3 stats, la 3e prend 2 colonnes pour éviter l'orphelin.
                                ABOUT_STATS.length === 3 && i === 2 && 'col-span-2',
                            )}
                        >
                            <span className="font-display text-primary text-4xl leading-none font-bold tabular-nums md:text-5xl">
                                <AnimatedCounter
                                    target={stat.target}
                                    duration={2}
                                    suffix={stat.suffix ?? ''}
                                    decimals={stat.decimals ?? 0}
                                />
                            </span>
                            <span className="text-muted-foreground max-w-[22ch] text-sm">
                                {t(`stats.${stat.labelKey}`)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
