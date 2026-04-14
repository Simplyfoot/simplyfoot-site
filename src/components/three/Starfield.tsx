'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ── Couche 1 — Etoiles lointaines (fond, petites, tres nombreuses) ── */
function DistantStars({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 20 + Math.random() * 30;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.005;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#c8d0e0" size={0.015} sizeAttenuation depthWrite={false} opacity={0.5} />
    </Points>
  );
}

/* ── Couche 2 — Etoiles proches qui scintillent (shader custom) ── */
function TwinklingStars({ count }: { count: number }) {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const uniformsRef = useRef({ uTime: { value: 0 } });

  useFrame((state) => {
    if (shaderRef.current) shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const ph = new Float32Array(count);
    const sp = new Float32Array(count);
    const minOp = new Float32Array(count);
    const maxOp = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = -5 - Math.random() * 25;

      const roll = Math.random();
      sz[i] = roll > 0.97 ? 0.08 + Math.random() * 0.04 : roll > 0.85 ? 0.04 + Math.random() * 0.03 : 0.015 + Math.random() * 0.02;

      ph[i] = Math.random() * Math.PI * 2;
      sp[i] = 0.3 + Math.random() * 2.5;

      if (sz[i] > 0.06) { minOp[i] = 0.3; maxOp[i] = 1.0; }
      else if (sz[i] > 0.03) { minOp[i] = 0.1; maxOp[i] = 0.8; }
      else { minOp[i] = 0.02; maxOp[i] = 0.5; }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sz, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(ph, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(sp, 1));
    geo.setAttribute('aMinOpacity', new THREE.BufferAttribute(minOp, 1));
    geo.setAttribute('aMaxOpacity', new THREE.BufferAttribute(maxOp, 1));
    return geo;
  }, [count]);

  const vertexShader = `
    attribute float aSize;
    attribute float aPhase;
    attribute float aSpeed;
    attribute float aMinOpacity;
    attribute float aMaxOpacity;
    uniform float uTime;
    varying float vOpacity;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      float twinkle = sin(uTime * aSpeed + aPhase) * 0.5 + 0.5;
      vOpacity = mix(aMinOpacity, aMaxOpacity, twinkle);
      gl_PointSize = aSize * (200.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying float vOpacity;
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
      gl_FragColor = vec4(0.85, 0.88, 1.0, alpha * vOpacity);
    }
  `;

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniformsRef.current}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Couche 3 — Etoiles filantes ── */
function ShootingStars() {
  const MAX = 3;
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const stateRef = useRef(
    Array.from({ length: MAX }, () => ({
      active: false, startTime: 0, duration: 0,
      startPos: new THREE.Vector3(), endPos: new THREE.Vector3(),
      nextTrigger: 2 + Math.random() * 6,
    })),
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    stateRef.current.forEach((star, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      if (!star.active) {
        if (time > star.nextTrigger) {
          star.active = true;
          star.startTime = time;
          star.duration = 0.6 + Math.random() * 0.8;
          const side = Math.random() > 0.5 ? 1 : -1;
          star.startPos.set(side * (8 + Math.random() * 5), 3 + Math.random() * 4, -5 - Math.random() * 10);
          star.endPos.set(-side * (5 + Math.random() * 8), -2 - Math.random() * 3, star.startPos.z + (Math.random() - 0.5) * 4);
          mesh.visible = true;
        } else { mesh.visible = false; }
      } else {
        const progress = Math.min((time - star.startTime) / star.duration, 1);
        mesh.position.lerpVectors(star.startPos, star.endPos, progress);
        const opacity = progress < 0.15 ? progress / 0.15 : 1 - (progress - 0.15) / 0.85;
        (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, opacity) * 0.8;
        mesh.scale.set(1 + Math.sin(progress * Math.PI) * 3, 0.015, 0.015);
        mesh.lookAt(star.endPos);
        if (progress >= 1) {
          star.active = false;
          star.nextTrigger = time + 4 + Math.random() * 8;
          mesh.visible = false;
        }
      }
    });
  });

  return (
    <group>
      {Array.from({ length: MAX }, (_, i) => (
        <mesh key={i} ref={(el) => { meshRefs.current[i] = el; }} visible={false}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Couche 4 — Nebuleuses subtiles ── */
function Nebulae() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.z += delta * 0.002; });

  const nebulae = useMemo(() => [
    { position: [-8, 4, -20] as [number, number, number], color: '#1B5E20', scale: 5, opacity: 0.008 },
    { position: [6, -5, -25] as [number, number, number], color: '#8B1A1A', scale: 6, opacity: 0.006 },
    { position: [10, 6, -18] as [number, number, number], color: '#1A237E', scale: 4, opacity: 0.007 },
    { position: [-4, -3, -30] as [number, number, number], color: '#4a2080', scale: 7, opacity: 0.005 },
    { position: [0, 8, -22] as [number, number, number], color: '#0a3060', scale: 5, opacity: 0.006 },
  ], []);

  return (
    <group ref={ref}>
      {nebulae.map((n, i) => (
        <mesh key={i} position={n.position}>
          <sphereGeometry args={[n.scale, 16, 16]} />
          <meshBasicMaterial color={n.color} transparent opacity={n.opacity} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Scene complete ── */
function GalaxyScene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <DistantStars count={isMobile ? 2500 : 5000} />
      <TwinklingStars count={isMobile ? 400 : 800} />
      {!isMobile && <ShootingStars />}
      <Nebulae />
    </>
  );
}

/* ── Export ── */
export default function Starfield() {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setReady(true);
  }, []);

  if (!ready) return null;

  if (reduced) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 30% 40%, #0c0c20 0%, #060610 40%, #020206 100%)',
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <GalaxyScene isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
