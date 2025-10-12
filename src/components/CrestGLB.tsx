"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

type Props = {
  src: string;      // chemin du .glb dans /public
  size?: number;    // taille (px) du canvas carré
  padding?: number; // marge de cadrage (1 = bord, 1.2 = 20% de marge)
};

function fitToView(group: THREE.Group, camera: THREE.PerspectiveCamera, padding = 1.2) {
  // 1) box de l’objet
  const box = new THREE.Box3().setFromObject(group);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  // 2) on recentre l’objet au (0,0,0)
  group.position.x += -center.x;
  group.position.y += -center.y;
  group.position.z += -center.z;

  // 3) on recule la caméra pour tout voir (en tenant compte du fov & de l’aspect)
  const maxSize = Math.max(size.x, size.y, size.z);
  const halfFovY = THREE.MathUtils.degToRad(camera.fov / 2);
  const fitHeightDistance = (maxSize / 2) / Math.tan(halfFovY);
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = Math.max(fitHeightDistance, fitWidthDistance) * padding;

  camera.position.set(0, 0, distance);
  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
}

function Model({ src, padding = 1.2 }: { src: string; padding?: number }) {
  const { scene } = useGLTF(src);
  const group = useRef<THREE.Group>(null!);
  const { camera, size: viewport } = useThree();
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(false);

  // montage du modèle dans un group pour le transformer proprement
  useLayoutEffect(() => {
    if (!group.current) return;
    // normalisation d’échelle : on ramène la plus grande dimension autour de 1
    const tmp = new THREE.Group();
    tmp.add(scene);
    const box = new THREE.Box3().setFromObject(tmp);
    const s = 1 / Math.max(0.0001, box.getSize(new THREE.Vector3()).length());
    group.current.add(scene);
    group.current.scale.setScalar(s * 3); // *3 pour une taille de base confortable (ajustable)
  }, [scene]);

  // cadrage initial + recadrage si le canvas change de taille
  useEffect(() => {
    if (!group.current) return;
    fitToView(group.current, camera as THREE.PerspectiveCamera, padding);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [padding, viewport.width, viewport.height]);

  // respect de prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq) {
      setReduced(mq.matches);
      const cb = (e: MediaQueryListEvent) => setReduced(e.matches);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    }
  }, []);

  useFrame((_, dt) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += dt * (hovered ? 2.0 : 0.7);
  });

  return (
    <group
      ref={group}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      dispose={null}
    >
      {/* le scene est ajouté au group dans useLayoutEffect */}
    </group>
  );
}

export default function CrestGLB({ src, size = 140, padding = 1.2 }: Props) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-2xl bg-[#1f2f27] ring-1 ring-[#5BE37D]/25 shadow-[0_10px_30px_rgba(0,0,0,.25)] overflow-hidden"
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 2.5], fov: 28 }} // fov un peu plus large
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[2, 3, 5]} intensity={0.8} />
          <Environment preset="city" />
          <Model src={src} padding={padding} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/blasons/bronze.glb");
