import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/services/auth.service';
import { PasswordValidator } from '@modules/auth/validators/password.validator';
import { TokenService } from '@core/services/token.service';
import { SignupRequest } from '@shared/models/signup.request.model';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  title = 'Signup';
  errorMessage = '';
  signupForm!: FormGroup;
  authService: AuthService = inject(AuthService);
  tokenService: TokenService = inject(TokenService);
  router: Router = inject(Router);
  obs!: Subscription;
  isLoading = false;
  showPass = false;
  showConfirmPass = false;
  notificationService = inject(NotificationService);
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.signupForm = new FormGroup(
      {
        username: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          PasswordValidator.atLeastTwoDigitsRequired,
          PasswordValidator.specialCharacterRequired,
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      { validators: [PasswordValidator.confirmPassword] } // form group level validator
    );

    this.signupForm
      .get('password')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.showPass = false;
      });

    this.signupForm
      .get('confirmPassword')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.showConfirmPass = false;
      });
  }

  handleSubmit() {
    this.isLoading = true;
    const formData = this.signupForm.getRawValue();
    const signupRequest: SignupRequest = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    this.authService
      .signup(signupRequest)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: resp => {
          this.router.navigate(['/dashboard']);
          this.tokenService.saveToken(resp.data.token);
        },
        error: error => {
          this.errorMessage = error.error.message;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
          this.errorMessage = '';
        },
      });
  }

  togglePasswordShow() {
    this.showPass = !this.showPass;
  }
  toggleConfirmPasswordShow() {
    this.showConfirmPass = !this.showConfirmPass;
  }
}
