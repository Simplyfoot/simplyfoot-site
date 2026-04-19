'use client';

import { useLayoutEffect, useState } from 'react';

import type { BrandSlug } from './types';

/**
 * Runtime bridge between CSS-defined palette (globals.css) and JS contexts
 * that cannot read CSS — primarily Three.js / WebGL.
 *
 * Rationale: CSS is the single source of truth. There is no TS palette mirror.
 * This module reads CSS custom properties via the DOM and normalizes them for
 * consumption in JS (hex literals for Three.js `color` props, emissive, etc.).
 *
 * Two flavours:
 *  - `useRootColor` / `readRootCssVar` — read from :root (default palette,
 *    shared across all brands).
 *  - `useBrandColor` / `readBrandCssVar` — read from a scoped `[data-brand]`
 *    probe (used when JS needs a color for a specific brand that is not the
 *    current route's brand, e.g. the galaxy landing showing all three brands).
 */

/** Reads a CSS custom property from `:root` (the default / shared palette). */
export function readRootCssVar(varName: `--${string}`): string {
    if (typeof window === 'undefined') {
        return '';
    }
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

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

/** Reads a CSS custom property scoped to a specific brand. */
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

function computeRootHex(varName: `--${string}`): string {
    return typeof window === 'undefined' ? '' : cssColorToHex(readRootCssVar(varName));
}

function computeBrandHex(slug: BrandSlug, varName: `--${string}`): string {
    return typeof window === 'undefined' ? '' : cssColorToHex(readBrandCssVar(slug, varName));
}

/**
 * Hook: returns the hex value of a CSS variable from `:root`. Resolves
 * synchronously on the first client render via lazy state init.
 */
export function useRootColor(varName: `--${string}`): string {
    const [hex, setHex] = useState<string>(() => computeRootHex(varName));
    useLayoutEffect(() => {
        setHex(computeRootHex(varName));
    }, [varName]);
    return hex;
}

/**
 * Hook: returns the hex value of a CSS variable scoped to a specific brand.
 * Useful for rendering multiple brands side-by-side (landing galaxy).
 */
export function useBrandColor(slug: BrandSlug, varName: `--${string}` = '--primary'): string {
    const [hex, setHex] = useState<string>(() => computeBrandHex(slug, varName));
    useLayoutEffect(() => {
        setHex(computeBrandHex(slug, varName));
    }, [slug, varName]);
    return hex;
}
