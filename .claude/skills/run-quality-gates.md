# Skill: Lancer les quality gates

## Quand utiliser

- Avant chaque commit
- Fin de chaque session
- Apres une grosse modif

## Procedure

```bash
# 1. Formatage
npm run format

# 2. Type-check
npm run type-check

# 3. Lint
npm run lint

# 4. Tests
npm run test

# 5. Build
npm run build

# Ou tout d'un coup :
npm run check-all
```

## Si une gate echoue

### type-check

- Lire l'erreur en entier (souvent un typage implicite)
- Ne JAMAIS utiliser `any` — typer correctement
- Si acces par index : ajouter verification (`if (!arr[0]) return`)

### lint

- `npm run lint:fix` corrige 80% des cas
- Pour le reste : lire l'erreur et corriger manuellement
- Les composants `components/ui/` ont des overrides (label-has-associated-control off)

### format

- `npm run format` reecrit tout avec Prettier
- Si conflit : verifier `.prettierrc` et `tailwindStylesheet`

### test

- Isoler le test qui echoue
- Lancer en mode watch : `npm run test:watch`

### build

- Lire la stack d'erreur (souvent lie a dynamic imports ou SSR)
- Verifier que les composants Three.js sont bien en `ssr: false`
- Rappel : `dynamic()` avec `ssr: false` DOIT etre dans un Client Component
