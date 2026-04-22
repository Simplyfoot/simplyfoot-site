import { Gift, HeartHandshake, type LucideIcon, Rocket, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { TRIAL_DAYS } from '@/config/offers';
import { cn } from '@/lib/utils';

interface TrustStripProps {
    className?: string;
}

/**
 * Bloc de confiance condensé — fusion des anciens `AllIncludedBanner`,
 * `BenefitsSection` et `ReassuranceSection`. Porte le message central
 * "tout est inclus, tous les plans" en une phrase, puis les 4 piliers de
 * rassurance sous forme de pastilles courtes (titres uniquement).
 *
 * Le but CRO est de ramener la charge de lecture de la zone sous la grille
 * de prix à un seul écran visuel, sans perdre les signaux de confiance
 * essentiels (essai, engagement, mise en route, sécurité).
 */
export function TrustStrip({ className }: TrustStripProps) {
    const t = useTranslations('Offers.trust');

    const pillars: Array<{ icon: LucideIcon; label: string }> = [
        { icon: Gift, label: t('trial', { days: TRIAL_DAYS }) },
        { icon: HeartHandshake, label: t('noCommit') },
        { icon: Rocket, label: t('setup') },
        { icon: ShieldCheck, label: t('security') },
    ];

    return (
        <section
            aria-label={t('heading')}
            className={cn(
                'bg-primary/5 ring-primary/15 rounded-3xl px-6 py-10 text-center ring-1 md:px-12 md:py-12',
                className,
            )}
        >
            <h2 className="font-display text-foreground text-2xl font-bold tracking-tight text-balance md:text-3xl">
                {t('heading')}
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-[56ch] text-sm leading-relaxed md:text-base">
                {t('description')}
            </p>

            <ul className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
                {pillars.map(({ icon: Icon, label }) => (
                    <li
                        key={label}
                        className="bg-background/70 border-border flex items-center gap-3 rounded-xl border p-3 text-left"
                    >
                        <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
                            <Icon className="size-4" aria-hidden />
                        </span>
                        <span className="text-foreground text-sm leading-snug font-medium">
                            {label}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
