'use client';

import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import type { Group } from 'three';

import { useRootColor } from '@/hooks/useRootColor';

const PLANET_PATH = '/images/planet-simplyfoot.glb';

interface InnovationPlanetProps {
    ariaLabel: string;
}

function RotatingPlanet() {
    const ref = useRef<Group>(null);
    const gltf = useGLTF(PLANET_PATH);
    const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.1;
            ref.current.rotation.x = Math.sin(_state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <group ref={ref} scale={1.6}>
            <primitive object={scene} />
        </group>
    );
}

/**
 * Scène 3D "innovation" — planète SimplyFoot tournant lentement sur fond
 * sombre profond. Éclairage plus dramatique que le hero : deux lumières
 * rim (bleue + verte) pour créer une ambiance "quelque chose arrive".
 *
 * Lit les couleurs via `useRootColor` pour rester cohérent avec les
 * tokens — pas de hex hardcodé côté Three.js (invariant projet #2).
 */
export function InnovationPlanet({ ariaLabel }: InnovationPlanetProps) {
    const rimCool = useRootColor('--info-500');
    const rimWarm = useRootColor('--story-forest-glow');

    return (
        <div
            role="img"
            aria-label={ariaLabel}
            className="pointer-events-none absolute inset-0 motion-reduce:opacity-60"
        >
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 40 }}
                dpr={[1, 1.75]}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.25} />
                <directionalLight position={[3, 2, 4]} intensity={0.9} />
                <directionalLight position={[-4, -1, -2]} intensity={0.8} color={rimCool} />
                <directionalLight position={[0, 4, -4]} intensity={0.5} color={rimWarm} />
                <Suspense fallback={null}>
                    <RotatingPlanet />
                </Suspense>
            </Canvas>
        </div>
    );
}

useGLTF.preload(PLANET_PATH);
