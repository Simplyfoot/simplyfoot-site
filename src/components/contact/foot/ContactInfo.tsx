'use client';

import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { BRAND_CONTACT } from '@/config/site';
import { BRANDS } from '@/utils/constants.utils';

const WHATSAPP_GREEN = '#25D366';

/**
 * Sidebar "Infos pratiques" du formulaire. Sticky desktop (top offset
 * pour passer sous le header), empilée sous le formulaire en mobile.
 * Trois cards : coordonnées (3 canaux directs), localisation, horaires.
 */
export function ContactInfo() {
    const t = useTranslations('Contact.info');
    const tWhatsApp = useTranslations('Contact.whatsapp');
    const contact = BRAND_CONTACT.foot;
    const brandLabel = BRANDS.foot.label;

    const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
        tWhatsApp('prefilledMessage'),
    )}`;

    return (
        <aside aria-labelledby="contact-info-heading" className="lg:sticky lg:top-24 lg:self-start">
            <h2 id="contact-info-heading" className="sr-only">
                {t('title')}
            </h2>

            <div className="flex flex-col gap-4">
                <Card title={t('contacts.title')}>
                    <ContactLine
                        icon={<Mail className="size-4" aria-hidden />}
                        label={t('contacts.emailLabel')}
                        value={contact.email}
                        href={`mailto:${contact.email}`}
                    />
                    <ContactLine
                        icon={<Phone className="size-4" aria-hidden />}
                        label={t('contacts.phoneLabel')}
                        value={contact.phoneDisplay}
                        href={`tel:${contact.phone}`}
                    />
                    <ContactLine
                        icon={
                            <MessageCircle
                                className="size-4"
                                aria-hidden
                                style={{ color: WHATSAPP_GREEN }}
                            />
                        }
                        label={t('contacts.whatsappLabel')}
                        value={contact.phoneDisplay}
                        href={whatsappUrl}
                        external
                    />
                </Card>

                <Card title={t('location.title')}>
                    <div className="flex items-start gap-3">
                        <span className="text-primary mt-0.5">
                            <MapPin className="size-4" aria-hidden />
                        </span>
                        <div className="text-story-ink/80 text-sm leading-relaxed">
                            <p className="font-semibold">
                                {t('location.company', { brand: brandLabel })}
                            </p>
                            <p>{t('location.address')}</p>
                            <p>{t('location.city')}</p>
                        </div>
                    </div>
                </Card>

                <Card title={t('hours.title')}>
                    <div className="flex items-start gap-3">
                        <span className="text-primary mt-0.5">
                            <Clock className="size-4" aria-hidden />
                        </span>
                        <ul className="text-story-ink/80 flex flex-col gap-1 text-sm leading-relaxed">
                            <li>{t('hours.weekdays')}</li>
                            <li>{t('hours.saturday')}</li>
                            <li>{t('hours.sunday')}</li>
                        </ul>
                    </div>
                </Card>
            </div>
        </aside>
    );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="bg-story-cream-light flex flex-col gap-3 rounded-2xl p-5 shadow-[0_2px_12px_-6px_color-mix(in_srgb,var(--story-ink)_25%,transparent)]">
            <p className="text-story-ink/60 text-[0.7rem] font-bold tracking-[0.2em] uppercase">
                {title}
            </p>
            <div className="flex flex-col gap-2">{children}</div>
        </div>
    );
}

interface ContactLineProps {
    icon: ReactNode;
    label: string;
    value: string;
    href: string;
    external?: boolean;
}

function ContactLine({ icon, label, value, href, external = false }: ContactLineProps) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' as const } : {};

    return (
        <a
            href={href}
            {...externalProps}
            className="text-story-ink hover:bg-secondary-50/60 focus-visible:ring-primary -mx-2 flex min-h-11 items-center gap-3 rounded-lg px-2 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
            <span className="text-primary">{icon}</span>
            <span className="flex flex-col">
                <span className="text-story-ink/60 text-[0.65rem] font-semibold tracking-wider uppercase">
                    {label}
                </span>
                <span className="text-sm font-medium">{value}</span>
            </span>
        </a>
    );
}
