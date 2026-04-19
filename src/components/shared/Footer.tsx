import { Mail, MapPin, Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { FacebookIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/SocialIcons';
import { BRAND_CONTACT, SIMPLY_LEGAL } from '@/config/site';
import { Link } from '@/i18n/navigation';
import { BRANDS, type BrandSlug } from '@/lib/brand';
import { Button } from '@/shadcn/button';
import { Separator } from '@/shadcn/separator';

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
        { href: `/${brand}/legal/cgv`, label: t('links.cgv') },
        { href: `/${brand}/legal/privacy`, label: t('links.privacy') },
        { href: `/${brand}/legal/cookies`, label: t('links.cookies') },
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
        <footer className="bg-primary-700 text-primary-foreground">
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
                <div className="grid gap-10 md:grid-cols-4">
                    <div className="space-y-3">
                        <p className="text-lg font-semibold">{brandMeta.label}</p>
                        <p className="text-primary-foreground/80 text-sm">{t('tagline')}</p>
                    </div>

                    <nav aria-label={t('sections.legal')}>
                        <h2 className="mb-3 text-sm font-semibold">{t('sections.legal')}</h2>
                        <ul className="space-y-2 text-sm">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-primary-foreground/90 hover:text-primary-foreground transition-colors hover:underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <h2 className="mb-3 text-sm font-semibold">{t('sections.contact')}</h2>
                        <ul className="text-primary-foreground/90 space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail className="size-4 shrink-0" aria-hidden="true" />
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="hover:text-primary-foreground transition-colors hover:underline"
                                >
                                    {contact.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="size-4 shrink-0" aria-hidden="true" />
                                <a
                                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                                    className="hover:text-primary-foreground transition-colors hover:underline"
                                >
                                    {contact.phone}
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                                <span>{SIMPLY_LEGAL.address}</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-3 text-sm font-semibold">{t('sections.socials')}</h2>
                        <div className="flex gap-2">
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

                <div className="text-primary-foreground/70 flex flex-col items-start justify-between gap-3 text-xs md:flex-row md:items-center">
                    <p>
                        {SIMPLY_LEGAL.entity} · Capital {SIMPLY_LEGAL.capital} · SIRET{' '}
                        {SIMPLY_LEGAL.siret} · TVA {SIMPLY_LEGAL.tva}
                    </p>
                    <p>{t('copyright', { year })}</p>
                </div>
            </div>
        </footer>
    );
}
