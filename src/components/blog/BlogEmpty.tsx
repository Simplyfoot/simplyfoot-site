interface BlogEmptyProps {
  onClear: () => void;
}

export function BlogEmpty({ onClear }: BlogEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-5xl mb-4">📭</span>
      <h3 className="text-xl font-bold text-white mb-2">Aucun article trouvé</h3>
      <p className="text-sm text-[var(--color-text-beige)]/60 mb-6 max-w-md">
        Aucun article ne correspond à vos critères de recherche. Essayez de modifier vos filtres.
      </p>
      <button
        onClick={onClear}
        className="rounded-lg bg-[var(--brand-cta)] px-5 py-2.5 text-sm font-bold text-[var(--brand-cta-text)] hover:bg-[var(--brand-cta-hover)] transition-colors cursor-pointer"
      >
        Effacer les filtres
      </button>
    </div>
  );
}
