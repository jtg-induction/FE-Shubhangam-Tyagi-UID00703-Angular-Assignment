import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { PasswordValidator } from '@modules/auth/validators/password.validator';
import { TokenService } from '@core/services/token.service';
import { NotificationService } from '@core/services/notification.service';
import { SignupRequest } from '@shared/models/signup.request.model';

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
  notificationService = inject(NotificationService);
  isLoading = false;

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
      next: resp => {
        this.tokenService.saveToken(resp.data.token);
        this.notificationService.showSuccess(resp.message);
      },
      error: error => {
        this.errorMessage = error.error.message;
        this.notificationService.showError(this.errorMessage);
        this.isLoading = false;
      },
      complete: () => {
        console.log('completed');
        this.isLoading = false;
        this.router.navigate(['../login']);
      },
    });
  }

  ngOnDestroy(): void {
    this.obs.unsubscribe();
  }
}
