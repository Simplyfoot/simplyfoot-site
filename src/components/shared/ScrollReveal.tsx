'use client';

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface ScrollRevealProps {
    children: ReactNode;
    /** Décalage en ms avant le déclenchement de l'animation, une fois l'élément visible. */
    delay?: number;
    /** Classes additionnelles appliquées au wrapper. */
    className?: string;
}

const HIDDEN_STYLE: CSSProperties = {
    opacity: 0,
    transform: 'translateY(16px)',
    transition:
        'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'opacity, transform',
};

const VISIBLE_STYLE: CSSProperties = {
    opacity: 1,
    transform: 'translateY(0)',
    transition: HIDDEN_STYLE.transition,
};

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
    const nodeRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) {
            return;
        }

        if (typeof IntersectionObserver === 'undefined') {
            setIsVisible(true);
            return;
        }

        let cancelled = false;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry?.isIntersecting) {
                    return;
                }

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        if (!cancelled) {
                            setIsVisible(true);
                        }
                    });
                });

                observer.disconnect();
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
        );

        observer.observe(node);

        return () => {
            cancelled = true;
            observer.disconnect();
        };
    }, []);

    const style: CSSProperties = isVisible
        ? { ...VISIBLE_STYLE, transitionDelay: delay > 0 ? `${delay}ms` : undefined }
        : HIDDEN_STYLE;

    return (
        <div ref={nodeRef} style={style} className={cn(className)}>
            {children}
        </div>
    );
}
