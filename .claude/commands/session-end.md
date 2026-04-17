# Commande: /session-end

## Rituel de fin de session

1. **Lancer quality gates** :

    ```bash
    npm run check-all
    ```

2. **Si ca passe** :
    - Creer une entree dans `.claude/memory/iterations/YYYY-MM-DD-HHMM-<slug>.md`
    - Template :

```markdown
---
date: YYYY-MM-DD
duration_minutes: X
agents_used: [builder, designer, quality-guardian]
status: completed | partial | blocked
---

# Session: <titre descriptif>

## Objectif

Ce qu'on voulait accomplir

## Realise

- Fichier A cree : [description]
- Fichier B modifie : [description]

## Metriques

- npm run type-check : pass/fail
- npm run lint : pass/fail
- npm run test : pass/fail (X/Y passent)
- npm run build : pass/fail

## Decisions prises

- Lien vers ADR si applicable

## Apprentissages

- Lien vers learning si applicable

## Blockers rencontres

- Lien vers blocker si applicable

## Prochaine etape suggeree

Ce qu'il faut faire la prochaine fois
```

3. **Si blockers ou apprentissages** : creer les entrees correspondantes

4. **Mettre a jour INDEX.md** si necessaire

5. **Commit** avec message conventionnel :
    ```bash
    git add .
    git commit -m "<type>(<scope>): <description>"
    ```
