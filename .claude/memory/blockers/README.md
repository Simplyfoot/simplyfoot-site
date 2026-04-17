# Blockers

Journal des problemes qui ont bloque pendant 15+ minutes.

## Pourquoi les documenter meme quand resolus ?

Pour qu'un futur Claude (ou humain) ne repasse pas 30 minutes sur le meme probleme.

## Format

```markdown
---
date: YYYY-MM-DD
area: ui | 3d | i18n | ...
status: active | resolved
severity: critical | major | minor
---

# Blocker: <titre>

## Symptome

Ce qu'on observe

## Contexte

Ce qu'on faisait quand c'est arrive

## Tentatives

- Tentative 1 : [description] -> [resultat]
- Tentative 2 : [description] -> [resultat]

## Resolution (si status: resolved)

Ce qui a marche

## Contournement (si status: active)

Ce qu'on fait en attendant
```

## Archivage

Quand `status: resolved` + 30 jours -> deplacer dans `blockers/archives/`
