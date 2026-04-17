'use client';

import { Printer, Repeat, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { AnimatedTitle } from '@/components/shared/AnimatedTitle';

const PILLARS = [
    { key: 'primary' as const, icon: <ShoppingBag className="size-5" /> },
    { key: 'marketplace' as const, icon: <Repeat className="size-5" /> },
    { key: 'physical' as const, icon: <Printer className="size-5" /> },
];

export function CartesSection() {
    const t = useTranslations('foot.pricing.cardsSection');

    return (
        <section
            aria-label={t('title')}
            className="bg-[--brand-bg] px-(--space-section-x) py-(--space-section-y)"
        >
            <div className="container-simply flex flex-col items-center gap-(--space-block)">
                <div className="flex flex-col items-center gap-3 text-center">
                    <AnimatedTitle sport="foot" className="font-display text-h2">
                        {t('title')}
                    </AnimatedTitle>
                    <p className="text-body-fluid max-w-[60ch] text-balance text-muted-foreground">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                    {PILLARS.map((p, i) => (
                        <PillarCard
                            key={p.key}
                            icon={p.icon}
                            title={t(`${p.key}.title`)}
                            description={t(`${p.key}.description`)}
                            index={i}
                        />
                    ))}
                </div>

                <div className="text-small-fluid mt-6 inline-flex max-w-[65ch] items-center gap-3 rounded-full border border-brand-primary/25 bg-white/60 px-5 py-3 text-center text-muted-foreground">
                    <ShieldCheck
                        className="size-4 shrink-0 text-brand-primary"
                        aria-hidden="true"
                    />
                    <span>{t('reassurance')}</span>
                </div>
            </div>
        </section>
    );
}

interface PillarCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    index: number;
}

function PillarCard({ icon, title, description, index }: PillarCardProps) {
    return (
        <AnimatedCard sport="foot" index={index} className="h-full">
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                {icon}
            </div>
            <h3 className="font-display text-h4 font-semibold">{title}</h3>
            <p className="text-small-fluid mt-2 max-w-[55ch] leading-relaxed text-muted-foreground">
                {description}
            </p>
        </AnimatedCard>
    );
}
