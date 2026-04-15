import type { AdminUser } from './types';

const MOCK_EMAIL = 'admin@simply.fr';
const MOCK_PASSWORD = 'Simply@Admin2025!';
const STORAGE_KEY = 'simply_admin';

const MOCK_ADMIN: AdminUser = {
  id: 'admin-001',
  email: MOCK_EMAIL,
  name: 'Damien Alfaia',
  role: 'super_admin',
  lastLogin: new Date().toISOString(),
};

export function verifyCredentials(
  email: string,
  password: string
): AdminUser | null {
  if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
    return { ...MOCK_ADMIN, lastLogin: new Date().toISOString() };
  }
  return null;
}

export function getStoredAuth(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AdminUser;
  } catch {
    // Corrupted localStorage data — return unauthenticated
    return null;
  }
}

export function storeAuth(user: AdminUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
