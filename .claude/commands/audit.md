# Commande: /audit

## Usage

Lance l'agent Reviewer pour un audit complet du projet.

## Procedure

1. Activer l'agent Reviewer (`.claude/agents/reviewer.md`)
2. Executer la checklist complete de revue :
    - Coherence architecturale
    - Coherence de design
    - Coherence i18n
    - Coherence qualite
    - Coherence metier
3. Lancer les quality gates (`npm run check-all`)
4. Rechercher les violations d'invariants :

    ```bash
    # Zero any / ts-ignore
    grep -r "@ts-ignore\|@ts-nocheck\|: any\b" --include="*.ts" --include="*.tsx" app/ components/ lib/ types/

    # Zero console.log
    grep -r "console\.log" --include="*.ts" --include="*.tsx" app/ components/ lib/

    # Couleurs hardcodees dans composants
    grep -rn '"#[0-9A-Fa-f]\{6\}"' --include="*.tsx" components/
    ```

5. Produire un rapport structure (format dans `reviewer.md`)
6. Handoff vers les agents concernes pour correction
