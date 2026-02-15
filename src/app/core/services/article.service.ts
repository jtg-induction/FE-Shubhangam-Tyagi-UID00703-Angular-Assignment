import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '@environments/environment.development';
import { ApiResponse } from '@shared/models/api.response';
import { API_PATHS } from '@shared/constants/path.constants';

/**
 * Article Service
 */
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  httpClient: HttpClient = inject(HttpClient);
  route: ActivatedRoute = inject(ActivatedRoute);
  private apiUrl = environment.apiUrl;

  /**
   * Fetch All Articles
   * @param params all filtering params
   * @return {Observable}
   */
  getAllArticles(params: Params) {
    const reqParams = new HttpParams({
      fromObject: params,
    });
    return this.httpClient.get<ApiResponse>(`${this.apiUrl}${API_PATHS.allArticles}`, { params: reqParams }).pipe(
      map(resp => {
        return resp.data;
      })
    );
  }
}
