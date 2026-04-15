'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Building, Users, Settings, ExternalLink, LogOut } from 'lucide-react';
import { cn } from 'lib/utils/cn';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: FileText, label: 'Blog', href: '/admin/blog' },
  { icon: Building, label: 'Clubs', href: '/admin/clubs' },
  { icon: Users, label: 'Utilisateurs', href: '/admin/users' },
];

const BOTTOM_ITEMS = [
  { icon: Settings, label: 'Paramètres', href: '/admin/settings' },
  { icon: ExternalLink, label: 'Voir le site', href: '/', external: true },
];

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col w-[260px] bg-[var(--admin-bg)] border-r border-white/6 h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-white/6">
        <Link href="/admin/dashboard" className="text-lg font-bold text-white">
          Simply <span className="text-white/40 font-normal text-sm">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5',
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/6 space-y-1">
        {BOTTOM_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-colors"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
