import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { ApiResponse } from '@shared/models/api.response';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  httpClient: HttpClient = inject(HttpClient);
  route: ActivatedRoute = inject(ActivatedRoute);
  private apiUrl = environment.apiUrl;

  getAllArticles(params: Params) {
    const reqParams = new HttpParams({
      fromObject: params,
    });
    // reqParams
    // console.log(reqParams);
    return this.httpClient.get<ApiResponse>(`${this.apiUrl}articles`, { params: reqParams }).pipe(
      map(resp => {
        return resp.data.data;
      })
    );
  }
}
