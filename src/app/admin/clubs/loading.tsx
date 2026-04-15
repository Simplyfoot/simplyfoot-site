export default function AdminClubsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 rounded bg-[var(--admin-surface)]" />
      <div className="flex gap-3">
        <div className="h-10 w-48 rounded-lg bg-[var(--admin-surface)]" />
        <div className="h-10 w-32 rounded-lg bg-[var(--admin-surface)]" />
      </div>
      <div className="rounded-xl border border-white/6 bg-[var(--admin-surface)] p-4 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-12 rounded bg-white/3" />
        ))}
      </div>
    </div>
  );
}
