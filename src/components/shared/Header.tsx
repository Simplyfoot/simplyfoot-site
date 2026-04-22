'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { MobileNav } from '@/components/shared/MobileNav';
import { Link } from '@/i18n/navigation';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/shadcn/navigation-menu';
import { BRANDS } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';

interface HeaderProps {
    brand: BrandSlug;
}

export function Header({ brand }: HeaderProps) {
    const t = useTranslations('Header');
    const { label, name } = BRANDS[brand];

    // L'offre payante n'est livrée que sur la marque `foot` en V1 — ajoute
    // l'entrée de nav uniquement pour ce contexte pour éviter un 404 sur
    // rugby / handball.
    const navItems = [
        { href: `/${brand}/about`, label: t('nav.about') },
        { href: `/${brand}/faq`, label: t('nav.faq') },
        ...(brand === 'foot'
            ? ([{ href: '/foot/offers' as const, label: t('nav.offers') }] as const)
            : ([] as const)),
        { href: `/${brand}/contact`, label: t('nav.contact') },
    ] as const;

    // Default navigationMenuTriggerStyle() assumes a light background;
    // override for the dark header surface.
    const navLinkClass =
        'text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground focus:bg-primary-foreground/10 focus:text-primary-foreground data-[active=true]:bg-primary-foreground/10';

    return (
        <header className="bg-primary-600 text-primary-foreground sticky top-0 z-30 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)]">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 md:px-12">
                <Link
                    href={`/${brand}`}
                    aria-label={t('logoAlt', { brand: label })}
                    className="focus-visible:ring-primary-foreground/60 focus-visible:ring-offset-primary-900 flex items-center gap-3 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                    <Image
                        src={`/brands/${brand}/logo.png`}
                        alt=""
                        width={40}
                        height={40}
                        priority
                        className="size-10 object-contain"
                    />
                    <h2 className="text-2xl font-semibold">
                        <span className="text-secondary-50">Simply</span>
                        <span className="text-primary-200">{name}</span>
                    </h2>
                </Link>

                <div className="hidden items-center gap-2 md:flex">
                    <NavigationMenu aria-label={t('nav.label')}>
                        <NavigationMenuList>
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.href}>
                                    <NavigationMenuLink
                                        asChild
                                        className={`${navigationMenuTriggerStyle()} ${navLinkClass}`}
                                    >
                                        <Link href={item.href}>{item.label}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <LanguageSwitcher />
                </div>

                <MobileNav navItems={navItems} className="md:hidden" />
            </div>
        </header>
    );
}
