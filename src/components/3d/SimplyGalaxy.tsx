'use client';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
// TODO landing-nav: réactiver le routeur Next pour la navigation vers les sous-marques.
// import { useRouter } from 'next/navigation';
// import { useCallback } from 'react';
import { TOUCH } from 'three';

import { BRAND_COLORS, SIMPLY_COLORS } from '@/lib/constants';
import { useDeviceConfig } from '@/lib/hooks/use-device-config';
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

import { FootPlanet } from './FootPlanet';
import { GalaxyFallback } from './GalaxyFallback';
import { OrbitingGroup } from './OrbitingGroup';
import { Planet } from './Planet';
import { SimplyLogo3D } from './SimplyLogo3D';
import { Starfield } from './Starfield';

// TODO landing-nav: planètes désactivées (cliquables → no-op).
// Réactiver onClick={() => navigateTo('/foot' | '/rugby' | '/handball')} à la reconnexion.
const noop = () => {};

function Scene() {
    const config = useDeviceConfig();

    // const router = useRouter();
    // const navigateTo = useCallback(
    //     (path: string) => {
    //         router.push(path);
    //     },
    //     [router],
    // );

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, config.cameraZ]} fov={config.fov} />

            <OrbitControls
                enableZoom
                minDistance={4}
                maxDistance={25}
                enablePan={false}
                enableDamping
                dampingFactor={0.08}
                autoRotate
                autoRotateSpeed={config.autoRotateSpeed}
                enableRotate
                rotateSpeed={0.6}
                touches={{ ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }}
            />

            <ambientLight intensity={0.35} />
            <pointLight
                position={[0, 0, 0]}
                intensity={2.2}
                color={SIMPLY_COLORS.beige}
                distance={25}
                decay={1.6}
            />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.35} color={SIMPLY_COLORS.beige} />

            <Starfield count={config.starCount} />

            <SimplyLogo3D scale={config.logoScale} />

            <OrbitingGroup {...config.planetOrbits.foot}>
                <FootPlanet
                    label="Football"
                    position={[0, 0, 0]}
                    scale={config.planetScale.foot}
                    labelFontSize={config.labelFontSize}
                    isTouchDevice={config.isTouchDevice}
                    onClick={noop}
                />
            </OrbitingGroup>
            <OrbitingGroup {...config.planetOrbits.rugby}>
                <Planet
                    label="Rugby"
                    color={BRAND_COLORS.rugby.primary}
                    position={[0, 0, 0]}
                    scale={config.planetScale.rugby}
                    sphereSegments={config.sphereSegments}
                    labelFontSize={config.labelFontSize}
                    isTouchDevice={config.isTouchDevice}
                    onClick={noop}
                />
            </OrbitingGroup>
            <OrbitingGroup {...config.planetOrbits.handball}>
                <Planet
                    label="Handball"
                    color={BRAND_COLORS.handball.primary}
                    position={[0, 0, 0]}
                    scale={config.planetScale.handball}
                    sphereSegments={config.sphereSegments}
                    labelFontSize={config.labelFontSize}
                    isTouchDevice={config.isTouchDevice}
                    onClick={noop}
                />
            </OrbitingGroup>

            {config.bloomEnabled && (
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                        intensity={0.8}
                        mipmapBlur
                    />
                </EffectComposer>
            )}
        </>
    );
}

// default export required by next/dynamic() — consumer loads this via
// dynamic(() => import('@/components/3d/SimplyGalaxy'), { ssr: false })
export default function SimplyGalaxy() {
    const prefersReducedMotion = useReducedMotion();
    const config = useDeviceConfig();

    if (prefersReducedMotion) {
        return <GalaxyFallback />;
    }

    return (
        <Canvas
            className="h-full w-full"
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            dpr={config.dpr}
            aria-hidden="true"
        >
            <color attach="background" args={[SIMPLY_COLORS.black]} />
            <Scene />
        </Canvas>
    );
}
