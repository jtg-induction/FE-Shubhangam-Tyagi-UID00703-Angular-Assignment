import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthPage = state.url.includes('auth/login') || state.url.includes('auth/signup');

  if (authService.isLoggedIn()) {
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
};
