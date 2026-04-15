'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Si deja connecte, rediriger vers dashboard
  useEffect(() => {
    if (localStorage.getItem('simply_admin')) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock auth
    if (email === 'admin@simply.fr' && password === 'Simply@Admin2025!') {
      localStorage.setItem('simply_admin', JSON.stringify({
        id: 'admin-1', email, name: 'Admin Simply', role: 'super_admin', lastLogin: new Date().toISOString(),
      }));
      router.push('/admin/dashboard');
    } else {
      setError('Identifiants incorrects');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--admin-bg)] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <Lock className="h-5 w-5 text-white/70" />
          </div>
          <h1 className="text-2xl font-bold text-white">Simply Admin</h1>
          <p className="text-sm text-white/40 mt-1">Connectez-vous pour accéder au panneau</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="text-xs font-medium text-white/50 uppercase tracking-wide">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg bg-[var(--admin-surface)] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
              placeholder="admin@simply.fr"
              required
            />
          </div>
          <div>
            <label htmlFor="login-password" className="text-xs font-medium text-white/50 uppercase tracking-wide">Mot de passe</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg bg-[var(--admin-surface)] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white py-3 text-sm font-bold text-[var(--admin-bg)] hover:bg-white/90 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
