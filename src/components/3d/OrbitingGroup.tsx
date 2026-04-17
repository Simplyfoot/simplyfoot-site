'use client';

import { useFrame } from '@react-three/fiber';
import { type ReactNode, useRef } from 'react';
import type { Group } from 'three';

export interface OrbitConfig {
    radius: number;
    speed: number;
    phase: number;
    inclination: number;
}

interface OrbitingGroupProps extends OrbitConfig {
    children: ReactNode;
}

export function OrbitingGroup({ radius, speed, phase, inclination, children }: OrbitingGroupProps) {
    const groupRef = useRef<Group>(null);

    useFrame((state) => {
        if (!groupRef.current) {
            return;
        }
        const t = state.clock.elapsedTime * speed + phase;
        groupRef.current.position.x = Math.cos(t) * radius;
        groupRef.current.position.z = Math.sin(t) * radius;
        groupRef.current.position.y = Math.sin(t) * radius * inclination;
    });

    return <group ref={groupRef}>{children}</group>;
}
