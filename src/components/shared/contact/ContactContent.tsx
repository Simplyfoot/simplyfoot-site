import { getTranslations } from 'next-intl/server';

import { ContactForm } from '@/components/shared/contact/ContactForm';
import { Link } from '@/i18n/navigation';
import { BRANDS } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';

interface ContactContentProps {
    brand: BrandSlug;
}

export async function ContactContent({ brand }: ContactContentProps) {
    const t = await getTranslations('Contact');
    const brandMeta = BRANDS[brand];

    return (
        <article className="text-foreground">
            <div className="mx-auto w-full max-w-4xl px-6 py-12 md:px-8 md:py-20">
                <header className="mb-8 max-w-3xl space-y-3 md:mb-10 md:space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        {t('heading', { brand: brandMeta.label })}
                    </h1>
                    <div aria-hidden="true" className="bg-primary-400 h-2 w-[34px] rounded-full" />
                    <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                        {t('intro')}
                    </p>
                </header>

                <section
                    aria-labelledby="contact-form-title"
                    className="bg-muted/50 dark:bg-muted/50 rounded-2xl p-6 md:p-10"
                >
                    <h2
                        id="contact-form-title"
                        className="mb-2 text-2xl font-semibold tracking-tight md:text-3xl"
                    >
                        {t('formTitle')}
                    </h2>
                    <p className="text-muted-foreground mb-8 text-sm">{t('formIntro')}</p>

                    <ContactForm brand={brand} />

                    <p
                        id="contact-legal-notice"
                        className="text-muted-foreground mt-8 text-xs leading-relaxed"
                    >
                        {t.rich('legalNotice', {
                            privacy: (chunks) => (
                                <Link
                                    href={`/${brand}/legal/privacy`}
                                    className="text-primary underline-offset-4 hover:underline focus-visible:underline"
                                >
                                    {chunks}
                                </Link>
                            ),
                        })}
                    </p>
                </section>
            </div>
        </article>
    );
}
