'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { extractBrandFromPathname } from 'lib/brands/brand-resolver';
import { getBrandConfig } from 'lib/config/brands';

export function BrandTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const prevBrandRef = useRef<string | null>(null);
  const [overlay, setOverlay] = useState<{ color: string; key: number } | null>(null);

  useEffect(() => {
    const currentBrand = extractBrandFromPathname(pathname);
    const prevBrand = prevBrandRef.current;

    // Trigger transition when switching between different brands
    if (currentBrand && prevBrand !== currentBrand && prevBrand !== null && !prefersReduced) {
      const config = getBrandConfig(currentBrand);
      setOverlay({ color: config.theme.semantic.bg, key: Date.now() });
    }

    prevBrandRef.current = currentBrand;
  }, [pathname, prefersReduced]);

  return (
    <>
      <AnimatePresence>
        {overlay && (
          <motion.div
            key={overlay.key}
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            exit={{ opacity: 0 }}
            transition={{
              clipPath: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.3, delay: 0.35 },
            }}
            onAnimationComplete={() => setOverlay(null)}
            className="fixed inset-0 z-[100] pointer-events-none"
            style={{ backgroundColor: overlay.color }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
