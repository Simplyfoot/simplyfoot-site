'use client';

import { useTranslations } from 'next-intl';

export function GalaxyReducedMotion() {
    const t = useTranslations('HomePage');
    const tc = useTranslations('Common');
    const tb = useTranslations('Brands');

    return (
        <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-black px-6 md:px-12">
            {/* Static starfield */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                {Array.from({ length: 200 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-secondary absolute rounded-full"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.7 + 0.3,
                        }}
                    />
                ))}
            </div>

            {/* Logo */}
            <h1 className="text-secondary relative z-10 font-sans text-4xl leading-tight font-bold md:text-6xl">
                {tc('brand')}
            </h1>
            <p className="text-secondary/70 relative z-10 mt-4 text-base md:text-lg">
                {t('hero.subtitle')}
            </p>

            {/* Static planet representations — colors come from [data-brand] scoped CSS vars */}
            <div className="relative z-10 mt-8 flex flex-col items-center gap-6 sm:mt-12 sm:flex-row sm:gap-8 md:gap-16">
                <div className="flex flex-col items-center gap-2">
                    <div
                        data-brand="foot"
                        className="h-16 w-16 rounded-full md:h-24 md:w-24"
                        style={{
                            backgroundColor: 'var(--primary)',
                            boxShadow:
                                '0 10px 15px -3px color-mix(in srgb, var(--primary) 30%, transparent)',
                        }}
                    />
                    <span className="text-secondary/60 text-xs">{tb('foot.sport')}</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div
                        data-brand="rugby"
                        className="h-16 w-16 rounded-full md:h-24 md:w-24"
                        style={{
                            backgroundColor: 'var(--primary)',
                            boxShadow:
                                '0 10px 15px -3px color-mix(in srgb, var(--primary) 30%, transparent)',
                        }}
                    />
                    <span className="text-secondary/60 text-xs">{tb('rugby.sport')}</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div
                        data-brand="handball"
                        className="h-16 w-16 rounded-full md:h-24 md:w-24"
                        style={{
                            backgroundColor: 'var(--primary)',
                            boxShadow:
                                '0 10px 15px -3px color-mix(in srgb, var(--primary) 30%, transparent)',
                        }}
                    />
                    <span className="text-secondary/60 text-xs">{tb('handball.sport')}</span>
                </div>
            </div>
        </div>
    );
}
