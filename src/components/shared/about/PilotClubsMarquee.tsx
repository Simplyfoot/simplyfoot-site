import { useTranslations } from 'next-intl';

import { PILOT_CLUBS } from '@/config/about';
import { cn } from '@/lib/utils';

interface PilotClubsMarqueeProps {
    className?: string;
}

/**
 * Bande horizontale qui défile en boucle via CSS (marquee). Les logos sont
 * remplacés par des "étiquettes" typographiques tant que les images
 * officielles des 10 clubs ne sont pas fournies — fallback propre, zéro
 * placeholder moche.
 *
 * La piste est dupliquée deux fois dans le DOM pour permettre un défilement
 * continu sans saccade (technique marquee standard).
 */
export function PilotClubsMarquee({ className }: PilotClubsMarqueeProps) {
    const t = useTranslations('About.act3.pilotClubs');

    const track = (
        <ul
            aria-hidden
            className="flex shrink-0 animate-[about-marquee_40s_linear_infinite] items-center gap-10 pr-10 motion-reduce:animate-none"
        >
            {PILOT_CLUBS.map((club) => (
                <li
                    key={club.id}
                    className="border-border bg-card text-muted-foreground hover:text-foreground inline-flex shrink-0 items-center rounded-full border px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors"
                >
                    {t(club.id)}
                </li>
            ))}
        </ul>
    );

    return (
        <div
            className={cn(
                'pointer-events-none relative overflow-hidden',
                '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
                className,
            )}
            aria-label={t('label')}
            role="list"
        >
            <div className="flex">
                {track}
                {track}
            </div>
        </div>
    );
}
