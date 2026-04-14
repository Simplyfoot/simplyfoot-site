export interface BlogPostDTO {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverUrl: string | null;
  authorName: string;
  publishedAt: string;
  tags: string[];
}

export interface BlogPostSummaryDTO {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string | null;
  authorName: string;
  publishedAt: string;
  tags: string[];
}
