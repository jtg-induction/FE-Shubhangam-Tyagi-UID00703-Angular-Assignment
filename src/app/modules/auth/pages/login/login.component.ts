import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@core/services/auth-service';
import { TokenService } from '@core/services/token-service';
import { PasswordValidator } from '@modules/auth/validators/password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  title = 'Login';
  errorMessage = '';
  loginForm!: FormGroup;
  authService: AuthService = inject(AuthService);
  tokenService: TokenService = inject(TokenService);
  router: Router = inject(Router);
  obs!: Subscription;
  passSub!: Subscription;
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

    this.loginForm.get('password')?.valueChanges.subscribe(() => {
      this.show = false;
    });
  }

  handleSubmit() {
    this.isLoading = true;
    this.obs = this.authService.login(this.loginForm).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        this.errorMessage = error.error.message;
        this.isLoading = false;
      },
      complete: () => {
        this.errorMessage = '';
        this.isLoading = false;
      },
    });
  }

  togglePasswordShow() {
    this.show = !this.show;
  }
  ngOnDestroy(): void {
    this.obs?.unsubscribe();
  }
}
