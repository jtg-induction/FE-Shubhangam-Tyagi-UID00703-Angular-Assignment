import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@core/services/auth-service';
import { TokenService } from '@core/services/token-service';
import { AuthMessages } from '@shared/messages/auth-messages';
import { PasswordValidator } from '@modules/auth/validators/password.validator';

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
  snackBar = inject(MatSnackBar);

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
    this.obs = this.authService.login(this.loginForm).subscribe({
      next: () => {
        this.showSuccessSnackBar('Login Success');
        setTimeout(() => {
          this.router.navigate(['../../dashboard']);
        }, 1000);
      },
      error: error => {
        if (error.status === 409) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = AuthMessages.unexpectedErrorMessage;
        }
        this.showErrorSnackBar(this.errorMessage);
      },
    });
  }

  showErrorSnackBar(message: string) {
    this.snackBar.open(message || 'Login failed', 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  showSuccessSnackBar(message: string) {
    this.snackBar.open(message || 'Login Success', undefined, {
      duration: 1000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
