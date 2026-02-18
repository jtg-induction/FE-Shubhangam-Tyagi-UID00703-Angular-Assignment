import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, Observable, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { TokenService } from '@core/services/token.service';
import { NotificationService } from '@core/services/notification.service';
import { AuthMessages } from '@shared/constants/auth.constants';

/**
 * Interceptor for intercepting API requests
 */

export class AuthInterceptor implements HttpInterceptor {
  authService: AuthService = inject(AuthService);
  tokenService: TokenService = inject(TokenService);
  notificationService: NotificationService = inject(NotificationService);
  router: Router = inject(Router);
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // this function  called for intercepting req
    return this.authService.userToken.pipe(
      take(1),
      exhaustMap(token => {
        if (!token || token === '') {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        });
        return next.handle(modifiedReq);
      }),
      catchError(error => {
        if (error.status === 401) {
          this.tokenService.deleteToken();
          this.notificationService.showError(AuthMessages.UNEXPECTED_ERROR_MESSAGE);
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
