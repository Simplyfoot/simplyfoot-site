import { Check, Infinity as InfinityIcon, Shield, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

interface AllIncludedBannerProps {
    className?: string;
}

/**
 * Bandeau rassurant : "toutes les fonctionnalités incluses, quel que soit le
 * plan". Pose le message central du pricing SimplyFoot et désamorce la
 * confusion classique des tableaux de comparaison SaaS.
 */
export function AllIncludedBanner({ className }: AllIncludedBannerProps) {
    const t = useTranslations('Offers.allIncluded');

    return (
        <section
            aria-label={t('heading')}
            className={cn(
                'bg-primary/5 ring-primary/15 relative overflow-hidden rounded-3xl px-6 py-10 text-center ring-1 md:px-12 md:py-14',
                className,
            )}
        >
            <div
                aria-hidden
                className="bg-primary/[0.08] pointer-events-none absolute -inset-32 -z-10 rounded-full blur-3xl"
            />

            <span className="bg-primary/15 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                <Check className="size-3.5" aria-hidden />
                {t('eyebrow')}
            </span>

            <h2 className="font-display text-foreground mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl">
                {t('heading')}
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-[60ch] text-base leading-relaxed">
                {t('description')}
            </p>

            <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
                <Pillar
                    icon={<InfinityIcon className="size-5" aria-hidden />}
                    label={t('pillars.0')}
                />
                <Pillar icon={<Zap className="size-5" aria-hidden />} label={t('pillars.1')} />
                <Pillar icon={<Shield className="size-5" aria-hidden />} label={t('pillars.2')} />
            </ul>
        </section>
    );
}

function Pillar({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <li className="bg-background/70 border-border flex items-center gap-3 rounded-2xl border p-4 text-left">
            <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                {icon}
            </span>
            <span className="text-foreground text-sm leading-snug font-medium">{label}</span>
        </li>
    );
}
