import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  destroyRef = inject(DestroyRef);
  isLoggedIn = false;

  ngOnInit(): void {
    this.authService.userToken.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(token => {
      this.isLoggedIn = !!token || token !== '';
    });
  }
}
