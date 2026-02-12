import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@core/services/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  authService: AuthService = inject(AuthService);
  isLoggedIn!: boolean;
  router: Router = inject(Router);
  private userTokenSubject!: Subscription;
  ngOnInit(): void {
    this.userTokenSubject = this.authService.userToken.subscribe(token => {
      this.isLoggedIn = !token || token !== '';
    });
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
  ngOnDestroy(): void {
    this.userTokenSubject.unsubscribe();
  }
}
