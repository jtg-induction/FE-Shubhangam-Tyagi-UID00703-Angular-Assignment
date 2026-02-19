import { Injectable } from '@angular/core';
/**
 * -Manages user tokens
 */
@Injectable({ providedIn: 'root' })
export class TokenService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('Token');
  }
  /**
   * Stores the token in localstorage
   * @param {string} token - the user's token
   */
  saveToken(token: string) {
    this.token = token;
    localStorage.setItem('Token', token);
  }

  /**
   * Deletes the token in localstorage
   */
  deleteToken() {
    this.token = null;
    localStorage.removeItem('Token');
  }

  /**
   * Gets the token from memory
   * @returns {string} token - the user's token
   */
  getToken(): string | null {
    return this.token;
  }
}
