'use client';

import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';
import type { BrandConfig } from '@/types/brand';

export function BrandHero({ config }: { config: BrandConfig }) {
    const t = useTranslations('brands');
    const tc = useTranslations('common');

    return (
        <section
            aria-label={t(`${config.slug}.name`)}
            className="flex min-h-[80svh] flex-col items-center justify-center bg-brand-bg px-(--space-section-x) py-(--space-section-y)"
        >
            <div className="container-simply grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                {/* Text content */}
                <div className="space-y-6 text-center lg:text-left">
                    <h1 className="font-display text-display leading-tight font-bold text-brand-primary">
                        {t(`${config.slug}.name`)}
                    </h1>
                    <p className="text-h3 leading-snug text-brand-primary-dark">
                        {t(`${config.slug}.sport`)}
                    </p>
                    <p className="text-body-fluid mx-auto max-w-150 text-muted-foreground lg:mx-0">
                        {t(`${config.slug}.tagline`)}
                    </p>
                    <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                        <Link
                            href="/contact"
                            className={cn(
                                buttonVariants({ size: 'lg' }),
                                'min-h-11 w-full sm:w-auto',
                            )}
                        >
                            {tc('cta.demo')}
                        </Link>
                        <Link
                            href={`/${config.slug}/blog`}
                            className={cn(
                                buttonVariants({ size: 'lg', variant: 'outline' }),
                                'min-h-11 w-full sm:w-auto',
                            )}
                        >
                            {tc('cta.learnMore')}
                        </Link>
                    </div>
                </div>

                {/* Visual placeholder — will hold brand-specific illustration/3D */}
                <div className="relative mx-auto aspect-square w-full max-w-80 lg:max-w-none">
                    <div
                        className="h-full w-full rounded-full opacity-20"
                        style={{ backgroundColor: config.colors.primary }}
                        aria-hidden="true"
                    />
                </div>
            </div>
        </section>
    );
}
