import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '@environments/environment.development';
import { LoginRequest } from '@shared/models/login.request.model';
import { SignupRequest } from '@shared/models/signup.request.model';
import { AuthResponse } from '@shared/models/auth.response.model';
import { API_PATHS } from '@shared/constants/path.constants';
import { TokenService } from './token.service';

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
  userToken = new BehaviorSubject<string>('');
  tokenService: TokenService = inject(TokenService);
  /**
   * Signup a user
   * @param {string} formGroup - the signup form
   * @returns {Observable<AuthResponse>} An observable for containing user details along with user token.
   */
  signup(signupRequest: SignupRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}${API_PATHS.signup}`, signupRequest).pipe(
      tap(res => {
        this.handleUserToken(res);
      })
    );
  }

  /**
   * Login a user
   * @param {string} formGroup - the login form
   * @returns {Observable<AuthResponse>} An observable for containing user details along with user token.
   */
  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}${API_PATHS.login}`, loginRequest).pipe(
      tap(res => {
        this.handleUserToken(res);
      })
    );
  }
  /**
   * Logout a user
   */
  logout() {
    this.userToken.next('');
    this.tokenService.deleteToken();
  }
  /**
   * For automatic login of user if token present in local storage
   */
  autoLogin() {
    const token = this.tokenService.getToken();
    if (!token) {
      // means no token found so not doing autologin
      return;
    }
    this.userToken.next(token);
  }

  /**
   * Handles user token and helps in effective loggedIn state management
   * @param {AuthResponse} res - the auth response
   */
  private handleUserToken(res: AuthResponse) {
    // emitting user token
    this.userToken.next(res.data.token);

    // saving token in local storage
    this.tokenService.saveToken(res.data.token);
  }
}
