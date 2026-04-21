'use client';

import { useFrame } from '@react-three/fiber';
import { type ReactNode, useRef } from 'react';
import type { Group } from 'three';

import type { OrbitConfig } from '~types/threeD.types';

interface OrbitingGroupProps extends OrbitConfig {
    children: ReactNode;
}

export function OrbitingGroup({ radius, speed, phase, inclination, children }: OrbitingGroupProps) {
    const groupRef = useRef<Group>(null);

    useFrame((state) => {
        if (!groupRef.current) {
            return;
        }

        const orbitalTime = state.clock.elapsedTime * speed + phase;

        groupRef.current.position.x = Math.cos(orbitalTime) * radius;
        groupRef.current.position.z = Math.sin(orbitalTime) * radius;
        groupRef.current.position.y = Math.sin(orbitalTime) * radius * inclination;
    });

    return <group ref={groupRef}>{children}</group>;
}
