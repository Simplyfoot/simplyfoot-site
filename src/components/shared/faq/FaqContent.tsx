import { getTranslations } from 'next-intl/server';

import { FaqShell } from '@/components/shared/faq/FaqShell';
import { getFaqForBrand } from '@/config/faq';
import { BRANDS } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';

interface FaqContentProps {
    brand: BrandSlug;
}

export async function FaqContent({ brand }: FaqContentProps) {
    const t = await getTranslations('FAQ');
    const categories = getFaqForBrand(brand);
    const brandLabel = BRANDS[brand].label;

    const sidebarItems = categories.map((category) => ({
        id: category.id,
        icon: category.icon,
        title: t(`categories.${category.id}.title`),
    }));

    return (
        <article className="text-foreground">
            <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:px-8 md:py-16">
                <header className="mb-8 max-w-3xl space-y-3 md:mb-10 md:space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        {t('heading')}
                    </h1>
                    <div aria-hidden="true" className="bg-primary-400 h-2 w-[34px] rounded-full" />
                    <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                        {t('intro', { brand: brandLabel })}
                    </p>
                </header>

                <FaqShell
                    sidebarItems={sidebarItems}
                    categories={categories}
                    sidebarLabel={t('sidebarLabel')}
                    brand={brand}
                />
            </div>
        </article>
    );
}
