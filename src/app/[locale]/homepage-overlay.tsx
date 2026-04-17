'use client';

import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';

export function HomepageOverlay() {
    const tc = useTranslations('common');
    const t = useTranslations('home');
    const isLandscapeMobile = useMediaQuery('(max-height: 500px) and (orientation: landscape)');

    return (
        <div
            className={cn(
                'pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-between',
                isLandscapeMobile ? 'py-4' : 'py-(--space-section-y)',
            )}
        >
            <header className="px-(--space-section-x) text-center">
                <h1 className="sr-only">{tc('brand')}</h1>
                {!isLandscapeMobile && (
                    <p className="text-small-fluid text-simply-beige/60">{tc('tagline')}</p>
                )}
            </header>

            {/* Bottom — CTA */}
            <div
                className={cn(
                    'max-w-150 px-(--space-section-x) text-center',
                    isLandscapeMobile && 'max-w-full',
                )}
            >
                <p
                    className={cn(
                        'text-body-fluid animate-fade-in text-simply-beige/80',
                        isLandscapeMobile && 'text-small-fluid',
                    )}
                >
                    {t('hero.subtitle')}
                </p>
                <div
                    className={cn(
                        'pointer-events-auto flex flex-col gap-3 sm:flex-row sm:justify-center',
                        isLandscapeMobile ? 'mt-3' : 'mt-6',
                    )}
                >
                    <Link
                        href="/contact"
                        className={cn(buttonVariants({ size: 'lg' }), 'min-h-11 w-full sm:w-auto')}
                    >
                        {tc('cta.demo')}
                    </Link>
                    <Link
                        href="/foot"
                        className={cn(
                            buttonVariants({ size: 'lg', variant: 'outline' }),
                            'min-h-11 w-full border-simply-beige/30 bg-transparent text-simply-beige hover:bg-simply-beige/10 hover:text-simply-beige sm:w-auto',
                        )}
                    >
                        {t('hero.explore')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
