import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from '@shared/models/api.response.model';
import { AllArticles } from '@shared/models/allArticles.model';
import { API_PATHS } from '@shared/constants/path.constants';
import { Article } from '@shared/models/article.model';
import { NetworkService } from './network.service';

/**
 * Article Service
 */
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  route: ActivatedRoute = inject(ActivatedRoute);
  network: NetworkService = inject(NetworkService);

  /**
   * Fetch All Articles
   * @param params all filtering params
   * @return {Observable}
   */
  getAllArticles(params: Params): Observable<AllArticles> {
    const reqParams = new HttpParams({
      fromObject: params,
    });
    return this.network.get<ApiResponse<AllArticles>>(API_PATHS.allArticles, { params: reqParams }).pipe(
      map(resp => {
        return resp.data;
      })
    );
  }

  getArticleById(id: string): Observable<Article> {
    return this.network.get<ApiResponse<Article>>(`${API_PATHS.allArticles}/${id}`).pipe(
      map(resp => {
        return resp.data;
      })
    );
  }
}
