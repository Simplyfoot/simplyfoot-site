'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';

import type { AdminUser } from './types';
import {
  clearAuth,
  getStoredAuth,
  storeAuth,
  verifyCredentials,
} from './admin-auth';

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  loading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(
  undefined
);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = getStoredAuth();
    if (stored) {
      setAdminUser(stored);
    }
    setLoading(false);
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const user = verifyCredentials(email, password);
    if (user) {
      storeAuth(user);
      setAdminUser(user);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setAdminUser(null);
    router.push('/admin/login');
  }, [router]);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      isAuthenticated: adminUser !== null,
      adminUser,
      login,
      logout,
      loading,
    }),
    [adminUser, login, logout, loading]
  );

  if (loading) {
    return null;
  }

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
