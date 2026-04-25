'use client';

import { ContactShadows, useGLTF } from '@react-three/drei';
import { Canvas, type ThreeEvent, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import type { Group } from 'three';
import { MathUtils, Vector2 } from 'three';

import { AtmosphereShell } from '@/components/3d/AtmosphereShell';
import { useRootColor } from '@/hooks/useRootColor';

/* ═══════════════════════════════════════════════════════════════════════════
   Hero3DScene — planète SimplyFoot du hero (home + features).
   ───────────────────────────────────────────────────────────────────────────
   Scène volontairement sobre, pensée pour vivre EN ARRIÈRE-PLAN d'un texte.
   - Planète GLB (asset shared brand) avec rotation lente sur Y et flottement
     vertical.
   - Halo Fresnel via `AtmosphereShell` (token --story-forest-glow).
   - Parallaxe pointeur très douce sur le groupe — réagit à la souris sans
     jamais bouger assez pour distraire d'un titre placé au-dessus.
   - ContactShadows pour ancrer la planète sur la mise en page.
   - Toutes les couleurs sont lues via `useRootColor` → tokens du design
     system (invariant CLAUDE.md #2 : zéro hex hardcodé).
   ═══════════════════════════════════════════════════════════════════════════ */

const PLANET_PATH = '/images/planet-simplyfoot.glb';

const ROTATION_SPEED = 0.18;
const FLOAT_AMPLITUDE = 0.08;
const FLOAT_FREQUENCY = 0.45;
const PARALLAX_PITCH = 0.18;
const PARALLAX_ROLL = -0.12;
const PARALLAX_LERP = 0.05;
const PLANET_SCALE = 1.45;
const PLANET_REST_Y = -0.55;

interface Hero3DSceneProps {
    ariaLabel: string;
}

function Planet({ atmosphereColor }: { atmosphereColor: string }) {
    const groupRef = useRef<Group>(null);
    const planetRef = useRef<Group>(null);
    const target = useRef(new Vector2());

    const gltf = useGLTF(PLANET_PATH);
    const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

    useFrame((state, delta) => {
        if (planetRef.current) {
            planetRef.current.rotation.y += delta * ROTATION_SPEED;
        }
        const group = groupRef.current;
        if (group) {
            const t = state.clock.elapsedTime;
            group.position.y = PLANET_REST_Y + Math.sin(t * FLOAT_FREQUENCY) * FLOAT_AMPLITUDE;
            group.rotation.x = MathUtils.lerp(
                group.rotation.x,
                target.current.y * PARALLAX_PITCH,
                PARALLAX_LERP,
            );
            group.rotation.z = MathUtils.lerp(
                group.rotation.z,
                target.current.x * PARALLAX_ROLL,
                PARALLAX_LERP,
            );
        }
    });

    const handlePointer = (event: ThreeEvent<PointerEvent>) => {
        target.current.set(event.pointer.x, event.pointer.y);
    };

    return (
        <group ref={groupRef} onPointerMove={handlePointer}>
            <group ref={planetRef} scale={PLANET_SCALE}>
                <primitive object={scene} />
                <AtmosphereShell color={atmosphereColor} intensity={0.85} power={2.6} />
            </group>
        </group>
    );
}

/**
 * Scène 3D d'arrière-plan du hero SimplyFoot. Charge le GLB partagé,
 * applique un halo atmosphérique tokenisé, ajoute une parallaxe pointeur
 * subtile et des ombres de contact. Doit être chargée via
 * `dynamic({ ssr: false })` côté consommateur (invariant projet R3F).
 */
export function Hero3DScene({ ariaLabel }: Hero3DSceneProps) {
    const skyColor = useRootColor('--primary-200');
    const groundColor = useRootColor('--story-forest');
    const rimLight = useRootColor('--story-forest-glow');
    const atmosphereColor = useRootColor('--story-forest-glow');
    const shadowColor = useRootColor('--story-midnight');

    return (
        <div
            role="img"
            aria-label={ariaLabel}
            className="pointer-events-none absolute inset-0 motion-reduce:opacity-50"
        >
            <Canvas
                camera={{ position: [0, 0.4, 4.2], fov: 42, near: 0.1, far: 50 }}
                dpr={[1, 1.75]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                <hemisphereLight args={[skyColor, groundColor, 0.9]} />
                <ambientLight intensity={0.45} />
                <directionalLight position={[3, 4, 2]} intensity={1.2} />
                <directionalLight position={[-2, -1, -2]} intensity={0.35} color={rimLight} />
                <Suspense fallback={null}>
                    <Planet atmosphereColor={atmosphereColor} />
                    <ContactShadows
                        position={[0, -2.05, 0]}
                        opacity={0.45}
                        scale={6}
                        blur={2.4}
                        far={3}
                        color={shadowColor}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

useGLTF.preload(PLANET_PATH);
