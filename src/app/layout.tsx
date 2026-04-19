import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

// TODO stack: réintégrer next/font (Inter, Poppins) lors de la reconstruction Tailwind/shadcn.
// import { Inter, Poppins } from 'next/font/google';
//
// const inter = Inter({
//     subsets: ['latin'],
//     variable: '--font-inter',
//     display: 'swap',
// });
//
// const poppins = Poppins({
//     subsets: ['latin'],
//     weight: ['400', '500', '600', '700', '800'],
//     variable: '--font-poppins',
//     display: 'swap',
// });

export const metadata: Metadata = {
    title: "SIMPLY — L'écosystème du sport amateur",
    description: 'Plateforme digitale pour la gestion de clubs sportifs amateurs en France.',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        viewportFit: 'cover',
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    // TODO Tailwind: <html className={`${inter.variable} ${poppins.variable}`}>
    // TODO Tailwind: <body className="antialiased">
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    );
}
