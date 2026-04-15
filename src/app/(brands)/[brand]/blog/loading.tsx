export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] px-5 py-12">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-8 h-12 w-64 rounded-lg bg-[var(--brand-surface)]" />
        <div className="mb-10 h-6 w-96 rounded bg-[var(--brand-surface)]" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-[var(--brand-border)]">
              <div className="h-44 bg-[var(--brand-surface)]" />
              <div className="space-y-3 p-6">
                <div className="h-4 w-3/4 rounded bg-[var(--brand-surface)]" />
                <div className="h-3 w-full rounded bg-[var(--brand-surface)]" />
                <div className="h-3 w-1/2 rounded bg-[var(--brand-surface)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
