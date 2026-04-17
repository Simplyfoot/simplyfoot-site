'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { GradientButton } from '@/components/shared/GradientButton';
import { ParticleBackground } from '@/components/shared/ParticleBackground';
import { PhoneMockup } from '@/components/shared/PhoneMockup';
import { SectionDivider } from '@/components/shared/SectionDivider';
import { buttonVariants } from '@/components/ui/button';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';
import { Link } from '@/lib/i18n/routing';
import { SPORT_MOTION } from '@/lib/motion/sport-motion';
import { cn } from '@/lib/utils';

export function HeroFoot() {
    const t = useTranslations('foot.hero');
    const rootRef = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const motion = SPORT_MOTION.foot;

    useGSAP(
        () => {
            if (!rootRef.current || reduced) {
                return;
            }
            const ease = `cubic-bezier(${motion.ease.join(',')})`;
            const tl = gsap.timeline({ defaults: { ease } });

            tl.fromTo(
                '[data-hero="badge"]',
                { y: 10, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.35, delay: 0.2 },
            )
                .fromTo(
                    '[data-hero="title"] > span',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.03 },
                    '-=0.15',
                )
                .fromTo(
                    '[data-hero="subtitle"]',
                    { y: 12, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.35 },
                    '-=0.2',
                )
                .fromTo(
                    '[data-hero="cta"] > *',
                    { y: 10, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3, stagger: 0.08 },
                    '-=0.2',
                )
                .fromTo(
                    '[data-hero="visual"]',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4 },
                    '-=0.4',
                );
        },
        { scope: rootRef, dependencies: [reduced] },
    );

    const title = t('title');
    const words = title.split(/\s+/);

    return (
        <div
            ref={rootRef}
            className="relative min-h-[88svh] overflow-hidden bg-[--brand-surface-dark] text-[--simply-beige]"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,158,138,0.35)_0%,rgba(26,46,34,0.6)_45%,transparent_80%)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(86,126,102,0.25),transparent_55%)]"
            />
            <ParticleBackground sport="foot" density={18} />

            <div
                className={cn(
                    'container-simply relative z-10 flex min-h-[88svh] flex-col items-center justify-between gap-12 py-(--space-section-y)',
                    'lg:flex-row lg:items-center',
                )}
            >
                <div className="flex max-w-xl flex-col items-start gap-6">
                    <span
                        data-hero="badge"
                        className={cn(
                            'text-small-fluid inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-medium',
                            'bg-brand-primary/20 text-brand-primary-light ring-1 ring-brand-primary/30 backdrop-blur-sm',
                        )}
                    >
                        <span className="inline-block size-1.5 rounded-full bg-brand-primary-light" />
                        {t('badge')}
                    </span>

                    <h1
                        data-hero="title"
                        className="font-display text-display leading-[1.05] font-bold text-balance"
                    >
                        {words.map((word, i) => (
                            <span
                                key={`${word}-${i}`}
                                className="mr-[0.25em] inline-block will-change-transform"
                            >
                                {word}
                            </span>
                        ))}
                    </h1>

                    <p
                        data-hero="subtitle"
                        className="text-body-fluid max-w-[60ch] leading-relaxed text-balance text-[--simply-beige]/80"
                    >
                        {t('subtitle')}
                    </p>

                    <div data-hero="cta" className="flex flex-wrap items-center gap-4 pt-2">
                        <GradientButton href="/foot/programme-pilote">
                            {t('cta')}
                            <ArrowRight className="size-4" />
                        </GradientButton>

                        <Link
                            href="#features"
                            className={cn(
                                buttonVariants({ variant: 'outline', size: 'lg' }),
                                'min-h-11 border-[--simply-beige]/30 px-6 text-[--simply-beige]',
                                'hover:border-[--simply-beige]/60 hover:bg-[--simply-beige]/10 hover:text-[--simply-beige]',
                            )}
                        >
                            {t('ctaSecondary')}
                            <ChevronDown className="ml-2 size-4" />
                        </Link>
                    </div>
                </div>

                <div
                    data-hero="visual"
                    className="relative hidden flex-1 items-center justify-center lg:flex"
                    style={{ perspective: '1200px' }}
                >
                    <div className="animate-[hero-float_6s_ease-in-out_infinite] transform-3d">
                        <PhoneMockup
                            src="/brands/foot/app-coach.png"
                            alt="SimplyFoot — vue Coach"
                            priority
                        />
                    </div>
                    <div
                        aria-hidden
                        className="absolute -bottom-10 left-1/2 h-10 w-56 -translate-x-1/2 rounded-[50%] bg-black/50 blur-2xl"
                    />
                </div>
            </div>

            <SectionDivider
                sport="foot"
                className="absolute inset-x-0 bottom-0 text-[--brand-bg]"
                colorClass="text-[--brand-bg]"
            />

            <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(-8px) rotateY(2deg); }
          50% { transform: translateY(8px) rotateY(-2deg); }
        }
      `}</style>
        </div>
    );
}
