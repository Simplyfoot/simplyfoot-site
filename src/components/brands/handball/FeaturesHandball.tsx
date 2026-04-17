'use client';

import { motion } from 'framer-motion';
import { Calendar, Layers, MessageCircle, Send, Trophy, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { SectionBackground } from '@/components/shared/SectionBackground';

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    index: number;
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
    return (
        <AnimatedCard sport="handball" index={index}>
            <motion.div
                className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
            >
                {icon}
            </motion.div>
            <h3 className="font-display text-h4 font-semibold">{title}</h3>
            <p className="text-small-fluid mt-2 max-w-[55ch] leading-relaxed text-muted-foreground">
                {description}
            </p>
        </AnimatedCard>
    );
}

const featureKeys = [
    { key: 'composition', icon: <Users className="size-5" /> },
    { key: 'convocations', icon: <Send className="size-5" /> },
    { key: 'categories', icon: <Layers className="size-5" /> },
    { key: 'tournaments', icon: <Trophy className="size-5" /> },
    { key: 'messaging', icon: <MessageCircle className="size-5" /> },
    { key: 'calendar', icon: <Calendar className="size-5" /> },
] as const;

export function FeaturesHandball() {
    const t = useTranslations('handball.features');

    return (
        <SectionBackground sport="handball" tone="tinted" withPattern>
            <div id="features" className="py-(--space-section-y)">
                <div className="container-simply">
                    <div className="mb-(--space-block) text-center">
                        <AnimatedTitle sport="handball">{t('title')}</AnimatedTitle>
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
                    </div>
                </div>
            </div>
        </SectionBackground>
    );
}
