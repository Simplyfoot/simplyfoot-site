import type { Metadata } from 'next';

import { GalaxyScene } from './galaxy-scene';
import { HomepageOverlay } from './homepage-overlay';

// TODO i18n: home.meta.title / home.meta.description — réactiver via getTranslations à la reconstruction de la couche i18n.
export const metadata: Metadata = {
    title: "SIMPLY — L'écosystème du sport amateur",
    description:
        'Plateforme digitale pour la gestion de clubs sportifs amateurs en France. Football, Rugby, Handball.',
};

export default function HomePage() {
    // TODO Tailwind: className="relative h-svh w-full overflow-hidden bg-simply-black"
    // TODO Tailwind: className="absolute inset-0"
    return (
        <main>
            <div>
                <GalaxyScene />
            </div>
            <HomepageOverlay />
        </main>
    );
}
