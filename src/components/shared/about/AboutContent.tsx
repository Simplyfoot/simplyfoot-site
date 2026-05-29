import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { BRANDS } from '@/utils/constants.utils';
import { BRAND_TEAMS, type TeamMember } from '@/utils/team.utils';

import type { BrandSlug } from '~types/brand.types';

interface AboutContentProps {
    brand: BrandSlug;
    /** Namespace i18n contenant les clés `heading`, `intro`, `team.*`, `story.*`. */
    namespace: string;
}

export async function AboutContent({ brand, namespace }: AboutContentProps) {
    const t = await getTranslations(namespace);
    const brandLabel = BRANDS[brand].label;
    const members = BRAND_TEAMS[brand];

    const founders = members.slice(0, 2);
    const developers = members.slice(2);

    const storyParagraphs = t.raw('story.paragraphs') as ReadonlyArray<string>;

    return (
        <article className="text-foreground">
            <div className="mx-auto w-full max-w-5xl px-6 py-12 md:px-8 md:py-20">
                <div className="bg-muted/50 border-border rounded-3xl border px-6 py-10 shadow-sm md:px-12 md:py-16">
                    <header className="mx-auto mb-12 max-w-3xl space-y-4 text-center md:mb-16 md:space-y-6">
                        <ScrollReveal>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                                {t('heading')}
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal delay={100}>
                            <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                                {renderRichText(t.raw('intro') as string, brandLabel)}
                            </p>
                        </ScrollReveal>
                    </header>

                    <section aria-label={t('team.title')}>
                        <ScrollReveal delay={200}>
                            <ul className="mx-auto flex flex-wrap justify-center gap-x-20 gap-y-10 md:gap-x-48">
                                {founders.map((member) => (
                                    <TeamCard
                                        key={member.id}
                                        member={member}
                                        role={t(`team.members.${member.id}.title`)}
                                        coFounder={t(`team.members.${member.id}.coFounder`)}
                                        photoAlt={t('team.photoAlt', { name: member.name })}
                                        noPhotoLabel={t('team.noPhoto')}
                                        linkedinLabel={t('team.linkedinLabel', {
                                            name: member.name,
                                        })}
                                    />
                                ))}
                            </ul>
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <ul className="mx-auto mt-10 flex w-full max-w-6xl flex-wrap justify-around gap-x-8 gap-y-10 md:mt-14 md:gap-x-16 md:gap-y-12">
                                {developers.map((member) => (
                                    <TeamCard
                                        key={member.id}
                                        member={member}
                                        role={t(`team.members.${member.id}.title`)}
                                        coFounder={t(`team.members.${member.id}.coFounder`)}
                                        photoAlt={t('team.photoAlt', { name: member.name })}
                                        noPhotoLabel={t('team.noPhoto')}
                                        linkedinLabel={t('team.linkedinLabel', {
                                            name: member.name,
                                        })}
                                    />
                                ))}
                            </ul>
                        </ScrollReveal>
                    </section>
                </div>
            </div>

            <section
                aria-labelledby="about-story-title"
                className="mx-auto max-w-3xl px-6 pb-12 md:px-8 md:pb-20"
            >
                <ScrollReveal>
                    <h2
                        id="about-story-title"
                        className="mb-6 text-2xl font-semibold tracking-tight md:mb-8 md:text-3xl"
                    >
                        {t('story.title')}
                    </h2>
                </ScrollReveal>

                <div className="text-foreground/90 space-y-5 text-base leading-relaxed md:text-lg md:leading-loose">
                    {storyParagraphs.slice(0, -1).map((paragraph, index) => (
                        <ScrollReveal key={index} delay={index * 80}>
                            <p className="text-justify hyphens-auto">
                                {renderRichText(paragraph, brandLabel)}
                            </p>
                        </ScrollReveal>
                    ))}

                    {storyParagraphs.length > 0 && (
                        <ScrollReveal>
                            <div className="mt-10 md:mt-12">
                                <div
                                    aria-hidden="true"
                                    className="bg-primary-400 mx-auto mb-6 h-1 w-32 rounded-full md:mb-8 md:w-48"
                                />
                                <p className="text-primary-700 text-justify text-lg leading-relaxed font-medium hyphens-auto italic md:text-xl">
                                    {renderRichText(
                                        storyParagraphs[storyParagraphs.length - 1] ?? '',
                                        brandLabel,
                                    )}
                                </p>
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </section>
        </article>
    );
}

interface TeamCardProps {
    member: TeamMember;
    role: string;
    coFounder: string;
    photoAlt: string;
    noPhotoLabel: string;
    linkedinLabel: string;
}

function TeamCard({
    member,
    role,
    coFounder,
    photoAlt,
    noPhotoLabel,
    linkedinLabel,
}: TeamCardProps) {
    const initials = getInitials(member.name);

    const visual = (
        <div className="relative mb-4 size-28 md:size-32">
            <div className="ring-primary-500 relative h-full w-full overflow-hidden rounded-full shadow-md ring-4">
                {member.photo ? (
                    <Image
                        src={member.photo}
                        alt={photoAlt}
                        fill
                        sizes="(min-width: 768px) 8rem, 7rem"
                        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                ) : (
                    <div
                        aria-label={noPhotoLabel}
                        role="img"
                        className="bg-primary-50 text-primary-700 flex h-full w-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110"
                    >
                        <span aria-hidden="true" className="text-4xl font-semibold tracking-tight">
                            {initials}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );

    const details = (
        <>
            <p className="text-base leading-tight font-semibold whitespace-nowrap md:text-lg">
                {member.name}
            </p>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">{role}</p>
            <p className="text-muted-foreground/80 text-xs md:text-sm">{coFounder}</p>
        </>
    );

    return (
        <li className="flex w-40 flex-col items-center text-center md:w-48">
            {member.linkedin ? (
                <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={linkedinLabel}
                    className="group focus-visible:ring-ring flex flex-col items-center rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
                >
                    {visual}
                    {details}
                </a>
            ) : (
                <div className="group flex flex-col items-center">
                    {visual}
                    {details}
                </div>
            )}
        </li>
    );
}

function getInitials(name: string): string {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
}

function interpolateBrand(text: string, brandLabel: string): string {
    return text.replaceAll('{brand}', brandLabel);
}

const EMPHASIS_PATTERN = /<em>(.*?)<\/em>/g;

type EmphasisTone = 'default' | 'onDark';

function renderRichText(
    text: string,
    brandLabel: string,
    tone: EmphasisTone = 'default',
): ReactNode {
    const interpolated = interpolateBrand(text, brandLabel);
    const nodes: ReactNode[] = [];

    const emphasisClass =
        tone === 'onDark' ? 'text-primary-100 font-semibold' : 'text-primary-700 font-semibold';

    let cursor = 0;
    let match: RegExpExecArray | null;
    let key = 0;

    EMPHASIS_PATTERN.lastIndex = 0;
    while ((match = EMPHASIS_PATTERN.exec(interpolated)) !== null) {
        if (match.index > cursor) {
            nodes.push(interpolated.slice(cursor, match.index));
        }

        nodes.push(
            <strong key={key++} className={emphasisClass}>
                {match[1]}
            </strong>,
        );

        cursor = match.index + match[0].length;
    }

    if (cursor < interpolated.length) {
        nodes.push(interpolated.slice(cursor));
    }

    return nodes;
}
