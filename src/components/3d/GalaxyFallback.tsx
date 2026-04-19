'use client';

// TODO i18n: useTranslations('home' | 'common' | 'brands') — réactiver à la reconstruction.
// import { useTranslations } from 'next-intl';

import { BRAND_COLORS } from '@/lib/constants';

export function GalaxyFallback() {
    // const t = useTranslations('home');
    // const tc = useTranslations('common');
    // const tb = useTranslations('brands');

    return (
        <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-simply-black px-(--space-section-x)">
            {/* Static starfield */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                {Array.from({ length: 200 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-simply-beige"
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
            <h1 className="relative z-10 font-display text-display leading-tight font-bold text-simply-beige">
                {/* TODO i18n: tc('brand') */}
                SIMPLY
            </h1>
            <p className="text-body-fluid relative z-10 mt-4 text-simply-beige/70">
                {/* TODO i18n: t('hero.subtitle') */}
                Choisissez votre sport
            </p>

            {/* Static planet representations */}
            <div className="relative z-10 mt-8 flex flex-col items-center gap-6 sm:mt-12 sm:flex-row sm:gap-8 md:gap-16">
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="h-16 w-16 rounded-full shadow-lg md:h-24 md:w-24"
                        style={{
                            backgroundColor: BRAND_COLORS.foot.primary,
                            boxShadow: `0 10px 15px -3px ${BRAND_COLORS.foot.primary}4D`,
                        }}
                    />
                    <span className="text-caption text-simply-beige/60">
                        {/* TODO i18n: tb('foot.sport') */}
                        Football amateur
                    </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="h-16 w-16 rounded-full shadow-lg md:h-24 md:w-24"
                        style={{
                            backgroundColor: BRAND_COLORS.rugby.primary,
                            boxShadow: `0 10px 15px -3px ${BRAND_COLORS.rugby.primary}4D`,
                        }}
                    />
                    <span className="text-caption text-simply-beige/60">
                        {/* TODO i18n: tb('rugby.sport') */}
                        Rugby amateur
                    </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="h-16 w-16 rounded-full shadow-lg md:h-24 md:w-24"
                        style={{
                            backgroundColor: BRAND_COLORS.handball.primary,
                            boxShadow: `0 10px 15px -3px ${BRAND_COLORS.handball.primary}4D`,
                        }}
                    />
                    <span className="text-caption text-simply-beige/60">
                        {/* TODO i18n: tb('handball.sport') */}
                        Handball amateur
                    </span>
                </div>
            </div>
        </div>
    );
}
