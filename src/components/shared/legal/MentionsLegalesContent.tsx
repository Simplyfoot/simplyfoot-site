import { DotIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { BRAND_CONTACT, SIMPLY_HOSTING, SIMPLY_LEGAL } from '@/config/site';
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
    brandLabel: string;
}

interface EditorSectionBodyProps {
    brand: BrandSlug;
    brandLabel: string;
}

const editorFieldKeys = [
    'companyName',
    'registeredOffice',
    'rcs',
    'legalForm',
    'vat',
    'email',
    'publicationDirector',
] as const;

async function EditorSectionBody({ brand, brandLabel }: EditorSectionBodyProps) {
    const t = await getTranslations('Legal.mentionsLegales.sections.editor');

    const valueVars = {
        brand: brandLabel.toUpperCase(),
        entity: SIMPLY_LEGAL.entity,
        capital: SIMPLY_LEGAL.capital,
        address: SIMPLY_LEGAL.address,
        rcs: SIMPLY_LEGAL.rcs,
        tva: SIMPLY_LEGAL.tva,
        email: BRAND_CONTACT[brand].email,
    };

    return (
        <div className="text-muted-foreground space-y-4 text-base leading-relaxed md:text-lg">
            <p>{t('intro')}</p>
            <ul className="space-y-1">
                {editorFieldKeys.map((key) => (
                    <li key={key}>
                        <span className="text-foreground font-medium">
                            {t(`fields.${key}.label`)} :
                        </span>{' '}
                        {t(`fields.${key}.value`, valueVars)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

async function HostingSectionBody() {
    const t = await getTranslations('Legal.mentionsLegales.sections.hosting');

    return (
        <div className="text-muted-foreground space-y-4 text-base leading-relaxed md:text-lg">
            <p>{t('intro')}</p>
            <address className="not-italic">
                <span className="block">{SIMPLY_HOSTING.name}</span>
                {SIMPLY_HOSTING.addressLines.map((line) => (
                    <span key={line} className="block">
                        {line}
                    </span>
                ))}
                <span className="block">{t('country')}</span>
            </address>
            <p>
                <span className="text-foreground font-medium">{t('websiteLabel')} :</span>{' '}
                <a
                    href={SIMPLY_HOSTING.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 focus-visible:ring-ring rounded-sm underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
                >
                    {SIMPLY_HOSTING.website}
                </a>
            </p>
        </div>
    );
}

async function DataSectionBody({ brandLabel }: DataSectionBodyProps) {
    const t = await getTranslations('Legal.mentionsLegales.sections.data');

    const complianceList = t.raw('complianceList') as string[];
    const consultList = t.raw('consultList') as string[];

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
                    <li key={item}>{item}</li>
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
                                <EditorSectionBody brand={brand} brandLabel={brandMeta.label} />
                            ) : key === 'hosting' ? (
                                <HostingSectionBody />
                            ) : key === 'data' ? (
                                <DataSectionBody brandLabel={brandMeta.label} />
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
