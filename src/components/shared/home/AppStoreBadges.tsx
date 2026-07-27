import { getTranslations } from 'next-intl/server';

import { BRAND_APP_STORES } from '@/config/appStores.config';

import type { BrandSlug } from '~types/brand.types';

interface AppStoreBadgesProps {
    brand: BrandSlug;
    /** Namespace i18n contenant les clés `appStores.*`. */
    namespace: string;
}

/**
 * Boutons de téléchargement de l'application (Google Play + App Store).
 *
 * Style "badge officiel" : fond foncé, logo de la plateforme à gauche, ligne
 * de service en haut ("Disponible sur") et nom du store en bas.
 *
 * Une marque sans liens configurés ne rend rien.
 */
export async function AppStoreBadges({ brand, namespace }: AppStoreBadgesProps) {
    const links = BRAND_APP_STORES[brand];

    if (!links.googlePlay && !links.appStore) {
        return null;
    }

    const t = await getTranslations(`${namespace}.appStores`);

    return (
        <div
            role="group"
            aria-label={t('groupLabel')}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
        >
            {links.googlePlay ? (
                <StoreBadge
                    href={links.googlePlay}
                    icon={<GooglePlayIcon />}
                    eyebrow={t('googlePlay.eyebrow')}
                    label={t('googlePlay.label')}
                    ariaLabel={t('googlePlay.ariaLabel')}
                />
            ) : null}

            {links.appStore ? (
                <StoreBadge
                    href={links.appStore}
                    icon={<AppleIcon />}
                    eyebrow={t('appStore.eyebrow')}
                    label={t('appStore.label')}
                    ariaLabel={t('appStore.ariaLabel')}
                />
            ) : null}
        </div>
    );
}

interface StoreBadgeProps {
    href: string;
    icon: React.ReactNode;
    eyebrow: string;
    label: string;
    ariaLabel: string;
}

function StoreBadge({ href, icon, eyebrow, label, ariaLabel }: StoreBadgeProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className="focus-visible:ring-ring inline-flex items-center gap-3 rounded-xl border border-white/15 bg-black px-4 py-2.5 text-white shadow-sm transition-colors hover:bg-neutral-900 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
        >
            <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center">
                {icon}
            </span>

            <span className="flex flex-col leading-tight">
                <span className="text-[10px] font-medium tracking-wide uppercase opacity-80">
                    {eyebrow}
                </span>
                <span className="text-base font-semibold tracking-tight">{label}</span>
            </span>
        </a>
    );
}

function GooglePlayIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" focusable="false">
            <path
                fill="#34A853"
                d="M3.6 20.5 14 12 3.6 3.5C3.2 3.8 3 4.3 3 4.9v14.2c0 .6.2 1.1.6 1.4Z"
            />
            <path fill="#FBBC04" d="m17.4 15.4 3.3-1.9c.8-.5.8-1.6 0-2.1l-3.3-1.9L14 12l3.4 3.4Z" />
            <path fill="#EA4335" d="M3.6 20.5c.4.3 1 .4 1.6.1l12.2-7-3.4-3.4L3.6 20.5Z" />
            <path fill="#4285F4" d="M5.2 3.4c-.6-.3-1.2-.2-1.6.1L14 12l3.4-3.4-12.2-7Z" />
        </svg>
    );
}

function AppleIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" focusable="false">
            <path d="M16.365 1.43c0 1.14-.46 2.23-1.21 3.02-.81.85-2.12 1.5-3.21 1.42-.13-1.13.43-2.3 1.17-3.06.83-.86 2.24-1.5 3.25-1.38ZM20.5 17.13c-.55 1.27-.82 1.84-1.53 2.96-.99 1.57-2.39 3.53-4.12 3.55-1.54.02-1.94-1.01-4.04-1-2.1.01-2.54 1.02-4.08 1-1.73-.02-3.05-1.78-4.04-3.35C.16 16.5-.24 11.43 1.45 8.62c1.21-2.01 3.12-3.19 4.92-3.19 1.83 0 2.98 1 4.49 1 1.47 0 2.36-1 4.48-1 1.6 0 3.29.87 4.5 2.38-3.96 2.17-3.32 7.83 1.66 9.32Z" />
        </svg>
    );
}
