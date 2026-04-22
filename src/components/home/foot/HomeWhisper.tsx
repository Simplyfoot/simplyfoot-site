'use client';

import { Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useInViewReveal } from '@/hooks/useInViewReveal';
import { cn } from '@/lib/utils';

interface HomeWhisperProps {
    className?: string;
}

/**
 * "Le constat" — section typographie seule. Aucune carte, aucune icône
 * decorative sauf un guillemet discret. La douleur est citée, la réponse
 * vient en contraste ("SimplyFoot existe pour ça.") dans la couleur
 * sage de la marque. Scroll-reveal simple sur la réponse pour le timing
 * émotionnel.
 *
 * Prolonge le fond `story-midnight` du hero sans couture visuelle, pour
 * que l'effet de bascule émotionnelle fonctionne.
 */
export function HomeWhisper({ className }: HomeWhisperProps) {
    const t = useTranslations('Home.whisper');
    const { ref, inView } = useInViewReveal<HTMLParagraphElement>({ threshold: 0.6 });

    return (
        <section
            id="home-whisper"
            aria-labelledby="home-whisper-heading"
            className={cn(
                'bg-story-midnight text-secondary-50 relative isolate flex min-h-[70vh] w-full items-center overflow-hidden',
                className,
            )}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--story-forest)_45%,transparent)_0%,transparent_65%)]"
            />
            <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-24 sm:px-6 md:gap-16 md:py-32">
                <p className="text-story-forest-glow text-xs font-semibold tracking-[0.3em] uppercase">
                    {t('eyebrow')}
                </p>

                <Quote className="text-story-forest-glow/60 size-10 md:size-14" aria-hidden />

                <blockquote
                    id="home-whisper-heading"
                    className="font-display text-secondary-50/95 max-w-[22ch] text-[clamp(1.75rem,5vw,3.5rem)] leading-[1.1] font-bold tracking-tight text-balance"
                >
                    {t('quote')}
                </blockquote>

                <p
                    ref={ref}
                    data-reveal={inView}
                    className={cn(
                        'text-story-forest-glow font-display text-[clamp(1.5rem,4.5vw,3rem)] leading-tight font-bold tracking-tight text-balance',
                        'transition-all duration-[900ms] ease-out motion-reduce:transition-none',
                        'data-[reveal=false]:translate-y-6 data-[reveal=false]:opacity-0',
                        'data-[reveal=true]:translate-y-0 data-[reveal=true]:opacity-100',
                    )}
                >
                    {t('response')}
                </p>
            </div>
        </section>
    );
}
