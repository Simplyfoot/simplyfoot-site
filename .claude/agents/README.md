# Agents SIMPLY

Chaque agent a un **mandat**, un **territoire** (fichiers autorises) et des **contrats** (comment il interagit avec les autres).

## Equipe

| Agent                | Mandat resume                             | Territoire principal                                          |
| -------------------- | ----------------------------------------- | ------------------------------------------------------------- |
| **architect**        | Decisions structurelles, stack, ADR       | `CLAUDE.md`, `package.json`, configs, `memory/decisions/`     |
| **builder**          | Implementation pages et composants metier | `app/`, `components/{shared,brands,blog}`, `lib/hooks/`       |
| **designer**         | Tokens, UI, 3D, animations, Simmo         | `globals.css`, `components/{ui,3d,simmo}`, `brand/tokens.css` |
| **i18n-steward**     | Traductions, routing localise             | `messages/`, `lib/i18n/routing.ts`                            |
| **quality-guardian** | Types, lint, tests, a11y, contraste       | `tests/`, configs quality, correction partout                 |
| **reviewer**         | Audit global avant commit                 | Lecture seule partout                                         |

## Regle d'activation

Claude Code active UN agent par tache. Pas de multi-agent simultane.

## Handoff entre agents

Quand un agent atteint les limites de son territoire :

1. Il documente ce qu'il a fait
2. Il appelle l'agent competent : "Handoff vers [agent] : [contexte]"
3. Il ne continue PAS sur le territoire de l'autre

## Escalade

Si un agent ne sait pas qui doit traiter -> remonter a **architect** (par defaut).
