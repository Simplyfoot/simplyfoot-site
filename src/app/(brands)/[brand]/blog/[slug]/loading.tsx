export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] px-6 py-14">
      <div className="mx-auto max-w-4xl animate-pulse">
        <div className="mb-4 h-4 w-48 rounded bg-[var(--brand-surface)]" />
        <div className="mb-3 h-10 w-3/4 rounded-lg bg-[var(--brand-surface)]" />
        <div className="mb-8 h-4 w-64 rounded bg-[var(--brand-surface)]" />
        <div className="mb-8 h-72 w-full rounded-2xl bg-[var(--brand-surface)]" />
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 rounded bg-[var(--brand-surface)]" style={{ width: `${70 + Math.random() * 30}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
