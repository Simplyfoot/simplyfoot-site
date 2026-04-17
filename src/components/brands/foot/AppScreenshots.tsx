'use client';

import { useTranslations } from 'next-intl';

import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { PhoneShowcase, type PhoneShowcaseItem } from '@/components/shared/PhoneShowcase';
import { SectionBackground } from '@/components/shared/SectionBackground';

const screenshots = [
    { key: 'coach', src: '/brands/foot/app-coach.png' },
    { key: 'player', src: '/brands/foot/app-joueur.png' },
    { key: 'president', src: '/brands/foot/app-president.png' },
] as const satisfies ReadonlyArray<{ key: 'coach' | 'player' | 'president'; src: string }>;

export function AppScreenshots() {
    const t = useTranslations('foot.screenshots');
    const [first, second, third] = screenshots;

    const items: [PhoneShowcaseItem, PhoneShowcaseItem, PhoneShowcaseItem] = [
        { src: first.src, alt: t(first.key), label: t(first.key) },
        { src: second.src, alt: t(second.key), label: t(second.key) },
        { src: third.src, alt: t(third.key), label: t(third.key) },
    ];

    return (
        <SectionBackground sport="foot" tone="light">
            <div className="py-(--space-section-y)">
                <div className="container-simply">
                    <div className="mb-(--space-block) text-center">
                        <AnimatedTitle sport="foot">{t('title')}</AnimatedTitle>
                        <p className="text-body-fluid mx-auto mt-3 max-w-2xl text-balance text-muted-foreground">
                            {t('subtitle')}
                        </p>
                    </div>
                    <PhoneShowcase sport="foot" items={items} />
                </div>
            </div>
        </SectionBackground>
    );
}
