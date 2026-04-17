import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CtaHandball } from '@/components/brands/handball/CtaHandball';
import { FeaturesHandball } from '@/components/brands/handball/FeaturesHandball';
import { HandballSpecificSection } from '@/components/brands/handball/HandballSpecificSection';
import { HeroHandball } from '@/components/brands/handball/HeroHandball';
import { ValeursHandball } from '@/components/brands/handball/ValeursHandball';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { brandConfigs } from '@/lib/brand/config';
import { BrandProvider } from '@/lib/brand/context';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('handball.meta');

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function HandballPage() {
    return (
        <BrandProvider config={brandConfigs.handball}>
            <ScrollProgress />
            <main>
                <section aria-label="Hero">
                    <HeroHandball />
                </section>

                <section aria-label="Valeurs">
                    <ValeursHandball />
                </section>

                <section aria-label="Fonctionnalités">
                    <FeaturesHandball />
                </section>

                <section aria-label="Spécificités handball">
                    <HandballSpecificSection />
                </section>

                <section aria-label="Appel à l'action">
                    <CtaHandball />
                </section>
            </main>
        </BrandProvider>
    );
}
