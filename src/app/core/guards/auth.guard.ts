import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

export const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthPage = state.url.includes('auth/login') || state.url.includes('auth/signup');
  return authService.userToken.pipe(
    map(token => {
      const isLoggedIn = !!token || token !== '';
      if (isLoggedIn) {
        if (isAuthPage) {
          return router.createUrlTree(['/articles']);
        }
        return true;
      } else {
        if (!isAuthPage) {
          return router.createUrlTree(['/auth/login']);
        }
        return true;
      }
    })
  );
};
