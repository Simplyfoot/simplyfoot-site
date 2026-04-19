import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { BRANDS, type BrandSlug } from '@/lib/brand';

interface BrandNotFoundProps {
    brand: BrandSlug;
}

/**
 * Brand-scoped 404 page. Rendered INSIDE the brand layout (Header + Footer
 * stay visible, `[data-brand]` cascades the brand colors into the Tailwind
 * tokens used below). The "back home" button points to the brand's home.
 */
export async function BrandNotFound({ brand }: BrandNotFoundProps) {
    const t = await getTranslations('Errors');
    const { label } = BRANDS[brand];

    return (
        <main className="bg-background text-foreground flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 md:px-12 md:py-24">
            <p className="text-primary text-7xl font-bold tracking-tight md:text-9xl">
                {t('notFound.title')}
            </p>
            <p className="text-foreground mt-4 text-xl font-semibold md:text-2xl">
                {t('notFound.description')}
            </p>
            <Link
                href={`/${brand}`}
                className="bg-primary text-primary-foreground focus-visible:ring-primary mt-8 inline-flex min-h-11 items-center rounded-lg px-6 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
                {t('notFound.backToBrand', { brand: label })}
            </Link>
        </main>
    );
}
