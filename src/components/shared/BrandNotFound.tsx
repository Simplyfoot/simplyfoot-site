import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { AspectRatio } from '@/shadcn/aspect-ratio';
import { Button } from '@/shadcn/button';
import { BRANDS } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';

interface BrandNotFoundProps {
    brand: BrandSlug;
}

/**
 * Brand-scoped 404 page. Rendered INSIDE the brand layout (Header + Footer
 * stay visible, `[data-brand]` cascades the brand colors into the Tailwind
 * tokens used below). Two CTAs: "back home" to the brand home and "contact"
 * to the brand contact page.
 */
export async function BrandNotFound({ brand }: BrandNotFoundProps) {
    const t = await getTranslations('Errors');
    const { label, emoji } = BRANDS[brand];

    return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center md:px-12 md:py-24">
            <div className="mb-6 w-[280px] md:w-[400px]">
                <AspectRatio ratio={4 / 3}>
                    <Image
                        src={`/brands/${brand}/not-found.png`}
                        alt={t('notFound.imageAlt', { brand: label })}
                        fill
                        priority
                        sizes="(min-width: 768px) 400px, 280px"
                        className="border-primary-600 rounded-xl border-4 object-cover"
                    />
                </AspectRatio>
            </div>
            <p className="text-primary-400 text-6xl font-extrabold tracking-tight md:text-7xl">
                {t('notFound.title')}
            </p>
            <h2 className="text-secondary-foreground mt-4 text-2xl font-bold md:text-3xl">
                {t('notFound.heading', { emoji })}
            </h2>
            <p className="text-secondary-foreground mt-4 max-w-md text-base md:text-lg">
                {t('notFound.description', { brand: label })}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                    <Link href={`/${brand}`}>{t('notFound.backHome')}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href={`/${brand}/contact`}>{t('notFound.contactTeam')}</Link>
                </Button>
            </div>
        </main>
    );
}
