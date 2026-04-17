# Skill: Ajouter un composant shadcn/ui

## Quand utiliser

Quand Builder a besoin d'un composant UI primitif qui n'existe pas encore dans `components/ui/`.

## Procedure

1. Verifier que le composant n'existe pas deja : `ls components/ui/ | grep <nom>`
2. Installer via CLI : `npx shadcn@latest add <nom>`
3. Verifier que le fichier a ete cree dans `components/ui/<nom>.tsx`
4. Formatter : `npx prettier --write components/ui/<nom>.tsx`
5. Tester le build : `npm run build`

## Composants deja installes

`button card dialog input label select textarea separator badge avatar sheet dropdown-menu navigation-menu accordion tabs tooltip sonner`

## Attention

- Ne PAS modifier un composant shadcn immediatement apres installation
- Si besoin de customisation : ajouter dans le composant parent (ex: `<Button className="...">`)
- Pour une customisation profonde : documenter dans un ADR
- shadcn v4 utilise oklch et `@theme inline` — ne pas revenir a hsl
