import { Injectable } from '@angular/core';
/**
 * -Manages user tokens
 */
@Injectable({ providedIn: 'root' })
export class TokenService {
  /**
   * Stores the token in localstorage
   * @param {string} token - the user's token
   */
  saveToken(token: string) {
    localStorage.setItem('Token', token);
  }
}
