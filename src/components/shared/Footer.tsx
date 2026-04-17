'use client';

import { useTranslations } from 'next-intl';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/lib/i18n/routing';

interface FooterSection {
    titleKey: string;
    links: { labelKey: string; href: string }[];
}

const FOOTER_SECTIONS: FooterSection[] = [
    {
        titleKey: 'footer.platform',
        links: [
            { labelKey: 'nav.about', href: '/a-propos' },
            { labelKey: 'nav.contact', href: '/contact' },
            { labelKey: 'common.cta.demo', href: '/contact' },
        ],
    },
    {
        titleKey: 'footer.sports',
        links: [
            { labelKey: 'brands.foot.name', href: '/foot' },
            { labelKey: 'brands.rugby.name', href: '/rugby' },
            { labelKey: 'brands.handball.name', href: '/handball' },
        ],
    },
    {
        titleKey: 'footer.resources',
        links: [
            { labelKey: 'nav.blog', href: '/foot/blog' },
            { labelKey: 'nav.faq', href: '/foot/faq' },
            { labelKey: 'nav.offers', href: '/foot/offres' },
        ],
    },
];

export function Footer() {
    const t = useTranslations();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[--simply-black] text-[--simply-beige]">
            <div className="container-simply py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand column */}
                    <div className="text-center md:col-span-2 md:text-left lg:col-span-1">
                        <span className="font-display text-xl font-bold tracking-wider">
                            {t('common.brand')}
                        </span>
                        <p className="text-small-fluid mt-4 opacity-60">{t('footer.tagline')}</p>
                    </div>

                    {/* Desktop columns */}
                    {FOOTER_SECTIONS.map((section) => (
                        <div key={section.titleKey} className="hidden space-y-3 md:block">
                            <h3 className="text-h4 font-semibold">{t(section.titleKey)}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.labelKey}>
                                        <Link
                                            href={link.href}
                                            className="text-small-fluid rounded-sm py-1 opacity-60 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                        >
                                            {t(link.labelKey)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Mobile accordions */}
                    <div className="col-span-1 md:hidden">
                        <Accordion>
                            {FOOTER_SECTIONS.map((section) => (
                                <AccordionItem key={section.titleKey} value={section.titleKey}>
                                    <AccordionTrigger className="min-h-12 text-h4 font-semibold">
                                        {t(section.titleKey)}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-2 pb-2">
                                            {section.links.map((link) => (
                                                <li key={link.labelKey}>
                                                    <Link
                                                        href={link.href}
                                                        className="text-small-fluid block py-2 opacity-60 transition-opacity hover:opacity-100"
                                                    >
                                                        {t(link.labelKey)}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>

                <Separator className="my-8 opacity-10" />

                <div className="flex flex-col items-center justify-between gap-4 text-caption opacity-50 md:flex-row">
                    <p>
                        &copy; {year} SIMPLY. {t('footer.rights')}
                    </p>
                    <div className="flex gap-1">
                        <Link
                            href="/cgu"
                            className="inline-flex min-h-11 items-center rounded-lg px-2 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                            {t('footer.terms')}
                        </Link>
                        <Link
                            href="/confidentialite"
                            className="inline-flex min-h-11 items-center rounded-lg px-2 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                            {t('footer.privacy')}
                        </Link>
                        <Link
                            href="/mentions-legales"
                            className="inline-flex min-h-11 items-center rounded-lg px-2 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                            {t('footer.legal')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
