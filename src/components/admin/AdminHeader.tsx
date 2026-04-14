'use client';

import { usePathname } from 'next/navigation';
import { Bell, Menu } from 'lucide-react';
import { useMemo } from 'react';

const BREADCRUMBS: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/blog': 'Blog',
  '/admin/blog/new': 'Nouvel article',
  '/admin/clubs': 'Clubs',
  '/admin/users': 'Utilisateurs',
  '/admin/settings': 'Paramètres',
};

export function AdminHeader({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const pathname = usePathname();

  const breadcrumb = useMemo(() => {
    const parts = pathname.split('/').filter(Boolean);
    const crumbs: string[] = ['Admin'];
    const path = '/' + parts.join('/');

    if (BREADCRUMBS[path]) {
      crumbs.push(BREADCRUMBS[path]);
    } else if (parts.length >= 3) {
      crumbs.push(BREADCRUMBS[`/admin/${parts[1]}`] || parts[1]);
      if (parts[2] === 'new') crumbs.push('Nouveau');
      else if (parts[3] === 'edit') crumbs.push('Modifier');
      else crumbs.push('Détail');
    }

    return crumbs;
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/6 bg-[#09090B]/95 backdrop-blur-sm px-5 py-3.5">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 cursor-pointer"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <nav className="text-sm text-white/40">
          {breadcrumb.map((crumb, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2">›</span>}
              <span className={i === breadcrumb.length - 1 ? 'text-white' : ''}>{crumb}</span>
            </span>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
          <Bell className="h-4 w-4" />
        </button>
        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
          A
        </div>
      </div>
    </header>
  );
}
