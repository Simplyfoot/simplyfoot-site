'use client';

import { Billboard, Text, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Group } from 'three';
import { Vector3 } from 'three';

import { useRootColor } from '@/hooks/useRootColor';

const FOOT_MODEL_PATH = '/images/planet-simplyfoot.glb';
const RUGBY_MODEL_PATH = '/images/planet-simplyrugby.glb';

const HOVER_SCALE = 1.15;
const BASE_ROTATION_SPEED = 0.3;
const HOVER_ROTATION_SPEED = 1.2;
const TAP_FEEDBACK_MS = 250;

interface BrandPlanetProps {
    /** Chemin public vers le `.glb` de la planète. Doit être un asset preloadable. */
    modelPath: string;
    label: string;
    position: [number, number, number];
    /** Scale d'orbite — animé au survol/tap pour le feedback. */
    scale?: number;
    /**
     * Scale intrinsèque du modèle GLB. Compense les modèles exportés à des
     * tailles différentes en source (ex. rugby exporté grand vs foot exporté
     * en unité). Appliqué à un wrapper interne, n'interfère pas avec les
     * animations d'orbite. Défaut 1 = pas de compensation.
     */
    modelScale?: number;
    labelFontSize?: number;
    isTouchDevice?: boolean;
    onClick: () => void;
}

/**
 * Planète 3D générique chargée depuis un asset GLB. Comportement identique
 * pour toutes les marques : rotation lente autour de Y, accélération au
 * survol/tap, scale lerp doux, label flottant en `Billboard` sous la
 * planète.
 *
 * Usage : passer `modelPath` pointant vers le `.glb` voulu (foot, rugby,
 * handball le jour où). Les chemins connus sont preloadés ci-dessous —
 * étendre la liste si une nouvelle marque arrive avec son modèle 3D.
 */
export function BrandPlanet({
    modelPath,
    label,
    position,
    scale = 1,
    modelScale = 1,
    labelFontSize = 0.35,
    isTouchDevice = false,
    onClick,
}: BrandPlanetProps) {
    const groupRef = useRef<Group>(null);
    const [hovered, setHovered] = useState(false);
    const [tapped, setTapped] = useState(false);
    const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const gltf = useGLTF(modelPath);
    const labelColor = useRootColor('--secondary');

    const clonedScene = useMemo(() => gltf.scene.clone(), [gltf.scene]);
    const _targetScale = useMemo(() => new Vector3(), []);

    const active = hovered || tapped;

    useEffect(() => {
        return () => {
            if (tapTimeoutRef.current) {
                clearTimeout(tapTimeoutRef.current);
            }
        };
    }, []);

    const handlePointerOver = useCallback(() => {
        if (isTouchDevice) {
            return;
        }
        setHovered(true);
        document.body.style.cursor = 'pointer';
    }, [isTouchDevice]);

    const handlePointerOut = useCallback(() => {
        if (isTouchDevice) {
            return;
        }
        setHovered(false);
        document.body.style.cursor = 'auto';
    }, [isTouchDevice]);

    const handleClick = useCallback(() => {
        if (isTouchDevice) {
            return;
        }
        onClick();
    }, [isTouchDevice, onClick]);

    const handlePointerDown = useCallback(() => {
        if (!isTouchDevice) {
            return;
        }
        setTapped(true);
        tapTimeoutRef.current = setTimeout(() => {
            onClick();
            setTapped(false);
        }, TAP_FEEDBACK_MS);
    }, [isTouchDevice, onClick]);

    const handlePointerUp = useCallback(() => {
        if (!isTouchDevice) {
            return;
        }
        // Safety cleanup — navigation already queued via timeout
    }, [isTouchDevice]);

    useFrame((_state, delta) => {
        if (groupRef.current) {
            const speed = active ? HOVER_ROTATION_SPEED : BASE_ROTATION_SPEED;
            groupRef.current.rotation.y += delta * speed;

            const s = active ? HOVER_SCALE * scale : scale;
            _targetScale.set(s, s, s);
            groupRef.current.scale.lerp(_targetScale, 0.1);
        }
    });

    return (
        <group position={position}>
            <group
                ref={groupRef}
                onClick={handleClick}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
            >
                <group scale={modelScale}>
                    <primitive object={clonedScene} />
                </group>
            </group>
            <Billboard position={[0, -1.6, 0]}>
                <Text fontSize={labelFontSize} color={labelColor} anchorX="center" anchorY="middle">
                    {label}
                </Text>
            </Billboard>
        </group>
    );
}

useGLTF.preload(FOOT_MODEL_PATH);
useGLTF.preload(RUGBY_MODEL_PATH);
