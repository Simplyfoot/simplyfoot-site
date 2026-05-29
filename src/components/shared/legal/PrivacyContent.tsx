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

interface PrivacyContentProps {
    brand: BrandSlug;
}

type PrivacyBlock =
    | { type: 'paragraph'; text: string }
    | { type: 'subheading'; text: string }
    | { type: 'list'; items: string[] }
    | { type: 'lines'; items: string[] };

interface PrivacySection {
    title: string;
    blocks?: PrivacyBlock[];
}

const sectionKeys = [
    'controller',
    'hosting',
    'service',
    'dataCollected',
    'purposes',
    'minors',
    'legalBasis',
    'recipients',
    'retention',
    'security',
    'transfers',
    'rights',
    'cookies',
    'modifications',
    'contact',
] as const;

interface PrivacySectionBodyProps {
    section: PrivacySection;
    brand: BrandSlug;
}

function renderParagraph(text: string, brand: BrandSlug, key: number) {
    const contactLinkPattern = /<contactLink>([\s\S]*?)<\/contactLink>/;
    const match = contactLinkPattern.exec(text);

    if (!match) {
        return <p key={key}>{text}</p>;
    }

    const [fullMatch, inner = ''] = match;
    const before = text.slice(0, match.index);
    const after = text.slice(match.index + fullMatch.length);

    return (
        <p key={key}>
            {before}
            <Link
                href={`/${brand}/contact`}
                className="text-primary underline-offset-4 hover:underline focus-visible:underline"
            >
                {inner}
            </Link>
            {after}
        </p>
    );
}

function PrivacySectionBody({ section, brand }: PrivacySectionBodyProps) {
    const blocks = section.blocks ?? [];

    return (
        <div className="text-muted-foreground space-y-4 text-base leading-relaxed md:text-lg">
            {blocks.map((block, index) => {
                if (block.type === 'paragraph') {
                    return renderParagraph(block.text, brand, index);
                }

                if (block.type === 'subheading') {
                    return (
                        <h3
                            key={index}
                            className="text-foreground pt-2 text-lg font-semibold tracking-tight md:text-xl"
                        >
                            {block.text}
                        </h3>
                    );
                }

                if (block.type === 'list') {
                    return (
                        <ul key={index} className="list-disc space-y-1 pl-6">
                            {block.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                            ))}
                        </ul>
                    );
                }

                return (
                    <address key={index} className="not-italic">
                        {block.items.map((line, lineIndex) => (
                            <span key={lineIndex} className="block">
                                {line}
                            </span>
                        ))}
                    </address>
                );
            })}
        </div>
    );
}

export async function PrivacyContent({ brand }: PrivacyContentProps) {
    const t = await getTranslations('Legal.privacy');
    const brandMeta = BRANDS[brand];

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
                        {t('introduction.description')}
                    </p>
                </header>

                <section className="bg-muted/50 space-y-12 rounded-2xl border-none p-8">
                    {sectionKeys.map((key) => {
                        const section = t.raw(`sections.${key}`) as PrivacySection;

                        return (
                            <section key={key} id={key} className="scroll-mt-24 space-y-4">
                                <h2 className="flex items-end gap-2 text-2xl font-semibold tracking-tight md:text-3xl">
                                    <span
                                        aria-hidden="true"
                                        className="bg-primary-400 h-6 w-2 shrink-0 translate-y-0.5 rounded-full"
                                    />
                                    <span>{section.title}</span>
                                </h2>
                                {key === 'controller' ? (
                                    <EditorSectionBody brand={brand} />
                                ) : key === 'hosting' ? (
                                    <HostingSectionBody />
                                ) : (
                                    <PrivacySectionBody section={section} brand={brand} />
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
