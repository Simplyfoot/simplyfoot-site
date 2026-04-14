---
name: 3d-scene-builder
description: Utilise cette skill quand tu dois créer ou modifier une scène 3D React Three Fiber. Couvre le setup du canvas, les matériaux, l'éclairage, le post-processing et les performances.
---

# Skill : Construction de scènes 3D R3F

## Setup du canvas
- Toujours utiliser dynamic import : `const Scene = dynamic(() => import('./MyScene'), { ssr: false })`
- Toujours wrapper dans Suspense avec un fallback HTML visible
- Props du Canvas : `gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}` + `dpr={[1, 2]}`

## Matériaux pour le glow
Pour que le Bloom fonctionne, les matériaux DOIVENT avoir :
- `toneMapped={false}`
- `emissiveIntensity > 1` (recommandé : 2 à 4)
- Utiliser MeshStandardMaterial ou MeshPhysicalMaterial avec emissive

## Post-processing obligatoire
```jsx
import { EffectComposer, Bloom, Vignette, ToneMapping, Noise } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'

<EffectComposer>
  <Bloom mipmapBlur luminanceThreshold={0.8} intensity={1.5} />
  <Vignette offset={0.3} darkness={0.8} />
  <Noise opacity={0.03} />
  <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
</EffectComposer>
```

## Performance mobile
- Réduire segments : 32 au lieu de 64
- Réduire dpr : [1, 1.5]
- Réduire Bloom intensity : 0.8
- Désactiver le suivi de souris
- Détecter : `const isMobile = typeof window !== 'undefined' && window.innerWidth < 768`

## prefers-reduced-motion
```jsx
const prefersReduced = useReducedMotion()
if (prefersReduced) return <StaticFallback />
```