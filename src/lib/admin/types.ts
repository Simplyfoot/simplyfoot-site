export interface AdminUser {
  id: string; email: string; name: string; role: 'super_admin' | 'admin' | 'editor'; avatar?: string; lastLogin: string;
}

export interface Club {
  id: string; name: string; sport: 'foot' | 'rugby' | 'handball'; status: 'active' | 'blocked' | 'pending' | 'suspended';
  city: string; department: string; region: string; totalLicencies: number; totalEquipes: number;
  president: string; email: string; phone?: string; createdAt: string; lastActivityAt: string;
  plan: 'free_trial' | 'mini' | 'local' | 'regional' | 'elite' | 'custom'; subscriptionEnd?: string;
}

export interface User {
  id: string; firstName: string; lastName: string; email: string; phone?: string;
  role: 'president' | 'coach' | 'manager' | 'joueur' | 'parent' | 'benevole';
  sport: 'foot' | 'rugby' | 'handball'; clubId: string; clubName: string;
  status: 'active' | 'blocked' | 'pending' | 'deleted'; createdAt: string; lastLoginAt?: string;
}

export interface AdminBlogArticle {
  id: string; title: string; slug: string; brand: 'foot' | 'rugby' | 'handball';
  category: string; status: 'draft' | 'published' | 'archived'; boosted: boolean; boostExpiry?: string;
  author: string; region?: string; department?: string; publishedAt?: string;
  createdAt: string; updatedAt: string; views: number; excerpt: string; content: string;
}

export interface DashboardStats {
  totalClubs: number; totalLicencies: number; totalArticles: number; activeSubscriptions: number;
  revenueMonth: number;
  clubsBySport: { foot: number; rugby: number; handball: number };
  licenciesBySport: { foot: number; rugby: number; handball: number };
  newClubsThisMonth: number; newLicenciesThisMonth: number;
  topRegions: Array<{ region: string; clubs: number; licencies: number }>;
  registrationTrend: Array<{ month: string; clubs: number; licencies: number }>;
}

export interface AdminLog {
  id: string; action: string; target: string; targetId: string; adminUser: string; timestamp: string; details?: string;
}

export const planLabels: Record<string, string> = {
  free_trial: 'Essai gratuit', mini: 'Mini', local: 'Local', regional: 'Régional', elite: 'Élite', custom: 'Sur mesure',
};

export const statusLabels: Record<string, string> = {
  active: 'Actif', blocked: 'Bloqué', pending: 'En attente', suspended: 'Suspendu', deleted: 'Supprimé',
  draft: 'Brouillon', published: 'Publié', archived: 'Archivé',
};

export const roleLabels: Record<string, string> = {
  president: 'Président', coach: 'Coach', manager: 'Manager', joueur: 'Joueur', parent: 'Parent', benevole: 'Bénévole',
};

export const sportLabels: Record<string, string> = {
  foot: 'Football', rugby: 'Rugby', handball: 'Handball',
};
