import { CreditCard, Mail, RefreshCw } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CartesSection } from '@/components/brands/foot/CartesSection';
import { CompetitorTable } from '@/components/brands/foot/CompetitorTable';
import { PricingSelector } from '@/components/brands/foot/PricingSelector';
import { brandConfigs } from '@/lib/brand/config';
import { BrandProvider } from '@/lib/brand/context';

const brand = brandConfigs.foot;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('foot.pricing');
    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

const REASSURANCE_ITEMS = [
    { key: 'reassurance.noCreditCard' as const, icon: CreditCard },
    { key: 'reassurance.updates' as const, icon: RefreshCw },
    { key: 'reassurance.support' as const, icon: Mail },
];

export default async function OffresPage() {
    const t = await getTranslations('foot.pricing');

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
                        <p className="text-body-fluid mx-auto max-w-[60ch] text-muted-foreground">
                            {t('subtitle')}
                        </p>
                    </div>
                </section>

                {/* Pricing selector + cards */}
                <PricingSelector />

                {/* Cartes SimplyFoot detailed section */}
                <CartesSection />

                {/* Competitor comparison */}
                <CompetitorTable />

                {/* Reassurance */}
                <section
                    aria-label={t('reassurance.noCreditCard')}
                    className="bg-brand-bg px-(--space-section-x) py-(--space-section-y)"
                >
                    <div className="container-simply grid grid-cols-1 gap-(--space-element) sm:grid-cols-3">
                        {REASSURANCE_ITEMS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.key}
                                    className="flex flex-col items-center gap-3 text-center"
                                >
                                    <div className="flex size-12 items-center justify-center rounded-full bg-brand-primary/10">
                                        <Icon
                                            className="size-6 text-brand-primary"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <p className="text-small-fluid font-medium">{t(item.key)}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </BrandProvider>
    );
}
