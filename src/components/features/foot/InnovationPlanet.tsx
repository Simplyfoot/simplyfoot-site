'use client';

import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import type { Group } from 'three';
import { MathUtils } from 'three';

import { AtmosphereShell } from '@/components/3d/AtmosphereShell';
import { useRootColor } from '@/hooks/useRootColor';

/* ═══════════════════════════════════════════════════════════════════════════
   InnovationPlanet — planète SimplyFoot du teaser "Innovation".
   ───────────────────────────────────────────────────────────────────────────
   Sœur cinématique de `Hero3DScene` partageant le même GLB, mais avec une
   palette froide et un éclairage plus dramatique pour soutenir un message
   de "quelque chose arrive". Pas de parallaxe ni d'ombre de contact : la
   planète flotte dans le vide, comme posée sur un fond sombre profond.
   ═══════════════════════════════════════════════════════════════════════════ */

const PLANET_PATH = '/images/planet-simplyfoot.glb';

const ROTATION_SPEED = 0.1;
const WOBBLE_AMPLITUDE = 0.1;
const WOBBLE_FREQUENCY = 0.3;
const TILT_LERP = 0.04;
const PLANET_SCALE = 1.6;

interface InnovationPlanetProps {
    ariaLabel: string;
}

function Planet({ atmosphereColor }: { atmosphereColor: string }) {
    const groupRef = useRef<Group>(null);
    const planetRef = useRef<Group>(null);

    const gltf = useGLTF(PLANET_PATH);
    const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

    useFrame((state, delta) => {
        if (planetRef.current) {
            planetRef.current.rotation.y += delta * ROTATION_SPEED;
        }
        const group = groupRef.current;
        if (group) {
            // Wobble très lent — donne l'impression que la planète "respire"
            const wobble = Math.sin(state.clock.elapsedTime * WOBBLE_FREQUENCY) * WOBBLE_AMPLITUDE;
            group.rotation.x = MathUtils.lerp(group.rotation.x, wobble, TILT_LERP);
        }
    });

    return (
        <group ref={groupRef}>
            <group ref={planetRef} scale={PLANET_SCALE}>
                <primitive object={scene} />
                <AtmosphereShell color={atmosphereColor} intensity={1.05} power={2.2} />
            </group>
        </group>
    );
}

/**
 * Scène 3D du teaser innovation. Même GLB que `Hero3DScene`, lumières
 * rim cool/warm pour ambiance "exo-monde", halo Fresnel froid légèrement
 * plus dense (intensity 1.05) pour contraste avec le fond `--story-midnight`.
 */
export function InnovationPlanet({ ariaLabel }: InnovationPlanetProps) {
    const rimCool = useRootColor('--info-500');
    const rimWarm = useRootColor('--story-forest-glow');
    const atmosphereColor = useRootColor('--info-500');

    return (
        <div
            role="img"
            aria-label={ariaLabel}
            className="pointer-events-none absolute inset-0 motion-reduce:opacity-60"
        >
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 40, near: 0.1, far: 50 }}
                dpr={[1, 1.75]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <ambientLight intensity={0.25} />
                <directionalLight position={[3, 2, 4]} intensity={0.9} />
                <directionalLight position={[-4, -1, -2]} intensity={0.8} color={rimCool} />
                <directionalLight position={[0, 4, -4]} intensity={0.5} color={rimWarm} />
                <Suspense fallback={null}>
                    <Planet atmosphereColor={atmosphereColor} />
                </Suspense>
            </Canvas>
        </div>
    );
}

useGLTF.preload(PLANET_PATH);
