'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

interface FootballSceneProps {
  primaryColor: string;
  ctaColor: string;
}

function FootballMesh({ primaryColor, ctaColor }: FootballSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshPhysicalMaterial
        color={primaryColor}
        emissive={ctaColor}
        emissiveIntensity={0.5}
        metalness={0.15}
        roughness={0.3}
        clearcoat={0.8}
        clearcoatRoughness={0.1}
      />
      <Edges threshold={15} color={ctaColor} lineWidth={1.5} />
    </mesh>
  );
}

export default function FootballScene({ primaryColor, ctaColor }: FootballSceneProps) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 4, 5]} intensity={2} distance={12} color={ctaColor} />
      <pointLight position={[-3, -2, 4]} intensity={0.8} distance={10} />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
        <FootballMesh primaryColor={primaryColor} ctaColor={ctaColor} />
      </Float>

      <Sparkles
        count={60}
        size={3}
        speed={0.4}
        scale={5}
        color={ctaColor}
        opacity={0.6}
      />
    </>
  );
}
