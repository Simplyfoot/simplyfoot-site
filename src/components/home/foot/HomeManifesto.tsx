'use client';

import { useTranslations } from 'next-intl';

import { useInViewReveal } from '@/hooks/useInViewReveal';
import { cn, range } from '@/lib/utils';

interface HomeManifestoProps {
    className?: string;
}

const LINE_COUNT = 5;
/** La dernière ligne bascule sur un accent contrasté pour marquer la résolution. */
const RESOLUTION_INDEX = LINE_COUNT - 1;

/**
 * Manifesto — 5 lignes, un mot par ligne, typographie gigantesque. Fond
 * primary pour la bascule visuelle après la section whisper (noire).
 * Chaque ligne se révèle l'une après l'autre avec un léger décalage, ce
 * qui donne le rythme d'un serment.
 *
 * Les 4 premières lignes nomment un rôle, la 5e ("Une seule app.") est
 * la résolution, en couleur secondary-50 (cream) pour sortir du bain de
 * primary.
 */
export function HomeManifesto({ className }: HomeManifestoProps) {
    const t = useTranslations('Home.manifesto');

    return (
        <section
            id="home-manifesto"
            aria-label="Manifesto SimplyFoot"
            className={cn(
                'bg-primary text-primary-foreground relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden',
                className,
            )}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--primary-200)_15%,transparent)_0%,transparent_70%)]"
            />
            <ol className="relative mx-auto flex w-full max-w-6xl flex-col gap-0 px-4 py-24 text-center font-[var(--font-display,inherit)] sm:px-6">
                {range(LINE_COUNT).map((i) => (
                    <ManifestoLine key={i} index={i} text={t(`lines.${i}`)} />
                ))}
            </ol>
        </section>
    );
}

function ManifestoLine({ index, text }: { index: number; text: string }) {
    const { ref, inView } = useInViewReveal<HTMLLIElement>({ threshold: 0.5 });
    const isResolution = index === RESOLUTION_INDEX;

    return (
        <li
            ref={ref}
            data-reveal={inView}
            style={{ transitionDelay: `${index * 80}ms` }}
            className={cn(
                'font-display block text-[clamp(2.5rem,11vw,9rem)] leading-[1] font-bold tracking-tighter text-balance',
                'transition-all duration-700 ease-out motion-reduce:transition-none',
                'data-[reveal=false]:translate-y-6 data-[reveal=false]:opacity-0',
                'data-[reveal=true]:translate-y-0 data-[reveal=true]:opacity-100',
                isResolution && 'text-secondary-50 mt-6 md:mt-10',
            )}
        >
            {text}
        </li>
    );
}
