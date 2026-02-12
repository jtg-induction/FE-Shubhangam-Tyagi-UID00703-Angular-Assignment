import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from '@core/services/auth-service';
/**
 * Interceptor for intercepting API requests
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authService: AuthService = inject(AuthService);
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
      })
    );
  }
}
