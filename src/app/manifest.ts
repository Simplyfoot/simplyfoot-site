import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "SIMPLY — L'ecosysteme du sport amateur",
        short_name: 'SIMPLY',
        description: 'Plateforme digitale pour la gestion de clubs sportifs amateurs en France.',
        start_url: '/',
        display: 'standalone',
        background_color: '#F8E9CA',
        theme_color: '#151B6B',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
