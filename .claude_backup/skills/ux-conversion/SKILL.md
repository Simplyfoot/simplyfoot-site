---
name: ux-conversion
description: Structure de page landing, parcours utilisateur, CTA positionnement et wording, navigation wayfinding, formulaires anti-friction, regle des 5 secondes
---

# Skill : UX & Conversion

## Structure de page type

```
HERO             → Proposition de valeur en < 5s + CTA sans scroll
SOCIAL PROOF     → Logos clubs, stats, badges confiance
FEATURES         → 3-6 benefices en grille orientes resultat
SECTION IMMERSIVE → Screenshot, video, demo produit
TEMOIGNAGES      → Retours avec nom, role, club
OFFRES / PRICING → Comparaison claire (si pertinent)
FAQ              → Reponses aux objections
CTA FINAL        → Rappel promesse + derniere conversion
```

## CTA — Regles

### Positionnement
- Visible **sans scroll** sur desktop ET mobile
- Maximum 2 par section
- CTA final en bas de page

### Hierarchie visuelle
- **Primaire** : fond plein couleur marque (`bg-[var(--brand-primary)]`)
- **Secondaire** : bordure (`border border-[var(--brand-primary)]`)
- **Tertiaire** : lien + fleche

### Wording — Exemples

| INTERDIT (generique) | CORRECT (action + benefice) |
|---|---|
| En savoir plus | Decouvrir SimplyFoot |
| Cliquez ici | Demander une demo gratuite |
| S'inscrire | Creer mon club gratuitement |
| Soumettre | Envoyer ma demande |
| Voir les offres | Comparer les formules |

## Regle des 5 secondes

L'utilisateur doit comprendre en 5 secondes :
1. **Ce que fait** la plateforme
2. **Pour qui** elle est concue
3. **Quoi faire ensuite** (CTA clair)

## Navigation — Principes

### Wayfinding
- Couleur marque active dans le header
- Breadcrumb si profondeur > 1
- Lien actif visuellement distinct

### Architecture contextuelle
- `/` → navigation plateforme (neutre)
- `/foot` → navigation SimplyFoot (couleur foot)
- CTA header toujours visible
- Mobile : hamburger + CTA sticky

## Parcours utilisateur

```
Decouverte → Comprehension → Conviction → Action
   Hero      Features/Demo   Temoignages    CTA
```

Chaque section doit repondre a une question implicite :
- Hero : "C'est quoi ?"
- Features : "Qu'est-ce que ca fait pour moi ?"
- Temoignages : "Est-ce que ca marche vraiment ?"
- CTA : "Comment je commence ?"

## Formulaires — Anti-friction

| Regle | Detail |
|---|---|
| Champs | 3-5 maximum |
| Labels | Toujours visibles (pas seulement placeholder) |
| Validation | Temps reel, pas uniquement a la soumission |
| Feedback | Loading → Succes → Prochaine etape |
| Erreurs | Contextuelles, sous le champ concerne |
| CTA formulaire | Verbe d'action ("Envoyer ma demande") |

## Impact responsive

| Element | Mobile | Desktop |
|---|---|---|
| Hero | Centre, CTA full-width | Split image/texte, CTA auto |
| Navigation | Hamburger + CTA sticky | Barre complete |
| Grille | 1 colonne | 2-3 colonnes |
| Formulaire | Pleine largeur | Largeur limitee, centre |

## Interdictions

- Page sans point de conversion
- Hero sans promesse de valeur
- Formulaire 10+ champs
- CTA "Cliquez ici"
- Popups intrusifs au chargement
- `h-screen` bloquant le scroll
- Section sans objectif clair
