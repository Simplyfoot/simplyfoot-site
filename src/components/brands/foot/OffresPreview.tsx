'use client';

import { ArrowRight, Check, CreditCard } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { SectionBackground } from '@/components/shared/SectionBackground';
import { buttonVariants } from '@/components/ui/button';
import { type PricingPack, pricingPacks } from '@/content/pricing/foot-pricing';
import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';

const PACK_KEY_MAP: Record<string, 'free' | 'coach' | 'clubOs' | 'clubOsPro'> = {
    free: 'free',
    coach: 'coach',
    'club-os': 'clubOs',
    'club-os-pro': 'clubOsPro',
};

export function OffresPreview() {
    const t = useTranslations('foot.offresPreview');

    return (
        <SectionBackground sport="foot" tone="light">
            <div className="py-(--space-section-y)">
                <div className="container-simply">
                    <div className="mb-(--space-block) flex flex-col items-center gap-4 text-center">
                        <AnimatedTitle sport="foot">
                            {t('title')}{' '}
                            <span className="text-brand-primary">{t('titleHighlight')}</span>
                            {t('titleEnd')}
                        </AnimatedTitle>
                        <p className="text-body-fluid max-w-[60ch] text-balance text-muted-foreground">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {pricingPacks.map((pack, i) => (
                            <CompactPack
                                key={pack.id}
                                pack={pack}
                                index={i}
                                packKey={PACK_KEY_MAP[pack.id] ?? 'free'}
                            />
                        ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <Link
                            href="/foot/offres"
                            className={cn(
                                buttonVariants({ variant: 'outline', size: 'lg' }),
                                'min-h-11 rounded-full border-brand-primary/40 px-6 text-brand-primary hover:bg-brand-primary hover:text-white',
                            )}
                        >
                            {t('cta')}
                            <ArrowRight className="ml-2 size-4" aria-hidden />
                        </Link>
                    </div>
                </div>
            </div>
        </SectionBackground>
    );
}

interface CompactPackProps {
    pack: PricingPack;
    index: number;
    packKey: 'free' | 'coach' | 'clubOs' | 'clubOsPro';
}

function CompactPack({ pack, index, packKey }: CompactPackProps) {
    const t = useTranslations('foot.offresPreview');
    const tPricing = useTranslations('foot.pricing');
    const bullets = t.raw(`packs.${packKey}.bullets`) as string[];
    const tagline = t(`packs.${packKey}.tagline`);
    const price100 = pack.prices['100'];
    const highlighted = pack.highlighted ?? false;

    return (
        <AnimatedCard
            sport="foot"
            index={index}
            className={cn(
                'flex h-full flex-col gap-5 p-6',
                highlighted && 'ring-1 ring-brand-primary/40',
            )}
        >
            <div className="flex items-baseline justify-between">
                <h3 className="font-display text-h4 font-semibold">{pack.name}</h3>
                <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    {tagline}
                </p>
            </div>

            <div className="flex items-baseline gap-1">
                {price100 === 0 ? (
                    <span className="font-display text-h3 font-bold text-brand-primary">
                        {tPricing('free')}
                    </span>
                ) : (
                    <>
                        <span className="text-small-fluid text-muted-foreground">
                            {t('fromPrefix')}
                        </span>
                        <span className="font-display text-h3 font-bold text-brand-primary">
                            {price100}€
                        </span>
                        <span className="text-small-fluid text-muted-foreground">
                            {t('perMonth')}
                        </span>
                    </>
                )}
            </div>

            <ul className="flex flex-col gap-2">
                {bullets.map((b) => (
                    <li key={b} className="text-small-fluid flex items-start gap-2 leading-relaxed">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-primary" aria-hidden />
                        <span>{b}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-auto flex items-center gap-2 rounded-xl border border-brand-primary/20 bg-[#F5E6C8]/50 p-3">
                <CreditCard className="size-4 shrink-0 text-brand-primary" aria-hidden />
                <p className="text-xs leading-tight font-medium">
                    <span className="text-brand-primary">{pack.cardRevenueShare}%</span>
                    <span className="text-muted-foreground"> {t('cardsSuffix')}</span>
                </p>
            </div>
        </AnimatedCard>
    );
}
