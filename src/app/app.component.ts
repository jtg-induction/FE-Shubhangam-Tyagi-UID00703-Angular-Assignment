import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Blog99';
  authService: AuthService = inject(AuthService);
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
