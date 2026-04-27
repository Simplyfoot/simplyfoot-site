import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import type { FounderConfig } from '~types/about.types';

interface FounderCardProps {
    founder: FounderConfig;
    className?: string;
}

/**
 * Carte cofondateur : photo ronde si disponible (Romain, Jean), sinon
 * avatar typographique (initiales sur dégradé vert) — cohérence visuelle
 * entre les deux modes via le ring blanc et les mêmes proportions.
 */
export function FounderCard({ founder, className }: FounderCardProps) {
    const t = useTranslations(`About.team.${founder.id}`);

    return (
        <article
            className={cn(
                'border-border bg-card flex h-full flex-col items-center rounded-2xl border p-6 text-center transition-all',
                'hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-lg',
                className,
            )}
        >
            {founder.photo ? (
                <div
                    className={cn(
                        'relative size-24 overflow-hidden rounded-full',
                        'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] ring-2 ring-white/70 ring-offset-2 ring-offset-transparent',
                    )}
                >
                    <Image
                        src={founder.photo}
                        alt={t('name')}
                        fill
                        sizes="96px"
                        className="object-cover"
                    />
                </div>
            ) : (
                <div
                    className={cn(
                        'flex size-24 items-center justify-center rounded-full bg-linear-to-br',
                        'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] ring-2 ring-white/70 ring-offset-2 ring-offset-transparent',
                        founder.gradient,
                    )}
                    aria-hidden
                >
                    <span className="font-display text-xl font-bold tracking-wider text-white">
                        {founder.initials}
                    </span>
                </div>
            )}
            <h3 className="font-display text-foreground mt-5 text-lg font-semibold">{t('name')}</h3>
            <p className="text-primary mt-1 text-xs font-semibold tracking-wider uppercase">
                {t('role')}
            </p>
            <p className="text-muted-foreground mt-4 max-w-[32ch] text-sm leading-relaxed italic">
                {t('spirit')}
            </p>
        </article>
    );
}
