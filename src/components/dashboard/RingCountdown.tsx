"use client";
import { diffParts, betweenProgress, formatDate } from "lib/utils";
import { useEffect, useState } from "react";


export function RingCountdown({ start, end }: { start: string; end: string }) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const { days, hours, mins, expired } = diffParts(end);
  const pct = betweenProgress(start, end);
  const ring = `conic-gradient(#29be4f ${pct * 3.6}deg, rgba(255,255,255,0.08) 0)`;

  return (
    <div className="flex items-center gap-4">
      <div className="h-16 w-16 rounded-full grid place-items-center" style={{ background: ring }}>
        <div className="h-12 w-12 rounded-full bg-[#14482F] grid place-items-center text-white text-xs font-bold">
          {expired ? "0j" : `${days}j`}
        </div>
      </div>
      <div className="text-sm">
        <div className="text-white/80">Temps restant</div>
        <div className="font-extrabold text-[#29be4f]">
          {expired ? "Expiré" : `${days}j ${hours}h ${mins}m`}
        </div>
        <div className="text-[11px] text-white/60">
          Fin le {formatDate(end)} • Avancement {pct}%
        </div>
      </div>
    </div>
  );
}
