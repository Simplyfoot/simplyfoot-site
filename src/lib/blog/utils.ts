import type { BlogArticle, BlogFilters } from './types';

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

export function paginateArticles(articles: BlogArticle[], page: number, perPage: number = 12) {
  const start = (page - 1) * perPage;
  return {
    articles: articles.slice(start, start + perPage),
    totalPages: Math.ceil(articles.length / perPage),
    totalArticles: articles.length,
    currentPage: page,
  };
}
