import {
    Building2,
    Calendar,
    ClipboardList,
    FileText,
    LayoutDashboard,
    LineChart,
    type LucideIcon,
    MessageSquare,
    Send,
    Users,
    UserSquare2,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { BENEFIT_KEYS, type BenefitKey } from '@/config/offers';
import { cn } from '@/lib/utils';

interface BenefitsSectionProps {
    className?: string;
}

const BENEFIT_ICONS: Record<BenefitKey, LucideIcon> = {
    clubManagement: Building2,
    convocations: Send,
    lineups: Users,
    calendar: Calendar,
    messaging: MessageSquare,
    playerTracking: UserSquare2,
    coachDashboard: LayoutDashboard,
    documents: FileText,
    parents: ClipboardList,
    statistics: LineChart,
};

/**
 * Grille des bénéfices produit. Vend l'impact concret (gain de temps,
 * organisation, pro) plutôt que la liste à la Pokémon. Chaque carte a son
 * icône, un titre d'usage et une description courte, le tout en i18n.
 */
export function BenefitsSection({ className }: BenefitsSectionProps) {
    const t = useTranslations('Offers.benefits');

    return (
        <section aria-label={t('heading')} className={cn('flex flex-col gap-8', className)}>
            <header className="max-w-[55ch] space-y-3">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2 className="font-display text-foreground text-3xl font-bold tracking-tight text-balance md:text-4xl">
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">{t('intro')}</p>
            </header>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {BENEFIT_KEYS.map((key) => {
                    const Icon = BENEFIT_ICONS[key];
                    return (
                        <li
                            key={key}
                            className="border-border bg-card hover:border-primary/30 group flex flex-col gap-3 rounded-2xl border p-5 transition-colors"
                        >
                            <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl transition-transform group-hover:scale-105">
                                <Icon className="size-5" aria-hidden />
                            </span>
                            <h3 className="font-display text-foreground text-base font-semibold">
                                {t(`items.${key}.title`)}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {t(`items.${key}.description`)}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
