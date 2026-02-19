import { Article } from './article.model';

export interface AllArticles {
  currentPage: number;
  data: Article[];
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
