import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { Button } from '@/shadcn/button';

import type { BrandSlug } from '~types/brand.types';
import type { AppPathname } from '~types/i18n.types';

interface IntroSectionProps {
    brand: BrandSlug;
    /** Namespace i18n contenant les clés `intro.*` (title, description, subDescription, cta, screenshotAlt). */
    namespace: string;
}

export async function IntroSection({ brand, namespace }: IntroSectionProps) {
    const t = await getTranslations(namespace);
    const contactHref = `/${brand}/contact` as AppPathname;

    return (
        <section
            id="intro"
            aria-labelledby="intro-heading"
            className="bg-primary-700 text-primary-foreground relative overflow-hidden py-20 md:py-28"
        >
            <Image
                src={`/brands/${brand}/intro_background.png`}
                alt=""
                fill
                priority
                aria-hidden="true"
                className="object-cover object-center"
                sizes="100vw"
            />
            <div aria-hidden="true" className="bg-primary-700/70 absolute inset-0" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-12">
                <div>
                    <h1
                        id="intro-heading"
                        className="intro-rise text-primary-100 text-4xl leading-tight font-bold tracking-tight md:text-5xl"
                    >
                        {t('intro.title')}
                    </h1>

                    <p className="intro-rise intro-rise-delay-1 text-primary-foreground mt-6 text-lg leading-relaxed md:text-xl">
                        {t('intro.description')}
                    </p>

                    <div className="intro-rise intro-rise-delay-3 mt-10">
                        <Button asChild size="lg" className="text-base">
                            <Link href={contactHref}>
                                {t('intro.cta')}
                                <ArrowRight aria-hidden="true" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="intro-phone-in flex justify-center md:justify-end">
                    <PhoneFrame>
                        <Image
                            src={`/brands/${brand}/app_home.png`}
                            alt={t('intro.screenshotAlt')}
                            width={270}
                            height={600}
                            priority
                            className="block h-auto w-[240px] object-contain md:w-[270px]"
                        />
                    </PhoneFrame>
                </div>
            </div>
        </section>
    );
}

interface PhoneFrameProps {
    children: React.ReactNode;
}

function PhoneFrame({ children }: PhoneFrameProps) {
    return (
        <div className="bg-foreground rotate-6 rounded-[2.5rem] p-3 shadow-2xl ring-1 ring-white/10 transition-transform duration-500 hover:rotate-3">
            <div className="relative overflow-hidden rounded-[2rem]">
                {children}

                {/* Dynamic island façon iPhone */}
                <div
                    aria-hidden="true"
                    className="bg-foreground absolute top-0.5 left-1/2 h-3 w-20 -translate-x-1/2 rounded-full"
                />
            </div>
        </div>
    );
}
