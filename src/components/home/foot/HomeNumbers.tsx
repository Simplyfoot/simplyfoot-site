'use client';

import { useTranslations } from 'next-intl';

import { useInViewReveal } from '@/hooks/useInViewReveal';
import { cn, range } from '@/lib/utils';

interface HomeNumbersProps {
    className?: string;
}

const COUNT = 3;

/**
 * Section "chiffres cinémas" — 3 pages verticales enchaînées. Chaque
 * chiffre prend toute la hauteur du viewport, posé gigantesque au
 * centre, suivi d'une caption courte. Alternance fond `story-forest` /
 * `story-forest-glow` tinté pour le rythme visuel.
 *
 * Inspiré des séquences Apple où chaque scroll révèle un slogan plein
 * écran — ici on fait pareil avec des chiffres, ça évite les longs
 * paragraphes et ça imprime la cadence "15 / 4 / 1" dans l'esprit.
 */
export function HomeNumbers({ className }: HomeNumbersProps) {
    const t = useTranslations('Home.numbers');

    return (
        <section
            id="home-numbers"
            aria-labelledby="home-numbers-heading"
            className={cn('bg-story-forest text-secondary-50', className)}
        >
            <h2 id="home-numbers-heading" className="sr-only">
                {t('eyebrow')}
            </h2>
            {range(COUNT).map((i) => (
                <NumberScene key={i} index={i} />
            ))}
        </section>
    );
}

function NumberScene({ index }: { index: number }) {
    const t = useTranslations('Home.numbers');
    const { ref, inView } = useInViewReveal<HTMLDivElement>({ threshold: 0.4 });
    const isEven = index % 2 === 0;

    return (
        <div
            className={cn(
                'relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-24 sm:px-6',
                !isEven && 'bg-[color-mix(in_srgb,var(--story-forest)_85%,black)]',
            )}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--story-forest-glow)_20%,transparent)_0%,transparent_60%)]"
            />
            <div
                ref={ref}
                data-reveal={inView}
                className={cn(
                    'relative mx-auto flex max-w-4xl flex-col items-center gap-6 text-center',
                    'transition-all duration-[900ms] ease-out motion-reduce:transition-none',
                    'data-[reveal=false]:translate-y-8 data-[reveal=false]:opacity-0',
                    'data-[reveal=true]:translate-y-0 data-[reveal=true]:opacity-100',
                )}
            >
                <p className="text-story-forest-glow/70 text-[11px] font-semibold tracking-[0.4em] uppercase">
                    {String(index + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
                </p>

                <div className="flex items-end justify-center gap-3 md:gap-5">
                    <span className="font-display text-[clamp(9rem,28vw,22rem)] leading-[0.85] font-bold tracking-tighter tabular-nums">
                        {t(`items.${index}.figure`)}
                    </span>
                    <span className="text-story-forest-glow font-display mb-4 text-[clamp(1.5rem,4vw,3rem)] leading-tight font-semibold tracking-tight md:mb-8">
                        {t(`items.${index}.label`)}
                    </span>
                </div>

                <p className="text-secondary-50/80 max-w-[38ch] text-base leading-relaxed md:text-lg">
                    {t(`items.${index}.caption`)}
                </p>
            </div>
        </div>
    );
}
