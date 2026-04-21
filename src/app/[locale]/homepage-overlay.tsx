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

                <div
                    className={cn(
                        'pointer-events-auto flex flex-col gap-3 sm:flex-row sm:justify-center',
                        isLandscapeMobile ? 'mt-3' : 'mt-6',
                    )}
                >
                    {/*
                    TODO landing CTA #1 — Bouton "Demander une démo" vers /contact.
                    Réactiver lors de la reconnexion de la page contact.

                    <Link
                        href="/contact"
                        className={cn(buttonVariants({ size: 'lg' }), 'min-h-11 w-full sm:w-auto')}
                    >
                        {tc('cta.demo')}
                    </Link>
                    */}

                    {/*
                    TODO landing CTA #2 — Bouton "Explorer" vers /foot.
                    Réactiver lors de la reconnexion de SimplyFoot.

                    <Link
                        href="/foot"
                        className={cn(
                            buttonVariants({ size: 'lg', variant: 'outline' }),
                            'border-secondary/30 text-secondary hover:bg-secondary/10 hover:text-secondary min-h-11 w-full bg-transparent sm:w-auto',
                        )}
                    >
                        {t('hero.explore')}
                    </Link>
                    */}
                </div>
            </div>
        </div>
    );
}
