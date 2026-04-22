import { useTranslations } from 'next-intl';

import { ABOUT_SHAPE } from '@/config/about';
import { range } from '@/lib/utils';

/**
 * Acte 4 — le manifeste. Rythme typographique délibérément alterné : 5
 * phrases courtes en grand, suivies d'un bloc première personne.
 * max-w-[55ch] (plus étroit que les autres sections) = plus intime.
 */
export function AboutManifesto() {
    const t = useTranslations('About.act4');
    const lines = range(ABOUT_SHAPE.manifestoLineCount);

    return (
        <section
            aria-label={t('title')}
            className="bg-secondary-50 text-story-ink px-4 py-20 sm:px-6 md:py-28"
        >
            <div className="mx-auto flex w-full max-w-[55ch] flex-col items-center gap-10 text-center">
                <h2 className="font-display text-3xl leading-tight font-bold text-balance md:text-4xl">
                    {t('titleBefore')}
                    <span className="text-primary">{t('titleHighlight')}</span>
                    {t('titleAfter')}
                </h2>

                <ul className="flex flex-col gap-6 text-balance">
                    {lines.map((i) => (
                        <li
                            key={i}
                            className="font-display text-foreground text-xl leading-snug font-semibold md:text-2xl"
                        >
                            {t(`lines.${i}`)}
                        </li>
                    ))}
                </ul>

                <div className="flex flex-col gap-3 pt-4">
                    <p className="font-display text-primary text-xl font-semibold md:text-2xl">
                        {t('firstPerson.heading')}
                    </p>
                    <p className="text-muted-foreground text-base leading-relaxed">
                        {t('firstPerson.body')}
                    </p>
                    <p className="text-foreground/90 text-base leading-relaxed">
                        {t('firstPerson.closing')}
                    </p>
                </div>
            </div>
        </section>
    );
}
