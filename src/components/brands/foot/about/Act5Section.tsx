import { ArrowRight, Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { GradientButton } from '@/components/shared/GradientButton';
import { ParticleBackground } from '@/components/shared/ParticleBackground';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';

export async function Act5Section() {
    const t = await getTranslations('about.act5');
    const promises = t.raw('promises') as string[];

    return (
        <section
            aria-label="Acte 5 — Vision"
            className="relative isolate overflow-hidden bg-[--brand-surface-dark] py-(--space-section-y) text-[--simply-beige]"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,158,138,0.3)_0%,rgba(26,46,34,0.65)_45%,transparent_80%)]"
            />
            <ParticleBackground sport="foot" density={18} />

            <div className="container-simply relative z-10 flex flex-col items-center gap-10 text-center">
                <AnimatedTitle
                    sport="foot"
                    className="mx-auto max-w-[22ch] font-display text-display text-[--simply-beige]"
                >
                    {t('titleBefore')}
                    <span className="text-[#7A9E8A]">{t('titleHighlight')}</span>
                    {t('titleEnd')}
                </AnimatedTitle>

                <ul className="flex max-w-[50ch] flex-col gap-4 text-left">
                    {promises.map((promise) => (
                        <li
                            key={promise}
                            className="text-body-fluid flex items-start gap-3 leading-relaxed"
                        >
                            <Check
                                className="mt-1 size-5 shrink-0 text-[#7A9E8A]"
                                aria-hidden="true"
                            />
                            <span className="text-[--simply-beige]/90">{promise}</span>
                        </li>
                    ))}
                </ul>

                <p className="max-w-[55ch] font-display text-h3 leading-snug text-balance text-[--simply-beige]">
                    « {t('signature')} »
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                    <GradientButton href="/foot/contact">
                        {t('cta')}
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </GradientButton>
                    <Link
                        href="/foot"
                        className={cn(
                            buttonVariants({ variant: 'outline', size: 'lg' }),
                            'min-h-11 border-[--simply-beige]/30 px-6 text-[--simply-beige]',
                            'hover:border-[--simply-beige]/60 hover:bg-[--simply-beige]/10 hover:text-[--simply-beige]',
                        )}
                    >
                        {t('ctaSecondary')}
                    </Link>
                </div>
            </div>
        </section>
    );
}
