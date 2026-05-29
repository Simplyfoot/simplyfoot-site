'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Link } from '@/i18n/navigation';
import { BRANDS } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';

interface StickyLegalBarProps {
    brand: BrandSlug;
}

export function StickyLegalBar({ brand }: StickyLegalBarProps) {
    const t = useTranslations('Footer');
    const brandMeta = BRANDS[brand];
    const year = new Date().getFullYear();
    const [footerVisible, setFooterVisible] = useState(false);

    useEffect(() => {
        const footer = document.querySelector('footer');
        if (!footer) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry) {
                    setFooterVisible(entry.isIntersecting);
                }
            },
            { threshold: 0 },
        );

        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    const links = [
        { href: `/${brand}/legal/mentions-legales`, label: t('links.mentionsLegales') },
        { href: `/${brand}/legal/privacy`, label: t('links.privacy') },
    ] as const;

    return (
        <div
            role="contentinfo"
            aria-label={t('sections.legal')}
            aria-hidden={footerVisible}
            className={`bg-background/80 border-border/60 supports-[backdrop-filter]:bg-background/60 fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-md transition-all duration-300 ease-out ${
                footerVisible
                    ? 'pointer-events-none translate-y-full opacity-0'
                    : 'translate-y-0 opacity-100'
            }`}
        >
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-2 text-xs md:flex-row md:px-12">
                <p className="text-muted-foreground">
                    {t('copyright', { year, brand: brandMeta.label })}
                </p>
                <nav aria-label={t('sections.legal')}>
                    <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-sm transition-colors hover:underline focus-visible:ring-2 focus-visible:outline-none"
                                    tabIndex={footerVisible ? -1 : 0}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
