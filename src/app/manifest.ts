import type { MetadataRoute } from 'next';

/**
 * PWA manifest. Hex literals are unavoidable here — the spec requires a static
 * JSON with hex colors, read by the OS before any CSS is loaded. Keep these
 * values in sync with the default (:root) palette in src/app/globals.css:
 *   - background_color  mirrors --secondary (splash screen tint)
 *   - theme_color       mirrors --primary   (OS chrome / brand identity)
 */
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'SIMPLY — The amateur sports ecosystem',
        short_name: 'SIMPLY',
        description: 'Digital platform for managing amateur sports clubs in France.',
        start_url: '/',
        display: 'standalone',
        background_color: '#F8E9CA',
        theme_color: '#567E66',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
