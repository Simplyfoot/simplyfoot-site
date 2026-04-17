# Hooks Claude Code

Repertoire reserve pour les hooks Claude Code (automatisations declenchees par des evenements).

## Statut

Post-MVP. A implementer quand les workflows de base sont rodes.

## Hooks envisages

| Hook             | Declencheur                  | Action                                    |
| ---------------- | ---------------------------- | ----------------------------------------- |
| pre-commit-audit | Avant `git commit`           | Lance `/audit` automatiquement            |
| post-build-check | Apres `npm run build`        | Verifie les metriques (bundle size, etc.) |
| new-file-check   | Creation d'un fichier `.tsx` | Verifie le template de composant          |

## Implementation

Les hooks Claude Code se configurent dans `.claude/settings.json` ou via l'API hooks.
Documentation : https://docs.anthropic.com/claude-code/hooks
