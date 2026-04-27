import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ENABLED_BRAND_SLUGS } from '@/config/brands';
import { Link } from '@/i18n/navigation';
import { BRANDS } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';

/**
 * Landing racine `/` — porte d'entrée multi-sport SIMPLY. Trois cartes
 * (Foot / Rugby / Handball) qui dispatchent vers chaque univers de marque.
 *
 * Volontairement plate : pas de 3D, pas d'animation lourde, pas de
 * narration. Le visiteur arrive ici, choisit son sport, et on le renvoie
 * vers la home brandée correspondante. Tout le reste (storytelling,
 * preuves, conversion) vit dans `/foot/`, `/rugby/`, `/handball/`.
 *
 * Chaque carte porte `data-brand="<slug>"` pour scoper le token
 * `--primary` à la palette de la marque (vert foot, rouge rugby, bleu
 * handball). Aucun hex hardcodé : la couleur vient de `themes/<brand>.css`.
 */
export function LandingContent() {
    const t = useTranslations('HomePage');
    const tCommon = useTranslations('Common');

    return (
        <div className="from-secondary-50 via-secondary-50 to-story-cream-deep relative flex min-h-svh flex-col bg-linear-to-br">
            {/* Décor radial doux pour donner du relief sans 3D */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--story-cream-light)_50%,transparent)_0%,transparent_55%)]"
            />

            <header className="relative flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
                <p className="font-display text-story-ink text-xl font-bold tracking-tight md:text-2xl">
                    {tCommon('brand')}
                </p>
                <p className="text-story-ink/55 hidden text-[0.65rem] font-semibold tracking-[0.3em] uppercase md:block">
                    {tCommon('tagline')}
                </p>
            </header>

            <section className="relative flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 md:py-20">
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
                    <p className="text-story-ink/60 text-xs font-bold tracking-[0.35em] uppercase">
                        {t('hero.eyebrow')}
                    </p>
                    <h1 className="font-display text-story-ink text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] font-bold tracking-tight text-balance">
                        {t('hero.titleStart')}{' '}
                        <span className="text-story-forest">{t('hero.titleEnd')}</span>
                    </h1>
                    <p className="text-story-ink/70 max-w-[55ch] text-base leading-relaxed md:text-lg">
                        {t('hero.subtitle')}
                    </p>
                </div>

                <ul
                    className={`mx-auto mt-14 grid w-full max-w-5xl grid-cols-1 gap-5 md:gap-6 ${
                        ENABLED_BRAND_SLUGS.length === 1
                            ? 'sm:max-w-md'
                            : ENABLED_BRAND_SLUGS.length === 2
                              ? 'sm:max-w-2xl sm:grid-cols-2'
                              : 'sm:grid-cols-3'
                    }`}
                >
                    {ENABLED_BRAND_SLUGS.map((slug) => (
                        <SportCard key={slug} slug={slug} />
                    ))}
                </ul>
            </section>

            <footer className="text-story-ink/60 relative px-6 py-8 text-center text-sm md:px-12">
                {t('footer.contactQuestion')}{' '}
                <Link
                    href="/foot/contact"
                    className="text-story-ink hover:text-primary focus-visible:ring-primary rounded-md font-semibold underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
                >
                    {t('footer.contactCta')}
                </Link>
            </footer>
        </div>
    );
}

interface SportCardProps {
    slug: BrandSlug;
}

/**
 * Carte d'un sport. `data-brand="<slug>"` scope le token `--primary` au
 * sein de la carte → l'icône, le label et la flèche prennent
 * automatiquement la couleur de marque (vert/rouge/bleu) sans hex
 * hardcodé. La carte entière est un seul `<Link>` (touch target ≥ 44 px,
 * focus ring visible).
 */
function SportCard({ slug }: SportCardProps) {
    const t = useTranslations(`HomePage.cards.${slug}`);
    const tBrands = useTranslations('Brands');
    const meta = BRANDS[slug];

    return (
        <li className="contents">
            <Link
                href={`/${slug}` as '/foot' | '/rugby' | '/handball'}
                data-brand={slug}
                aria-label={`${meta.label} — ${tBrands(`${slug}.sport`)}`}
                className="group bg-story-cream-light/80 border-story-ink/10 hover:border-primary/40 hover:bg-primary/5 focus-visible:ring-primary flex h-full flex-col gap-5 rounded-3xl border p-6 shadow-[0_2px_12px_-6px_color-mix(in_srgb,var(--story-ink)_22%,transparent)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_color-mix(in_srgb,var(--primary)_45%,transparent)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:p-8"
            >
                <span
                    aria-hidden
                    className="bg-primary/10 ring-primary/20 inline-flex size-16 items-center justify-center rounded-2xl text-3xl ring-1 transition-transform duration-200 group-hover:scale-105 group-hover:rotate-3"
                >
                    {meta.emoji}
                </span>

                <div className="flex flex-col gap-1.5">
                    <p className="text-primary font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
                        {tBrands(`${slug}.sport`)}
                    </p>
                    <h2 className="font-display text-story-ink text-2xl leading-tight font-bold tracking-tight md:text-3xl">
                        {meta.label}
                    </h2>
                </div>

                <p className="text-story-ink/70 text-sm leading-relaxed">{t('description')}</p>

                <p className="text-primary mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold">
                    {t('cta')}
                    <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                    />
                </p>
            </Link>
        </li>
    );
}
