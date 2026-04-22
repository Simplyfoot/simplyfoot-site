'use client';

import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import type { Group } from 'three';

import { useRootColor } from '@/hooks/useRootColor';

const PLANET_PATH = '/images/planet-simplyfoot.glb';

interface Hero3DSceneProps {
    ariaLabel: string;
}

function RotatingPlanet() {
    const ref = useRef<Group>(null);
    const gltf = useGLTF(PLANET_PATH);
    const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <group ref={ref} position={[0, -0.6, 0]} scale={1.8}>
            <primitive object={scene} />
        </group>
    );
}

/**
 * Scène 3D d'arrière-plan du hero « Features ». Planète SimplyFoot qui
 * tourne lentement en fond, éclairage inspiré des tokens du design
 * system (`--story-forest` / `--story-forest-glow` résolus via
 * `useRootColor` pour rester cohérent avec la palette narrative — pas de
 * hex hardcodé côté Three.js).
 */
export function Hero3DScene({ ariaLabel }: Hero3DSceneProps) {
    const skyColor = useRootColor('--primary-200');
    const groundColor = useRootColor('--story-forest');
    const rimLight = useRootColor('--story-forest-glow');

    return (
        <div
            role="img"
            aria-label={ariaLabel}
            className="pointer-events-none absolute inset-0 motion-reduce:opacity-50"
        >
            <Canvas
                camera={{ position: [0, 0.4, 4.2], fov: 42 }}
                dpr={[1, 1.75]}
                gl={{ antialias: true, alpha: true }}
            >
                <hemisphereLight args={[skyColor, groundColor, 0.9]} />
                <ambientLight intensity={0.45} />
                <directionalLight position={[3, 4, 2]} intensity={1.2} />
                <directionalLight position={[-2, -1, -2]} intensity={0.35} color={rimLight} />
                <Suspense fallback={null}>
                    <RotatingPlanet />
                </Suspense>
            </Canvas>
        </div>
    );
}

useGLTF.preload(PLANET_PATH);
