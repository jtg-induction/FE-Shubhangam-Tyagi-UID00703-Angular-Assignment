import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
