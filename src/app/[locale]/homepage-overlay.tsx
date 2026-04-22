'use client';

import { useTranslations } from 'next-intl';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

export function HomepageOverlay() {
    const tc = useTranslations('Common');
    const t = useTranslations('HomePage');
    const isLandscapeMobile = useMediaQuery('(max-height: 500px) and (orientation: landscape)');

    return (
        <div
            className={cn(
                'pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-between',
                isLandscapeMobile ? 'py-4' : 'py-12 md:py-24',
            )}
        >
            <header className="px-6 text-center md:px-12">
                <h1 className="sr-only">{tc('brand')}</h1>
                {!isLandscapeMobile && <p className="text-secondary/60 text-sm">{tc('tagline')}</p>}
            </header>

            <div
                className={cn(
                    'max-w-150 px-6 text-center md:px-12',
                    isLandscapeMobile && 'max-w-full',
                )}
            >
                <p
                    className={cn(
                        'text-secondary/80 animate-pulse text-base md:text-lg',
                        isLandscapeMobile && 'text-sm',
                    )}
                >
                    {t('hero.subtitle')}
                </p>
            </div>
        </div>
    );
}
