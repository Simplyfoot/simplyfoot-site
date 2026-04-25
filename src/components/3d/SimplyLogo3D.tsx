'use client';

import { Billboard, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { Group, Mesh, MeshStandardMaterial } from 'three';
import { Vector3 } from 'three';

import { readRootCssVar, resolveCssColorToHex } from '@/utils/cssColor.utils';

const MODEL_PATH = '/images/logo-Simply3D.glb';

const PULSE_AMPLITUDE = 0.04;
const PULSE_FREQUENCY = 1.6;

interface SimplyLogo3DProps {
    scale?: number;
}

export function SimplyLogo3D({ scale = 1 }: SimplyLogo3DProps) {
    const outerRef = useRef<Group>(null);
    const innerRef = useRef<Group>(null);
    const gltf = useGLTF(MODEL_PATH);

    const clonedScene = useMemo(() => {
        const emissiveHex = resolveCssColorToHex(readRootCssVar('--secondary'));
        const scene = gltf.scene.clone();
        scene.traverse((child) => {
            const mesh = child as Mesh;
            if (mesh.isMesh) {
                const baseMat = mesh.material as MeshStandardMaterial;
                const mat = baseMat.clone();
                mat.emissive?.set(emissiveHex);
                mat.emissiveIntensity = 0.35;
                mat.toneMapped = true;
                mesh.material = mat;
                mesh.castShadow = false;
                mesh.receiveShadow = false;
            }
        });
        return scene;
    }, [gltf.scene]);

    const baseScale = useMemo(() => new Vector3(scale, scale, scale), [scale]);
    const targetScale = useMemo(() => new Vector3(), []);

    useFrame((state) => {
        if (!innerRef.current) {
            return;
        }
        const elapsedTime = state.clock.elapsedTime;
        const pulse = 1 + Math.sin(elapsedTime * PULSE_FREQUENCY) * PULSE_AMPLITUDE;
        targetScale.copy(baseScale).multiplyScalar(pulse);
        innerRef.current.scale.copy(targetScale);
    });

    return (
        <Billboard follow ref={outerRef}>
            <group ref={innerRef} scale={baseScale}>
                <primitive object={clonedScene} />
            </group>
        </Billboard>
    );
}

useGLTF.preload(MODEL_PATH);
