import { Article } from './article.model';

export interface ApiResponse {
  success: boolean;
  message: string;
  data: data;
  timestamp: string;
}

export interface data {
  currentPage: number;
  data: Article[];
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
