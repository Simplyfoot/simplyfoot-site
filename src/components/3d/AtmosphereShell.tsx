'use client';

import { useMemo } from 'react';
import { AdditiveBlending, BackSide, Color, ShaderMaterial } from 'three';

/* ═══════════════════════════════════════════════════════════════════════════
   AtmosphereShell — coquille atmosphérique Fresnel pour planète 3D.
   ───────────────────────────────────────────────────────────────────────────
   Sphère rendue en backside additif autour d'un modèle planète. Le shader
   calcule un Fresnel (1 - dot(N, V))^power pour produire un halo concentré
   sur les bords. Coût négligeable (un seul mesh, un seul material).

   Utilisé par `Hero3DScene` (halo chaud autour de la planète foot).
   Couleur passée en hex CSS (résolu via `useRootColor` côté consommateur
   — zéro hex hardcodé dans cette couche).
   ═══════════════════════════════════════════════════════════════════════════ */

const ATMOSPHERE_VERT = /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
    }
`;

const ATMOSPHERE_FRAG = /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vView;
    uniform vec3 uColor;
    uniform float uIntensity;
    uniform float uPower;
    void main() {
        float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), uPower);
        gl_FragColor = vec4(uColor, fres * uIntensity);
    }
`;

interface AtmosphereShellProps {
    /** Hex CSS résolu (ex. via `useRootColor`). */
    color: string;
    /** Multiplicateur d'opacité du halo (0–1, défaut 0.85). */
    intensity?: number;
    /** Concentration du halo aux bords (>1, défaut 2.6 — plus haut = bord plus fin). */
    power?: number;
    /** Échelle relative à la planète (défaut 1.18 — 18 % plus large). */
    scale?: number;
    /** Segments de la sphère (défaut 48 — assez pour bord lisse, faible coût). */
    segments?: number;
}

/**
 * Halo Fresnel autour d'une planète. À placer en frère du `<primitive />`
 * du modèle, à l'intérieur du même groupe de scale (ne pas appliquer le
 * scale du modèle GLB ici, sinon le halo se déforme avec).
 */
export function AtmosphereShell({
    color,
    intensity = 0.85,
    power = 2.6,
    scale = 1.18,
    segments = 48,
}: AtmosphereShellProps) {
    const material = useMemo(
        () =>
            new ShaderMaterial({
                vertexShader: ATMOSPHERE_VERT,
                fragmentShader: ATMOSPHERE_FRAG,
                uniforms: {
                    uColor: { value: new Color(color) },
                    uIntensity: { value: intensity },
                    uPower: { value: power },
                },
                transparent: true,
                depthWrite: false,
                side: BackSide,
                blending: AdditiveBlending,
            }),
        [color, intensity, power],
    );

    return (
        <mesh scale={scale}>
            <sphereGeometry args={[1, segments, segments]} />
            <primitive object={material} attach="material" />
        </mesh>
    );
}
