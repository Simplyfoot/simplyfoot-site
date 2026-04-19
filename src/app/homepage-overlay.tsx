'use client';

// TODO i18n: useTranslations('common'), useTranslations('home') — réactiver à la reconstruction.
// import { useTranslations } from 'next-intl';

// TODO Tailwind/shadcn: réactiver buttonVariants + cn à la reconstruction.
// import { buttonVariants } from '@/components/ui/button';
// import { cn } from '@/lib/utils';

// TODO i18n: réactiver Link localisé à la reconstruction.
// import { Link } from '@/lib/i18n/routing';

import { useMediaQuery } from '@/lib/hooks/use-media-query';

export function HomepageOverlay() {
    // const tc = useTranslations('common');
    // const t = useTranslations('home');
    const isLandscapeMobile = useMediaQuery('(max-height: 500px) and (orientation: landscape)');

    // TODO Tailwind: className={cn('pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-between', isLandscapeMobile ? 'py-4' : 'py-(--space-section-y)')}
    return (
        <div>
            {/* TODO Tailwind: className="px-(--space-section-x) text-center" */}
            <header>
                {/* TODO Tailwind: className="sr-only" — TODO i18n: tc('brand') */}
                <h1>SIMPLY</h1>
                {!isLandscapeMobile && (
                    // TODO Tailwind: className="text-small-fluid text-simply-beige/60" — TODO i18n: tc('tagline')
                    <p>L&apos;écosystème du sport amateur</p>
                )}
            </header>

            {/* TODO Tailwind: className={cn('max-w-150 px-(--space-section-x) text-center', isLandscapeMobile && 'max-w-full')} */}
            <div>
                {/* TODO Tailwind: className={cn('text-body-fluid animate-fade-in text-simply-beige/80', isLandscapeMobile && 'text-small-fluid')} — TODO i18n: t('hero.subtitle') */}
                <p>Choisissez votre sport</p>

                {/* TODO Tailwind: className={cn('pointer-events-auto flex flex-col gap-3 sm:flex-row sm:justify-center', isLandscapeMobile ? 'mt-3' : 'mt-6')} */}
                <div>
                    {/*
                    TODO landing CTA #1 — Bouton "Demander une démo" vers /contact.
                    Réactiver lors de la reconnexion de la page contact + reconstruction shadcn.

                    <Link
                        href="/contact"
                        className={cn(buttonVariants({ size: 'lg' }), 'min-h-11 w-full sm:w-auto')}
                    >
                        {tc('cta.demo')}
                    </Link>
                    */}

                    {/*
                    TODO landing CTA #2 — Bouton "Explorer" vers /foot.
                    Réactiver lors de la reconnexion de SimplyFoot + reconstruction shadcn.

                    <Link
                        href="/foot"
                        className={cn(
                            buttonVariants({ size: 'lg', variant: 'outline' }),
                            'min-h-11 w-full border-simply-beige/30 bg-transparent text-simply-beige hover:bg-simply-beige/10 hover:text-simply-beige sm:w-auto',
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
