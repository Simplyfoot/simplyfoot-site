import { Gift, HeartHandshake, Rocket, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { TRIAL_DAYS } from '@/config/offers';
import { cn } from '@/lib/utils';

interface ReassuranceSectionProps {
    className?: string;
}

/**
 * Bloc rassurance "avant l'achat" — essai gratuit, zéro engagement, support
 * humain, sécurité. Chaque pilier = une carte avec icône + titre + phrase
 * courte. Placé avant la FAQ pour lever les objections basiques.
 */
export function ReassuranceSection({ className }: ReassuranceSectionProps) {
    const t = useTranslations('Offers.reassurance');

    const pillars = [
        {
            icon: Gift,
            title: t('trial.title', { days: TRIAL_DAYS }),
            body: t('trial.body'),
        },
        { icon: HeartHandshake, title: t('noCommit.title'), body: t('noCommit.body') },
        { icon: Rocket, title: t('setup.title'), body: t('setup.body') },
        { icon: ShieldCheck, title: t('security.title'), body: t('security.body') },
    ] as const;

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

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {pillars.map(({ icon: Icon, title, body }) => (
                    <li
                        key={title}
                        className="border-border bg-card flex flex-col gap-3 rounded-2xl border p-5"
                    >
                        <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
                            <Icon className="size-5" aria-hidden />
                        </span>
                        <h3 className="font-display text-foreground text-base font-semibold">
                            {title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
