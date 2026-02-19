import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthRequest } from '@shared/models/auth.request.model';
import { User } from '@shared/models/user.model';
import { API_PATHS } from '@shared/constants/path.constants';
import { ApiResponse } from '@shared/models/api.response.model';
import { TokenService } from './token.service';
import { NetworkService } from './network.service';

/**
 * Authentication of user
 */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  network: NetworkService = inject(NetworkService);
  tokenService: TokenService = inject(TokenService);
  /**
   * Signup a user
   * @param {string} formGroup - the signup form
   * @returns {Observable<AuthResponse>} An observable for containing user details along with user token.
   */
  signup(signupRequest: AuthRequest): Observable<ApiResponse<User>> {
    return this.network.post<ApiResponse<User>>(API_PATHS.signup, signupRequest).pipe(
      tap(res => {
        this.tokenService.saveToken(res.data.token);
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  /**
   * Login a user
   * @param {string} formGroup - the login form
   * @returns {Observable<AuthResponse>} An observable for containing user details along with user token.
   */
  login(loginRequest: AuthRequest): Observable<ApiResponse<User>> {
    return this.network.post<ApiResponse<User>>(API_PATHS.login, loginRequest).pipe(
      tap(res => {
        this.tokenService.saveToken(res.data.token);
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }
  /**
   * Logout a user
   */
  logout() {
    this.tokenService.deleteToken();
  }

  /**
   * Check user is LoggedIn or Not
   * @returns true if loggedIn and false if not
   */
  isLoggedIn(): boolean {
    const token = this.tokenService.getToken();
    return token !== null && token !== '';
  }

  /**
   * For automatic login of user if token present in local storage
   */
  autoLogin() {
    const token = localStorage.getItem('Token');
    if (!token) {
      // means no token found so not doing autologin
      return;
    }
    this.tokenService.saveToken(token);
  }
}
