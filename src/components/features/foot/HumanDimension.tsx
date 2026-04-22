import { IdCard, Layers, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

interface HumanDimensionProps {
    className?: string;
}

const BLOCKS = [
    { id: 'simo', icon: Sparkles, accent: 'primary' as const },
    { id: 'passport', icon: IdCard, accent: 'info' as const },
    { id: 'card', icon: Layers, accent: 'warning' as const },
];

const ACCENT_CLASSES: Record<'primary' | 'info' | 'warning', string> = {
    primary: 'bg-primary/10 text-primary ring-primary/20',
    info: 'bg-info-100 text-info-700 ring-info-200',
    warning: 'bg-warning-100 text-warning-700 ring-warning-200',
};

/**
 * Section "dimension humaine" — rappel que SimplyFoot ne parle pas que de
 * gestion. Trois blocs courts autour de SIMO, du passeport joueur et de
 * la carte évolutive. Clôturé par une phrase en italique qui ancre
 * l'émotion avant la section preuve sociale.
 */
export function HumanDimension({ className }: HumanDimensionProps) {
    const t = useTranslations('Features.human');

    return (
        <section
            id="features-human"
            aria-labelledby="features-human-heading"
            className={cn('flex flex-col gap-10', className)}
        >
            <header className="flex max-w-[55ch] flex-col gap-3">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2
                    id="features-human-heading"
                    className="font-display text-foreground text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl"
                >
                    {t('heading')}
                </h2>
            </header>

            <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {BLOCKS.map(({ id, icon: Icon, accent }) => (
                    <li
                        key={id}
                        className="border-border bg-card flex flex-col gap-4 rounded-2xl border p-6 shadow-sm transition-colors hover:border-[color-mix(in_srgb,var(--primary-700)_35%,transparent)]"
                    >
                        <span
                            className={cn(
                                'flex size-12 items-center justify-center rounded-2xl ring-1',
                                ACCENT_CLASSES[accent],
                            )}
                        >
                            <Icon className="size-6" aria-hidden />
                        </span>
                        <h3 className="font-display text-foreground text-lg font-semibold">
                            {t(`items.${id}.title`)}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                            {t(`items.${id}.body`)}
                        </p>
                    </li>
                ))}
            </ul>

            <p className="font-display text-muted-foreground mx-auto max-w-[58ch] text-center text-base leading-relaxed text-balance italic md:text-lg">
                {t('closing')}
            </p>
        </section>
    );
}
