'use client';

import { useMemo } from 'react';

import { useMediaQuery } from './useMediaQuery';

import type { DeviceConfig } from '~types/device.types';

/**
 * Résout la configuration 3D (caméra, FOV, densité d'étoiles, orbites…) selon
 * le profil d'appareil détecté via media queries. Centralise les arbitrages
 * perf/qualité entre mobile portrait, mobile paysage, tablette et desktop.
 */
export function useDeviceConfig(): DeviceConfig {
    const isMobilePortrait = useMediaQuery('(max-width: 767px) and (orientation: portrait)');
    const isMobileLandscape = useMediaQuery(
        '(max-width: 900px) and (max-height: 500px) and (orientation: landscape)',
    );
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
    const isTouchDevice = useMediaQuery('(pointer: coarse)');

    const config = useMemo((): DeviceConfig => {
        if (isMobileLandscape) {
            return {
                tier: 'mobile-landscape',
                isTouchDevice,
                cameraZ: 11,
                fov: 55,
                starCount: 1500,
                sphereSegments: 32,
                bloomEnabled: false,
                labelFontSize: 0.25,
                dpr: [1, 1.5],
                autoRotateSpeed: 0.08,
                logoScale: 0.55,
                planetOrbits: {
                    foot: { radius: 2.8, speed: 0.25, phase: 0, inclination: 0 },
                    rugby: { radius: 4, speed: 0.18, phase: 2.1, inclination: 0.15 },
                    handball: { radius: 5.2, speed: 0.14, phase: 4.2, inclination: -0.1 },
                },
                planetScale: { foot: 0.55, rugby: 0.5, handball: 0.5 },
            };
        }

        if (isMobilePortrait) {
            return {
                tier: 'mobile-portrait',
                isTouchDevice,
                cameraZ: 13,
                fov: 65,
                starCount: 1500,
                sphereSegments: 32,
                bloomEnabled: false,
                labelFontSize: 0.3,
                dpr: [1, 1.5],
                autoRotateSpeed: 0.08,
                logoScale: 0.65,
                planetOrbits: {
                    foot: { radius: 2.5, speed: 0.28, phase: 0, inclination: 0.1 },
                    rugby: { radius: 3.6, speed: 0.2, phase: 2.1, inclination: -0.15 },
                    handball: { radius: 4.7, speed: 0.15, phase: 4.2, inclination: 0.12 },
                },
                planetScale: { foot: 0.6, rugby: 0.55, handball: 0.55 },
            };
        }

        if (isTablet) {
            return {
                tier: 'tablet',
                isTouchDevice,
                cameraZ: 11,
                fov: 60,
                starCount: 2500,
                sphereSegments: 48,
                bloomEnabled: false,
                labelFontSize: 0.33,
                dpr: [1, 2],
                autoRotateSpeed: 0.1,
                logoScale: 0.85,
                planetOrbits: {
                    foot: { radius: 3.2, speed: 0.24, phase: 0, inclination: 0.1 },
                    rugby: { radius: 4.6, speed: 0.18, phase: 2.1, inclination: -0.2 },
                    handball: { radius: 6, speed: 0.13, phase: 4.2, inclination: 0.15 },
                },
                planetScale: { foot: 0.8, rugby: 0.75, handball: 0.75 },
            };
        }

        return {
            tier: 'desktop',
            isTouchDevice,
            cameraZ: 11,
            fov: 55,
            starCount: 5000,
            sphereSegments: 64,
            bloomEnabled: true,
            labelFontSize: 0.35,
            dpr: [1, 2],
            autoRotateSpeed: 0.12,
            logoScale: 1.1,
            planetOrbits: {
                foot: { radius: 4, speed: 0.22, phase: 0, inclination: 0 },
                rugby: { radius: 5.8, speed: 0.16, phase: 2.1, inclination: 0.2 },
                handball: { radius: 7.4, speed: 0.12, phase: 4.2, inclination: -0.15 },
            },
            planetScale: { foot: 1, rugby: 0.9, handball: 0.85 },
        };
    }, [isMobilePortrait, isMobileLandscape, isTablet, isTouchDevice]);

    return config;
}
