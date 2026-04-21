import type { OrbitConfig } from './threeD.types';

export type DeviceTier = 'mobile-portrait' | 'mobile-landscape' | 'tablet' | 'desktop';

export interface DeviceConfig {
    tier: DeviceTier;
    isTouchDevice: boolean;
    cameraZ: number;
    fov: number;
    starCount: number;
    sphereSegments: number;
    bloomEnabled: boolean;
    labelFontSize: number;
    dpr: [number, number];
    autoRotateSpeed: number;
    logoScale: number;
    planetOrbits: {
        foot: OrbitConfig;
        rugby: OrbitConfig;
        handball: OrbitConfig;
    };
    planetScale: {
        foot: number;
        rugby: number;
        handball: number;
    };
}
