'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import { useRootColor } from '@/hooks/useRootColor';

/* ═══════════════════════════════════════════════════════════════════════════
   Hero3DScene — Planète Football "Stade des Étoiles"
   ───────────────────────────────────────────────────────────────────────────
   Scène procédurale R3F : un ballon de football (shader icosaèdre tronqué :
   12 pentagones + 20 hexagones avec coutures et grain de cuir) avec un
   diorama de stade amateur posé au pôle nord (terrain, joueurs 4-4-2,
   tribunes, projecteurs, drapeaux). Aucun asset externe, tout est généré.
   Remplace l'ancien rendu basé sur planet-simplyfoot.glb.
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Configuration géométrique ─────────────────────────────────────────────
const BALL_R = 3.0;
const PITCH_LEN = 2.2;
const PITCH_WID = 1.4;
const PLATFORM_R = 1.95;
const STAND_LEN = 2.3;
const PLAYER_H = 0.075;
const FLOOD_H = 0.9;

// ─── Couleurs spécifiques à la scène (NON tokens projet — content visuel) ──
// Note CLAUDE.md invariant #2 : ces hex sont des couleurs de "matériel"
// (cuir ballon, gazon, maillots, briques) et non des tokens design system.
// Elles vivent ici comme constantes locales, jamais utilisées hors de cette
// scène. Aucune autre composante n'a besoin d'y faire référence.
const COL = {
    panelDark: 0x0c0c0c,
    panelLight: 0xf2eee2,
    stitch: 0x1a1a1a,
    grassDark: 0x1f6f2c,
    grassLight: 0x2c8a3a,
    grassSurround: 0x18521e,
    line: 0xfaf6ea,
    teamA: 0x1a4f9c,
    teamAtrim: 0xf2eee2,
    teamB: 0xc8302d,
    ref: 0x1a1a1a,
    skin: 0xd8a878,
    skinDk: 0x9e6b3d,
    goalpost: 0xf5f5f0,
    net: 0xeeeeee,
    flagPole: 0xeeeeee,
    flagFabric: 0x1a4f9c,
    tribuneBase: 0x8a8783,
    tribuneWood: 0x6e5538,
    tribuneRoof: 0x2a3540,
    pillar: 0x2a3540,
    facade: 0xf2eee2,
    floodMetal: 0x5a6068,
    bulb: 0xfff4d0,
    spotColor: 0xfff2cc,
    cone: 0xfff5d6,
    ground: 0x4d3826,
    path: 0x6e5b3e,
    seatColors: [0xc8302d, 0x1a4f9c, 0xefc23a, 0xc8302d, 0x1a4f9c],
    crowdColors: [0xc8302d, 0x1a4f9c, 0xefc23a, 0xf2eee2, 0x2a3540, 0xd47a2a, 0x4d7e3a, 0x9c1a4f],
    hair: 0x2a1a10,
    shoe: 0x111111,
    glove: 0x2a2a2a,
} as const;

// ─── Sommets icosaèdre normalisés (12) ─────────────────────────────────────
function computeIcoVertices(): THREE.Vector3[] {
    const phi = (1 + Math.sqrt(5)) / 2;
    const norm = Math.sqrt(1 + phi * phi);
    const raw: ReadonlyArray<readonly [number, number, number]> = [
        [0, 1, phi],
        [0, 1, -phi],
        [0, -1, phi],
        [0, -1, -phi],
        [1, phi, 0],
        [1, -phi, 0],
        [-1, phi, 0],
        [-1, -phi, 0],
        [phi, 0, 1],
        [phi, 0, -1],
        [-phi, 0, 1],
        [-phi, 0, -1],
    ];
    return raw.map((v) => new THREE.Vector3(v[0] / norm, v[1] / norm, v[2] / norm));
}

// ─── Shader ballon (icosaèdre tronqué : pentagones noirs / hexagones blancs)
const ICO_VERTS = computeIcoVertices();

const FOOTBALL_VERT = /* glsl */ `
  varying vec3 vN;
  varying vec3 vLocalPos;
  void main() {
    vLocalPos = position;
    vN = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FOOTBALL_FRAG = /* glsl */ `
  uniform vec3  uIco[12];
  uniform float uPentaSize;
  uniform float uSeam;
  uniform vec3  uPanelLight;
  uniform vec3  uPanelDark;
  uniform vec3  uStitch;
  uniform vec3  uLightDir;
  varying vec3  vN;
  varying vec3  vLocalPos;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + .1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f*f*(3.0-2.0*f);
    return mix(
      mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), f.x),
          mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
          mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y),
      f.z);
  }

  void main() {
    vec3 dir = normalize(vLocalPos);
    float minD = 99.0;
    float secondD = 99.0;
    for (int i = 0; i < 12; i++) {
      float d = distance(dir, uIco[i]);
      if (d < minD) { secondD = minD; minD = d; }
      else if (d < secondD) secondD = d;
    }
    float panelMask = smoothstep(uPentaSize - uSeam, uPentaSize + uSeam, minD);
    float boundaryHex = abs(minD - secondD);
    float hexSeam = (1.0 - smoothstep(0.0, 0.040, boundaryHex)) * panelMask;
    float pentaEdge = (1.0 - smoothstep(0.0, uSeam*1.8, abs(minD - uPentaSize)));

    vec3 color = mix(uPanelDark, uPanelLight, panelMask);
    float grain = noise(dir * 80.0) * 0.06 + noise(dir * 250.0) * 0.04;
    color *= 1.0 - grain * 0.6;
    float dimples = noise(dir * 180.0);
    color *= 0.94 + dimples * 0.12;

    float stitchDots = step(0.5, fract(boundaryHex * 320.0)) * hexSeam;
    color = mix(color, uStitch, hexSeam * 0.55 + pentaEdge * 0.35);
    color = mix(color, vec3(0.85), stitchDots * 0.25);

    vec3 N = normalize(vN);
    vec3 L = normalize(uLightDir);
    float lambert = max(dot(N, L), 0.0);
    float ambient = 0.28;
    float spec = pow(max(dot(N, normalize(L + vec3(0,0,1))), 0.0), 32.0) * 0.18;
    color *= (ambient + lambert * 0.85);
    color += spec * panelMask;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function buildFootballMaterial(saturation = 1.0): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
        uniforms: {
            uIco: { value: ICO_VERTS },
            uPentaSize: { value: 0.405 },
            uSeam: { value: 0.012 },
            uPanelLight: {
                value: new THREE.Color(COL.panelLight).multiplyScalar(saturation),
            },
            uPanelDark: { value: new THREE.Color(COL.panelDark) },
            uStitch: { value: new THREE.Color(COL.stitch) },
            uLightDir: { value: new THREE.Vector3(-0.5, 1, 0.7).normalize() },
        },
        vertexShader: FOOTBALL_VERT,
        fragmentShader: FOOTBALL_FRAG,
    });
}

// ─── Atmosphère bleutée autour de la planète ───────────────────────────────
const ATMO_VERT = /* glsl */ `
  varying vec3 vN;
  void main() {
    vN = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const ATMO_FRAG = /* glsl */ `
  varying vec3 vN; uniform vec3 uColor;
  void main() {
    float i = pow(1.0 - max(dot(vN, vec3(0,0,1)), 0.0), 3.0);
    gl_FragColor = vec4(uColor, i*0.35);
  }
`;

function buildAtmosphereMaterial(): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color(0x4a6fa8) } },
        vertexShader: ATMO_VERT,
        fragmentShader: ATMO_FRAG,
    });
}

// ─── La planète (ballon) ───────────────────────────────────────────────────
function FootballPlanet() {
    const ref = useRef<THREE.Mesh>(null);
    const material = useMemo(() => buildFootballMaterial(1.0), []);
    const atmoMaterial = useMemo(() => buildAtmosphereMaterial(), []);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.025;
        }
    });

    return (
        <group>
            <mesh ref={ref} castShadow receiveShadow>
                <sphereGeometry args={[BALL_R, 96, 64]} />
                <primitive object={material} attach="material" />
            </mesh>
            <mesh>
                <sphereGeometry args={[BALL_R * 1.04, 48, 48]} />
                <primitive object={atmoMaterial} attach="material" />
            </mesh>
        </group>
    );
}

// ─── Plateforme (terre + allée) ────────────────────────────────────────────
function Platform() {
    return (
        <group>
            <mesh rotation-x={-Math.PI / 2} receiveShadow>
                <ringGeometry args={[0, PLATFORM_R, 96, 4]} />
                <meshStandardMaterial color={COL.ground} roughness={0.95} />
            </mesh>
            <mesh rotation-x={-Math.PI / 2} position-y={0.001} receiveShadow>
                <ringGeometry
                    args={[Math.max(PITCH_LEN, PITCH_WID) * 0.55, PLATFORM_R * 0.92, 96, 1]}
                />
                <meshStandardMaterial color={COL.path} roughness={1} />
            </mesh>
        </group>
    );
}

// ─── Terrain : gazon rayé + lignes blanches réglementaires ─────────────────
function PitchLine({
    x1,
    z1,
    x2,
    z2,
    width = 0.006,
}: {
    x1: number;
    z1: number;
    x2: number;
    z2: number;
    width?: number;
}) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const len = Math.sqrt(dx * dx + dz * dz);
    return (
        <mesh
            position={[(x1 + x2) / 2, 0.012, (z1 + z2) / 2]}
            rotation={[-Math.PI / 2, 0, -Math.atan2(dz, dx)]}
        >
            <planeGeometry args={[len, width]} />
            <meshBasicMaterial color={COL.line} />
        </mesh>
    );
}

function Pitch() {
    const L = PITCH_LEN;
    const W = PITCH_WID;
    const stripes = 10;
    const stripeW = L / stripes;
    const PA_LEN = L * 0.165;
    const PA_WID = W * 0.58;
    const GA_LEN = L * 0.06;
    const GA_WID = W * 0.32;

    return (
        <group>
            {/* Gazon rayé */}
            {Array.from({ length: stripes }, (_, i) => (
                <mesh
                    key={i}
                    rotation-x={-Math.PI / 2}
                    position={[-L / 2 + stripeW / 2 + i * stripeW, 0.01, 0]}
                    receiveShadow
                >
                    <planeGeometry args={[stripeW, W]} />
                    <meshStandardMaterial
                        color={i % 2 === 0 ? COL.grassDark : COL.grassLight}
                        roughness={0.9}
                    />
                </mesh>
            ))}
            {/* Bordure verte */}
            <mesh rotation-x={-Math.PI / 2} position-y={0.005} receiveShadow>
                <planeGeometry args={[L * 1.18, W * 1.25]} />
                <meshStandardMaterial color={COL.grassSurround} roughness={1} />
            </mesh>

            {/* Périmètre + ligne médiane */}
            <PitchLine x1={-L / 2} z1={-W / 2} x2={L / 2} z2={-W / 2} />
            <PitchLine x1={-L / 2} z1={W / 2} x2={L / 2} z2={W / 2} />
            <PitchLine x1={-L / 2} z1={-W / 2} x2={-L / 2} z2={W / 2} />
            <PitchLine x1={L / 2} z1={-W / 2} x2={L / 2} z2={W / 2} />
            <PitchLine x1={0} z1={-W / 2} x2={0} z2={W / 2} />

            {/* Cercle central */}
            <mesh rotation-x={-Math.PI / 2} position-y={0.012}>
                <ringGeometry args={[W * 0.18 - 0.003, W * 0.18 + 0.003, 64]} />
                <meshBasicMaterial color={COL.line} />
            </mesh>
            {/* Point central */}
            <mesh rotation-x={-Math.PI / 2} position-y={0.012}>
                <circleGeometry args={[0.012, 16]} />
                <meshBasicMaterial color={COL.line} />
            </mesh>

            {/* Surfaces de réparation + but, deux côtés */}
            {([-1, 1] as const).map((sign) => (
                <group key={sign}>
                    <PitchLine
                        x1={sign * (L / 2 - PA_LEN)}
                        z1={-PA_WID / 2}
                        x2={sign * (L / 2 - PA_LEN)}
                        z2={PA_WID / 2}
                    />
                    <PitchLine
                        x1={sign * (L / 2 - PA_LEN)}
                        z1={-PA_WID / 2}
                        x2={sign * (L / 2)}
                        z2={-PA_WID / 2}
                    />
                    <PitchLine
                        x1={sign * (L / 2 - PA_LEN)}
                        z1={PA_WID / 2}
                        x2={sign * (L / 2)}
                        z2={PA_WID / 2}
                    />
                    <PitchLine
                        x1={sign * (L / 2 - GA_LEN)}
                        z1={-GA_WID / 2}
                        x2={sign * (L / 2 - GA_LEN)}
                        z2={GA_WID / 2}
                    />
                    <PitchLine
                        x1={sign * (L / 2 - GA_LEN)}
                        z1={-GA_WID / 2}
                        x2={sign * (L / 2)}
                        z2={-GA_WID / 2}
                    />
                    <PitchLine
                        x1={sign * (L / 2 - GA_LEN)}
                        z1={GA_WID / 2}
                        x2={sign * (L / 2)}
                        z2={GA_WID / 2}
                    />
                    {/* Point de penalty */}
                    <mesh
                        rotation-x={-Math.PI / 2}
                        position={[sign * (L / 2 - PA_LEN * 0.66), 0.012, 0]}
                    >
                        <circleGeometry args={[0.01, 16]} />
                        <meshBasicMaterial color={COL.line} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

// ─── Buts (poteaux + transversale + filet) ─────────────────────────────────
function Goals() {
    const GW = 0.32;
    const GH = 0.11;
    const GD = 0.1;
    const POST_R = 0.0045;

    const netTexture = useMemo(() => {
        const cv = document.createElement('canvas');
        cv.width = cv.height = 256;
        const ctx = cv.getContext('2d');
        if (!ctx) {
            return null;
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.85)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i <= 16; i++) {
            ctx.beginPath();
            ctx.moveTo(i * 16, 0);
            ctx.lineTo(i * 16, 256);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * 16);
            ctx.lineTo(256, i * 16);
            ctx.stroke();
        }
        const tex = new THREE.CanvasTexture(cv);
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(8, 3);
        return tex;
    }, []);

    return (
        <group>
            {([-1, 1] as const).map((sign) => (
                <group key={sign} position={[sign * (PITCH_LEN / 2), 0.012, 0]} scale-x={sign}>
                    {/* Poteaux verticaux */}
                    <mesh position={[0, GH / 2, GW / 2]} castShadow>
                        <cylinderGeometry args={[POST_R, POST_R, GH, 12]} />
                        <meshStandardMaterial
                            color={COL.goalpost}
                            roughness={0.4}
                            metalness={0.1}
                        />
                    </mesh>
                    <mesh position={[0, GH / 2, -GW / 2]} castShadow>
                        <cylinderGeometry args={[POST_R, POST_R, GH, 12]} />
                        <meshStandardMaterial
                            color={COL.goalpost}
                            roughness={0.4}
                            metalness={0.1}
                        />
                    </mesh>
                    {/* Transversale */}
                    <mesh position={[0, GH, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                        <cylinderGeometry args={[POST_R, POST_R, GW, 12]} />
                        <meshStandardMaterial
                            color={COL.goalpost}
                            roughness={0.4}
                            metalness={0.1}
                        />
                    </mesh>
                    {/* Filets */}
                    {netTexture && (
                        <>
                            <mesh position={[-GD, GH / 2, 0]}>
                                <planeGeometry args={[GW, GH]} />
                                <meshStandardMaterial
                                    map={netTexture}
                                    color={COL.net}
                                    transparent
                                    alphaTest={0.4}
                                    side={THREE.DoubleSide}
                                    depthWrite={false}
                                />
                            </mesh>
                            <mesh
                                position={[-GD / 2, GH, 0]}
                                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                            >
                                <planeGeometry args={[GD, GW]} />
                                <meshStandardMaterial
                                    map={netTexture}
                                    color={COL.net}
                                    transparent
                                    alphaTest={0.4}
                                    side={THREE.DoubleSide}
                                    depthWrite={false}
                                />
                            </mesh>
                        </>
                    )}
                </group>
            ))}
        </group>
    );
}

// ─── Drapeaux de corner ────────────────────────────────────────────────────
function CornerFlags() {
    const positions: ReadonlyArray<readonly [number, number]> = [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
    ];
    return (
        <group>
            {positions.map(([sx, sz], i) => (
                <group key={i} position={[sx * (PITCH_LEN / 2), 0.05, sz * (PITCH_WID / 2)]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.003, 0.003, 0.1, 8]} />
                        <meshStandardMaterial color={COL.flagPole} roughness={0.5} />
                    </mesh>
                    <mesh
                        position={[sx > 0 ? 0.025 : -0.025, 0.04, 0]}
                        rotation-y={sx > 0 ? 0 : Math.PI}
                    >
                        <planeGeometry args={[0.05, 0.025]} />
                        <meshStandardMaterial
                            color={COL.flagFabric}
                            roughness={0.7}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

// ─── Joueur stylisé (12 méshes) ────────────────────────────────────────────
interface PlayerProps {
    jersey: number;
    short: number;
    isGK?: boolean;
    isRef?: boolean;
}

function Player({ jersey, short, isGK = false, isRef = false }: PlayerProps) {
    const H = PLAYER_H;
    const torsoColor = isRef ? COL.ref : jersey;
    const shortColor = isRef ? COL.ref : short;
    return (
        <group>
            {/* Tête */}
            <mesh position-y={H * 0.86} castShadow>
                <sphereGeometry args={[H * 0.13, 12, 8]} />
                <meshStandardMaterial color={COL.skin} roughness={0.7} />
            </mesh>
            {/* Cheveux (demi-sphère) */}
            <mesh position-y={H * 0.92} castShadow>
                <sphereGeometry args={[H * 0.135, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
                <meshStandardMaterial color={COL.hair} roughness={0.95} />
            </mesh>
            {/* Torse */}
            <mesh position-y={H * 0.55} castShadow>
                <capsuleGeometry args={[H * 0.13, H * 0.3, 4, 8]} />
                <meshStandardMaterial color={torsoColor} roughness={0.65} />
            </mesh>
            {/* Bras */}
            <mesh position={[-H * 0.18, H * 0.55, 0]} rotation-z={Math.PI * 0.05} castShadow>
                <capsuleGeometry args={[H * 0.04, H * 0.22, 3, 6]} />
                <meshStandardMaterial color={torsoColor} roughness={0.7} />
            </mesh>
            <mesh position={[H * 0.18, H * 0.55, 0]} rotation-z={-Math.PI * 0.05} castShadow>
                <capsuleGeometry args={[H * 0.04, H * 0.22, 3, 6]} />
                <meshStandardMaterial color={torsoColor} roughness={0.7} />
            </mesh>
            {/* Short */}
            <mesh position-y={H * 0.32} castShadow>
                <cylinderGeometry args={[H * 0.135, H * 0.13, H * 0.13, 12]} />
                <meshStandardMaterial color={shortColor} roughness={0.7} />
            </mesh>
            {/* Jambes */}
            <mesh position={[-H * 0.05, H * 0.16, 0]} castShadow>
                <capsuleGeometry args={[H * 0.045, H * 0.2, 3, 6]} />
                <meshStandardMaterial color={COL.skinDk} roughness={0.7} />
            </mesh>
            <mesh position={[H * 0.05, H * 0.16, 0]} castShadow>
                <capsuleGeometry args={[H * 0.045, H * 0.2, 3, 6]} />
                <meshStandardMaterial color={COL.skinDk} roughness={0.7} />
            </mesh>
            {/* Chaussettes */}
            <mesh position={[-H * 0.05, H * 0.06, 0]}>
                <cylinderGeometry args={[H * 0.05, H * 0.05, H * 0.1, 8]} />
                <meshStandardMaterial color={torsoColor} roughness={0.8} />
            </mesh>
            <mesh position={[H * 0.05, H * 0.06, 0]}>
                <cylinderGeometry args={[H * 0.05, H * 0.05, H * 0.1, 8]} />
                <meshStandardMaterial color={torsoColor} roughness={0.8} />
            </mesh>
            {/* Chaussures */}
            <mesh position={[-H * 0.05, H * 0.013, H * 0.015]}>
                <boxGeometry args={[H * 0.06, H * 0.025, H * 0.1]} />
                <meshStandardMaterial color={COL.shoe} roughness={0.4} />
            </mesh>
            <mesh position={[H * 0.05, H * 0.013, H * 0.015]}>
                <boxGeometry args={[H * 0.06, H * 0.025, H * 0.1]} />
                <meshStandardMaterial color={COL.shoe} roughness={0.4} />
            </mesh>
            {/* Gants gardien */}
            {isGK && (
                <>
                    <mesh position={[-H * 0.2, H * 0.36, 0]}>
                        <sphereGeometry args={[H * 0.05, 8, 6]} />
                        <meshStandardMaterial color={COL.glove} roughness={0.5} />
                    </mesh>
                    <mesh position={[H * 0.2, H * 0.36, 0]}>
                        <sphereGeometry args={[H * 0.05, 8, 6]} />
                        <meshStandardMaterial color={COL.glove} roughness={0.5} />
                    </mesh>
                </>
            )}
        </group>
    );
}

// ─── Formation 4-4-2 et placement des 22 joueurs + arbitre ─────────────────
const FORMATION_442: ReadonlyArray<{ x: number; z: number }> = [
    { x: -0.92, z: 0.0 },
    { x: -0.62, z: -0.55 },
    { x: -0.62, z: -0.18 },
    { x: -0.62, z: 0.18 },
    { x: -0.62, z: 0.55 },
    { x: -0.2, z: -0.62 },
    { x: -0.18, z: -0.2 },
    { x: -0.18, z: 0.2 },
    { x: -0.2, z: 0.62 },
    { x: 0.25, z: -0.18 },
    { x: 0.3, z: 0.22 },
];

function Players() {
    const L = PITCH_LEN;
    const W = PITCH_WID;
    const miniBallMat = useMemo(() => buildFootballMaterial(1.0), []);
    return (
        <group>
            {/* Équipe A (gauche → droite) */}
            {FORMATION_442.map((pos, i) => (
                <group
                    key={`a-${i}`}
                    position={[((pos.x * L) / 2) * 0.95, 0.01, ((pos.z * W) / 2) * 0.92]}
                    rotation-y={Math.PI / 2}
                >
                    <Player
                        jersey={i === 0 ? 0xefc23a : COL.teamA}
                        short={i === 0 ? 0x5a4a1c : COL.teamAtrim}
                        isGK={i === 0}
                    />
                </group>
            ))}
            {/* Équipe B (miroir) */}
            {FORMATION_442.map((pos, i) => (
                <group
                    key={`b-${i}`}
                    position={[((-pos.x * L) / 2) * 0.95, 0.01, ((-pos.z * W) / 2) * 0.92]}
                    rotation-y={-Math.PI / 2}
                >
                    <Player
                        jersey={i === 0 ? 0x4ad68a : COL.teamB}
                        short={i === 0 ? 0x1c5036 : COL.shoe}
                        isGK={i === 0}
                    />
                </group>
            ))}
            {/* Arbitre au centre */}
            <group position={[0.05, 0.01, -0.08]} rotation-y={Math.PI / 4}>
                <Player jersey={COL.ref} short={0xefc23a} isRef />
            </group>
            {/* Mini-ballon au centre */}
            <mesh position={[0, 0.022, 0]} castShadow>
                <sphereGeometry args={[0.02, 24, 16]} />
                <primitive object={miniBallMat} attach="material" />
            </mesh>
        </group>
    );
}

// Constantes tribune principale (hors composant : stables, évite recalculs et
// déps useMemo). Lues comme alias `SL/SD/SH` à l'intérieur pour lisibilité JSX.
const MAIN_STAND_SL = STAND_LEN;
const MAIN_STAND_SD = 0.42;
const MAIN_STAND_SH = 0.38;
const MAIN_STAND_ROW_COUNT = 6;
const MAIN_STAND_SEAT_COUNT = 28;

// ─── Tribune principale (couverte, gradins, foule, façade) ─────────────────
function MainStand() {
    const SL = MAIN_STAND_SL;
    const SD = MAIN_STAND_SD;
    const SH = MAIN_STAND_SH;
    const ROW_COUNT = MAIN_STAND_ROW_COUNT;
    const SEAT_COUNT = MAIN_STAND_SEAT_COUNT;

    // Foule pré-calculée pour stabilité (pas de recalcul au re-render)
    const crowd = useMemo(() => {
        const out: { x: number; y: number; z: number; color: number }[] = [];
        for (let r = 0; r < MAIN_STAND_ROW_COUNT; r++) {
            const t = r / (MAIN_STAND_ROW_COUNT - 1);
            for (let s = 0; s < MAIN_STAND_SEAT_COUNT; s++) {
                if (Math.random() < 0.62) {
                    const sx =
                        -(MAIN_STAND_SL / 2) * 0.98 +
                        (s + 0.5) * ((MAIN_STAND_SL * 0.98) / MAIN_STAND_SEAT_COUNT);
                    out.push({
                        x: sx,
                        y: 0.16 + t * MAIN_STAND_SH,
                        z: -MAIN_STAND_SD / 2 + ((r + 0.5) * MAIN_STAND_SD) / MAIN_STAND_ROW_COUNT,
                        color:
                            COL.crowdColors[Math.floor(Math.random() * COL.crowdColors.length)] ??
                            COL.crowdColors[0]!,
                    });
                }
            }
        }
        return out;
    }, []);

    return (
        <group>
            {/* Socle béton */}
            <mesh position-y={0.04} castShadow receiveShadow>
                <boxGeometry args={[SL, 0.08, SD]} />
                <meshStandardMaterial color={COL.tribuneBase} roughness={0.95} />
            </mesh>

            {/* Gradins en escalier */}
            {Array.from({ length: ROW_COUNT }, (_, r) => {
                const t = r / (ROW_COUNT - 1);
                const rowColor = COL.seatColors[r % COL.seatColors.length] ?? COL.seatColors[0]!;
                return (
                    <group key={r}>
                        <mesh
                            position={[0, 0.08 + t * SH, -SD / 2 + ((r + 0.5) * SD) / ROW_COUNT]}
                            castShadow
                            receiveShadow
                        >
                            <boxGeometry args={[SL * 0.98, 0.04, (SD / ROW_COUNT) * 1.1]} />
                            <meshStandardMaterial color={COL.tribuneWood} roughness={0.85} />
                        </mesh>
                        {/* Sièges */}
                        {Array.from({ length: SEAT_COUNT }, (_, s) => {
                            const sx = (-SL / 2) * 0.98 + (s + 0.5) * ((SL * 0.98) / SEAT_COUNT);
                            return (
                                <mesh
                                    key={s}
                                    position={[
                                        sx,
                                        0.115 + t * SH,
                                        -SD / 2 + ((r + 0.5) * SD) / ROW_COUNT,
                                    ]}
                                    castShadow
                                >
                                    <boxGeometry args={[0.04, 0.025, 0.04]} />
                                    <meshStandardMaterial color={rowColor} roughness={0.7} />
                                </mesh>
                            );
                        })}
                    </group>
                );
            })}

            {/* Spectateurs */}
            {crowd.map((p, i) => (
                <mesh key={i} position={[p.x, p.y, p.z]} castShadow>
                    <capsuleGeometry args={[0.013, 0.022, 2, 4]} />
                    <meshStandardMaterial color={p.color} roughness={0.8} />
                </mesh>
            ))}

            {/* Toit auvent */}
            <mesh position={[0, SH + 0.32, SD * 0.05]} rotation-x={-0.08} castShadow receiveShadow>
                <boxGeometry args={[SL * 1.05, 0.012, SD * 1.15]} />
                <meshStandardMaterial color={COL.tribuneRoof} roughness={0.4} metalness={0.6} />
            </mesh>

            {/* Piliers du toit */}
            {([-1, 0, 1] as const).map((i) => (
                <mesh key={i} position={[i * SL * 0.42, (SH + 0.32) / 2, SD / 2 + 0.04]} castShadow>
                    <boxGeometry args={[0.02, SH + 0.32, 0.02]} />
                    <meshStandardMaterial color={COL.pillar} roughness={0.5} metalness={0.5} />
                </mesh>
            ))}

            {/* Façade */}
            <mesh position={[0, SH + 0.25, SD / 2 + 0.05]}>
                <boxGeometry args={[SL, 0.1, 0.005]} />
                <meshStandardMaterial color={COL.facade} roughness={0.8} />
            </mesh>
        </group>
    );
}

// Constantes tribune opposée (hors composant : stables, évite recalculs).
const OPP_STAND_SL = STAND_LEN * 0.85;
const OPP_STAND_SD = 0.3;
const OPP_STAND_SH = 0.18;
const OPP_STAND_ROW_COUNT = 4;
const OPP_STAND_SEAT_COUNT = 18;

// ─── Tribune opposée (plus modeste, sans toit) ─────────────────────────────
function OppositeStand() {
    const SL = OPP_STAND_SL;
    const SD = OPP_STAND_SD;
    const SH = OPP_STAND_SH;
    const ROW_COUNT = OPP_STAND_ROW_COUNT;

    const crowd = useMemo(() => {
        const out: { x: number; y: number; z: number; color: number }[] = [];
        for (let r = 0; r < OPP_STAND_ROW_COUNT; r++) {
            const t = r / (OPP_STAND_ROW_COUNT - 1);
            for (let s = 0; s < OPP_STAND_SEAT_COUNT; s++) {
                if (Math.random() < 0.45) {
                    out.push({
                        x:
                            (-OPP_STAND_SL / 2) * 0.95 +
                            (s + 0.5) * ((OPP_STAND_SL * 0.95) / OPP_STAND_SEAT_COUNT),
                        y: 0.075 + t * OPP_STAND_SH,
                        z: OPP_STAND_SD / 2 - ((r + 0.5) * OPP_STAND_SD) / OPP_STAND_ROW_COUNT,
                        color:
                            COL.crowdColors[Math.floor(Math.random() * COL.crowdColors.length)] ??
                            COL.crowdColors[0]!,
                    });
                }
            }
        }
        return out;
    }, []);

    return (
        <group>
            <mesh position-y={0.02} castShadow receiveShadow>
                <boxGeometry args={[SL, 0.04, SD]} />
                <meshStandardMaterial color={COL.tribuneBase} roughness={0.95} />
            </mesh>
            {Array.from({ length: ROW_COUNT }, (_, r) => {
                const t = r / (ROW_COUNT - 1);
                return (
                    <mesh
                        key={r}
                        position={[0, 0.04 + t * SH, SD / 2 - ((r + 0.5) * SD) / ROW_COUNT]}
                        castShadow
                        receiveShadow
                    >
                        <boxGeometry args={[SL * 0.97, 0.025, (SD / ROW_COUNT) * 1.05]} />
                        <meshStandardMaterial color={COL.tribuneWood} roughness={0.9} />
                    </mesh>
                );
            })}
            {crowd.map((p, i) => (
                <mesh key={i} position={[p.x, p.y, p.z]} castShadow>
                    <capsuleGeometry args={[0.012, 0.02, 2, 4]} />
                    <meshStandardMaterial color={p.color} roughness={0.8} />
                </mesh>
            ))}
        </group>
    );
}

// ─── Projecteur (mât + boîtier de spots + cône volumétrique + SpotLight) ───
const FLOOD_CONE_VERT = /* glsl */ `
  varying float vY;
  varying vec3 vN;
  void main() {
    vY = uv.y;
    vN = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const FLOOD_CONE_FRAG = /* glsl */ `
  varying float vY;
  varying vec3 vN;
  uniform vec3 uColor;
  void main() {
    float fall = pow(vY, 1.2);
    float fres = pow(1.0 - abs(dot(vN, vec3(0,0,1))), 2.0);
    float a = fall * 0.18 + fres * 0.06;
    gl_FragColor = vec4(uColor, a);
  }
`;

function Floodlight({ x, z, castShadow = false }: { x: number; z: number; castShadow?: boolean }) {
    const poleH = FLOOD_H;
    const angY = Math.atan2(-x, -z);

    const coneMat = useMemo(
        () =>
            new THREE.ShaderMaterial({
                transparent: true,
                depthWrite: false,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending,
                uniforms: { uColor: { value: new THREE.Color(COL.cone) } },
                vertexShader: FLOOD_CONE_VERT,
                fragmentShader: FLOOD_CONE_FRAG,
            }),
        [],
    );

    const { conePos, coneScale, coneQuat } = useMemo(() => {
        const origin = new THREE.Vector3(x, poleH + 0.04, z);
        const target = new THREE.Vector3(0, 0, 0);
        const len = origin.distanceTo(target);
        const mid = origin.clone().add(target).multiplyScalar(0.5);
        const dir = target.clone().sub(origin).normalize().multiplyScalar(-1);
        const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        return {
            conePos: mid,
            coneScale: new THREE.Vector3(1, len / 1.7, 1),
            coneQuat: quat,
        };
    }, [x, z, poleH]);

    return (
        <group>
            {/* Mât */}
            <group position={[x, 0, z]}>
                <mesh position-y={poleH / 2} castShadow>
                    <cylinderGeometry args={[0.012, 0.018, poleH, 8]} />
                    <meshStandardMaterial color={COL.floodMetal} roughness={0.5} metalness={0.7} />
                </mesh>
                {/* Plateforme sommet */}
                <mesh position-y={poleH + 0.006} castShadow>
                    <boxGeometry args={[0.12, 0.012, 0.08]} />
                    <meshStandardMaterial color={COL.floodMetal} roughness={0.5} metalness={0.7} />
                </mesh>
                {/* Boîtier de spots — rotation X = -0.45 pour pointer vers terrain */}
                <group position-y={poleH + 0.04} rotation={[-0.45, angY, 0]}>
                    {Array.from({ length: 8 }, (_, k) => {
                        const i = Math.floor(k / 4);
                        const j = k % 4;
                        return (
                            <group key={k}>
                                <mesh position={[-0.045 + j * 0.03, 0.006 + i * 0.024, 0]}>
                                    <boxGeometry args={[0.022, 0.022, 0.014]} />
                                    <meshStandardMaterial
                                        color={0x222222}
                                        roughness={0.4}
                                        metalness={0.6}
                                    />
                                </mesh>
                                <mesh position={[-0.045 + j * 0.03, 0.006 + i * 0.024, 0.008]}>
                                    <planeGeometry args={[0.018, 0.018]} />
                                    <meshBasicMaterial
                                        color={COL.bulb}
                                        transparent
                                        opacity={0.95}
                                    />
                                </mesh>
                            </group>
                        );
                    })}
                </group>
            </group>

            {/* SpotLight (pointe vers (0,0,0) du stade) */}
            <spotLight
                position={[x, poleH + 0.04, z]}
                target-position={[0, 0, 0]}
                color={COL.spotColor}
                intensity={8}
                distance={6}
                angle={Math.PI * 0.16}
                penumbra={0.4}
                decay={1.2}
                castShadow={castShadow}
                shadow-mapSize={[512, 512]}
                shadow-camera-near={0.5}
                shadow-camera-far={8}
                shadow-bias={-0.001}
            />

            {/* Cône volumétrique visible */}
            <mesh
                position={[conePos.x, conePos.y, conePos.z]}
                quaternion={coneQuat}
                scale={[coneScale.x, coneScale.y, coneScale.z]}
            >
                <coneGeometry args={[0.45, 1.7, 24, 1, true]} />
                <primitive object={coneMat} attach="material" />
            </mesh>
        </group>
    );
}

function Floodlights() {
    const FX = PITCH_LEN * 0.62;
    const FZ = PITCH_WID * 0.85;
    // Seules 2 spotlights castent des shadow-map (limite GPU sur mobile).
    return (
        <group>
            <Floodlight x={FX} z={FZ} castShadow />
            <Floodlight x={-FX} z={FZ} />
            <Floodlight x={FX} z={-FZ} castShadow />
            <Floodlight x={-FX} z={-FZ} />
        </group>
    );
}

// ─── Stade complet (posé au pôle nord du ballon) ───────────────────────────
function Stadium() {
    return (
        <group position={[0, BALL_R, 0]}>
            <Platform />
            <Pitch />
            <Goals />
            <CornerFlags />
            <Players />
            <group position={[0, 0, -PITCH_WID / 2 - 0.27]}>
                <MainStand />
            </group>
            <group position={[0, 0, PITCH_WID / 2 + 0.2]} rotation-y={Math.PI}>
                <OppositeStand />
            </group>
            <Floodlights />
            {/* Halo lumineux global au-dessus du stade */}
            <pointLight
                position={[0, 0.7, 0]}
                color={0xfff5d6}
                intensity={0.6}
                distance={6}
                decay={1.4}
            />
        </group>
    );
}

// ─── Scène complète qui tourne lentement (planète + stade solidaires) ──────
function PlanetWithStadium() {
    const ref = useRef<THREE.Group>(null);
    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.025;
        }
    });
    return (
        <group ref={ref}>
            <FootballPlanet />
            <Stadium />
        </group>
    );
}

interface Hero3DSceneProps {
    ariaLabel: string;
}

/**
 * Hero 3D foot — ballon de football procédural (shader icosaèdre tronqué)
 * avec un diorama de stade amateur posé au pôle nord. 100 % généré, aucun
 * asset GLB chargé. Remplace l'ancien rendu basé sur planet-simplyfoot.glb
 * pour le hero `/foot/` et `/foot/features`.
 *
 * Performance : ~500 méshes statiques (joueurs, gradins, foule). 2 shadow
 * maps actives sur 4 projecteurs pour ménager le GPU mobile. La rotation
 * lente solidarise ballon + stade pour préserver l'illusion "stade au pôle".
 *
 * Le composant doit être chargé via `dynamic({ ssr: false })` côté
 * consommateur — toutes les API Three.js sont client-only.
 */
export function Hero3DScene({ ariaLabel }: Hero3DSceneProps) {
    const moonColor = useRootColor('--secondary');

    return (
        <div
            role="img"
            aria-label={ariaLabel}
            className="pointer-events-none absolute inset-0 motion-reduce:opacity-50"
        >
            <Canvas
                camera={{ position: [7.5, 5.8, 8.5], fov: 38, near: 0.1, far: 100 }}
                dpr={[1, 1.75]}
                gl={{ antialias: true, alpha: true }}
                shadows
            >
                <hemisphereLight args={[0x4a6a9a, 0x1a1208, 0.35]} />
                <directionalLight
                    position={[-8, 12, 6]}
                    intensity={0.55}
                    color={moonColor}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                    shadow-camera-near={0.1}
                    shadow-camera-far={30}
                    shadow-camera-left={-6}
                    shadow-camera-right={6}
                    shadow-camera-top={8}
                    shadow-camera-bottom={-2}
                    shadow-bias={-0.0008}
                    shadow-normalBias={0.02}
                />
                <PlanetWithStadium />
            </Canvas>
        </div>
    );
}
