"use client";
import { AlertTriangle } from "lucide-react";

export function SeatUsage({ used, quota }: { used: number; quota: number }) {
  const pct = Math.min(100, Math.round((used / quota) * 100));
  const bar = pct < 70 ? "bg-emerald-500" : pct < 90 ? "bg-amber-500" : "bg-rose-500";

  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-white/70">
        <span>Licenciés</span>
        <span>
          {used} / {quota} ({pct}%)
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className={`h-full ${bar}`} style={{ width: `${pct}%` }} />
      </div>
      {pct >= 90 && (
        <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-300">
          <AlertTriangle className="h-3.5 w-3.5" />
          Presque au quota – pensez à mettre à jour votre plan.
        </div>
      )}
    </div>
  );
}
