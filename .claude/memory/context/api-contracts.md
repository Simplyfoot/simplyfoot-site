# Contrats API internes — SIMPLY

## API Routes prevues

### POST `/api/simmo` (a implementer)

Point d'entree pour le chatbot Simmo (mascotte SIMPLY).
Connecte a l'API Anthropic (Claude) cote serveur.

**Request**

```json
{
    "message": "string",
    "brand": "foot | rugby | handball | null",
    "locale": "fr | en",
    "history": [{ "role": "user | assistant", "content": "string" }]
}
```

**Response (streaming)**

```json
{
    "response": "string",
    "suggestions": ["string", "string"]
}
```

**Securite**

- Cle API Anthropic dans `ANTHROPIC_API_KEY` (env server-only, JAMAIS expose cote client)
- Rate limiting a implementer
- Validation du body via Zod schema

## Hooks internes

### `useBrand()` — lib/brand/context.tsx

- Retourne `BrandConfig` complet
- Disponible uniquement dans un `BrandProvider`
- Throw si utilise hors contexte

### `useReducedMotion()` — lib/hooks/use-reduced-motion.ts

- Retourne `boolean`
- Detecte `prefers-reduced-motion: reduce`
- Utilise par tous les composants 3D et d'animation

## Stores Zustand (a implementer)

Aucun store Zustand n'est encore cree. Quand le besoin se presentera :

```tsx
// lib/stores/example-store.ts
import { create } from 'zustand';

interface ExampleState {
    value: string;
    setValue: (v: string) => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
    value: '',
    setValue: (v) => set({ value: v }),
}));
```
