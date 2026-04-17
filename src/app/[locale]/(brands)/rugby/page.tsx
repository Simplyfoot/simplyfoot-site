import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CtaRugby } from '@/components/brands/rugby/CtaRugby';
import { FeaturesRugby } from '@/components/brands/rugby/FeaturesRugby';
import { HeroRugby } from '@/components/brands/rugby/HeroRugby';
import { RugbySpecificSection } from '@/components/brands/rugby/RugbySpecificSection';
import { ValeursRugby } from '@/components/brands/rugby/ValeursRugby';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { brandConfigs } from '@/lib/brand/config';
import { BrandProvider } from '@/lib/brand/context';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('rugby.meta');

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function RugbyPage() {
    return (
        <BrandProvider config={brandConfigs.rugby}>
            <ScrollProgress />
            <main>
                <section aria-label="Hero">
                    <HeroRugby />
                </section>

                <section aria-label="Valeurs">
                    <ValeursRugby />
                </section>

                <section aria-label="Fonctionnalités">
                    <FeaturesRugby />
                </section>

                <section aria-label="Spécificités rugby">
                    <RugbySpecificSection />
                </section>

                <section aria-label="Appel à l'action">
                    <CtaRugby />
                </section>
            </main>
        </BrandProvider>
    );
}
