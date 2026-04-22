import {
    Calculator,
    FileWarning,
    LayoutDashboard,
    type LucideIcon,
    MapPinOff,
    MessageSquareDashed,
    Wallet,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { PROBLEM_ITEMS } from '@/config/features-foot';
import { cn } from '@/lib/utils';

const ICONS: Record<string, LucideIcon> = {
    MessageSquareDashed,
    LayoutDashboard,
    FileWarning,
    MapPinOff,
    Calculator,
    Wallet,
};

interface ProblemSectionProps {
    className?: string;
}

/**
 * Section "empathie" — 6 cartes de douleurs concrètes du quotidien d'un
 * club amateur, suivies d'une phrase de transition qui pose SimplyFoot
 * comme la réponse. Ton chaleureux, pas moqueur : "on connaît".
 */
export function ProblemSection({ className }: ProblemSectionProps) {
    const t = useTranslations('Features.problem');

    return (
        <section
            id="features-problem"
            aria-labelledby="features-problem-heading"
            className={cn('flex flex-col gap-10', className)}
        >
            <header className="flex max-w-[55ch] flex-col gap-3">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2
                    id="features-problem-heading"
                    className="font-display text-foreground text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl"
                >
                    {t('heading')}
                </h2>
            </header>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PROBLEM_ITEMS.map((item) => {
                    const Icon = ICONS[item.icon] ?? MessageSquareDashed;
                    return (
                        <li
                            key={item.id}
                            className="border-border bg-card flex flex-col gap-3 rounded-2xl border p-5 shadow-sm transition-colors hover:border-[color-mix(in_srgb,var(--primary-700)_35%,transparent)]"
                        >
                            <span className="bg-warning-100 text-warning-700 flex size-10 items-center justify-center rounded-xl">
                                <Icon className="size-5" aria-hidden />
                            </span>
                            <h3 className="font-display text-foreground text-base font-semibold">
                                {t(`items.${item.id}.title`)}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed italic">
                                {t(`items.${item.id}.body`)}
                            </p>
                        </li>
                    );
                })}
            </ul>

            <p className="font-display text-foreground mx-auto max-w-[50ch] text-center text-lg leading-relaxed text-balance md:text-xl">
                {t('transition')}
            </p>
        </section>
    );
}
