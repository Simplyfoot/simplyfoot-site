import type { Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { Analytics } from '@/components/shared/Analytics';
import { routing } from '@/i18n/routing';
import { Toaster } from '@/shadcn/sonner';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return (
        <html lang={locale} suppressHydrationWarning>
            <body>
                <NextIntlClientProvider>
                    {children}
                    <Toaster richColors closeButton position="bottom-right" />
                </NextIntlClientProvider>
                <Analytics />
            </body>
        </html>
    );
}
