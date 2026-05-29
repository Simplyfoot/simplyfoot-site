import { Mail, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { FacebookIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/SocialIcons';
import { BRAND_CONTACT, SIMPLY_LEGAL } from '@/config/site';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shadcn/button';
import { Separator } from '@/shadcn/separator';
import { BRANDS } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';

interface FooterProps {
    brand: BrandSlug;
}

export async function Footer({ brand }: FooterProps) {
    const t = await getTranslations('Footer');
    const brandMeta = BRANDS[brand];
    const contact = BRAND_CONTACT[brand];
    const year = new Date().getFullYear();

    const legalLinks = [
        { href: `/${brand}/legal/mentions-legales`, label: t('links.mentionsLegales') },
        { href: `/${brand}/legal/cgu`, label: t('links.cgu') },
        { href: null, label: t('links.cgv') },
        { href: `/${brand}/legal/privacy`, label: t('links.privacy') },
        { href: `/${brand}/faq`, label: t('links.faq') },
        { href: `/${brand}/contact`, label: t('links.contact') },
    ] as const;

    const socials = [
        { href: contact.socials.facebook, label: t('socialLabel.facebook'), Icon: FacebookIcon },
        { href: contact.socials.linkedin, label: t('socialLabel.linkedin'), Icon: LinkedinIcon },
        {
            href: contact.socials.instagram,
            label: t('socialLabel.instagram'),
            Icon: InstagramIcon,
        },
    ] as const;

    return (
        <footer className="bg-primary-800 text-primary-foreground relative z-10 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.35)]">
            <div className="mx-auto max-w-7xl px-6 pt-12 pb-6 md:px-12 md:pt-16">
                <div className="grid gap-10 md:grid-cols-3">
                    {/* Column 1 — Company identity + contact */}
                    <div className="space-y-5 text-sm">
                        <p className="text-lg font-semibold">
                            {brandMeta.label} — {SIMPLY_LEGAL.entity}
                        </p>
                        <ul className="text-primary-foreground/90 space-y-1">
                            <li>{t('company.capital', { capital: SIMPLY_LEGAL.capital })}</li>
                            <li>{t('company.rcs', { rcs: SIMPLY_LEGAL.rcs })}</li>
                            <li>{t('company.tva', { tva: SIMPLY_LEGAL.tva })}</li>
                        </ul>
                        <ul className="text-primary-foreground/90 space-y-2">
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                                <span>{SIMPLY_LEGAL.address}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="size-4 shrink-0" aria-hidden="true" />
                                <Link
                                    href={`/${brand}/contact`}
                                    className="hover:text-primary-foreground transition-colors hover:underline"
                                >
                                    {contact.email}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2 — Legal menu */}
                    <nav aria-label={t('sections.legal')}>
                        <h2 className="mb-3 text-sm font-semibold">{t('sections.legal')}</h2>
                        <ul className="space-y-2 text-sm">
                            {legalLinks.map((link) =>
                                link.href ? (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-primary-foreground/90 hover:text-primary-foreground transition-colors hover:underline"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ) : (
                                    <li key={link.label}>
                                        <span
                                            aria-disabled="true"
                                            className="text-primary-foreground/60 cursor-not-allowed"
                                        >
                                            {link.label}
                                        </span>
                                    </li>
                                ),
                            )}
                        </ul>
                    </nav>

                    {/* Column 3 — Socials */}
                    <div>
                        <h2 className="mb-3 text-sm font-semibold">{t('sections.socials')}</h2>
                        <p className="text-primary-foreground/80 text-sm">
                            {t('socialsDescription')}
                        </p>
                        <div className="mt-4 flex gap-2">
                            {socials.map(({ href, label, Icon }) =>
                                href ? (
                                    <Button
                                        key={label}
                                        asChild
                                        variant="ghost"
                                        size="icon"
                                        aria-label={label}
                                        className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                                    >
                                        <a href={href} target="_blank" rel="noopener noreferrer">
                                            <Icon className="size-5" aria-hidden="true" />
                                        </a>
                                    </Button>
                                ) : null,
                            )}
                        </div>
                    </div>
                </div>

                <Separator className="bg-primary-foreground/20 my-8" />

                <p className="text-primary-foreground/70 text-center text-xs">
                    {t('copyright', { year, brand: brandMeta.label })}
                </p>
            </div>
        </footer>
    );
}
