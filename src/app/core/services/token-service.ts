import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  saveToken(token: string) {
    localStorage.setItem('Token', token);
  }
}
