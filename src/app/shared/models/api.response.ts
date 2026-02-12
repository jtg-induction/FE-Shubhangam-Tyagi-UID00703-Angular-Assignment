import { Article } from './article.model';

export interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    data: Article[];
  };
  timestamp: string;
}
