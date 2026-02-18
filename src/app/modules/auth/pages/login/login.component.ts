import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/services/auth.service';
import { TokenService } from '@core/services/token.service';
import { PasswordValidator } from '@modules/auth/validators/password.validator';
import { LoginRequest } from '@shared/models/login.request';

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
  isLoading = false;
  show = false;
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.setupForm();

    this.loginForm
      .get('password')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.show = false;
      });
  }

  handleSubmit() {
    this.isLoading = true;
    const formData = this.loginForm.getRawValue();
    const loginRequest: LoginRequest = {
      username: formData.username,
      password: formData.password,
    };
    this.authService
      .login(loginRequest)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
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

  setupForm() {
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

  togglePasswordShow() {
    this.show = !this.show;
  }
}
