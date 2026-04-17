# Memory Index — SIMPLY

> **Lis ce fichier EN PREMIER en debut de session.**
> Il te dit quoi charger selon la tache, sans avoir a tout lire.

## Tag system

Chaque entree dans `memory/` a des tags YAML frontmatter :

- `area`: `infra | ui | i18n | 3d | brand | quality | admin | simmo | blog | content`
- `phase`: `foundation | architecture | features | polish`
- `status`: `active | resolved | archived`
- `importance`: `critical | high | medium | low`

## Chargement intelligent par type de tache

### Tu travailles sur la stack / l'infra

Charge : `decisions/` (tagues `area:infra`), `context/stack-details.md`

### Tu travailles sur un composant UI

Charge : `learnings/` (tagues `area:ui`), `context/design-tokens.md`, derniere iteration UI

### Tu travailles sur les couleurs / theme / marque

Charge : `context/brand-configs.md`, `context/design-tokens.md`, decisions ADR-color-\*

### Tu travailles sur l'i18n

Charge : `context/routing-map.md`, learnings `area:i18n`

### Tu travailles sur la 3D

Charge : `learnings/` tagues `area:3d`, blockers `area:3d` non resolus

### Tu es en debut de session sans tache precise

Charge : derniere entree `iterations/`, blockers `status:active`

## Index des entrees critiques

| ID       | Titre                | Tags  | Statut |
| -------- | -------------------- | ----- | ------ |
| ADR-0001 | Template (reference) | infra | n/a    |

## Regles de creation

- **Decision** : toute decision qui engage le projet 3+ mois -> ADR dans `decisions/`
- **Apprentissage** : piege evite qui doit survivre a la session -> `learnings/`
- **Blocage** : bloque 15+ min -> entree dans `blockers/` (meme si resolu apres)
- **Iteration** : 1 entree par session de travail -> `iterations/`

## Rotation / archivage

- `iterations/` : garder les 20 dernieres, archiver les plus anciennes dans `archives/`
- `blockers/` : quand resolu + 30 jours -> archiver
- `learnings/` : jamais archiver (memoire durable)
- `decisions/` : jamais archiver, seulement marquer `superseded` si remplacee
