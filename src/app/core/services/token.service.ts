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

  /**
   * Deletes the token in localstorage
   */
  deleteToken() {
    localStorage.removeItem('Token');
  }

  /**
   * Gets the token in localstorage
   * @returns {string} token - the user's token
   */
  getToken() {
    return localStorage.getItem('Token');
  }
}
