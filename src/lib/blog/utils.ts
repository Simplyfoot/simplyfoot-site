import type { BlogArticle, BlogFilters } from './types';

/**
 * Filtre les articles de blog par marque, categorie, region et recherche textuelle.
 * Les resultats sont tries par date de publication decroissante.
 * @param articles - Liste complete des articles
 * @param brand - Identifiant de la marque pour filtrer
 * @param filters - Criteres de filtrage (search, category, region, department)
 * @returns Articles filtres et tries
 */
export function filterArticles(
  articles: BlogArticle[],
  brand: string,
  filters: BlogFilters,
): BlogArticle[] {
  let result = articles.filter((a) => a.brand === brand);

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  if (filters.category) {
    result = result.filter((a) => a.category === filters.category);
  }

  if (filters.region) {
    result = result.filter((a) => a.region === filters.region);
  }

  if (filters.department) {
    result = result.filter((a) => a.department === filters.department);
  }

  result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return result;
}

/**
 * Pagine un tableau d'articles et retourne la tranche correspondante.
 * @param articles - Liste des articles a paginer
 * @param page - Numero de la page courante (commence a 1)
 * @param perPage - Nombre d'articles par page (defaut : 12)
 * @returns Objet contenant les articles de la page, le total de pages et d'articles
 */
export function paginateArticles(articles: BlogArticle[], page: number, perPage: number = 12) {
  const start = (page - 1) * perPage;
  return {
    articles: articles.slice(start, start + perPage),
    totalPages: Math.ceil(articles.length / perPage),
    totalArticles: articles.length,
    currentPage: page,
  };
}
