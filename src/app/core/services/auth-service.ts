import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@shared/models/user.model';
import { SignupResponse } from '@shared/models/signup.response';
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
   * @returns {Observable<SignupResponse>} An observable for containing user details along with user token.
   */
  signup(formGroup: FormGroup): Observable<SignupResponse> {
    const formData = formGroup.getRawValue();
    const user = new User(formData.username, formData.email, formData.password);
    return this.httpClient.post<SignupResponse>(`${this.apiUrl}users/register`, user);
  }
}
