'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminSidebar } from 'components/admin/AdminSidebar';
import { AdminHeader } from 'components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('simply_admin');
    if (stored) {
      setAuthenticated(true);
    } else if (pathname !== '/admin/login') {
      router.push('/admin/login');
    }
    setLoading(false);
  }, [pathname, router]);

  function handleLogout() {
    localStorage.removeItem('simply_admin');
    setAuthenticated(false);
    router.push('/admin/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  // Login page — no sidebar/header
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#09090B] text-white">
      <AdminSidebar onLogout={handleLogout} />

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button type="button" aria-label="Fermer le menu" className="absolute inset-0 bg-black/60 cursor-pointer" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-[260px] h-full">
            <AdminSidebar onLogout={handleLogout} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
