import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Generic IntersectionObserver hook.
 * Returns `true` once the target element is visible in the viewport.
 * Disconnects after first intersection by default (once behavior).
 */
export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options?: IntersectionObserverInit & { once?: boolean },
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const disconnectedRef = useRef(false);

  const once = options?.once ?? true;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    if (once && disconnectedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) {
            observer.disconnect();
            disconnectedRef.current = true;
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      {
        threshold: options?.threshold ?? 0.3,
        rootMargin: options?.rootMargin,
        root: options?.root,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once]);

  return isIntersecting;
}
