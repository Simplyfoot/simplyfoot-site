'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { PhoneFrame } from '@/components/shared/PhoneFrame';
import { useInViewReveal } from '@/hooks/useInViewReveal';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface HomeRoleTriptychProps {
    className?: string;
}

const ROLES = [
    {
        id: 'president' as const,
        mockup: '/images/Accueil President.png',
        accent: 'text-primary',
        rotation: 'rotate-[-3deg]',
    },
    {
        id: 'coach' as const,
        mockup: '/images/Accueil Coach.png',
        accent: 'text-info-600',
        rotation: 'rotate-[0deg]',
    },
    {
        id: 'player' as const,
        mockup: '/images/Accueil Joueur.png',
        accent: 'text-warning-600',
        rotation: 'rotate-[3deg]',
    },
];

/**
 * Triptyque façon expo — 3 mockups posés horizontalement (ligne en
 * desktop, scroll-snap horizontal en mobile). Chaque mockup est un
 * "poster" minimaliste : libellé du rôle + une ligne, rien d'autre. Les
 * détails vivent sur /foot/features.
 *
 * Aucune case à cocher, aucune bulle SIMO, aucun bullet. L'objectif est
 * "reconnaître" et cliquer vers les fonctionnalités pour approfondir.
 */
export function HomeRoleTriptych({ className }: HomeRoleTriptychProps) {
    const t = useTranslations('Home.triptych');
    const { ref, inView } = useInViewReveal<HTMLElement>({ threshold: 0.15 });

    return (
        <section
            ref={ref}
            id="home-triptych"
            aria-labelledby="home-triptych-heading"
            data-reveal={inView}
            className={cn(
                'bg-background text-foreground relative isolate flex w-full flex-col items-center gap-14 px-4 py-24 sm:px-6 md:gap-20 md:py-32',
                'transition-opacity duration-700 ease-out motion-reduce:transition-none',
                'data-[reveal=false]:opacity-0 data-[reveal=true]:opacity-100',
                className,
            )}
        >
            <header className="flex max-w-[55ch] flex-col items-center gap-3 text-center">
                <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
                    {t('eyebrow')}
                </p>
                <h2
                    id="home-triptych-heading"
                    className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight font-bold tracking-tight text-balance"
                >
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground max-w-[55ch] text-base leading-relaxed md:text-lg">
                    {t('intro')}
                </p>
            </header>

            <ul
                className={cn(
                    'flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:px-0 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:pb-0',
                )}
            >
                {ROLES.map((role, index) => (
                    <li
                        key={role.id}
                        className="relative flex w-[260px] shrink-0 snap-center flex-col items-center gap-5 md:w-auto"
                        style={{ transitionDelay: `${index * 120}ms` }}
                    >
                        <PhoneFrame
                            src={role.mockup}
                            alt={t(`roles.${role.id}.mockupAlt`)}
                            size="md"
                            rotation={role.rotation}
                        />
                        <div className="flex flex-col items-center gap-1.5 text-center">
                            <p
                                className={cn(
                                    'font-mono text-[11px] font-semibold tracking-[0.35em] uppercase',
                                    role.accent,
                                )}
                            >
                                {t(`roles.${role.id}.label`)}
                            </p>
                            <p className="font-display text-foreground text-lg leading-snug font-semibold text-balance md:text-xl">
                                {t(`roles.${role.id}.lede`)}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>

            <Link
                href="/foot/features"
                className="text-primary hover:text-primary/80 focus-visible:ring-primary group inline-flex items-center gap-2 rounded-full text-sm font-semibold focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none md:text-base"
            >
                {t('linkLabel')}
                <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                />
            </Link>
        </section>
    );
}
