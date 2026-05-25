import { DotIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { EditorSectionBody } from '@/components/shared/legal/EditorSectionBody';
import { HostingSectionBody } from '@/components/shared/legal/HostingSectionBody';
import { BRAND_CONTACT, SIMPLY_LEGAL } from '@/config/site';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/shadcn/breadcrumb';
import { BRANDS } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';

interface CguContentProps {
    brand: BrandSlug;
}

type CguBlock =
    | { type: 'paragraph'; text: string }
    | { type: 'list'; items: string[] }
    | { type: 'lines'; items: string[] }
    | { type: 'link'; label: string; url: string };

interface CguSection {
    title: string;
    blocks?: CguBlock[];
}

const sectionKeys = [
    'editor',
    'hosting',
    'definitions',
    'object',
    'service',
    'access',
    'clubSpace',
    'userAccount',
    'roles',
    'minors',
    'clubData',
    'acceptableUse',
    'userContent',
    'moderation',
    'notifications',
    'thirdParty',
    'paidOffers',
    'suspension',
    'accountClosure',
    'clubSpaceDeletion',
    'dataExport',
    'security',
    'availability',
    'support',
    'ipSimplyfoot',
    'feedback',
    'confidentiality',
    'personalData',
    'subprocessors',
    'liability',
    'userGuarantee',
    'forceMajeure',
    'cguModifications',
    'duration',
    'partialNullity',
    'nonWaiver',
    'proof',
    'claims',
    'mediation',
    'governingLaw',
    'contact',
] as const;

function interpolate(template: string, variables: Record<string, string>): string {
    return template.replace(/\{(\w+)\}/g, (match, key: string) =>
        Object.prototype.hasOwnProperty.call(variables, key) ? (variables[key] ?? match) : match,
    );
}

interface CguSectionBodyProps {
    section: CguSection;
    variables: Record<string, string>;
}

function CguSectionBody({ section, variables }: CguSectionBodyProps) {
    const blocks = section.blocks ?? [];

    return (
        <div className="text-muted-foreground space-y-4 text-base leading-relaxed md:text-lg">
            {blocks.map((block, index) => {
                if (block.type === 'paragraph') {
                    return <p key={index}>{interpolate(block.text, variables)}</p>;
                }

                if (block.type === 'list') {
                    return (
                        <ul key={index} className="list-disc space-y-1 pl-6">
                            {block.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{interpolate(item, variables)}</li>
                            ))}
                        </ul>
                    );
                }

                if (block.type === 'lines') {
                    return (
                        <address key={index} className="not-italic">
                            {block.items.map((line, lineIndex) => (
                                <span key={lineIndex} className="block">
                                    {interpolate(line, variables)}
                                </span>
                            ))}
                        </address>
                    );
                }

                return (
                    <p key={index}>
                        <span className="text-foreground font-medium">{block.label} :</span>{' '}
                        <a
                            href={block.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 focus-visible:ring-ring rounded-sm underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
                        >
                            {block.url}
                        </a>
                    </p>
                );
            })}
        </div>
    );
}

export async function CguContent({ brand }: CguContentProps) {
    const t = await getTranslations('Legal.cgu');
    const brandMeta = BRANDS[brand];

    const variables: Record<string, string> = {
        brand: brandMeta.label,
        entity: SIMPLY_LEGAL.entity,
        capital: SIMPLY_LEGAL.capital,
        address: SIMPLY_LEGAL.address,
        rcs: SIMPLY_LEGAL.rcs,
        tva: SIMPLY_LEGAL.tva,
        email: BRAND_CONTACT[brand].email,
    };

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
                            <BreadcrumbPage>{t('breadcrumb.effectiveDate')}</BreadcrumbPage>
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
                    {sectionKeys.map((key) => {
                        const section = t.raw(`sections.${key}`) as CguSection;
                        const title = interpolate(section.title, variables);

                        return (
                            <section key={key} id={key} className="scroll-mt-24 space-y-4">
                                <h2 className="flex items-end gap-2 text-2xl font-semibold tracking-tight md:text-3xl">
                                    <span
                                        aria-hidden="true"
                                        className="bg-primary-400 h-6 w-2 shrink-0 translate-y-0.5 rounded-full"
                                    />
                                    <span>{title}</span>
                                </h2>
                                {key === 'editor' ? (
                                    <EditorSectionBody brand={brand} />
                                ) : key === 'hosting' ? (
                                    <HostingSectionBody />
                                ) : (
                                    <CguSectionBody section={section} variables={variables} />
                                )}
                            </section>
                        );
                    })}
                </section>

                <p className="text-muted-foreground mt-12 text-center text-sm">
                    {t('copyright', { brand: brandMeta.label })}
                </p>
            </div>
        </article>
    );
}
