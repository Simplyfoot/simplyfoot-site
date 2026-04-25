import { useTranslations } from 'next-intl';
import type { ComponentType, SVGProps } from 'react';

import {
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    TikTokIcon,
    XIcon,
    YoutubeIcon,
} from '@/components/shared/SocialIcons';
import { BRAND_CONTACT } from '@/config/site';
import { cn } from '@/lib/utils';

type PlatformKey = 'instagram' | 'facebook' | 'linkedin' | 'tiktok' | 'twitter' | 'youtube';

interface PlatformConfig {
    key: PlatformKey;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    /** Lit l'URL réelle dans `BRAND_CONTACT.foot.socials`. `null` = bientôt. */
    url: string | null;
}

/**
 * Section §5 — réseaux sociaux. 6 plateformes en grille adaptative
 * (2 col mobile, 3 col tablette, 6 col desktop). Les plateformes sans
 * URL réelle sont rendues en état désactivé avec badge "Bientôt" plutôt
 * qu'un lien mort `href="#"` (anti-pattern UX).
 */
export function ContactSocials() {
    const t = useTranslations('Contact.socials');
    const tPlatforms = useTranslations('Contact.socials.platforms');
    const socials = BRAND_CONTACT.foot.socials;

    const platforms: PlatformConfig[] = [
        { key: 'instagram', icon: InstagramIcon, url: socials.instagram },
        { key: 'facebook', icon: FacebookIcon, url: socials.facebook },
        { key: 'linkedin', icon: LinkedinIcon, url: socials.linkedin },
        { key: 'tiktok', icon: TikTokIcon, url: socials.tiktok },
        { key: 'twitter', icon: XIcon, url: socials.twitter },
        { key: 'youtube', icon: YoutubeIcon, url: socials.youtube },
    ];

    return (
        <section
            aria-labelledby="contact-socials-heading"
            className="bg-story-cream-deep text-story-ink w-full"
        >
            <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-24">
                <div className="flex max-w-3xl flex-col gap-3">
                    <h2
                        id="contact-socials-heading"
                        className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] font-bold tracking-tight text-balance"
                    >
                        {t('title')}
                    </h2>
                    <p className="text-story-ink/70 max-w-[60ch] text-base leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {platforms.map((platform) => (
                        <SocialCard
                            key={platform.key}
                            platform={platform}
                            name={tPlatforms(`${platform.key}.name`)}
                            handle={tPlatforms(`${platform.key}.handle`)}
                            soonBadge={t('soonBadge')}
                            soonAriaLabel={t('soonAriaLabel', {
                                platform: tPlatforms(`${platform.key}.name`),
                            })}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}

interface SocialCardProps {
    platform: PlatformConfig;
    name: string;
    handle: string;
    soonBadge: string;
    soonAriaLabel: string;
}

function SocialCard({ platform, name, handle, soonBadge, soonAriaLabel }: SocialCardProps) {
    const Icon = platform.icon;
    const isActive = platform.url !== null;

    if (!isActive) {
        return (
            <li>
                <div
                    role="link"
                    aria-disabled="true"
                    aria-label={soonAriaLabel}
                    className="bg-story-cream-light/60 text-story-ink/40 flex min-h-35 cursor-not-allowed flex-col items-center justify-center gap-2 rounded-2xl p-5 ring-1 ring-black/5 ring-inset"
                >
                    <Icon className="size-7" aria-hidden />
                    <p className="font-display text-sm font-bold">{name}</p>
                    <p className="text-[0.65rem] font-medium">{handle}</p>
                    <span className="bg-story-ink/10 text-story-ink/55 mt-1 rounded-full px-2 py-0.5 text-[0.6rem] font-bold tracking-wider uppercase">
                        {soonBadge}
                    </span>
                </div>
            </li>
        );
    }

    return (
        <li>
            <a
                href={platform.url ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} (${handle})`}
                className={cn(
                    'group bg-story-cream-light text-story-ink flex min-h-35 flex-col items-center justify-center gap-2 rounded-2xl p-5 shadow-[0_2px_12px_-6px_color-mix(in_srgb,var(--story-ink)_25%,transparent)] transition-all duration-200',
                    'hover:text-primary hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_color-mix(in_srgb,var(--story-ink)_55%,transparent)]',
                    'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                )}
            >
                <Icon className="size-7 transition-colors duration-200" aria-hidden />
                <p className="font-display text-sm font-bold">{name}</p>
                <p className="text-story-ink/55 group-hover:text-primary/70 text-[0.65rem] font-medium transition-colors duration-200">
                    {handle}
                </p>
            </a>
        </li>
    );
}
