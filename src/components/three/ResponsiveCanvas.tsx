'use client';

import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { Suspense, useState, useEffect } from 'react';
import { cn } from 'lib/utils/cn';

interface ResponsiveCanvasProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  dpr?: [number, number];
  camera?: { position?: [number, number, number]; fov?: number };
}

export default function ResponsiveCanvas({
  children,
  fallback,
  className,
  dpr,
  camera,
}: ResponsiveCanvasProps) {
  const prefersReduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setReady(true);
  }, []);

  if (prefersReduced) {
    return <>{fallback ?? null}</>;
  }

  if (!ready) {
    return <>{fallback ?? null}</>;
  }

  const resolvedDpr: [number, number] = dpr ?? (isMobile ? [1, 1.5] : [1, 2]);

  return (
    <div className={cn('w-full h-full', className)}>
      <Suspense fallback={fallback ?? null}>
        <Canvas
          dpr={resolvedDpr}
          gl={{ antialias: true, alpha: true }}
          camera={{
            position: camera?.position ?? [0, 0, 5],
            fov: camera?.fov ?? 45,
          }}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
