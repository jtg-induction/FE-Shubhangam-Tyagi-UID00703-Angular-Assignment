import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment.development';
import { SignupRequest } from '@shared/models/signup.request.model';
import { AuthResponse } from '@shared/models/auth.response.model';

/**
 * Authentication of user
 */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient: HttpClient = inject(HttpClient);
  redirect: Router = inject(Router);
  private apiUrl = environment.apiUrl;
  /**
   * Signup a user
   * @param {string} formGroup - the signup form
   * @returns {Observable<AuthResponse>} An observable for containing user details along with user token.
   */
  signup(signupRequest: SignupRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}users/register`, signupRequest);
  }
}
