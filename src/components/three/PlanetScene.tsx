'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

function Planet({
  position,
  color,
  glowColor,
  name,
  sport,
  href,
  size = 1.3,
}: {
  position: [number, number, number];
  color: string;
  glowColor: string;
  name: string;
  sport: string;
  href: string;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.25;
    meshRef.current.rotation.z += delta * 0.08;
  });

  const threeColor = useMemo(() => new THREE.Color(color), [color]);
  const threeGlow = useMemo(() => new THREE.Color(glowColor), [glowColor]);

  return (
    <Float speed={2.0} rotationIntensity={0.6} floatIntensity={1.5}>
      <group position={position}>
        {/* Planet sphere */}
        <mesh
          ref={meshRef}
          scale={hovered ? 1.18 : 1}
          onPointerEnter={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
          onClick={() => {
            window.location.href = href;
          }}
        >
          <sphereGeometry args={[size, 64, 64]} />
          <meshStandardMaterial
            color={threeColor}
            emissive={threeColor}
            emissiveIntensity={hovered ? 3.0 : 1.8}
            roughness={0.35}
            metalness={0.1}
            toneMapped={false}
          />
        </mesh>

        {/* Atmospheric halo */}
        <mesh scale={size * 2.2}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial
            color={threeGlow}
            transparent
            opacity={hovered ? 0.08 : 0.03}
            side={THREE.BackSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>

        {/* Orbital ring */}
        <mesh rotation={[Math.PI / 3, 0.2, 0]}>
          <ringGeometry args={[size * 1.7, size * 1.75, 80]} />
          <meshBasicMaterial
            color={threeGlow}
            transparent
            opacity={hovered ? 0.25 : 0.06}
            side={THREE.DoubleSide}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* Point light */}
        <pointLight color={glowColor} intensity={hovered ? 5 : 2} distance={10} decay={2} />

        {/* Label */}
        <Html
          center
          distanceFactor={8}
          position={[0, -(size + 0.8), 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span
              style={{
                color: 'white',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                opacity: hovered ? 1 : 0.5,
                transition: 'opacity 0.3s ease',
                textShadow: `0 0 15px ${glowColor}`,
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </span>
            <span
              style={{
                color: glowColor,
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: hovered ? 0.8 : 0.3,
                transition: 'opacity 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {sport}
            </span>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    mouse.current.x = state.pointer.x;
    mouse.current.y = state.pointer.y;
    camera.position.x += (mouse.current.x * 1.2 - camera.position.x) * 0.02;
    camera.position.y += (mouse.current.y * 0.6 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function PlanetScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
    >
      <ambientLight intensity={0.05} />

      <Planet
        position={[-6, 1.2, -1]}
        color="#1B5E20"
        glowColor="#4CAF50"
        name="SimplyFoot"
        sport="Football amateur"
        href="/foot"
        size={1.5}
      />

      <Planet
        position={[0, -2.0, -3]}
        color="#8B1A1A"
        glowColor="#E53935"
        name="SimplyRugby"
        sport="Rugby amateur"
        href="/rugby"
        size={1.25}
      />

      <Planet
        position={[6, 0.8, -0.5]}
        color="#1A237E"
        glowColor="#5C6BC0"
        name="SimplyHandball"
        sport="Handball amateur"
        href="/handball"
        size={1.35}
      />

      <CameraRig />
    </Canvas>
  );
}
