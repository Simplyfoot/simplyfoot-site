import { DotIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { EditorSectionBody } from '@/components/shared/legal/EditorSectionBody';
import { HostingSectionBody } from '@/components/shared/legal/HostingSectionBody';
import { Link } from '@/i18n/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/shadcn/breadcrumb';
import { BRANDS } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';

interface MentionsLegalesContentProps {
    brand: BrandSlug;
}

interface DataSectionBodyProps {
    brand: BrandSlug;
    brandLabel: string;
}

type ConsultItemKey = 'privacy' | 'cookies';

interface ConsultItem {
    key: ConsultItemKey;
    label: string;
}

async function DataSectionBody({ brand, brandLabel }: DataSectionBodyProps) {
    const t = await getTranslations('Legal.mentionsLegales.sections.data');

    const complianceList = t.raw('complianceList') as string[];
    const consultList = t.raw('consultList') as ConsultItem[];

    // Les deux items renvoient vers la page combinée confidentialité + cookies.
    const consultHrefByKey: Record<ConsultItemKey, `/${BrandSlug}/legal/privacy`> = {
        privacy: `/${brand}/legal/privacy`,
        cookies: `/${brand}/legal/privacy`,
    };

    return (
        <div className="text-muted-foreground space-y-4 text-base leading-relaxed md:text-lg">
            <p>{t('intro', { brand: brandLabel })}</p>
            <ul className="list-disc space-y-1 pl-6">
                {complianceList.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <p>{t('usage')}</p>
            <p>{t('rights')}</p>
            <p>{t('consultIntro')}</p>
            <ul className="list-disc space-y-1 pl-6">
                {consultList.map((item) => (
                    <li key={item.key}>
                        <Link
                            href={consultHrefByKey[item.key]}
                            className="text-primary underline-offset-4 hover:underline focus-visible:underline"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function MentionsLegalesContent({ brand }: MentionsLegalesContentProps) {
    const t = await getTranslations('Legal.mentionsLegales');
    const brandMeta = BRANDS[brand];

    const sectionKeys = [
        'editor',
        'hosting',
        'activity',
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
                <Breadcrumb className="bg-muted/50 mb-8 ml-auto block w-fit rounded-xl px-4 py-2">
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
                    <h1 className="mb-4 text-center text-4xl font-bold tracking-tight md:text-5xl">
                        {t('heading')}
                    </h1>
                    <div
                        aria-hidden="true"
                        className="bg-primary-400 mx-auto mb-16 h-2 w-[34px] rounded-full"
                    />
                    <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                        {t('introduction.title')}
                    </h2>
                    <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
                        {t('introduction.description', { brand: brandMeta.label })}
                    </p>
                </header>

                <section className="bg-muted/50 space-y-12 rounded-2xl border-none p-8">
                    {sectionKeys.map((key) => (
                        <section key={key} id={key} className="scroll-mt-24 space-y-4">
                            <h2 className="flex items-end gap-2 text-2xl font-semibold tracking-tight md:text-3xl">
                                <span
                                    aria-hidden="true"
                                    className="bg-primary-400 h-6 w-2 shrink-0 translate-y-0.5 rounded-full"
                                />
                                <span>{t(`sections.${key}.title`)}</span>
                            </h2>
                            {key === 'editor' ? (
                                <EditorSectionBody brand={brand} />
                            ) : key === 'hosting' ? (
                                <HostingSectionBody />
                            ) : key === 'data' ? (
                                <DataSectionBody brand={brand} brandLabel={brandMeta.label} />
                            ) : key === 'contact' ? (
                                <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                                    {t.rich('sections.contact.body', {
                                        brand: brandMeta.label,
                                        contactLink: (chunks) => (
                                            <Link
                                                href={`/${brand}/contact`}
                                                className="text-primary underline-offset-4 hover:underline focus-visible:underline"
                                            >
                                                {chunks}
                                            </Link>
                                        ),
                                    })}
                                </p>
                            ) : (
                                <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                                    {t(`sections.${key}.body`, { brand: brandMeta.label })}
                                </p>
                            )}
                        </section>
                    ))}
                </section>
            </div>
        </article>
    );
}
