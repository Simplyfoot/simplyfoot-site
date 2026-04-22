import type { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { FeatureBadge } from '@/config/features-foot';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
    id: string;
    icon: LucideIcon;
    badge: FeatureBadge;
    highlight?: boolean;
    className?: string;
}

/** Couleurs du badge et de l'icône selon le statut. Mappées sur les tokens projet. */
const BADGE_STYLES: Record<FeatureBadge, { badge: string; iconWrap: string }> = {
    live: {
        badge: 'bg-primary/15 text-primary',
        iconWrap: 'bg-primary/10 text-primary',
    },
    soon: {
        badge: 'bg-warning-100 text-warning-700',
        iconWrap: 'bg-warning-100 text-warning-600',
    },
    signature: {
        badge: 'bg-primary text-primary-foreground',
        iconWrap: 'bg-primary/10 text-primary',
    },
    innovation: {
        badge: 'bg-info-100 text-info-800',
        iconWrap: 'bg-info-100 text-info-700',
    },
    priority: {
        badge: 'bg-story-forest text-secondary-50',
        iconWrap: 'bg-story-forest/10 text-story-forest',
    },
};

/**
 * Carte d'une fonctionnalité signature. Badge de statut en haut à droite,
 * icône teintée, titre, description. Version "highlight" = ring coloré
 * pour les fonctionnalités signature / innovation / priorité.
 */
export function FeatureCard({ id, icon: Icon, badge, highlight, className }: FeatureCardProps) {
    const t = useTranslations('Features.featuresList');
    const styles = BADGE_STYLES[badge];

    return (
        <article
            className={cn(
                'border-border bg-card relative flex h-full flex-col gap-3 rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg',
                highlight && badge === 'signature' && 'border-primary/50 ring-primary/10 ring-2',
                highlight && badge === 'innovation' && 'border-info-300 ring-info-200/40 ring-2',
                highlight &&
                    badge === 'priority' &&
                    'border-story-forest-glow/60 ring-story-forest-glow/20 ring-2',
                highlight && badge === 'soon' && 'border-warning-300 ring-warning-200/40 ring-2',
                className,
            )}
        >
            <span
                className={cn(
                    'absolute top-4 right-4 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase',
                    styles.badge,
                )}
            >
                {t(`badges.${badge}`)}
            </span>

            <span
                className={cn(
                    'flex size-11 items-center justify-center rounded-xl',
                    styles.iconWrap,
                )}
            >
                <Icon className="size-5" aria-hidden />
            </span>

            <h3 className="font-display text-foreground text-lg leading-tight font-semibold">
                {t(`items.${id}.title`)}
            </h3>
            <p className="text-muted-foreground max-w-[42ch] text-sm leading-relaxed">
                {t(`items.${id}.description`)}
            </p>
        </article>
    );
}
