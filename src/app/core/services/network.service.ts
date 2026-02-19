import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment.development';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private baseUrl = environment.apiUrl;

  http: HttpClient = inject(HttpClient);

  get<T>(endpoint: string, params?: Params): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, params);
  }

  post<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
  }
}
