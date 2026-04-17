import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { GalaxyScene } from './galaxy-scene';
import { HomepageOverlay } from './homepage-overlay';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('home');
    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default function HomePage() {
    return (
        <main className="relative h-svh w-full overflow-hidden bg-simply-black">
            <div className="absolute inset-0">
                <GalaxyScene />
            </div>
            <HomepageOverlay />
        </main>
    );
}
