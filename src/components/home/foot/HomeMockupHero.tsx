'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { useInViewReveal } from '@/hooks/useInViewReveal';
import { cn } from '@/lib/utils';

interface HomeMockupHeroProps {
    className?: string;
}

/**
 * UNE seule image — Accueil Joueur (main tenant l'iPhone), l'asset le
 * plus iconique du catalogue. Caption courte au-dessus, footnote
 * discrète en dessous. Fond cream (`secondary-50`) pour la bascule après
 * le manifesto vert.
 *
 * Le mockup occupe majoritairement le viewport. Reveal IO pour une
 * arrivée par le bas avec scale subtil, comme une photographie posée.
 */
export function HomeMockupHero({ className }: HomeMockupHeroProps) {
    const t = useTranslations('Home.mockupHero');
    const { ref, inView } = useInViewReveal<HTMLDivElement>({ threshold: 0.2 });

    return (
        <section
            id="home-mockup-hero"
            aria-labelledby="home-mockup-hero-heading"
            className={cn(
                'bg-secondary-50 text-story-ink relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-6',
                className,
            )}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--secondary-100)_35%,transparent)_0%,transparent_60%)]"
            />

            <div className="relative flex flex-col items-center gap-8 text-center">
                <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
                    {t('eyebrow')}
                </p>
                <h2
                    id="home-mockup-hero-heading"
                    className="font-display max-w-[20ch] text-[clamp(2.5rem,7vw,5rem)] leading-[1] font-bold tracking-tight text-balance"
                >
                    {t('caption')}
                </h2>

                <div
                    ref={ref}
                    data-reveal={inView}
                    className={cn(
                        'relative mt-6 h-[60vh] max-h-[780px] w-full max-w-[360px] shrink-0',
                        'transition-all duration-1000 ease-out motion-reduce:transition-none',
                        'data-[reveal=false]:translate-y-14 data-[reveal=false]:scale-95 data-[reveal=false]:opacity-0',
                        'data-[reveal=true]:translate-y-0 data-[reveal=true]:scale-100 data-[reveal=true]:opacity-100',
                    )}
                >
                    <Image
                        src="/images/Accueil Joueur.png"
                        alt={t('mockupAlt')}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 320px, 260px"
                        className="object-contain drop-shadow-[0_60px_80px_rgba(0,0,0,0.35)]"
                        priority={false}
                    />
                </div>

                <p className="text-story-ink/60 max-w-[42ch] text-xs leading-relaxed tracking-wide">
                    {t('footnote')}
                </p>
            </div>
        </section>
    );
}
