'use client';

import { Flag, Shield, Trophy } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import { SimoMascot } from './SimoMascot';
import { WaitlistForm } from './WaitlistForm';

const InnovationPlanet = dynamic(
    () => import('./InnovationPlanet').then((m) => m.InnovationPlanet),
    { ssr: false, loading: () => null },
);

interface InnovationTeaserProps {
    className?: string;
}

/**
 * Section "teasing innovation" — la pièce mystérieuse. Fond noir profond,
 * planète 3D qui tourne lentement avec rim lights contrastés, titre
 * imposant, paragraphe évocateur, formulaire waitlist et trois badges de
 * rassurance. Différent du reste de la page pour signaler "ceci est
 * important".
 *
 * L'innovation elle-même n'est **pas** nommée — on crée l'envie, pas le
 * flou. Voir la stratégie dans le brief V3 (`innovation_tease`).
 */
export function InnovationTeaser({ className }: InnovationTeaserProps) {
    const t = useTranslations('Features.innovation');
    const tCommon = useTranslations('Common');

    return (
        <section
            id="features-innovation"
            aria-labelledby="features-innovation-heading"
            className={cn(
                'bg-story-midnight relative isolate overflow-hidden rounded-3xl px-6 py-16 text-white md:px-12 md:py-24',
                className,
            )}
        >
            <InnovationPlanet ariaLabel={t('heading')} />

            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,color-mix(in_srgb,var(--story-midnight)_65%,transparent)_55%,var(--story-midnight)_100%)]"
            />

            <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
                <div className="flex flex-col gap-6">
                    <span className="border-story-forest-glow/40 bg-story-forest-glow/10 text-story-forest-glow inline-flex w-max items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                        {t('eyebrow')}
                    </span>

                    <h2
                        id="features-innovation-heading"
                        className="font-display text-3xl leading-[1.1] font-bold tracking-tight text-balance md:text-5xl"
                    >
                        {t('heading')}
                    </h2>

                    <p className="text-story-forest-glow max-w-[48ch] text-base leading-relaxed md:text-lg">
                        {t('subtitle')}
                    </p>

                    <p className="max-w-[54ch] text-sm leading-relaxed text-white/75 md:text-base">
                        {t('body')}
                    </p>

                    <SimoMascot
                        pose="default"
                        alt={tCommon('simoAlt')}
                        bubble={t('simoBubble')}
                        bubbleSide="right"
                        sizeClassName="size-32 md:size-40"
                        bubbleClassName="bg-white/95 text-foreground"
                    />
                </div>

                <div className="flex flex-col gap-6">
                    <div className="border-story-forest-glow/30 rounded-3xl border bg-white/5 p-6 backdrop-blur-md md:p-8">
                        <h3 className="font-display text-lg font-bold md:text-xl">
                            {t('formHeading')}
                        </h3>
                        <div className="mt-4">
                            <WaitlistForm />
                        </div>
                    </div>

                    <ul className="flex flex-wrap gap-2 text-xs">
                        <TrustBadge icon={<Flag className="size-3.5" aria-hidden />}>
                            {t('trust.france')}
                        </TrustBadge>
                        <TrustBadge icon={<Shield className="size-3.5" aria-hidden />}>
                            {t('trust.rgpd')}
                        </TrustBadge>
                        <TrustBadge icon={<Trophy className="size-3.5" aria-hidden />}>
                            {t('trust.amateur')}
                        </TrustBadge>
                    </ul>
                </div>
            </div>
        </section>
    );
}

function TrustBadge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <li className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-medium text-white/80">
            {icon}
            {children}
        </li>
    );
}
