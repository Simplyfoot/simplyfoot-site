'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { Points as PointsType } from 'three';

import { useRootColor } from '@/lib/brand';

interface StarfieldProps {
    count?: number;
}

export function Starfield({ count = 5000 }: StarfieldProps) {
    const ref = useRef<PointsType>(null);
    const starColor = useRootColor('--secondary');

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            pos[i3] = (Math.random() - 0.5) * 100;
            pos[i3 + 1] = (Math.random() - 0.5) * 100;
            pos[i3 + 2] = (Math.random() - 0.5) * 100;
        }
        return pos;
    }, [count]);

    const sizes = useMemo(() => {
        const s = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            s[i] = Math.random() * 1.5 + 0.5;
        }
        return s;
    }, [count]);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.02;
            ref.current.rotation.x += delta * 0.01;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color={starColor}
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}
