import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  isLoggedIn!: boolean;
  router: Router = inject(Router);
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.authService.userToken.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(token => {
      this.isLoggedIn = !token || token !== '';
    });
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
