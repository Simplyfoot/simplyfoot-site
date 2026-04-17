'use client';

import { motion } from 'framer-motion';
import { Calendar, CalendarPlus, Heart, MessageCircle, Receipt, Send, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { SectionBackground } from '@/components/shared/SectionBackground';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    index: number;
    badge?: string;
    featured?: boolean;
    className?: string;
}

function FeatureCard({
    icon,
    title,
    description,
    index,
    badge,
    featured,
    className,
}: FeatureCardProps) {
    return (
        <AnimatedCard
            sport="foot"
            index={index}
            className={cn(
                featured && 'border-brand-primary/35 ring-1 ring-brand-primary/20',
                className,
            )}
        >
            <motion.div
                className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
                {icon}
            </motion.div>
            <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-h4 font-semibold">{title}</h3>
                {badge && (
                    <span className="inline-flex items-center rounded-full border border-brand-primary/30 bg-brand-primary/5 px-2 py-0.5 text-xs font-medium text-brand-primary">
                        {badge}
                    </span>
                )}
            </div>
            <p className="text-small-fluid mt-2 max-w-[55ch] leading-relaxed text-muted-foreground">
                {description}
            </p>
        </AnimatedCard>
    );
}

const featureKeys = [
    { key: 'convocations' as const, icon: <Send className="size-5" /> },
    { key: 'events' as const, icon: <CalendarPlus className="size-5" /> },
    { key: 'multiRole' as const, icon: <Users className="size-5" /> },
    { key: 'parents' as const, icon: <Heart className="size-5" /> },
    { key: 'messaging' as const, icon: <MessageCircle className="size-5" /> },
    { key: 'calendar' as const, icon: <Calendar className="size-5" /> },
];

export function FeaturesGrid() {
    const t = useTranslations('foot.features');

    return (
        <SectionBackground sport="foot" tone="tinted" withPattern>
            <div id="features" className="py-(--space-section-y)">
                <div className="container-simply">
                    <div className="mb-(--space-block) text-center">
                        <AnimatedTitle sport="foot" className="text-h2">
                            {t('title')}
                        </AnimatedTitle>
                        <p className="text-body-fluid mx-auto mt-3 max-w-[60ch] text-balance text-muted-foreground">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {featureKeys.map((feature, i) => (
                            <FeatureCard
                                key={feature.key}
                                icon={feature.icon}
                                title={t(`${feature.key}.title`)}
                                description={t(`${feature.key}.description`)}
                                index={i}
                            />
                        ))}
                        <FeatureCard
                            icon={<Receipt className="size-5" />}
                            title={t('accounting.title')}
                            description={t('accounting.description')}
                            badge={t('accounting.badge')}
                            index={featureKeys.length}
                            featured
                            className="lg:col-span-2 lg:row-span-1"
                        />
                    </div>
                </div>
            </div>
        </SectionBackground>
    );
}
