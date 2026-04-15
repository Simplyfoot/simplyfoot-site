import { type LucideIcon } from 'lucide-react';
import { cn } from 'lib/utils/cn';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  className?: string;
  color?: string;
}

export function StatCard({ title, value, trend, trendUp, icon: Icon, className, color }: StatCardProps) {
  return (
    <div className={cn('rounded-xl border border-white/6 bg-[var(--admin-surface)] p-5', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-white/40 uppercase tracking-wide">{title}</p>
          <p className="mt-2 text-2xl font-bold text-white">{value}</p>
          {trend && (
            <p className={cn('mt-1 text-xs font-medium', trendUp ? 'text-emerald-400' : 'text-red-400')}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div
          className="rounded-lg p-2"
          style={{ backgroundColor: color ? `${color}20` : 'rgba(255,255,255,0.05)' }}
        >
          <Icon className="h-5 w-5" style={{ color: color || 'rgba(255,255,255,0.5)' }} />
        </div>
      </div>
    </div>
  );
}
