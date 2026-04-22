import { CircleCheck, Clock3, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ANNUAL_DISCOUNT, TRIAL_DAYS } from '@/config/offers';
import { cn } from '@/lib/utils';

interface OffersHeroProps {
    className?: string;
}

/**
 * Hero de la page Offres V2.1. Angle narratif : "logiciel qui rapporte",
 * matérialise immédiatement le différenciateur take-rate reversion. 3
 * pastilles de confiance (essai, remise annuelle, sans carte), aucun
 * toggle ni sélecteur ici — ils vivent dans le flux principal.
 */
export function OffersHero({ className }: OffersHeroProps) {
    const t = useTranslations('Offers.hero');

    return (
        <section
            aria-labelledby="offers-hero-title"
            className={cn('flex flex-col items-center gap-6 text-center', className)}
        >
            <span className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="size-3.5" aria-hidden />
                {t('eyebrow')}
            </span>

            <h1
                id="offers-hero-title"
                className="font-display text-foreground max-w-[24ch] text-4xl leading-[1.1] font-bold tracking-tight text-balance md:text-5xl lg:text-6xl"
            >
                {t('titleBefore')}
                <span className="text-primary">{t('titleHighlight')}</span>
                {t('titleAfter')}
            </h1>
            <p className="text-muted-foreground max-w-[58ch] text-lg leading-relaxed text-balance">
                {t('subtitle')}
            </p>

            <ul className="mt-2 flex flex-wrap items-center justify-center gap-2">
                <TrustPill
                    icon={<Clock3 className="size-3.5" aria-hidden />}
                    label={t('trustTrial', { days: TRIAL_DAYS })}
                />
                <TrustPill
                    icon={<CircleCheck className="size-3.5" aria-hidden />}
                    label={t('trustAnnual', { discount: Math.round(ANNUAL_DISCOUNT * 100) })}
                />
                <TrustPill label={t('trustNoCard')} />
            </ul>
        </section>
    );
}

function TrustPill({ icon, label }: { icon?: React.ReactNode; label: string }) {
    return (
        <li className="border-border bg-background text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium shadow-sm">
            {icon}
            {label}
        </li>
    );
}
