import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@shared/models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient: HttpClient = inject(HttpClient);
  redirect: Router = inject(Router);
  private apiUrl = environment.apiUrl;

  signup(formGroup: FormGroup): Observable<any> {
    const formData = formGroup.getRawValue();
    const user = new User(formData.username, formData.email, formData.password);
    return this.httpClient.post(this.apiUrl + `${this.apiUrl}users/register`, user);
  }
}
