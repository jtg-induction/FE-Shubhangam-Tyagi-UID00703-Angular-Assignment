import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@core/services/auth-service';
import { TokenService } from '@core/services/token-service';
import { PasswordValidator } from '@modules/auth/validators/password.validator';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  title = 'Login';
  errorMessage = '';
  loginForm!: FormGroup;
  authService: AuthService = inject(AuthService);
  tokenService: TokenService = inject(TokenService);
  router: Router = inject(Router);
  obs!: Subscription;
  notificationService = inject(NotificationService);
  isLoading = false;
  show = false;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        PasswordValidator.atLeastTwoDigitsRequired,
        PasswordValidator.specialCharacterRequired,
      ]),
    });
  }

  handleSubmit() {
    this.isLoading = true;
    this.obs = this.authService.login(this.loginForm).subscribe({
      next: () => {
        /* empty */
      },
      error: error => {
        this.errorMessage = error.error.message;
        this.notificationService.showErrorSnackBar(this.errorMessage);
        this.isLoading = false;
      },
      complete: () => {
        this.notificationService.showSuccessSnackBar('Login Success');
        this.router.navigate(['../../dashboard']);
        this.isLoading = false;
        this.obs.unsubscribe();
      },
    });
  }

  togglePasswordShow() {
    this.show = !this.show;
  }
}
