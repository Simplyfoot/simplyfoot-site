import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { FaqPageContent } from '@/components/brands/foot/FaqPageContent';
import { brandConfigs } from '@/lib/brand/config';
import { BrandProvider } from '@/lib/brand/context';

const brand = brandConfigs.foot;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('foot.faqPage');
    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function FaqPage() {
    const t = await getTranslations('foot.faqPage');

    return (
        <BrandProvider config={brand}>
            <main>
                {/* Header */}
                <section
                    aria-label={t('title')}
                    className="bg-brand-bg px-(--space-section-x) py-(--space-section-y) text-center"
                >
                    <div className="container-simply flex flex-col items-center gap-(--space-element)">
                        <h1 className="font-display text-h1 font-bold text-brand-primary">
                            {t('title')}
                        </h1>
                        <p className="text-body-fluid mx-auto max-w-150 text-muted-foreground">
                            {t('subtitle')}
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section
                    aria-label="Questions fréquentes"
                    className="px-(--space-section-x) py-(--space-section-y)"
                >
                    <div className="container-narrow">
                        <FaqPageContent />
                    </div>
                </section>
            </main>
        </BrandProvider>
    );
}
