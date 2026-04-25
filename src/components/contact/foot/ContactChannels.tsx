'use client';

import { ClipboardList, Mail, MessageCircle, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { BRAND_CONTACT } from '@/config/site';
import { cn } from '@/lib/utils';

const FORM_SECTION_ID = 'contact-form';

/**
 * Couleur de marque WhatsApp (#25D366). Hex inline assumé : ce n'est PAS
 * un token du design system mais une couleur de marque tierce — l'identité
 * WhatsApp est un actif externe non personnalisable. Voir invariant
 * CLAUDE.md #2 (exception explicitement autorisée par le brief).
 */
const WHATSAPP_GREEN = '#25D366';

/**
 * Section "Comment souhaitez-vous nous joindre ?" — quatre cartes égales,
 * chacune ouvrant son canal natif (mailto, tel, wa.me, scroll vers
 * formulaire). La carte WhatsApp est légèrement mise en avant via une
 * bordure verte WhatsApp et un badge "NOUVEAU".
 *
 * Toute la carte est cliquable (touch target ≥ 44 px largement dépassé).
 */
export function ContactChannels() {
    const t = useTranslations('Contact.channels');
    const contact = BRAND_CONTACT.foot;

    const whatsappUrl = buildWhatsAppUrl(
        contact.whatsapp,
        useTranslations('Contact.whatsapp')('prefilledMessage'),
    );

    return (
        <section
            aria-labelledby="contact-channels-heading"
            className="bg-secondary-50 text-story-ink relative w-full"
        >
            <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-24">
                <div className="flex max-w-3xl flex-col gap-3">
                    <h2
                        id="contact-channels-heading"
                        className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] font-bold tracking-tight text-balance"
                    >
                        {t('title')}
                    </h2>
                    <p className="text-story-ink/70 max-w-[60ch] text-base leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <ChannelCard
                        icon={<Mail className="size-7" aria-hidden />}
                        label={t('email.label')}
                        value={contact.email}
                        description={t('email.description')}
                        href={`mailto:${contact.email}`}
                        ariaLabel={t('email.ariaLabel', { email: contact.email })}
                    />
                    <ChannelCard
                        icon={<Phone className="size-7" aria-hidden />}
                        label={t('phone.label')}
                        value={contact.phoneDisplay}
                        description={t('phone.description')}
                        href={`tel:${contact.phone}`}
                        ariaLabel={t('phone.ariaLabel', { phone: contact.phoneDisplay })}
                    />
                    <ChannelCard
                        icon={
                            <MessageCircle
                                className="size-7"
                                aria-hidden
                                style={{ color: WHATSAPP_GREEN }}
                            />
                        }
                        label={t('whatsapp.label')}
                        value={contact.phoneDisplay}
                        description={t('whatsapp.description')}
                        href={whatsappUrl}
                        ariaLabel={t('whatsapp.ariaLabel')}
                        external
                        highlight
                        badge={t('newBadge')}
                    />
                    <ChannelCard
                        icon={<ClipboardList className="size-7" aria-hidden />}
                        label={t('form.label')}
                        value={t('form.value')}
                        description={t('form.description')}
                        href={`#${FORM_SECTION_ID}`}
                        ariaLabel={t('form.ariaLabel')}
                    />
                </ul>
            </div>
        </section>
    );
}

interface ChannelCardProps {
    icon: ReactNode;
    label: string;
    value: string;
    description: string;
    href: string;
    ariaLabel: string;
    external?: boolean;
    highlight?: boolean;
    badge?: string;
}

function ChannelCard({
    icon,
    label,
    value,
    description,
    href,
    ariaLabel,
    external = false,
    highlight = false,
    badge,
}: ChannelCardProps) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' as const } : {};

    return (
        <li className="contents">
            <a
                href={href}
                aria-label={ariaLabel}
                {...externalProps}
                className={cn(
                    'group bg-story-cream-light text-story-ink relative flex min-h-[180px] flex-col gap-3 rounded-2xl p-6 shadow-[0_2px_12px_-6px_color-mix(in_srgb,var(--story-ink)_35%,transparent)] transition-all duration-200',
                    'border-primary border-t-[3px]',
                    'hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-18px_color-mix(in_srgb,var(--story-ink)_55%,transparent)]',
                    'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                    highlight && 'border-t-[3px]',
                )}
                style={
                    highlight
                        ? ({ borderTopColor: WHATSAPP_GREEN } as React.CSSProperties)
                        : undefined
                }
            >
                {badge && (
                    <span
                        className="absolute top-4 right-4 inline-flex items-center rounded-full px-2.5 py-1 text-[0.625rem] font-bold tracking-wider uppercase"
                        style={{
                            backgroundColor: WHATSAPP_GREEN,
                            color: '#FFFFFF',
                        }}
                    >
                        {badge}
                    </span>
                )}
                <span
                    className={cn(
                        'inline-flex size-12 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105',
                        highlight ? 'bg-secondary-50' : 'bg-primary/10 text-primary',
                    )}
                >
                    {icon}
                </span>
                <p className="font-display text-lg font-bold">{label}</p>
                <p className="text-story-ink/85 text-sm font-medium break-words">{value}</p>
                <p className="text-story-ink/55 mt-auto text-xs leading-relaxed">{description}</p>
            </a>
        </li>
    );
}

function buildWhatsAppUrl(digits: string, message: string): string {
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
