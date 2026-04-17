# Design Tokens — reference

## Architecture des tokens

```
app/globals.css
  |-- @import "tailwindcss"
  |-- @import "tw-animate-css"
  |-- @import "shadcn/tailwind.css"
  |-- @import "../lib/brand/tokens.css"   <-- brand variables
  |-- @theme inline { ... }               <-- expose tout a Tailwind
  |-- :root { ... }                       <-- valeurs par defaut (theme clair SIMPLY)
  |-- .dark { ... }                       <-- theme sombre
  |-- @keyframes                           <-- animations custom
  |-- @layer base                          <-- styles de base
```

## Tokens shadcn (theme SIMPLY)

| Token                  | Valeur light              | Usage                          |
| ---------------------- | ------------------------- | ------------------------------ |
| `--background`         | `#F8E9CA`                 | Fond general (beige Simply)    |
| `--foreground`         | `#000000`                 | Texte principal                |
| `--primary`            | `#151B6B`                 | Bleu Simply (boutons, accents) |
| `--primary-foreground` | `#F8E9CA`                 | Texte sur fond primary         |
| `--muted-foreground`   | `#6B5D4B`                 | Texte secondaire (taupe)       |
| `--destructive`        | oklch(0.577 0.245 27.325) | Erreurs                        |
| `--border`             | `#D9C9A5`                 | Bordures                       |
| `--ring`               | `#151B6B`                 | Focus ring                     |

## Tokens de marque (via `data-brand`)

Classes Tailwind disponibles :

- `bg-brand-primary` / `text-brand-primary`
- `bg-brand-primary-dark` / `text-brand-primary-dark`
- `bg-brand-primary-light` / `text-brand-primary-light`
- `bg-brand-surface-dark` / `text-brand-surface-dark`
- `bg-brand-bg` / `text-brand-bg`

## Tokens Simply holding

Classes Tailwind disponibles :

- `bg-simply-black` / `text-simply-black` (`#000000`)
- `bg-simply-beige` / `text-simply-beige` (`#F8E9CA`)
- `bg-simply-blue` / `text-simply-blue` (`#151B6B`)
- `text-simply-text-muted` (`#6B5D4B`)

## Typographie

| Classe         | Font    | Usage                     |
| -------------- | ------- | ------------------------- |
| `font-sans`    | Inter   | Corps de texte, UI        |
| `font-display` | Poppins | Titres, grands affichages |

## Animations custom

| Classe            | Duree                   | Usage              |
| ----------------- | ----------------------- | ------------------ |
| `animate-float`   | 6s ease-in-out infinite | Elements flottants |
| `animate-fade-in` | 0.5s ease-out           | Apparition         |

## Radius

Echelle shadcn : `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`
Base : `--radius: 0.625rem`
