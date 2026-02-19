import { Article } from './article.model';

export interface ArticlesPaginated {
  currentPage: number;
  data: Article[];
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
