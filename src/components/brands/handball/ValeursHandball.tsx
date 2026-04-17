'use client';

import { motion } from 'framer-motion';
import { Brain, Flame, Target, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { SectionBackground } from '@/components/shared/SectionBackground';

const valeurItems: Array<{
    key: 'precision' | 'collective' | 'intensity' | 'mental';
    icon: ReactNode;
}> = [
    { key: 'precision', icon: <Target className="size-5" /> },
    { key: 'collective', icon: <Users className="size-5" /> },
    { key: 'intensity', icon: <Flame className="size-5" /> },
    { key: 'mental', icon: <Brain className="size-5" /> },
];

export function ValeursHandball() {
    const t = useTranslations('handball.valeurs');

    return (
        <SectionBackground sport="handball" tone="light">
            <div className="py-(--space-section-y)">
                <div className="container-simply">
                    <div className="mb-(--space-block) text-center">
                        <AnimatedTitle sport="handball">{t('title')}</AnimatedTitle>
                        <p className="text-body-fluid mx-auto mt-3 max-w-[60ch] text-balance text-muted-foreground">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {valeurItems.map((item, i) => (
                            <AnimatedCard key={item.key} sport="handball" index={i}>
                                <motion.div
                                    className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary"
                                    whileHover={{ rotate: 5 }}
                                    transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
                                >
                                    {item.icon}
                                </motion.div>
                                <h3 className="mt-2 font-display text-h4 font-semibold">
                                    {t(`${item.key}.title`)}
                                </h3>
                                <p className="text-small-fluid mt-2 max-w-[55ch] leading-relaxed text-muted-foreground">
                                    {t(`${item.key}.description`)}
                                </p>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>
            </div>
        </SectionBackground>
    );
}
