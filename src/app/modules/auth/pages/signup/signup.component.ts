import { Component, inject, OnInit } from '@angular/core';
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
export class SignupComponent implements OnInit {
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

  handleSubmit() {
    this.isLoading = true;
    this.obs = this.authService.signup(this.signupForm).subscribe({
      next: () => {
        // this.showSuccessSnackBar('Signup Success');
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
        this.router.navigate(['../../dashboard']);
      },
    });
  }
}
