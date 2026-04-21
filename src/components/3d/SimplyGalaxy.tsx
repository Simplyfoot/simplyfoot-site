'use client';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useCallback } from 'react';
import { TOUCH } from 'three';

import { useBrandColor } from '@/hooks/useBrandColor';
import { useDeviceConfig } from '@/hooks/useDeviceConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useRootColor } from '@/hooks/useRootColor';
import { useRouter } from '@/i18n/navigation';

import { FootPlanet } from './FootPlanet';
import { GalaxyReducedMotion } from './GalaxyReducedMotion';
import { OrbitingGroup } from './OrbitingGroup';
import { Planet } from './Planet';
import { SimplyLogo3D } from './SimplyLogo3D';
import { Starfield } from './Starfield';

function Scene() {
    const config = useDeviceConfig();
    const rugbyPrimary = useBrandColor('rugby');
    const handballPrimary = useBrandColor('handball');
    const ambientWarm = useRootColor('--secondary');
    const router = useRouter();

    const goToFoot = useCallback(() => router.push('/foot'), [router]);
    const goToRugby = useCallback(() => router.push('/rugby'), [router]);
    const goToHandball = useCallback(() => router.push('/handball'), [router]);

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
                color={ambientWarm}
                distance={25}
                decay={1.6}
            />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.35} color={ambientWarm} />

            <Starfield count={config.starCount} />

            <SimplyLogo3D scale={config.logoScale} />

            <OrbitingGroup {...config.planetOrbits.foot}>
                <FootPlanet
                    label="Football"
                    position={[0, 0, 0]}
                    scale={config.planetScale.foot}
                    labelFontSize={config.labelFontSize}
                    isTouchDevice={config.isTouchDevice}
                    onClick={goToFoot}
                />
            </OrbitingGroup>
            <OrbitingGroup {...config.planetOrbits.rugby}>
                <Planet
                    label="Rugby"
                    color={rugbyPrimary || '#000000'}
                    position={[0, 0, 0]}
                    scale={config.planetScale.rugby}
                    sphereSegments={config.sphereSegments}
                    labelFontSize={config.labelFontSize}
                    isTouchDevice={config.isTouchDevice}
                    onClick={goToRugby}
                />
            </OrbitingGroup>
            <OrbitingGroup {...config.planetOrbits.handball}>
                <Planet
                    label="Handball"
                    color={handballPrimary || '#000000'}
                    position={[0, 0, 0]}
                    scale={config.planetScale.handball}
                    sphereSegments={config.sphereSegments}
                    labelFontSize={config.labelFontSize}
                    isTouchDevice={config.isTouchDevice}
                    onClick={goToHandball}
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
        return <GalaxyReducedMotion />;
    }

    return (
        <Canvas
            className="h-full w-full"
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            dpr={config.dpr}
            aria-hidden="true"
        >
            <color attach="background" args={['#000000']} />
            <Scene />
        </Canvas>
    );
}
