import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

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
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            {t('heading')}
                        </h1>
                        <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                            {t('intro')}
                        </p>
                    </header>

                    <section aria-label={t('team.title')}>
                        <ul className="mx-auto flex flex-wrap justify-center gap-x-20 gap-y-10 md:gap-x-48">
                            {founders.map((member) => (
                                <TeamCard
                                    key={member.id}
                                    member={member}
                                    role={t(`team.members.${member.id}.title`)}
                                    coFounder={t(`team.members.${member.id}.coFounder`)}
                                    photoAlt={t('team.photoAlt', { name: member.name })}
                                    noPhotoLabel={t('team.noPhoto')}
                                    linkedinLabel={t('team.linkedinLabel', { name: member.name })}
                                />
                            ))}
                        </ul>

                        <ul className="mx-auto mt-10 flex w-full max-w-6xl flex-wrap justify-around gap-x-8 gap-y-10 md:mt-14 md:gap-x-16 md:gap-y-12">
                            {developers.map((member) => (
                                <TeamCard
                                    key={member.id}
                                    member={member}
                                    role={t(`team.members.${member.id}.title`)}
                                    coFounder={t(`team.members.${member.id}.coFounder`)}
                                    photoAlt={t('team.photoAlt', { name: member.name })}
                                    noPhotoLabel={t('team.noPhoto')}
                                    linkedinLabel={t('team.linkedinLabel', { name: member.name })}
                                />
                            ))}
                        </ul>
                    </section>
                </div>
            </div>

            <section
                aria-labelledby="about-story-title"
                className="mx-auto max-w-3xl px-6 pb-12 md:px-8 md:pb-20"
            >
                <h2
                    id="about-story-title"
                    className="mb-6 text-2xl font-semibold tracking-tight md:mb-8 md:text-3xl"
                >
                    {t('story.title')}
                </h2>

                <div className="text-foreground/90 space-y-5 text-base leading-relaxed md:text-lg md:leading-loose">
                    {storyParagraphs.map((paragraph, index) => (
                        <p key={index}>{interpolateBrand(paragraph, brandLabel)}</p>
                    ))}
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
            <p className="text-base leading-tight font-semibold md:text-lg">{member.name}</p>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">{role}</p>
            <p className="text-muted-foreground/80 text-xs md:text-sm">{coFounder}</p>
        </>
    );

    return (
        <li className="flex w-28 flex-col items-center text-center md:w-36">
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
