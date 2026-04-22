import { useTranslations } from 'next-intl';

import { AnimatedCounter } from '@/components/shared/about/AnimatedCounter';
import { FEATURES_STATS } from '@/config/features-foot';
import { cn } from '@/lib/utils';

import { SimoMascot } from './SimoMascot';

interface FeaturesPromiseProps {
    className?: string;
}

/**
 * Section "Solution globale". Titre fort, description courte, 4 chiffres
 * animés qui résument l'argumentaire en une ligne chacun, puis bulle SIMO
 * pour humaniser l'ensemble. Réutilise `<AnimatedCounter>` du About.
 */
export function FeaturesPromise({ className }: FeaturesPromiseProps) {
    const t = useTranslations('Features.solution');
    const tCommon = useTranslations('Common');

    return (
        <section
            id="features-promise"
            aria-labelledby="features-promise-heading"
            className={cn('flex flex-col items-center gap-10 text-center', className)}
        >
            <header className="flex max-w-[55ch] flex-col gap-3">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2
                    id="features-promise-heading"
                    className="font-display text-foreground text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl"
                >
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                    {t('description')}
                </p>
            </header>

            <ul className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
                {FEATURES_STATS.map((stat) => (
                    <li
                        key={stat.id}
                        className="border-border bg-card flex flex-col items-center gap-2 rounded-2xl border p-5 text-center shadow-sm"
                    >
                        <span className="font-display text-primary text-4xl leading-none font-bold tabular-nums md:text-5xl">
                            <AnimatedCounter
                                target={stat.target}
                                duration={1.6}
                                suffix={stat.suffix ?? ''}
                                decimals={stat.decimals ?? 0}
                            />
                        </span>
                        <span className="text-muted-foreground max-w-[22ch] text-sm leading-snug">
                            {t(`stats.${stat.id}`)}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="mt-2">
                <SimoMascot
                    pose="default"
                    alt={tCommon('simoAlt')}
                    bubble={t('simoBubble')}
                    bubbleSide="right"
                    sizeClassName="size-36 md:size-44"
                />
            </div>
        </section>
    );
}
