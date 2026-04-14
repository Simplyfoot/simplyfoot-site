---
name: gsap-animator
description: Utilise cette skill quand tu dois créer des animations GSAP avec ScrollTrigger dans Next.js. Couvre le pattern correct, les text reveals, les staggers et l'intégration Lenis.
---

# Skill : Animations GSAP dans Next.js

## Pattern obligatoire
```tsx
'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AnimatedSection() {
  const ref = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    gsap.from('.reveal', {
      y: 60, opacity: 0, duration: 0.8,
      ease: 'power3.out', stagger: 0.15,
      scrollTrigger: { trigger: ref.current, start: 'top 80%' }
    })
  }, { scope: ref })

  return <div ref={ref}>...</div>
}
```

## JAMAIS utiliser useEffect pour GSAP. useGSAP gère le cleanup automatiquement.
## TOUJOURS passer { scope: containerRef } pour isoler les sélecteurs CSS.

## Text reveal (titres qui se dévoilent au scroll)
Wrapper chaque mot dans un span, puis animer avec clipPath ou overflow+translateY.

## Intégration Lenis
Lenis et ScrollTrigger doivent être synchronisés :
```tsx
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```