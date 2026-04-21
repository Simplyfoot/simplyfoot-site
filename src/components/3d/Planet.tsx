'use client';

import { Billboard, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Mesh } from 'three';
import { Vector3 } from 'three';

import { useRootColor } from '@/hooks/useRootColor';

interface PlanetProps {
    label: string;
    color: string;
    position: [number, number, number];
    scale?: number;
    sphereSegments?: number;
    labelFontSize?: number;
    isTouchDevice?: boolean;
    onClick: () => void;
}

const HOVER_SCALE = 1.15;
const BASE_ROTATION_SPEED = 0.3;
const HOVER_ROTATION_SPEED = 1.2;
const TAP_FEEDBACK_MS = 250;

const _targetScale = new Vector3();

export function Planet({
    label,
    color,
    position,
    scale = 1,
    sphereSegments = 64,
    labelFontSize = 0.35,
    isTouchDevice = false,
    onClick,
}: PlanetProps) {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [tapped, setTapped] = useState(false);
    const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const labelColor = useRootColor('--secondary');

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
        if (meshRef.current) {
            const speed = active ? HOVER_ROTATION_SPEED : BASE_ROTATION_SPEED;
            meshRef.current.rotation.y += delta * speed;

            const s = active ? HOVER_SCALE * scale : scale;
            _targetScale.set(s, s, s);
            meshRef.current.scale.lerp(_targetScale, 0.1);
        }
    });

    return (
        <group position={position}>
            <mesh
                ref={meshRef}
                onClick={handleClick}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
            >
                <sphereGeometry args={[1, sphereSegments, sphereSegments]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.4}
                    metalness={0.1}
                    emissive={color}
                    emissiveIntensity={active ? 0.4 : 0.1}
                />
            </mesh>
            <Billboard position={[0, -1.6, 0]}>
                <Text fontSize={labelFontSize} color={labelColor} anchorX="center" anchorY="middle">
                    {label}
                </Text>
            </Billboard>
        </group>
    );
}
