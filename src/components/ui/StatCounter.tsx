'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useIntersectionObserver } from 'lib/hooks/useIntersectionObserver';
import { cn } from 'lib/utils/cn';

interface StatCounterProps {
  value: string;
  label: string;
  duration?: number;
  className?: string;
}

/** Parse numeric part from a string like "100%", "3", "24h" */
function parseValue(raw: string): { prefix: string; num: number; suffix: string } {
  const match = raw.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return { prefix: '', num: 0, suffix: raw };
  return {
    prefix: match[1],
    num: parseFloat(match[2].replace(',', '.')),
    suffix: match[3],
  };
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function StatCounter({ value, label, duration = 1200, className }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { once: true, threshold: 0.3 });
  const prefersReduced = useReducedMotion();

  const { prefix, num, suffix } = parseValue(value);
  const isInteger = Number.isInteger(num);

  const [display, setDisplay] = useState(prefersReduced ? num : 0);

  useEffect(() => {
    if (!isVisible || prefersReduced) {
      setDisplay(num);
      return;
    }

    let start: number | null = null;
    let raf: number;

    function tick(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);

      setDisplay(eased * num);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, num, duration, prefersReduced]);

  const formatted = isInteger ? Math.round(display).toString() : display.toFixed(1);

  return (
    <div ref={ref} className={cn('flex flex-col items-center', className)}>
      <span className="text-3xl font-extrabold sm:text-4xl">
        {prefix}
        {formatted}
        {suffix}
      </span>
      {label && (
        <span className="mt-1 text-xs font-medium uppercase tracking-widest opacity-70">
          {label}
        </span>
      )}
    </div>
  );
}
