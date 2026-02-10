import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@shared/models/user.model';
import { AuthResponse } from '@shared/models/auth.response';
import { LoginRequest } from '@shared/models/login.request';
import { environment } from '../../../environments/environment.development';

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
  signup(formGroup: FormGroup): Observable<AuthResponse> {
    const formData = formGroup.getRawValue();
    const user = new User(formData.username, formData.email, formData.password);
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}users/register`, user);
  }

  /**
   * Login a user
   * @param {string} formGroup - the login form
   * @returns {Observable<AuthResponse>} An observable for containing user details along with user token.
   */
  login(formGroup: FormGroup): Observable<AuthResponse> {
    const formData = formGroup.getRawValue();
    const loginRequest: LoginRequest = {
      username: formData.username,
      password: formData.password,
    };
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}users/login`, loginRequest);
  }
}
