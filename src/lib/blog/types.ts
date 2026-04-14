export interface BlogArticle {
  id: string;
  slug: string;
  brand: 'foot' | 'rugby' | 'handball';
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  category: BlogCategory;
  tags: string[];
  region?: string;
  department?: string;
}

export type BlogCategory =
  | 'actualite'
  | 'reglementation'
  | 'conseils'
  | 'temoignages'
  | 'mises-a-jour'
  | 'evenements';

export const categoryLabels: Record<BlogCategory, string> = {
  actualite: 'Actualités',
  reglementation: 'Réglementation',
  conseils: 'Conseils clubs',
  temoignages: 'Témoignages',
  'mises-a-jour': 'Mises à jour',
  evenements: 'Événements',
};

export interface BlogFilters {
  category?: BlogCategory;
  region?: string;
  department?: string;
  search?: string;
  page: number;
}
