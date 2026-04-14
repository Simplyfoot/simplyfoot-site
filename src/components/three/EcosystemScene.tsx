'use client';

import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import type { BrandId } from 'lib/config/brands';

interface BrandSphere {
  id: BrandId;
  slug: string;
  name: string;
  primaryColor: string;
  ctaColor: string;
}

interface EcosystemSceneProps {
  brands: BrandSphere[];
}

const POSITIONS: [number, number, number][] = [
  [-2.8, 0.6, 0],
  [2.8, 0.6, 0],
  [0, -1.8, 0],
];

const FLOAT_CONFIGS = [
  { speed: 1.5, rotationIntensity: 0.3, floatIntensity: 0.8 },
  { speed: 1.2, rotationIntensity: 0.25, floatIntensity: 0.6 },
  { speed: 1.8, rotationIntensity: 0.35, floatIntensity: 0.7 },
];

function BrandOrb({
  brand,
  position,
  floatConfig,
}: {
  brand: BrandSphere;
  position: [number, number, number];
  floatConfig: (typeof FLOAT_CONFIGS)[number];
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const targetScale = useRef(1);
  const currentScale = useRef(1);

  targetScale.current = hovered ? 1.3 : 1;

  useFrame(() => {
    if (!meshRef.current) return;
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale.current, 0.08);
    meshRef.current.scale.setScalar(currentScale.current);
  });

  return (
    <Float
      speed={floatConfig.speed}
      rotationIntensity={floatConfig.rotationIntensity}
      floatIntensity={floatConfig.floatIntensity}
    >
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/${brand.slug}`);
        }}
      >
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          color={brand.primaryColor}
          emissive={brand.ctaColor}
          emissiveIntensity={hovered ? 1.2 : 0.6}
          roughness={0.15}
          metalness={0.3}
        />
        {hovered && (
          <Html center distanceFactor={6} style={{ pointerEvents: 'none' }}>
            <span className="rounded-lg bg-black/80 px-4 py-2 text-sm font-bold text-white whitespace-nowrap backdrop-blur-md border border-white/10">
              Simply{brand.name.replace('Simply', '')}
            </span>
          </Html>
        )}
      </mesh>
    </Float>
  );
}

function SceneGroup({ brands }: EcosystemSceneProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.15,
      0.02,
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.08,
      0.02,
    );
  });

  return (
    <group ref={groupRef}>
      {brands.map((brand, i) => (
        <BrandOrb
          key={brand.id}
          brand={brand}
          position={POSITIONS[i]}
          floatConfig={FLOAT_CONFIGS[i]}
        />
      ))}
    </group>
  );
}

export default function EcosystemScene({ brands }: EcosystemSceneProps) {
  return (
    <>
      <ambientLight intensity={0.2} />
      {brands.map((brand, i) => (
        <pointLight
          key={brand.id}
          position={[POSITIONS[i][0], POSITIONS[i][1] + 1, 3]}
          intensity={2}
          distance={8}
          color={brand.ctaColor}
        />
      ))}
      <SceneGroup brands={brands} />
    </>
  );
}
