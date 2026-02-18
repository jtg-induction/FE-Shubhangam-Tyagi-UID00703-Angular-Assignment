import { Article } from './article.model';

export interface ArticleResponse {
  success: boolean;
  message: string;
  data: Article;
  timestamp: string;
}
