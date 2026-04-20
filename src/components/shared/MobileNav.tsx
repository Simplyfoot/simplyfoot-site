'use client';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import { type AppPathname } from '@/i18n/routing';
import { Button } from '@/shadcn/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/shadcn/drawer';
import { Separator } from '@/shadcn/separator';

interface NavItem {
    href: AppPathname;
    label: string;
}

interface MobileNavProps {
    navItems: readonly NavItem[];
    className?: string;
}

export function MobileNav({ navItems, className }: MobileNavProps) {
    const t = useTranslations('Header');

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t('mobileMenu.open')}
                    className={`text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:ring-primary-foreground/60 ${className ?? ''}`}
                >
                    <Menu className="size-6" aria-hidden="true" />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{t('mobileMenu.title')}</DrawerTitle>
                    <DrawerDescription className="sr-only">
                        {t('mobileMenu.title')}
                    </DrawerDescription>
                </DrawerHeader>

                <nav aria-label={t('nav.label')} className="px-4 pb-2">
                    <ul className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <DrawerClose asChild>
                                    <Link
                                        href={item.href}
                                        className="hover:bg-muted focus-visible:ring-ring block rounded-md px-4 py-4 text-lg font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
                                    >
                                        {item.label}
                                    </Link>
                                </DrawerClose>
                            </li>
                        ))}
                    </ul>
                </nav>

                <Separator className="my-2" />

                <div className="flex items-center justify-between gap-4 px-6 py-4">
                    <span className="text-muted-foreground text-sm font-medium">
                        {t('mobileMenu.languageLabel')}
                    </span>
                    <LanguageSwitcher variant="onLight" />
                </div>
            </DrawerContent>
        </Drawer>
    );
}
