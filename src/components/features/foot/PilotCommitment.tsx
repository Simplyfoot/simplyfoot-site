import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn, range } from '@/lib/utils';

import { SimoMascot } from './SimoMascot';

interface PilotCommitmentProps {
    className?: string;
}

const BULLET_COUNT = 4;

/**
 * Manifeste de l'équipe — garanties pilotes (réinstallation unique,
 * cadence bi-mensuelle, écoute des clubs). Clôturé par une réplique SIMO
 * qui humanise le bloc. Pas de CTA ici : c'est le rôle du `<FeaturesFinalCta>`
 * juste après.
 */
export function PilotCommitment({ className }: PilotCommitmentProps) {
    const t = useTranslations('Features.pilot');
    const tCommon = useTranslations('Common');

    return (
        <section
            id="features-pilot"
            aria-labelledby="features-pilot-heading"
            className={cn(
                'bg-secondary-50 text-story-ink relative overflow-hidden rounded-3xl px-6 py-12 md:px-12 md:py-16',
                className,
            )}
        >
            <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-[1.3fr_1fr]">
                <div className="flex flex-col gap-5">
                    <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                        {t('eyebrow')}
                    </p>
                    <h2
                        id="features-pilot-heading"
                        className="font-display text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl"
                    >
                        {t('heading')}
                    </h2>
                    <p className="text-story-ink/80 max-w-[55ch] text-base leading-relaxed md:text-lg">
                        {t('intro')}
                    </p>
                    <ul className="mt-2 flex flex-col gap-3">
                        {range(BULLET_COUNT).map((i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="bg-primary/15 text-primary flex size-6 shrink-0 items-center justify-center rounded-full">
                                    <Check className="size-3.5" aria-hidden />
                                </span>
                                <span className="text-story-ink/90 text-sm leading-relaxed md:text-base">
                                    {t(`bullets.${i}`)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex justify-center md:justify-end">
                    <SimoMascot
                        pose="running"
                        alt={tCommon('simoAlt')}
                        bubble={t('simoBubble')}
                        bubbleSide="left"
                        sizeClassName="size-52 md:size-64"
                    />
                </div>
            </div>
        </section>
    );
}
