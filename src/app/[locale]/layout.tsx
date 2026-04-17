import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';

import { routing } from '@/lib/i18n/routing';

import '../globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-poppins',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "SIMPLY — L'écosystème du sport amateur",
    description: 'Plateforme digitale pour la gestion de clubs sportifs amateurs en France.',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        viewportFit: 'cover',
    },
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as 'fr' | 'en')) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} className={`${inter.variable} ${poppins.variable}`}>
            <body className="antialiased">
                <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
            </body>
        </html>
    );
}
