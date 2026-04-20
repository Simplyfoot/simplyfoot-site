import { DotIcon, Mail, MapPin, Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { BRAND_CONTACT, SIMPLY_LEGAL } from '@/config/site';
import { BRANDS, type BrandSlug } from '@/lib/brand';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/shadcn/breadcrumb';

interface MentionsLegalesContentProps {
    brand: BrandSlug;
}

export async function MentionsLegalesContent({ brand }: MentionsLegalesContentProps) {
    const t = await getTranslations('Legal.mentionsLegales');
    const brandMeta = BRANDS[brand];
    const contact = BRAND_CONTACT[brand];

    const sectionKeys = [
        'presentation',
        'object',
        'ip',
        'liability',
        'data',
        'links',
        'law',
        'contact',
    ] as const;

    return (
        <article className="text-foreground">
            <div className="mx-auto w-full max-w-4xl px-6 py-12 md:px-8 md:py-20">
                <Breadcrumb className="bg-muted/50 mb-8 inline-flex w-fit rounded-xl px-4 py-2">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <span>{brandMeta.label}</span>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <DotIcon />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <span>{t('breadcrumb.legal')}</span>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <DotIcon />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{t('breadcrumb.updatedOn')}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <header className="mb-12 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                        {t('heading')}
                    </h1>
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                        {t('introduction.title')}
                    </h2>
                    <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
                        {t('introduction.description', { brand: brandMeta.label })}
                    </p>
                </header>

                <div className="space-y-12">
                    {sectionKeys.map((key) => (
                        <section key={key} id={key} className="scroll-mt-24 space-y-4">
                            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                                {t(`sections.${key}.title`)}
                            </h2>
                            <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                                {t(`sections.${key}.body`, { brand: brandMeta.label })}
                            </p>
                        </section>
                    ))}
                </div>

                <section
                    id="contact-block"
                    aria-labelledby="contact-block-title"
                    className="bg-muted/40 border-border/60 rounded-2xl border p-8 mt-4 md:p-10"
                >
                    <dl className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                            <dt className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                                <Mail className="size-4" aria-hidden="true" />
                                {t('contactBlock.emailLabel')}
                            </dt>
                            <dd>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="text-primary focus-visible:ring-ring rounded-sm font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
                                >
                                    {contact.email}
                                </a>
                            </dd>
                        </div>
                        <div className="space-y-2">
                            <dt className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                                <Phone className="size-4" aria-hidden="true" />
                                {t('contactBlock.phoneLabel')}
                            </dt>
                            <dd>
                                <a
                                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                                    className="text-primary focus-visible:ring-ring rounded-sm font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
                                >
                                    {contact.phone}
                                </a>
                            </dd>
                        </div>
                        <div className="space-y-2">
                            <dt className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                                <MapPin className="size-4" aria-hidden="true" />
                                {t('contactBlock.addressLabel')}
                            </dt>
                            <dd className="text-foreground text-sm">{SIMPLY_LEGAL.address}</dd>
                        </div>
                    </dl>
                </section>
            </div>
        </article>
    );
}
