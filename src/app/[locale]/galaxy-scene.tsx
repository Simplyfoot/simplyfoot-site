'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { LoadingScreen } from './loading-screen';

const SimplyGalaxy = dynamic(() => import('@/components/3d/SimplyGalaxy'), {
    ssr: false,
    loading: () => <LoadingScreen />,
});

export function GalaxyScene() {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <SimplyGalaxy />
        </Suspense>
    );
}
