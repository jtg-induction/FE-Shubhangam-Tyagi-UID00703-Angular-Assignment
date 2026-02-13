import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@core/services/auth-service';
import { PasswordValidator } from '@modules/auth/validators/password.validator';
import { TokenService } from '@core/services/token-service';
import { NotificationService } from '@core/services/notification.service';

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
  ngOnDestroy(): void {
    this.obs.unsubscribe();
  }

  handleSubmit() {
    this.isLoading = true;
    this.obs = this.authService.signup(this.signupForm).subscribe({
      next: resp => {
        this.tokenService.saveToken(resp.data.token);
      },
      error: error => {
        this.errorMessage = error.error.message;
        this.notificationService.showErrorSnackBar(this.errorMessage);
        this.isLoading = false;
      },
      complete: () => {
        console.log('completed');
        this.notificationService.showSuccessSnackBar('Signup Success');
        this.isLoading = false;
        this.router.navigate(['../login']);
      },
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;
    if (errors['required']) return `${controlName}  is required`;
    if (errors['email']) return 'Please enter a valid email';
    if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} characters required`;
    if (errors['atLeastTwoDigitsRequired']) return 'Password must contain at least two digits';
    if (errors['atLeastTwoSpecialChars']) return 'Password must have two special characters';
    if (errors['passwordNoMatch']) return 'Passwords do not match';

    return '';
  }
}
