import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '@core/services/auth-service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.userToken.pipe(
    map(token => {
      if (!token || token === '') {
        router.navigate(['/auth/login']);
        return false;
      } else {
        return true;
      }
    })
  );
};
