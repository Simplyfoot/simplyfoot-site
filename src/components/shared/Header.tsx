'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { brandNavItems, mainNavItems } from '@/config/navigation';
import { Link, usePathname } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';
import type { BrandSlug } from '@/types/brand';
import { BRANDS } from '@/types/brand';

const BRAND_LOGOS: Partial<Record<BrandSlug, string>> = {
    foot: '/images/logo-simplyfoot.png',
    rugby: '/images/logo-simplyrugby.png',
};

const BRAND_NAMES: Record<BrandSlug, string> = {
    foot: 'SimplyFoot',
    rugby: 'SimplyRugby',
    handball: 'SimplyHandball',
};

function detectBrand(pathname: string): BrandSlug | null {
    for (const brand of BRANDS) {
        if (pathname === `/${brand}` || pathname.startsWith(`/${brand}/`)) {
            return brand;
        }
    }
    return null;
}

export function Header() {
    const t = useTranslations();
    const pathname = usePathname();
    const activeBrand = detectBrand(pathname);

    const navItems = activeBrand ? brandNavItems[activeBrand] : mainNavItems;
    const homeHref = activeBrand ? `/${activeBrand}` : '/';
    const ctaHref = activeBrand ? `/${activeBrand}/contact` : '/contact';
    const ctaLabel = activeBrand ? t('foot.hero.cta') : t('common.cta.demo');
    const brandLogo = activeBrand ? BRAND_LOGOS[activeBrand] : null;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-md">
            <div className="container-simply flex h-14 items-center justify-between md:h-16">
                {/* Logo */}
                <Link href={homeHref} className="flex items-center gap-2">
                    {brandLogo ? (
                        <Image
                            src={brandLogo}
                            alt={BRAND_NAMES[activeBrand!]}
                            width={32}
                            height={32}
                            className="h-8 w-8"
                        />
                    ) : null}
                    <span className="font-display text-xl font-bold tracking-wider">
                        {activeBrand ? BRAND_NAMES[activeBrand] : t('common.brand')}
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-1 md:flex" aria-label={t('nav.home')}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                                pathname === item.href
                                    ? 'text-foreground'
                                    : 'text-muted-foreground',
                            )}
                        >
                            {t(item.labelKey)}
                        </Link>
                    ))}
                    <Link
                        href={ctaHref}
                        className={cn(buttonVariants({ size: 'lg' }), 'ml-2 min-h-11')}
                    >
                        {ctaLabel}
                    </Link>
                </nav>

                {/* Mobile hamburger + Sheet */}
                <Sheet>
                    <SheetTrigger className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg transition-colors hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">{t('nav.openMenu')}</span>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[85vw] max-w-100 p-0">
                        <div className="flex h-full flex-col">
                            <div className="flex items-center gap-2 p-6">
                                {brandLogo ? (
                                    <Image
                                        src={brandLogo}
                                        alt={BRAND_NAMES[activeBrand!]}
                                        width={28}
                                        height={28}
                                        className="h-7 w-7"
                                    />
                                ) : null}
                                <span className="font-display text-lg font-bold">
                                    {activeBrand ? BRAND_NAMES[activeBrand] : t('common.brand')}
                                </span>
                            </div>
                            <Separator />
                            <nav className="flex-1 p-4" aria-label={t('nav.home')}>
                                <ul className="space-y-1">
                                    {navItems.map((item) => (
                                        <li key={item.labelKey}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    'flex min-h-12 items-center rounded-lg px-4 text-base font-medium transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                                                    pathname === item.href
                                                        ? 'bg-accent text-foreground'
                                                        : '',
                                                )}
                                            >
                                                {t(item.labelKey)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div className="border-t p-4">
                                <Link
                                    href={ctaHref}
                                    className={cn(buttonVariants(), 'min-h-11 w-full')}
                                >
                                    {ctaLabel}
                                </Link>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
