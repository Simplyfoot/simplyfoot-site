'use client';

import { useLayoutEffect, useState } from 'react';

import type { BrandSlug } from './types';

/**
 * Runtime bridge between CSS-defined brand palettes (globals.css) and JS
 * contexts that cannot read CSS — primarily Three.js / WebGL.
 *
 * Rationale: CSS is the single source of truth. There is no TS palette to
 * mirror. This module creates hidden DOM probes (one per brand), reads their
 * computed CSS custom properties, and exposes them to JS. This removes any
 * risk of drift between CSS and TS definitions.
 */

const probes = new Map<BrandSlug, HTMLElement>();

function getProbe(slug: BrandSlug): HTMLElement {
    const existing = probes.get(slug);
    if (existing?.isConnected) {
        return existing;
    }
    const el = document.createElement('div');
    el.setAttribute('data-brand', slug);
    el.setAttribute('aria-hidden', 'true');
    el.style.display = 'none';
    document.body.appendChild(el);
    probes.set(slug, el);
    return el;
}

/**
 * Reads a CSS custom property scoped to a specific brand. Returns the raw CSS
 * string (e.g. 'rgb(86 126 102)'). Empty string during SSR.
 */
export function readBrandCssVar(slug: BrandSlug, varName: `--${string}`): string {
    if (typeof window === 'undefined') {
        return '';
    }
    return getComputedStyle(getProbe(slug)).getPropertyValue(varName).trim();
}

/**
 * Normalizes any CSS color string into a `#rrggbb` hex literal, safe for
 * Three.js `color` props and arithmetic on `THREE.Color`.
 */
export function cssColorToHex(cssColor: string): string {
    if (!cssColor) {
        return '#000000';
    }
    if (/^#[0-9a-f]{6}$/i.test(cssColor)) {
        return cssColor.toLowerCase();
    }
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) {
        return '#000000';
    }
    ctx.fillStyle = '#000000';
    ctx.fillStyle = cssColor;
    const resolved = ctx.fillStyle;
    return resolved.startsWith('#') ? resolved.toLowerCase() : '#000000';
}

/**
 * Hook: returns the hex value of a brand CSS variable. Empty string until the
 * first layout pass; callers should handle the transient empty state or use a
 * fallback.
 */
export function useBrandColor(slug: BrandSlug, varName: `--${string}` = '--primary'): string {
    const [hex, setHex] = useState<string>('');
    useLayoutEffect(() => {
        setHex(cssColorToHex(readBrandCssVar(slug, varName)));
    }, [slug, varName]);
    return hex;
}
