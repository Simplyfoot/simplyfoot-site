---
name: prompt-claude-code
description: Rediger un prompt technique structure en 10 blocs pour Claude Code, template Role Contexte Objectif Perimetre Specifications
---

# Skill : Prompt pour Claude Code

## Structure obligatoire en 10 blocs

```
## ROLE → Quel agent est concerne
## CONTEXTE PROJET → Stack, etat actuel, conventions
## OBJECTIF → Precis, mesurable
## PERIMETRE → Fichiers a creer / modifier / NE PAS TOUCHER
## SPECIFICATIONS TECHNIQUES → Types, props, logique
## CONTRAINTES DE STYLE → Design system, mobile-first
## CONTENU → Textes exacts ou consignes
## RESULTAT ATTENDU → Visuel + comportement
## INTERDICTIONS → Derives a bloquer
## CHECKLIST → Criteres objectifs
```

## Exemple complet — Creation d'un FeatureGrid

```
## ROLE
Agent 2 (Design System) + Agent 3 (Frontend)

## CONTEXTE PROJET
Plateforme Simply, Next.js 14+ App Router, TypeScript strict, Tailwind CSS.
Le composant FeatureGrid n'existe pas encore dans components/sections/.
Il sera utilise sur les pages foot, rugby et handball.

## OBJECTIF
Creer un composant FeatureGrid mutualise dans components/sections/FeatureGrid.tsx
qui affiche 3-6 fonctionnalites en grille responsive avec icones.

## PERIMETRE
- CREER : src/components/sections/FeatureGrid.tsx
- NE PAS TOUCHER : aucun autre fichier

## SPECIFICATIONS TECHNIQUES
- Props : brand: BrandConfig, features: Feature[], variant?: 'light' | 'dark'
- Interface Feature : { icon: LucideIcon, title: string, description: string }
- Grille : 1 col mobile, 2 cols sm, 3 cols lg
- Animations Framer Motion whileInView once:true stagger 0.1s

## CONTRAINTES DE STYLE
- Container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Padding py-16 lg:py-24
- Couleurs via CSS variables var(--brand-primary)
- Typographie : titre h2 font-display text-2xl lg:text-4xl

## CONTENU
Pas de texte hardcode. Tout en props.

## RESULTAT ATTENDU
- Grille de cards avec icone coloree, titre, description
- Responsive 1→2→3 colonnes
- Animation d'apparition au scroll
- Fonctionne avec les 3 marques (vert/bleu/orange)

## INTERDICTIONS
- Pas de couleur en dur
- Pas de texte hardcode
- Pas de any
- Pas de console.log
- Pas de modification d'autre fichier

## CHECKLIST
- [ ] Compile TypeScript
- [ ] Types exportes
- [ ] BrandConfig en prop
- [ ] CSS variables
- [ ] Responsive mobile-first
- [ ] Animation Framer Motion
- [ ] className accepte
- [ ] Test mental 3 marques
```

## Qualites d'un bon prompt

| Qualite | Description |
|---|---|
| **Precis** | Objectif mesurable, pas vague |
| **Delimite** | Perimetre clair, fichiers listes |
| **Specifie** | Props, types, comportements attendus |
| **Contraint** | Interdictions explicites |
| **Verifiable** | Checklist avec criteres objectifs |
| **Contextualise** | Etat du projet, conventions a respecter |
| **Autonome** | Toute l'info necessaire dans le prompt |
