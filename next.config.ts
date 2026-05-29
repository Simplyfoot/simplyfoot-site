import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { resolve } from 'path';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    outputFileTracingRoot: resolve(__dirname),
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
        ];
    },
    // L'URL canonique de la FAQ est localisée (/aide, /help, /ayuda).
    // On accepte `/faq` comme alias et on redirige en 308 vers la forme canonique
    // pour éviter le duplicate content côté SEO.
    async redirects() {
        const brands = ['foot', 'rugby', 'handball'] as const;
        const slugByLocale = { fr: 'aide', en: 'help', es: 'ayuda' } as const;

        return brands.flatMap((brand) => [
            {
                source: `/${brand}/faq`,
                destination: `/${brand}/${slugByLocale.fr}`,
                locale: false,
                permanent: true,
            },
            {
                source: `/en/${brand}/faq`,
                destination: `/en/${brand}/${slugByLocale.en}`,
                locale: false,
                permanent: true,
            },
            {
                source: `/es/${brand}/faq`,
                destination: `/es/${brand}/${slugByLocale.es}`,
                locale: false,
                permanent: true,
            },
        ]);
    },
};

export default withNextIntl(nextConfig);
