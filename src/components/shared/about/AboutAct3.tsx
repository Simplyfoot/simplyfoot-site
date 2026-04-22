import { useTranslations } from 'next-intl';

import { ABOUT_SHAPE } from '@/config/about';
import { range } from '@/lib/utils';

import { PilotClubsMarquee } from './PilotClubsMarquee';
import { QuoteCard } from './QuoteCard';

/**
 * Acte 3 — la section cruciale des 10 clubs pilotes.
 *
 * 1. Titre fort.
 * 2. Encadré premium centré avec la phrase choc "construit dans 10 vestiaires".
 * 3. Grille 2×2 de citations de clubs pilotes.
 * 4. Marquee des 10 logos/étiquettes de clubs.
 *
 * Toutes les citations sont en dur dans les messages (namespace
 * `About.act3.quotes.{0..3}`), structurées { text, author } pour garder la
 * paternité de la parole.
 */
export function AboutAct3() {
    const t = useTranslations('About.act3');
    const quotes = range(ABOUT_SHAPE.quoteCount);

    return (
        <section
            aria-label={t('title')}
            className="bg-secondary-50 text-story-ink px-4 py-16 sm:px-6 md:py-24"
        >
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
                <header className="flex flex-col items-center gap-4 text-center">
                    <h2 className="font-display text-3xl leading-tight font-bold text-balance md:text-4xl">
                        {t('titleBefore')}
                        <span className="text-primary">{t('titleHighlight')}</span>
                    </h2>
                    <p className="text-foreground/90 max-w-[60ch] text-base leading-relaxed md:text-lg">
                        {t('intro')}
                    </p>
                </header>

                <blockquote className="border-primary bg-story-cream-light mx-auto max-w-[55ch] rounded-2xl border-2 p-8 text-center shadow-[0_10px_40px_-15px_color-mix(in_srgb,var(--primary-700)_25%,transparent)]">
                    <p className="font-display text-primary text-2xl leading-snug font-semibold text-balance md:text-3xl">
                        {t('heroQuote')}
                    </p>
                </blockquote>

                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {quotes.map((i) => (
                        <li key={i}>
                            <QuoteCard index={i} />
                        </li>
                    ))}
                </ul>

                <div className="flex flex-col items-center gap-4">
                    <PilotClubsMarquee className="w-full" />
                    <p className="text-muted-foreground max-w-[60ch] text-center text-sm italic">
                        {t('thanks')}
                    </p>
                </div>
            </div>
        </section>
    );
}
