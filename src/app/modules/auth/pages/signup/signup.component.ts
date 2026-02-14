import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@core/services/auth-service';
import { PasswordValidator } from '@modules/auth/validators/password.validator';
import { TokenService } from '@core/services/token-service';
import { SignupRequest } from '@shared/models/signup.request.dto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit, OnDestroy {
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

    this.signupForm.get('password')?.valueChanges.subscribe(() => {
      this.showPass = false;
    });

    this.signupForm.get('confirmPassword')?.valueChanges.subscribe(() => {
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

    this.obs = this.authService.signup(signupRequest).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
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
  ngOnDestroy(): void {
    this.obs?.unsubscribe();
  }
}
