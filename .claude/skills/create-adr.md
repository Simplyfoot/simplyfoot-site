# Skill: Creer un ADR (Architectural Decision Record)

## Quand utiliser

Toute decision qui engage le projet 3+ mois :

- Choix d'une librairie
- Changement de pattern
- Refonte d'un systeme
- Abandon d'une techno

## Procedure

1. Trouver le prochain numero : `ls .claude/memory/decisions/ | sort -n | tail -1`
2. Creer `.claude/memory/decisions/NNNN-titre-court.md` (avec leading zeros : 0001, 0002, etc.)
3. Remplir le template :

```markdown
---
id: NNNN
title: Titre court
status: proposed | accepted | superseded | deprecated
date: YYYY-MM-DD
area: infra | ui | i18n | 3d | brand | quality
importance: critical | high | medium | low
tags: [tag1, tag2]
supersedes: NNNN (si remplace un ADR)
superseded_by: NNNN (si remplacee)
---

# ADR-NNNN : Titre

## Contexte

Quel est le probleme a resoudre ? Quelles contraintes ?

## Decision

Qu'a-t-on decide de faire ?

## Alternatives considerees

- Option A : [description] — [pourquoi rejetee]
- Option B : [description] — [pourquoi rejetee]

## Consequences

### Positives

- ...

### Negatives / Risques

- ...

### Neutres

- ...

## Notes d'implementation

(optionnel, si utile pour la mise en oeuvre)
```

4. Mettre a jour `.claude/memory/INDEX.md` si l'ADR est `critical`
