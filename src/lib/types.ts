export type PortfolioCategory = '平面設計' | '3D' | '';

export interface PortfolioItem {
  id: string;
  title: string;
  titleEn: string;
  category: PortfolioCategory;
  coverUrl: string;
  description: string;
  descriptionEn: string;
  isFeatured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  titleEn: string;
  coverUrl: string;
  publishedAt: string;
  tags: string[];
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}
