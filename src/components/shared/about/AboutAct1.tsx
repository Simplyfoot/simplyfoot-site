import { useTranslations } from 'next-intl';

import { ABOUT_SHAPE } from '@/config/about';
import { range } from '@/lib/utils';

/**
 * Acte 1 — le constat. 5 paragraphes narratifs sur fond beige. Texte centré
 * max-w-[65ch] pour une lecture confortable. Pas d'animation scroll : la
 * page reste server-rendue, sobre et instantanée.
 */
export function AboutAct1() {
    const t = useTranslations('About.act1');
    const paragraphs = range(ABOUT_SHAPE.act1ParagraphCount);

    return (
        <section
            aria-label={t('title')}
            className="bg-secondary-50 text-story-ink px-4 py-16 sm:px-6 md:py-24"
        >
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 text-center">
                <h2 className="font-display text-3xl leading-tight font-bold text-balance md:text-4xl">
                    {t('titleBefore')}
                    <span className="text-primary">{t('titleHighlight')}</span>
                </h2>
                <div className="mt-4 flex flex-col gap-5 text-left">
                    {paragraphs.map((i) => (
                        <p
                            key={i}
                            className="text-foreground/90 max-w-[65ch] text-base leading-relaxed md:text-lg"
                        >
                            {t(`p${i}`)}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
