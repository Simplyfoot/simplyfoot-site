'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { Suspense, useEffect, useState } from 'react';

const SPHERES = [
  { color: '#1B5E20', emissive: '#29be4f', position: [-3.5, 0.8, -1] as [number, number, number] },
  { color: '#A8332A', emissive: '#D4A66A', position: [0, -0.5, -2] as [number, number, number] },
  { color: '#1E1B4B', emissive: '#F97316', position: [3.5, 0.3, -1] as [number, number, number] },
];

function BrandSphere({ color, emissive, position }: (typeof SPHERES)[number]) {
  const meshRef = useRef<THREE.Mesh>(null!);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.12,
      0.02,
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.06,
      0.02,
    );
  });

  return (
    <group ref={groupRef}>
      {SPHERES.map((s, i) => (
        <BrandSphere key={i} {...s} />
      ))}
    </group>
  );
}

export default function EcosystemHero() {
  const prefersReduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (prefersReduced || !ready) return null;

  return (
    <Suspense fallback={null}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.1} />
        {SPHERES.map((s, i) => (
          <pointLight key={i} position={[s.position[0], s.position[1] + 1, 3]} intensity={2.5} distance={6} color={s.emissive} />
        ))}
        <SceneContent />
      </Canvas>
    </Suspense>
  );
}
