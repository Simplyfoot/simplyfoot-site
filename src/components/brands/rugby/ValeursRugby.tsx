'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { SectionBackground } from '@/components/shared/SectionBackground';

const valeurItems = [
    { key: 'solidarity' as const, emoji: '\u{1F91D}' },
    { key: 'combat' as const, emoji: '\u{1F4AA}' },
    { key: 'respect' as const, emoji: '\u{1F3C6}' },
    { key: 'conviviality' as const, emoji: '\u{1F37B}' },
];

export function ValeursRugby() {
    const t = useTranslations('rugby.valeurs');

    return (
        <SectionBackground sport="rugby" tone="light">
            <div className="py-(--space-section-y)">
                <div className="container-simply">
                    <div className="mb-(--space-block) text-center">
                        <AnimatedTitle sport="rugby">{t('title')}</AnimatedTitle>
                        <p className="text-body-fluid mx-auto mt-3 max-w-[60ch] text-balance text-muted-foreground">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {valeurItems.map((item, i) => (
                            <AnimatedCard key={item.key} sport="rugby" index={i}>
                                <motion.span
                                    className="block text-h2"
                                    aria-hidden="true"
                                    whileHover={{ x: [0, -4, 4, -2, 2, 0] }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                >
                                    {item.emoji}
                                </motion.span>
                                <h3 className="mt-3 font-display text-h4 font-semibold">
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
