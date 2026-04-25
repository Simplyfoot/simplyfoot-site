import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Hero de la page contact. Volontairement sans CTA — la décision est
 * différée à la section suivante (`ContactChannels`) pour laisser le
 * visiteur choisir SON canal plutôt qu'imposer un parcours. Fond
 * `--story-forest` avec halo radial subtil pour cohérence visuelle avec
 * les autres heroes "narratifs" du site (HomeFinalCta, etc.).
 */
export function ContactHero() {
    const t = useTranslations('Contact.hero');

    return (
        <section
            aria-labelledby="contact-hero-heading"
            className="bg-story-forest text-secondary-50 relative isolate flex min-h-[55vh] w-full items-center overflow-hidden"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,color-mix(in_srgb,var(--story-forest-glow)_35%,transparent)_0%,transparent_60%)]"
            />

            <div className="relative mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-4 py-20 sm:px-6 md:py-28">
                <p className="text-story-forest-glow text-xs font-semibold tracking-[0.35em] uppercase">
                    {t('eyebrow')}
                </p>
                <h1
                    id="contact-hero-heading"
                    className="font-display max-w-[18ch] text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] font-bold tracking-tight text-balance"
                >
                    {t('title')}
                </h1>
                <p className="text-secondary-50/80 max-w-[60ch] text-base leading-relaxed md:text-lg">
                    {t('subtitle')}
                </p>

                <div
                    aria-hidden
                    className="text-secondary-50/50 mt-6 flex items-center gap-2 text-xs font-medium tracking-wide"
                >
                    <ChevronDown className="size-4 motion-safe:animate-bounce" />
                    {t('scrollHint')}
                </div>
            </div>
        </section>
    );
}
