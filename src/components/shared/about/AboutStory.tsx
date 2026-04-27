import { useTranslations } from 'next-intl';

/**
 * Section narrative — l'histoire de SimplyFoot en 5 paragraphes, racontée
 * comme on la raconterait à voix haute. Pas de stats, pas de citations
 * empilées : juste le récit.
 */
export function AboutStory() {
    const t = useTranslations('About.story');

    return (
        <section
            aria-label={t('heading')}
            className="bg-background text-story-ink px-4 py-16 sm:px-6 md:py-24"
        >
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
                <header className="flex flex-col gap-3 text-center">
                    <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase">
                        {t('eyebrow')}
                    </p>
                    <h2 className="font-display text-3xl leading-tight font-bold text-balance md:text-4xl">
                        {t('headingBefore')}
                        <span className="text-primary">{t('headingHighlight')}</span>
                    </h2>
                </header>

                <div className="text-muted-foreground flex flex-col gap-5 text-base leading-relaxed md:text-lg">
                    <p>{t('p0')}</p>
                    <p>{t('p1')}</p>
                    <p>{t('p2')}</p>
                    <p>{t('p3')}</p>
                    <p className="text-foreground font-medium">{t('p4')}</p>
                </div>
            </div>
        </section>
    );
}
