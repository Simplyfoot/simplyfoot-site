import Image from 'next/image';

import { cn } from '@/lib/utils';

interface PhoneFrameProps {
    src: string;
    alt: string;
    /** Classe Tailwind de rotation appliquée au repos — annulée au hover. */
    rotation?: string;
    /** `size` calibré sur les usages actuels : `md` (triptyque, profile selector) ou `lg` (hero). */
    size?: 'md' | 'lg';
    priority?: boolean;
    className?: string;
}

const SIZE_CLASSES: Record<NonNullable<PhoneFrameProps['size']>, string> = {
    md: 'max-w-[280px]',
    lg: 'max-w-[320px]',
};

/**
 * Cadre iPhone réaliste autour d'une capture d'écran d'app. Bezel sombre,
 * Dynamic Island centrée en haut, coins arrondis (rayon inspiré iPhone
 * 15/16 Pro), ombre portée prononcée pour un rendu premium. Couleurs
 * puisées dans les tokens `typography-*` (pas de hex côté composant).
 *
 * Usage : hero (`size='lg'`), triptyque et sélecteurs (`size='md'`). La
 * rotation optionnelle permet un posé "photo de studio" qui se remet
 * droit au hover.
 */
export function PhoneFrame({
    src,
    alt,
    rotation,
    size = 'md',
    priority = false,
    className,
}: PhoneFrameProps) {
    return (
        <div
            className={cn(
                'bg-typography-950 ring-typography-800/40 relative mx-auto aspect-[9/19.5] w-full p-[10px] ring-1 ring-inset',
                'rounded-[2.75rem] shadow-[0_50px_90px_-20px_rgba(0,0,0,0.5)]',
                'transition-transform duration-500 ease-out motion-reduce:transition-none',
                rotation && `${rotation} hover:rotate-0`,
                SIZE_CLASSES[size],
                className,
            )}
        >
            {/* Écran */}
            <div className="bg-background relative size-full overflow-hidden rounded-[2.25rem]">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width: 768px) 320px, 260px"
                    className="object-cover"
                    priority={priority}
                />

                {/* Dynamic Island */}
                <span
                    aria-hidden
                    className="bg-typography-950 absolute top-2 left-1/2 inline-block h-[22px] w-[92px] -translate-x-1/2 rounded-full"
                />

                {/* Reflet diagonal très léger pour vibe studio */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.09)_0%,transparent_30%,transparent_85%,rgba(255,255,255,0.04)_100%)]"
                />
            </div>

            {/* Boutons latéraux — barres fines qui évoquent power / volume sans chercher le photoréalisme */}
            <span
                aria-hidden
                className="bg-typography-800/70 absolute top-[20%] -left-[2px] h-10 w-[3px] rounded-l-full"
            />
            <span
                aria-hidden
                className="bg-typography-800/70 absolute top-[33%] -left-[2px] h-16 w-[3px] rounded-l-full"
            />
            <span
                aria-hidden
                className="bg-typography-800/70 absolute top-[46%] -left-[2px] h-16 w-[3px] rounded-l-full"
            />
            <span
                aria-hidden
                className="bg-typography-800/70 absolute top-[28%] -right-[2px] h-20 w-[3px] rounded-r-full"
            />
        </div>
    );
}
