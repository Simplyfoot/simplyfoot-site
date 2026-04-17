# Commande: /session-start

## Rituel de debut de session

Execute cette sequence :

1. **Lire CLAUDE.md** (racine)
2. **Lire `.claude/memory/INDEX.md`**
3. **Lire la derniere entree de `.claude/memory/iterations/`**
    ```bash
    ls -t .claude/memory/iterations/*.md | head -1
    ```
4. **Verifier les blockers actifs** :
    ```bash
    grep -l "status: active" .claude/memory/blockers/*.md
    ```
5. **Identifier la tache** :
    - Si l'utilisateur a precise -> activer l'agent pertinent
    - Si pas precise -> demander ou reprendre la ou on s'est arrete

6. **Confirmer avec l'utilisateur** :
    > "J'ai charge le contexte. Derniere session : [resume].
    > Blockers actifs : [liste].
    > Tache proposee : [X]. On y va ?"

## NE PAS

- Commencer a coder avant d'avoir lu le contexte
- Ignorer les blockers actifs
- Repartir de zero sur un probleme deja documente
