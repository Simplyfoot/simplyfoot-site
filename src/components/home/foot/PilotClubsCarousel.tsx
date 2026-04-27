import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

interface PilotClubsCarouselProps {
    className?: string;
}

/**
 * Liste des clubs pilotes avec leur logo et nom affichable. Modifier
 * cette table = modifier la marquise (le composant lit la liste, dédouble
 * le rendu et applique l'animation `logos-marquee`).
 *
 * Ordre = ordre d'apparition dans la première moitié de la marquise. Les
 * `name` servent à `alt` (a11y / SEO) et `title` (tooltip souris).
 */
const PILOT_CLUBS = [
    { name: 'USSM', src: '/images/USSM.png' },
    { name: 'US La Cadière', src: '/images/US_La_Cadiere.png' },
    { name: 'FC Beaussetanne', src: '/images/logo_club_beaussetanne.png' },
    { name: 'FC Carnoules', src: '/images/logo_club_fc_carnoules.png' },
    { name: 'FC Cournon', src: '/images/logo_club_fc_cournon.png' },
    { name: "L'Ollioulaise", src: '/images/logo_club_ollioulaise.png' },
    { name: 'US Mer', src: '/images/logo_club_us_mer.png' },
] as const;

/**
 * Marquise de logos clubs pilotes. Animation CSS pure (`@keyframes
 * logos-marquee` dans globals.css), pause au survol pour permettre la
 * lecture. Mask gradient sur les bords pour entrée/sortie en fondu.
 *
 * Contenu dupliqué une fois côté DOM : la première copie est annoncée
 * aux lecteurs d'écran via `<ul>`, la seconde porte `aria-hidden` —
 * pas de doublon vocal. `motion-reduce:animate-none` désactive le
 * défilement pour les utilisateurs sensibles, l'`overflow-x-auto` du
 * conteneur permet alors le scroll horizontal natif comme fallback.
 */
export function PilotClubsCarousel({ className }: PilotClubsCarouselProps) {
    const t = useTranslations('Home.pilotClubs');

    return (
        <section
            id="home-clubs"
            aria-labelledby="home-clubs-heading"
            className={cn(
                'bg-secondary-50 text-story-ink relative w-full overflow-hidden',
                className,
            )}
        >
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-16 sm:px-6 md:py-20">
                <header className="flex max-w-[55ch] flex-col items-center gap-2 text-center">
                    <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
                        {t('eyebrow')}
                    </p>
                    <h2
                        id="home-clubs-heading"
                        className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] leading-tight font-bold tracking-tight text-balance"
                    >
                        {t('title')}
                    </h2>
                </header>

                <div
                    className="group/marquee relative w-full motion-reduce:overflow-x-auto"
                    style={{
                        maskImage:
                            'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
                        WebkitMaskImage:
                            'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
                    }}
                >
                    <ul
                        aria-label={t('listLabel')}
                        className="flex w-max items-center gap-12 motion-safe:animate-[logos-marquee_38s_linear_infinite] motion-safe:group-hover/marquee:[animation-play-state:paused] sm:gap-16 md:gap-20"
                    >
                        {PILOT_CLUBS.map((club) => (
                            <ClubLogo key={club.name} name={club.name} src={club.src} />
                        ))}
                        {/* Duplicat pour boucle sans saccade — invisible des lecteurs d'écran. */}
                        {PILOT_CLUBS.map((club) => (
                            <ClubLogo
                                key={`${club.name}-dup`}
                                name={club.name}
                                src={club.src}
                                ariaHidden
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

interface ClubLogoProps {
    name: string;
    src: string;
    ariaHidden?: boolean;
}

function ClubLogo({ name, src, ariaHidden = false }: ClubLogoProps) {
    return (
        <li className="shrink-0" {...(ariaHidden ? { 'aria-hidden': true } : {})} title={name}>
            <div className="relative h-16 w-32 sm:h-20 sm:w-36 md:h-24 md:w-40">
                <Image
                    src={src}
                    alt={ariaHidden ? '' : name}
                    fill
                    sizes="(min-width: 768px) 160px, (min-width: 640px) 144px, 128px"
                    className="object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
            </div>
        </li>
    );
}
